import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const KNOWN_TYPES = new Set(['source', 'concept', 'method', 'market', 'simulator', 'comparison', 'overview'])

export function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return {}

  const result = {}
  for (const rawLine of match[1].split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const separator = line.indexOf(':')
    if (separator === -1) continue

    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim()
    result[key] = parseFrontmatterValue(value)
  }
  return result
}

function parseFrontmatterValue(value) {
  if (value.startsWith('[') && value.endsWith(']')) {
    const inner = value.slice(1, -1).trim()
    if (!inner) return []
    return inner.split(',').map((item) => stripQuotes(item.trim())).filter(Boolean)
  }
  return stripQuotes(value)
}

function stripQuotes(value) {
  return value.replace(/^['"]|['"]$/g, '')
}

export function parseWikiLinks(content) {
  const links = []
  const pattern = /\[\[([^\]\n]+)\]\]/g
  let match
  while ((match = pattern.exec(content)) !== null) {
    const target = match[1].split('|')[0].split('#')[0].trim()
    if (target) links.push(normalizeTarget(target))
  }
  return [...new Set(links)]
}

export function slugFromWikiPath(filePath) {
  const normalized = filePath.replace(/\\/g, '/')
  const wikiIndex = normalized.lastIndexOf('/wiki/')
  const relative = wikiIndex >= 0 ? normalized.slice(wikiIndex + '/wiki/'.length) : normalized.replace(/^wiki\//, '')
  const withoutExt = relative.replace(/\.md$/i, '')
  if (withoutExt === 'index') return 'index'
  if (withoutExt.endsWith('/index')) return withoutExt
  return withoutExt.split('/').at(-1)
}

function hrefFromWikiPath(filePath) {
  const normalized = filePath.replace(/\\/g, '/')
  const wikiIndex = normalized.lastIndexOf('/wiki/')
  const relative = wikiIndex >= 0 ? normalized.slice(wikiIndex + '/wiki/'.length) : normalized.replace(/^wiki\//, '')
  const withoutExt = relative.replace(/\.md$/i, '')
  return withoutExt === 'index' ? '/' : `/${withoutExt}`
}

function normalizeTarget(target) {
  const cleaned = target.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\.md$/i, '')
  if (cleaned === 'index') return 'index'
  if (cleaned.endsWith('/index')) return cleaned
  return cleaned.split('/').at(-1)
}

function inferType(frontmatter, filePath) {
  if (typeof frontmatter.type === 'string' && KNOWN_TYPES.has(frontmatter.type)) {
    return frontmatter.type === 'overview' ? 'source' : frontmatter.type
  }
  const normalized = filePath.replace(/\\/g, '/')
  if (normalized.includes('/concepts/')) return 'concept'
  if (normalized.includes('/methods/')) return 'method'
  if (normalized.includes('/markets/')) return 'market'
  if (normalized.includes('/simulators/')) return 'simulator'
  if (normalized.includes('/comparisons/')) return 'comparison'
  if (normalized.includes('/sources/')) return 'source'
  return 'source'
}

function titleFromContent(content, fallback) {
  const heading = content.match(/^#\s+(.+)$/m)
  return heading ? heading[1].replace(/\s+Permalink.*$/, '').trim() : fallback
}

function titleize(slug) {
  return slug
    .split('/')
    .at(-1)
    .split('-')
    .map((part) => part ? part[0].toUpperCase() + part.slice(1) : part)
    .join(' ')
}

export function buildKnowledgeGraph(files) {
  const nodes = []
  const nodeIds = new Set()
  const edgeKeys = new Set()
  const edges = []

  for (const file of files) {
    const frontmatter = parseFrontmatter(file.content)
    const id = slugFromWikiPath(file.path)
    const label = typeof frontmatter.title === 'string' ? frontmatter.title : titleFromContent(file.content, titleize(id))
    const type = inferType(frontmatter, file.path)
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    const sources = Array.isArray(frontmatter.sources) ? frontmatter.sources : []

    nodes.push({
      id,
      label,
      type,
      href: hrefFromWikiPath(file.path),
      tags,
      sources,
      confidence: typeof frontmatter.confidence === 'string' ? frontmatter.confidence : undefined
    })
    nodeIds.add(id)
  }

  for (const file of files) {
    const from = slugFromWikiPath(file.path)
    for (const to of parseWikiLinks(file.content)) {
      if (from === to || !nodeIds.has(to)) continue
      const key = `${from}->${to}`
      if (edgeKeys.has(key)) continue
      edgeKeys.add(key)
      edges.push({ from, to, kind: 'wikilink' })
    }
  }

  const typeOrder = { source: 0, concept: 1, method: 2, market: 3, simulator: 4, comparison: 5 }
  nodes.sort((a, b) => (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9) || a.label.localeCompare(b.label))
  edges.sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to))

  return {
    generatedAt: new Date().toISOString(),
    nodes,
    edges
  }
}

export function readWikiFiles(wikiDir) {
  return walkMarkdownFiles(wikiDir)
    .filter((filePath) => !filePath.includes(`${path.sep}.vitepress${path.sep}`) && !filePath.includes(`${path.sep}components${path.sep}`))
    .map((filePath) => ({ path: filePath.replace(/\\/g, '/'), content: fs.readFileSync(filePath, 'utf8') }))
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

export function writeKnowledgeGraphData({ wikiDir, outputPath }) {
  const graph = buildKnowledgeGraph(readWikiFiles(wikiDir))
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, `${JSON.stringify(graph, null, 2)}\n`)
  return graph
}

function isMainModule() {
  return process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])
}

if (isMainModule()) {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const wikiDir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(repoRoot, 'wiki')
  const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : path.join(wikiDir, 'public', 'graph-data.json')
  const graph = writeKnowledgeGraphData({ wikiDir, outputPath })
  console.log(`Wrote ${outputPath} (${graph.nodes.length} nodes, ${graph.edges.length} edges)`)
}
