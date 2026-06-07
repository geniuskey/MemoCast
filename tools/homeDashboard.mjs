import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter } from './knowledgeGraph.mjs'
import { buildCitationAudit, readMarkdownFiles } from './citationAudit.mjs'

const TRACKED_CLUSTER_TAGS = [
  'hbm',
  'dram',
  'nand',
  'smartphone',
  'pc',
  'server',
  'ai-server',
  'storage',
  'pricing',
  'supply-demand',
  'domain',
  'power',
  'channel',
  'consolidation',
  'automotive',
  'edge-ai',
  'datacenter'
]

export function buildHomeDashboard({ rawFiles, wikiFiles, simulatorPresets, datasetFiles = [], generatedAt = new Date().toISOString() }) {
  const citationAudit = buildCitationAudit({ rawFiles, wikiFiles })
  const rawEntries = rawFiles.map((file) => toRawEntry(file, citationAudit.citationsByRawFile))
  const rawByPath = new Map(rawEntries.map((entry) => [entry.path, entry]))
  const presetEntries = flattenSimulatorPresets(simulatorPresets)
  const rawDataFiles = datasetFiles.map((file) => normalizeSlashes(file.path)).filter((filePath) => filePath.endsWith('.csv'))

  return {
    generatedAt,
    summary: {
      rawTotal: citationAudit.summary.rawTotal,
      rawCited: citationAudit.summary.rawCited,
      rawUncited: citationAudit.summary.rawUncited,
      rawDataFiles: rawDataFiles.length,
      rawSourceFiles: citationAudit.summary.rawTotal + rawDataFiles.length,
      wikiPages: citationAudit.summary.wikiPages,
      wikiPagesWithoutRawReferences: citationAudit.summary.wikiPagesWithoutRawReferences,
      missingRawReferences: citationAudit.summary.missingRawReferences,
      simulatorPresets: presetEntries.length,
      lowConfidenceRaw: rawEntries.filter((entry) => entry.confidence === 'low').length,
      lowConfidencePresets: presetEntries.filter((entry) => entry.confidence === 'low').length
    },
    rawByType: countBy(rawEntries, (entry) => entry.type),
    confidence: {
      raw: countBy(rawEntries, (entry) => entry.confidence ?? 'unrated'),
      simulatorPresets: countBy(presetEntries, (entry) => entry.confidence ?? 'unrated')
    },
    recentUpdates: rawEntries
      .filter((entry) => entry.date)
      .sort((a, b) => compareDateDesc(a.date, b.date) || a.title.localeCompare(b.title))
      .slice(0, 6)
      .map(({ path, title, type, confidence, date, tags, sourceUrl }) => ({ path, title, type, confidence, date, tags: tags.slice(0, 4), sourceUrl })),
    lowConfidence: [
      ...rawEntries
        .filter((entry) => entry.confidence === 'low')
        .map(({ path, title, type, date, tags, citedByCount, sourceUrl }) => ({ kind: 'raw', path, title, type, date, tags: tags.slice(0, 4), citedByCount, sourceUrl })),
      ...presetEntries
        .filter((entry) => entry.confidence === 'low')
        .map(({ domain, id, label, sourceRefs }) => ({ kind: 'preset', domain, id, title: label, sourceRefs: sourceRefs.slice(0, 4), sourceRefCount: sourceRefs.length }))
    ].slice(0, 8),
    enrichmentClusters: buildEnrichmentClusters(rawEntries, rawByPath, citationAudit.uncitedRawFiles).slice(0, 6),
    citationHealth: {
      uncitedRawFiles: citationAudit.uncitedRawFiles.slice(0, 8),
      pagesWithoutRawReferences: citationAudit.pagesWithoutRawReferences.slice(0, 8),
      missingRawReferences: citationAudit.missingRawReferences.slice(0, 8)
    }
  }
}

export function writeHomeDashboard({ repoRoot, outputPath }) {
  const rawDir = path.join(repoRoot, 'raw')
  const wikiDir = path.join(repoRoot, 'wiki')
  const presetPath = path.join(wikiDir, 'data', 'simulator-presets.json')
  const simulatorPresets = JSON.parse(fs.readFileSync(presetPath, 'utf8'))
  const rawFiles = readMarkdownFiles(rawDir, { repoRoot })
  const datasetFiles = readFilesByExtension(path.join(rawDir, 'datasets'), '.csv', { repoRoot })
  const wikiFiles = readMarkdownFiles(wikiDir, {
    repoRoot,
    include: (filePath) => !filePath.includes(`${path.sep}.vitepress${path.sep}`) && !filePath.includes(`${path.sep}components${path.sep}`) && !filePath.includes(`${path.sep}public${path.sep}`)
  })
  const dashboard = buildHomeDashboard({ rawFiles, wikiFiles, simulatorPresets, datasetFiles })
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, `${JSON.stringify(dashboard, null, 2)}\n`)
  return dashboard
}

function readFilesByExtension(dir, extension, { repoRoot }) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => {
      const filePath = path.join(entry.parentPath ?? entry.path ?? dir, entry.name)
      return {
        path: normalizeSlashes(path.relative(repoRoot, filePath)),
        content: fs.readFileSync(filePath, 'utf8')
      }
    })
    .sort((a, b) => a.path.localeCompare(b.path))
}

function toRawEntry(file, citationsByRawFile) {
  const frontmatter = parseFrontmatter(file.content)
  const rawPath = normalizeSlashes(file.path)
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
  const date = firstString(frontmatter.ingested, frontmatter.updated, frontmatter.created, frontmatter.date)
  return {
    path: rawPath,
    title: firstString(frontmatter.title) ?? titleFromContent(file.content, titleFromPath(rawPath)),
    type: firstString(frontmatter.type) ?? rawPath.split('/')[1] ?? 'raw',
    confidence: normalizeConfidence(frontmatter.confidence),
    tags,
    date,
    sourceUrl: firstString(frontmatter.source_url, frontmatter.url),
    citedByCount: citationsByRawFile[rawPath]?.length ?? 0
  }
}

function flattenSimulatorPresets(simulatorPresets) {
  return Object.entries(simulatorPresets).flatMap(([domain, presets]) =>
    presets.map((preset) => ({
      domain,
      id: preset.id,
      label: preset.label,
      confidence: normalizeConfidence(preset.confidence),
      sourceRefs: Array.isArray(preset.sourceRefs) ? preset.sourceRefs : []
    }))
  )
}

function buildEnrichmentClusters(rawEntries, rawByPath, uncitedRawFiles) {
  const uncitedSet = new Set(uncitedRawFiles)
  const clusters = new Map()

  for (const entry of rawEntries) {
    const clusterTags = tagsForCluster(entry)
    for (const tag of clusterTags) {
      if (!clusters.has(tag)) clusters.set(tag, { tag, rawTotal: 0, uncitedRaw: 0, lowConfidenceRaw: 0, recent: [] })
      const cluster = clusters.get(tag)
      cluster.rawTotal += 1
      if (uncitedSet.has(entry.path)) cluster.uncitedRaw += 1
      if (entry.confidence === 'low') cluster.lowConfidenceRaw += 1
      if (entry.date) cluster.recent.push({ path: entry.path, title: entry.title, date: entry.date, confidence: entry.confidence })
    }
  }

  return [...clusters.values()]
    .map((cluster) => ({
      ...cluster,
      enrichmentScore: cluster.uncitedRaw * 2 + cluster.lowConfidenceRaw,
      recent: cluster.recent.sort((a, b) => compareDateDesc(a.date, b.date) || a.title.localeCompare(b.title)).slice(0, 3)
    }))
    .filter((cluster) => cluster.enrichmentScore > 0)
    .sort((a, b) => b.enrichmentScore - a.enrichmentScore || b.rawTotal - a.rawTotal || a.tag.localeCompare(b.tag))
}

function tagsForCluster(entry) {
  const normalizedTags = entry.tags.map((tag) => tag.toLowerCase())
  const tags = normalizedTags.filter((tag) => TRACKED_CLUSTER_TAGS.includes(tag))
  if (entry.path.includes('/articles/domain-')) tags.push('domain')
  if (entry.path.includes('/articles/channel-')) tags.push('channel')
  if (entry.path.includes('/articles/consol-')) tags.push('consolidation')
  if (entry.path.includes('/articles/power-')) tags.push('power')
  if (entry.path.includes('/reports/') && normalizedTags.includes('supply')) tags.push('supply-demand')
  if (tags.length === 0) tags.push(entry.type)
  return [...new Set(tags)]
}

function countBy(items, keyFn) {
  return Object.fromEntries(
    [...items.reduce((counts, item) => {
      const key = keyFn(item)
      counts.set(key, (counts.get(key) ?? 0) + 1)
      return counts
    }, new Map())].sort(([a], [b]) => a.localeCompare(b))
  )
}

function compareDateDesc(a, b) {
  return normalizeDateForSort(b).localeCompare(normalizeDateForSort(a))
}

function normalizeDateForSort(value) {
  return String(value ?? '').padEnd(10, '0')
}

function normalizeConfidence(value) {
  return ['low', 'medium', 'high'].includes(value) ? value : undefined
}

function firstString(...values) {
  return values.find((value) => typeof value === 'string' && value.trim().length > 0)?.trim()
}

function normalizeSlashes(value) {
  return value.replace(/\\/g, '/')
}

function titleFromContent(content, fallback) {
  const heading = content.match(/^#\s+(.+)$/m)
  return heading ? heading[1].trim() : fallback
}

function titleFromPath(filePath) {
  return filePath.split('/').at(-1).replace(/\.md$/i, '').split('-').map((part) => part ? part[0].toUpperCase() + part.slice(1) : part).join(' ')
}

function isMainModule() {
  return process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
}

if (isMainModule()) {
  const repoRoot = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : path.join(repoRoot, 'wiki', 'data', 'home-dashboard.json')
  const dashboard = writeHomeDashboard({ repoRoot, outputPath })
  console.log(`Wrote ${outputPath}`)
  console.log(`Home dashboard: ${dashboard.summary.rawTotal} raw, ${dashboard.summary.wikiPages} wiki pages, ${dashboard.summary.rawUncited} uncited raw, ${dashboard.enrichmentClusters.length} enrichment clusters`)
}
