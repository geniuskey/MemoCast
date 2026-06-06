import { describe, expect, it } from 'vitest'
import {
  buildKnowledgeGraph,
  parseFrontmatter,
  parseWikiLinks,
  slugFromWikiPath,
  type WikiFile
} from '../tools/knowledgeGraph.mjs'

const files: WikiFile[] = [
  {
    path: 'wiki/concepts/memory-demand.md',
    content: `---\ntitle: Memory Demand\ntype: concept\ntags: [demand, memory]\nsources: [raw/reports/a.md]\nconfidence: high\n---\n# Memory Demand\nSee [[bit-demand]] and [[markets/dram|DRAM market]].`
  },
  {
    path: 'wiki/concepts/bit-demand.md',
    content: `---\ntitle: Bit Demand\ntype: concept\nconfidence: medium\n---\n# Bit Demand\nBack to [[memory-demand]].`
  },
  {
    path: 'wiki/markets/dram.md',
    content: `---\ntitle: DRAM\ntype: market\n---\n# DRAM\nUses [[bit-demand]].`
  },
  {
    path: 'wiki/simulators/hbm-demand.md',
    content: `# HBM Demand\nNo frontmatter here, but [[dram]].`
  }
]

describe('knowledge graph generation', () => {
  it('parses frontmatter scalars and inline arrays', () => {
    expect(parseFrontmatter(files[0].content)).toEqual({
      title: 'Memory Demand',
      type: 'concept',
      tags: ['demand', 'memory'],
      sources: ['raw/reports/a.md'],
      confidence: 'high'
    })
  })

  it('extracts normalized wikilink node ids and ignores display aliases', () => {
    expect(parseWikiLinks(files[0].content)).toEqual(['bit-demand', 'dram'])
  })

  it('creates stable slugs from wiki paths', () => {
    expect(slugFromWikiPath('wiki/concepts/memory-demand.md')).toBe('memory-demand')
    expect(slugFromWikiPath('wiki/simulators/index.md')).toBe('simulators/index')
  })

  it('builds typed nodes and de-duplicated directed edges from wiki files', () => {
    const graph = buildKnowledgeGraph(files)

    expect(graph.nodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'memory-demand', label: 'Memory Demand', type: 'concept', href: '/concepts/memory-demand', confidence: 'high' }),
        expect.objectContaining({ id: 'dram', label: 'DRAM', type: 'market', href: '/markets/dram' }),
        expect.objectContaining({ id: 'hbm-demand', label: 'HBM Demand', type: 'simulator', href: '/simulators/hbm-demand' })
      ])
    )
    expect(graph.edges).toEqual(
      expect.arrayContaining([
        { from: 'memory-demand', to: 'bit-demand', kind: 'wikilink' },
        { from: 'memory-demand', to: 'dram', kind: 'wikilink' },
        { from: 'dram', to: 'bit-demand', kind: 'wikilink' },
        { from: 'hbm-demand', to: 'dram', kind: 'wikilink' }
      ])
    )
    expect(graph.edges.filter((edge) => edge.from === 'memory-demand' && edge.to === 'bit-demand')).toHaveLength(1)
  })
})
