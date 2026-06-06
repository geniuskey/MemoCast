import { describe, expect, it } from 'vitest'
import { buildCitationAudit, parseRawReferences } from '../tools/citationAudit.mjs'

const rawFiles = [
  { path: 'raw/reports/a.md', content: '---\ntitle: A\nsource_url: https://example.com/a\n---\n# A' },
  { path: 'raw/datasets/b.md', content: '---\ntitle: B\n---\n# B' },
  { path: 'raw/papers/unused.md', content: '---\ntitle: HBM Demand Forecast\nsource_url: https://example.com/hbm\nconfidence: high\ntags: [hbm, demand, forecast]\n---\n# HBM Demand Forecast' }
]

const wikiFiles = [
  {
    path: 'wiki/concepts/memory-demand.md',
    content: '---\ntitle: Memory Demand\nsources: [raw/reports/a.md, raw/missing.md]\n---\n# Memory Demand\nSee raw/datasets/b.md in notes.'
  },
  {
    path: 'wiki/markets/dram.md',
    content: '---\ntitle: DRAM\nsources: []\n---\n# DRAM\nNo source refs yet.'
  },
  {
    path: 'wiki/markets/hbm.md',
    content: '---\ntitle: HBM\ntags: [hbm, memory, demand]\nsources: []\n---\n# HBM'
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
      wikiPages: 3,
      wikiPagesWithoutRawReferences: 2
    })
    expect(audit.uncitedRawFiles).toEqual(['raw/papers/unused.md'])
    expect(audit.missingRawReferences).toEqual([{ reference: 'raw/missing.md', pages: ['wiki/concepts/memory-demand.md'] }])
    expect(audit.pagesWithoutRawReferences).toEqual(['wiki/markets/dram.md', 'wiki/markets/hbm.md'])
    expect(audit.citationsByRawFile['raw/reports/a.md']).toEqual(['wiki/concepts/memory-demand.md'])
    expect(audit.rawMetadata['raw/reports/a.md']).toEqual(expect.objectContaining({ title: 'A', source_url: 'https://example.com/a' }))
    expect(audit.priorityUncitedRawFiles[0]).toEqual(expect.objectContaining({
      path: 'raw/papers/unused.md',
      title: 'HBM Demand Forecast',
      suggestedWikiTargets: expect.arrayContaining([expect.objectContaining({ path: 'wiki/markets/hbm.md' })])
    }))
    expect(audit.suggestedWikiTargetsByRawFile['raw/papers/unused.md'][0].path).toBe('wiki/markets/hbm.md')
  })
})
