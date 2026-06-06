import { describe, expect, it } from 'vitest'
import {
  buildDefaultDomainComparisonRows,
  buildScenarioDeltaRows,
  formatEb,
  rankComparisonRowsByDemand
} from '../wiki/lib/domainComparison'

describe('buildDefaultDomainComparisonRows', () => {
  it('builds a cross-domain EB comparison table from current simulator presets', () => {
    const rows = buildDefaultDomainComparisonRows()

    expect(rows.map((row) => row.id)).toEqual([
      'smartphone-dram',
      'smartphone-nand',
      'pc-dram',
      'ai-server-hbm',
      'nand-ssd'
    ])
    expect(rows.find((row) => row.id === 'smartphone-dram')?.totalDemandEb).toBe(8.88)
    expect(rows.find((row) => row.id === 'smartphone-nand')?.totalDemandEb).toBe(245.76)
    expect(rows.find((row) => row.id === 'pc-dram')?.totalDemandEb).toBe(2.4)
    expect(rows.find((row) => row.id === 'ai-server-hbm')?.totalDemandEb).toBe(0.2592)
    expect(rows.find((row) => row.id === 'nand-ssd')?.totalDemandEb).toBe(768)
  })

  it('ranks comparison rows by total EB demand descending without mutating the input', () => {
    const rows = buildDefaultDomainComparisonRows()
    const ranked = rankComparisonRowsByDemand(rows)

    expect(ranked.map((row) => row.id).slice(0, 3)).toEqual(['nand-ssd', 'smartphone-nand', 'smartphone-dram'])
    expect(rows.map((row) => row.id)).toEqual([
      'smartphone-dram',
      'smartphone-nand',
      'pc-dram',
      'ai-server-hbm',
      'nand-ssd'
    ])
  })
})

describe('buildScenarioDeltaRows', () => {
  it('calculates EB deltas between base and upside cross-domain scenarios', () => {
    const rows = buildScenarioDeltaRows()

    expect(rows.find((row) => row.id === 'smartphone-dram')?.deltaEb).toBe(1.92)
    expect(rows.find((row) => row.id === 'pc-dram')?.deltaEb).toBe(1.6)
    expect(rows.find((row) => row.id === 'ai-server-hbm')?.deltaEb).toBe(0.0144)
    expect(rows.find((row) => row.id === 'nand-ssd')?.deltaEb).toBe(264)
  })
})

describe('formatEb', () => {
  it('formats EB values with four decimals for small HBM-scale values and two for larger values', () => {
    expect(formatEb(0.2592)).toBe('0.2592 EB')
    expect(formatEb(8.88)).toBe('8.88 EB')
  })
})
