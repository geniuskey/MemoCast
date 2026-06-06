import { describe, expect, it } from 'vitest'
import { buildCitationAudit, parseRawReferences } from '../tools/citationAudit.mjs'

const rawFiles = [
  { path: 'raw/reports/a.md', content: '---\ntitle: A\nsource_url: https://example.com/a\n---\n# A' },
  { path: 'raw/datasets/b.md', content: '---\ntitle: B\n---\n# B' },
  { path: 'raw/papers/unused.md', content: '---\ntitle: Unused\n---\n# Unused' }
]

const wikiFiles = [
  {
    path: 'wiki/concepts/memory-demand.md',
    content: '---\ntitle: Memory Demand\nsources: [raw/reports/a.md, raw/missing.md]\n---\n# Memory Demand\nSee raw/datasets/b.md in notes.'
  },
  {
    path: 'wiki/markets/dram.md',
    content: '---\ntitle: DRAM\nsources: []\n---\n# DRAM\nNo source refs yet.'
  }
]

describe('citation audit', () => {
  it('extracts normalized raw references from frontmatter and body text', () => {
    expect(parseRawReferences(wikiFiles[0].content)).toEqual(['raw/reports/a.md', 'raw/missing.md', 'raw/datasets/b.md'])
  })

  it('reports raw coverage, missing references, and pages without raw citations', () => {
    const audit = buildCitationAudit({ rawFiles, wikiFiles })

    expect(audit.summary).toEqual({
      rawTotal: 3,
      rawCited: 2,
      rawUncited: 1,
      missingRawReferences: 1,
      wikiPages: 2,
      wikiPagesWithoutRawReferences: 1
    })
    expect(audit.uncitedRawFiles).toEqual(['raw/papers/unused.md'])
    expect(audit.missingRawReferences).toEqual([{ reference: 'raw/missing.md', pages: ['wiki/concepts/memory-demand.md'] }])
    expect(audit.pagesWithoutRawReferences).toEqual(['wiki/markets/dram.md'])
    expect(audit.citationsByRawFile['raw/reports/a.md']).toEqual(['wiki/concepts/memory-demand.md'])
    expect(audit.rawMetadata['raw/reports/a.md']).toEqual(expect.objectContaining({ title: 'A', source_url: 'https://example.com/a' }))
  })
})
