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
