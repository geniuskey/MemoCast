import { describe, expect, it } from 'vitest'
import { buildHomeDashboard } from '../tools/homeDashboard.mjs'

const rawFiles = [
  {
    path: 'raw/reports/hbm.md',
    content: '---\ntitle: HBM report\ningested: 2026-06-05\ntype: report\ntags: [hbm, ai-server]\nconfidence: high\nsource_url: https://example.com/hbm\n---\n# HBM report'
  },
  {
    path: 'raw/articles/pc.md',
    content: '---\ntitle: PC low-confidence note\ningested: 2026-06-04\ntype: article\ntags: [pc, dram]\nconfidence: low\n---\n# PC note'
  },
  {
    path: 'raw/articles/domain-auto.md',
    content: '---\ntitle: Automotive domain note\ningested: 2026-06-03\ntype: article\ntags: [automotive, dram]\nconfidence: medium\n---\n# Automotive note'
  }
]

const wikiFiles = [
  {
    path: 'wiki/markets/hbm.md',
    content: '---\ntitle: HBM\nsources: [raw/reports/hbm.md]\n---\n# HBM'
  },
  {
    path: 'wiki/markets/pc-dram.md',
    content: '---\ntitle: PC DRAM\nsources: []\n---\n# PC DRAM\nNeeds source refs.'
  }
]

const simulatorPresets = {
  hbm: [
    { id: 'hbm-high', label: 'HBM high', confidence: 'high', sourceRefs: ['raw/reports/hbm.md'], input: {} }
  ],
  'pc-dram': [
    { id: 'pc-low', label: 'PC low', confidence: 'low', sourceRefs: ['raw/articles/pc.md'], input: {} }
  ]
}

describe('home dashboard data', () => {
  it('summarizes raw/wiki coverage, recent updates, confidence, and enrichment clusters', () => {
    const dashboard = buildHomeDashboard({
      rawFiles,
      wikiFiles,
      simulatorPresets,
      datasetFiles: [{ path: 'raw/datasets/hbm.csv', content: 'year,value\n2026,1' }],
      generatedAt: '2026-06-06T00:00:00.000Z'
    })

    expect(dashboard.summary).toEqual({
      rawTotal: 3,
      rawCited: 1,
      rawUncited: 2,
      rawDataFiles: 1,
      rawSourceFiles: 4,
      wikiPages: 2,
      wikiPagesWithoutRawReferences: 1,
      missingRawReferences: 0,
      simulatorPresets: 2,
      lowConfidenceRaw: 1,
      lowConfidencePresets: 1
    })
    expect(dashboard.recentUpdates.map((item) => item.path)).toEqual(['raw/reports/hbm.md', 'raw/articles/pc.md', 'raw/articles/domain-auto.md'])
    expect(dashboard.lowConfidence).toEqual(expect.arrayContaining([
      expect.objectContaining({ kind: 'raw', path: 'raw/articles/pc.md', title: 'PC low-confidence note' }),
      expect.objectContaining({ kind: 'preset', domain: 'pc-dram', id: 'pc-low', title: 'PC low' })
    ]))
    expect(dashboard.enrichmentClusters[0]).toEqual(expect.objectContaining({ tag: 'dram', rawTotal: 2, uncitedRaw: 2, lowConfidenceRaw: 1 }))
    expect(dashboard.citationHealth.pagesWithoutRawReferences).toEqual(['wiki/markets/pc-dram.md'])
  })
})
