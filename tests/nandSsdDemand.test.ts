import { describe, expect, it } from 'vitest'
import {
  buildEnterpriseMixSensitivityRows,
  buildSsdShipmentSensitivityRows,
  calculateNandSsdDemand,
  formatCapacityTb,
  getNandSsdScenarioPreset,
  listNandSsdScenarioPresets
} from '../wiki/lib/nandSsdDemand'

describe('calculateNandSsdDemand', () => {
  it('calculates NAND SSD demand from client, enterprise, and AI storage segments', () => {
    const result = calculateNandSsdDemand({
      totalSsdShipmentsMillion: 300,
      segments: [
        { id: 'client', label: 'Client SSD', sharePercent: 80, averageCapacityTb: 1 },
        { id: 'enterprise', label: 'Enterprise SSD', sharePercent: 18, averageCapacityTb: 8 },
        { id: 'ai-storage', label: 'AI/Data-center SSD', sharePercent: 2, averageCapacityTb: 16 }
      ]
    })

    expect(result.normalizedSegments.map((segment) => segment.normalizedSharePercent)).toEqual([80, 18, 2])
    expect(result.weightedAverageCapacityTb).toBe(2.56)
    expect(result.totalNandTb).toBe(768_000_000)
    expect(result.totalNandPb).toBe(768_000)
    expect(result.totalNandEb).toBe(768)
  })

  it('normalizes segment shares and treats invalid capacity inputs as zero', () => {
    const result = calculateNandSsdDemand({
      totalSsdShipmentsMillion: 100,
      segments: [
        { id: 'client', label: 'Client SSD', sharePercent: 60, averageCapacityTb: 1 },
        { id: 'enterprise', label: 'Enterprise SSD', sharePercent: 60, averageCapacityTb: -8 },
        { id: 'ai-storage', label: 'AI/Data-center SSD', sharePercent: 30, averageCapacityTb: Number.NaN }
      ]
    })

    expect(result.normalizedSegments.map((segment) => segment.normalizedSharePercent)).toEqual([40, 40, 20])
    expect(result.weightedAverageCapacityTb).toBe(0.4)
    expect(result.totalNandTb).toBe(40_000_000)
  })

  it('falls back to equal segment shares when all shares are invalid', () => {
    const result = calculateNandSsdDemand({
      totalSsdShipmentsMillion: 90,
      segments: [
        { id: 'client', label: 'Client SSD', sharePercent: 0, averageCapacityTb: 1 },
        { id: 'enterprise', label: 'Enterprise SSD', sharePercent: -1, averageCapacityTb: 7 },
        { id: 'ai-storage', label: 'AI/Data-center SSD', sharePercent: Number.NaN, averageCapacityTb: 16 }
      ]
    })

    expect(result.normalizedSegments.map((segment) => segment.normalizedSharePercent)).toEqual([33.33, 33.33, 33.33])
    expect(result.weightedAverageCapacityTb).toBe(8)
  })
})

describe('NAND SSD scenario presets', () => {
  it('lists client-heavy, enterprise-transition, and AI-storage-heavy references', () => {
    const presets = listNandSsdScenarioPresets()

    expect(presets.map((preset) => preset.id)).toEqual([
      'client-heavy-ssd-reference',
      'enterprise-transition-ssd-reference',
      'ai-storage-heavy-ssd-reference',
      'qlc-enterprise-breakout-reference'
    ])
    expect(presets.every((preset) => preset.description.includes('not a market forecast'))).toBe(true)

    const qlc = getNandSsdScenarioPreset('qlc-enterprise-breakout-reference')
    expect(qlc.input.segments.find((segment) => segment.id === 'ai-storage')?.averageCapacityTb).toBe(122)
    expect(qlc.sources).toContain('raw/reports/trendforce-qlc-enterprise-ssd-nearline-hdd-2026.md')
  })

  it('returns defensive copies of preset segment inputs', () => {
    const preset = getNandSsdScenarioPreset('enterprise-transition-ssd-reference')

    expect(preset.input.segments[1].averageCapacityTb).toBe(8)
    preset.input.segments[1].averageCapacityTb = 64

    expect(getNandSsdScenarioPreset('enterprise-transition-ssd-reference').input.segments[1].averageCapacityTb).toBe(8)
  })
})

describe('NAND SSD sensitivity rows', () => {
  it('varies SSD shipments while keeping mix and capacity fixed', () => {
    const rows = buildSsdShipmentSensitivityRows(
      getNandSsdScenarioPreset('enterprise-transition-ssd-reference').input,
      [-10, 0, 10]
    )

    expect(rows.map((row) => row.totalSsdShipmentsMillion)).toEqual([270, 300, 330])
    expect(rows.map((row) => row.result.weightedAverageCapacityTb)).toEqual([2.56, 2.56, 2.56])
  })

  it('varies enterprise share by taking share from client SSDs first', () => {
    const rows = buildEnterpriseMixSensitivityRows(
      getNandSsdScenarioPreset('enterprise-transition-ssd-reference').input,
      [10, 20, 40]
    )

    expect(rows.map((row) => row.enterpriseSharePercent)).toEqual([10, 20, 40])
    expect(rows.map((row) => row.result.weightedAverageCapacityTb)).toEqual([2, 2.7, 4.1])
  })
})

describe('formatCapacityTb', () => {
  it('formats NAND capacity values into PB and EB', () => {
    expect(formatCapacityTb(768_000_000)).toBe('768.00 EB')
    expect(formatCapacityTb(768_000)).toBe('768.00 PB')
  })
})
