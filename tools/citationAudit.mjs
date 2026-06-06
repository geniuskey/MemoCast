import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseFrontmatter } from './knowledgeGraph.mjs'

export function parseRawReferences(content) {
  const references = []
  const frontmatter = parseFrontmatter(content)
  if (Array.isArray(frontmatter.sources)) {
    references.push(...frontmatter.sources.filter((source) => typeof source === 'string'))
  }

  const rawPathPattern = /raw\/[A-Za-z0-9._~!$&'()*+,;=:@/?%#\-]+?\.md/g
  for (const match of content.matchAll(rawPathPattern)) references.push(match[0])

  return [...new Set(references.map(normalizeRawPath).filter(Boolean))]
}

export function buildCitationAudit({ rawFiles, wikiFiles }) {
  const rawPaths = rawFiles.map((file) => normalizeRawPath(file.path))
  const rawPathSet = new Set(rawPaths)
  const citationsByRawFile = Object.fromEntries(rawPaths.map((rawPath) => [rawPath, []]))
  const missingReferencePages = new Map()
  const pagesWithoutRawReferences = []
  const rawMetadata = {}
  const wikiTargets = wikiFiles.map((page) => buildWikiTarget(page))

  for (const file of rawFiles) {
    const rawPath = normalizeRawPath(file.path)
    const frontmatter = parseFrontmatter(file.content)
    rawMetadata[rawPath] = {
      title: typeof frontmatter.title === 'string' ? frontmatter.title : titleFromContent(file.content, titleFromPath(rawPath)),
      source_url: typeof frontmatter.source_url === 'string' ? frontmatter.source_url : undefined,
      type: typeof frontmatter.type === 'string' ? frontmatter.type : rawPath.split('/')[1],
      confidence: typeof frontmatter.confidence === 'string' ? frontmatter.confidence : undefined,
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    }
  }

  for (const page of wikiFiles) {
    const pagePath = normalizeSlashes(page.path)
    const references = parseRawReferences(page.content)
    if (references.length === 0) pagesWithoutRawReferences.push(pagePath)

    for (const reference of references) {
      if (rawPathSet.has(reference)) {
        citationsByRawFile[reference].push(pagePath)
      } else {
        if (!missingReferencePages.has(reference)) missingReferencePages.set(reference, new Set())
        missingReferencePages.get(reference).add(pagePath)
      }
    }
  }

  for (const pages of Object.values(citationsByRawFile)) pages.sort()

  const uncitedRawFiles = rawPaths.filter((rawPath) => citationsByRawFile[rawPath].length === 0).sort()
  const missingRawReferences = [...missingReferencePages.entries()]
    .map(([reference, pages]) => ({ reference, pages: [...pages].sort() }))
    .sort((a, b) => a.reference.localeCompare(b.reference))
  pagesWithoutRawReferences.sort()

  const suggestedWikiTargetsByRawFile = Object.fromEntries(
    rawPaths.map((rawPath) => [rawPath, suggestWikiTargets(rawPath, rawMetadata[rawPath], wikiTargets)])
  )
  const priorityUncitedRawFiles = uncitedRawFiles
    .map((rawPath) => ({
      path: rawPath,
      ...rawMetadata[rawPath],
      priority: rawIntegrationPriority(rawPath, rawMetadata[rawPath]),
      suggestedWikiTargets: suggestedWikiTargetsByRawFile[rawPath]
    }))
    .sort((a, b) => b.priority - a.priority || a.path.localeCompare(b.path))
    .slice(0, 30)

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      rawTotal: rawPaths.length,
      rawCited: rawPaths.length - uncitedRawFiles.length,
      rawUncited: uncitedRawFiles.length,
      missingRawReferences: missingRawReferences.length,
      wikiPages: wikiFiles.length,
      wikiPagesWithoutRawReferences: pagesWithoutRawReferences.length
    },
    uncitedRawFiles,
    priorityUncitedRawFiles,
    suggestedWikiTargetsByRawFile,
    missingRawReferences,
    pagesWithoutRawReferences,
    citationsByRawFile,
    rawMetadata
  }
}

export function readMarkdownFiles(rootDir, options = {}) {
  const include = options.include ?? (() => true)
  return walkMarkdownFiles(rootDir)
    .filter(include)
    .map((filePath) => ({ path: path.relative(options.repoRoot ?? rootDir, filePath).replace(/\\/g, '/'), content: fs.readFileSync(filePath, 'utf8') }))
}

export function writeCitationAudit({ repoRoot, outputPath }) {
  const rawDir = path.join(repoRoot, 'raw')
  const wikiDir = path.join(repoRoot, 'wiki')
  const rawFiles = readMarkdownFiles(rawDir, { repoRoot })
  const wikiFiles = readMarkdownFiles(wikiDir, {
    repoRoot,
    include: (filePath) => !filePath.includes(`${path.sep}.vitepress${path.sep}`) && !filePath.includes(`${path.sep}components${path.sep}`) && !filePath.includes(`${path.sep}public${path.sep}`)
  })
  const audit = buildCitationAudit({ rawFiles, wikiFiles })
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, `${JSON.stringify(audit, null, 2)}\n`)
  return audit
}

function buildWikiTarget(page) {
  const pagePath = normalizeSlashes(page.path)
  const frontmatter = parseFrontmatter(page.content)
  const title = typeof frontmatter.title === 'string' ? frontmatter.title : titleFromContent(page.content, titleFromPath(pagePath))
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags.filter((tag) => typeof tag === 'string') : []
  const type = typeof frontmatter.type === 'string' ? frontmatter.type : pagePath.split('/')[1]
  return {
    path: pagePath,
    title,
    type,
    tags,
    tokens: tokenize([pagePath, title, type, ...tags].join(' '))
  }
}

function suggestWikiTargets(rawPath, metadata, wikiTargets) {
  const rawTokens = tokenize([rawPath, metadata.title, metadata.type, ...(metadata.tags ?? [])].join(' '))
  return wikiTargets
    .map((target) => {
      const overlap = [...rawTokens].filter((token) => target.tokens.has(token)).length
      const ruleScore = targetRuleScore(rawTokens, target.path)
      const score = overlap + ruleScore
      return { path: target.path, title: target.title, score, reason: suggestionReason(rawTokens, target, overlap, ruleScore) }
    })
    .filter((target) => target.score > 0 && !target.path.includes('/sources/'))
    .sort((a, b) => b.score - a.score || a.path.localeCompare(b.path))
    .slice(0, 4)
}

function rawIntegrationPriority(rawPath, metadata) {
  const tokens = tokenize([rawPath, metadata.title, metadata.type, ...(metadata.tags ?? [])].join(' '))
  let priority = 10
  if (metadata.source_url) priority += 4
  if (metadata.confidence === 'high') priority += 3
  if (metadata.confidence === 'medium') priority += 2
  if (metadata.confidence === 'low') priority += 1
  if (rawPath.includes('/datasets/')) priority += 5
  if (rawPath.includes('/reports/')) priority += 4
  if (rawPath.includes('/earnings/')) priority += 3
  if (rawPath.includes('/papers/')) priority += 3
  if (rawPath.includes('/articles/')) priority += 2
  for (const token of ['hbm', 'dram', 'nand', 'ssd', 'smartphone', 'mobile', 'pc', 'server', 'ai', 'capex', 'supply', 'forecast', 'demand', 'memory']) {
    if (tokens.has(token)) priority += 1
  }
  return priority
}

function targetRuleScore(rawTokens, targetPath) {
  let score = 0
  const hasAny = (...tokens) => tokens.some((token) => rawTokens.has(token))
  if (hasAny('hbm', 'gpu', 'cowos', 'accelerator') && targetPath.includes('hbm')) score += 6
  if (hasAny('nand', 'ssd', 'qlc', 'flash') && (targetPath.includes('nand') || targetPath.includes('ssd'))) score += 6
  if (hasAny('smartphone', 'mobile', 'phone', 'android', 'apple') && targetPath.includes('smartphone')) score += 6
  if (hasAny('pc', 'notebook', 'copilot') && targetPath.includes('pc-dram')) score += 6
  if (hasAny('dram', 'ddr', 'lpddr') && targetPath.includes('dram')) score += 5
  if (hasAny('supply', 'capex', 'capacity', 'wafer', 'shortage') && targetPath.includes('supply-demand-gap')) score += 5
  if (hasAny('forecast', 'demand', 'scenario') && (targetPath.includes('demand-forecasting') || targetPath.includes('forecasting-evidence-map'))) score += 4
  if (hasAny('model', 'elasticity', 'diffusion', 'planning') && targetPath.includes('/methods/')) score += 4
  if (hasAny('dataset', 'csv') && targetPath.includes('charts')) score += 4
  return score
}

function suggestionReason(rawTokens, target, overlap, ruleScore) {
  const matched = [...rawTokens].filter((token) => target.tokens.has(token)).slice(0, 4)
  if (matched.length > 0) return `keyword: ${matched.join(', ')}`
  if (ruleScore > 0) return 'domain rule match'
  return 'general topic match'
}

function tokenize(value) {
  const stopWords = new Set(['raw', 'wiki', 'md', 'the', 'and', 'for', 'with', 'from', '2024', '2025', '2026', '2027'])
  return new Set(
    String(value ?? '')
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length >= 2 && !stopWords.has(token))
  )
}

function normalizeRawPath(value) {
  const normalized = normalizeSlashes(String(value ?? '')).replace(/^\.\//, '').replace(/^\/+/, '')
  const rawIndex = normalized.indexOf('raw/')
  const rawPath = rawIndex >= 0 ? normalized.slice(rawIndex) : normalized
  return rawPath.replace(/[),.;:]+$/g, '')
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

function walkMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.vitepress' || entry.name === '.obsidian') continue
      files.push(...walkMarkdownFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }
  return files
}

function isMainModule() {
  return process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
}

if (isMainModule()) {
  const repoRoot = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : path.join(repoRoot, 'wiki', 'public', 'citation-audit.json')
  const audit = writeCitationAudit({ repoRoot, outputPath })
  console.log(`Wrote ${outputPath}`)
  console.log(`Raw coverage: ${audit.summary.rawCited}/${audit.summary.rawTotal} cited; ${audit.summary.rawUncited} uncited; ${audit.summary.missingRawReferences} missing references; ${audit.summary.wikiPagesWithoutRawReferences} wiki pages without raw refs`)
  if (audit.summary.missingRawReferences > 0) process.exitCode = 1
}
