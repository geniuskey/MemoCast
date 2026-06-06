import { describe, expect, it } from 'vitest'
import {
  buildHbmContentSensitivityRows,
  buildHbmShipmentSensitivityRows,
  calculateHbmDemand,
  formatCapacity,
  getHbmScenarioPreset,
  listHbmScenarioPresets
} from '../wiki/lib/hbmDemand'

describe('calculateHbmDemand', () => {
  it('calculates attach-adjusted HBM capacity demand from accelerator shipments and HBM content', () => {
    const result = calculateHbmDemand({
      acceleratorsThousand: 1000,
      attachRatePercent: 80,
      hbmStacksPerAccelerator: 8,
      hbmCapacityGbPerStack: 24
    })

    expect(result.attachedAcceleratorsThousand).toBe(800)
    expect(result.hbmGbPerAccelerator).toBe(192)
    expect(result.totalHbmGb).toBe(153_600_000)
    expect(result.totalHbmPb).toBe(153.6)
    expect(result.totalHbmEb).toBe(0.1536)
  })

  it('clamps attach rate and non-negative hardware inputs', () => {
    const result = calculateHbmDemand({
      acceleratorsThousand: -5,
      attachRatePercent: 140,
      hbmStacksPerAccelerator: -8,
      hbmCapacityGbPerStack: 24
    })

    expect(result.attachRate).toBe(100)
    expect(result.attachedAcceleratorsThousand).toBe(0)
    expect(result.hbmGbPerAccelerator).toBe(0)
    expect(result.totalHbmGb).toBe(0)
  })
})

describe('HBM scenario presets', () => {
  it('lists source-anchored example presets for HBM3E and HBM4 transition cases', () => {
    const presets = listHbmScenarioPresets()

    expect(presets.map((preset) => preset.id)).toEqual([
      'hbm3e-8hi-reference',
      'hbm3e-12hi-reference',
      'hbm4-12hi-reference',
      'trendforce-2026-hbm-growth-reference',
      'gb200-nvl72-ramp-reference',
      'gb300-rubin-288gb-reference'
    ])

    expect(presets.every((preset) => preset.sources.length > 0)).toBe(true)

    const trendforce = getHbmScenarioPreset('trendforce-2026-hbm-growth-reference')
    expect(trendforce.input.acceleratorsThousand).toBe(1700)
    expect(trendforce.sources).toContain('raw/reports/trendforce-hbm-bit-demand-supply-2026.md')

    const gb300 = getHbmScenarioPreset('gb300-rubin-288gb-reference')
    expect(gb300.input.hbmStacksPerAccelerator * gb300.input.hbmCapacityGbPerStack).toBe(288)
    expect(gb300.sources).toContain('raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md')
  })

  it('returns defensive copies of preset inputs and sources', () => {
    const preset = getHbmScenarioPreset('hbm4-12hi-reference')

    expect(preset.input.hbmCapacityGbPerStack).toBe(36)
    expect(preset.input.hbmStacksPerAccelerator).toBe(8)

    preset.input.hbmCapacityGbPerStack = 99
    preset.sources.length = 0

    expect(getHbmScenarioPreset('hbm4-12hi-reference').input.hbmCapacityGbPerStack).toBe(36)
    expect(getHbmScenarioPreset('hbm4-12hi-reference').sources.length).toBeGreaterThan(0)
  })
})

describe('HBM sensitivity rows', () => {
  it('varies accelerator shipments while keeping HBM content fixed', () => {
    const rows = buildHbmShipmentSensitivityRows(
      {
        acceleratorsThousand: 1000,
        attachRatePercent: 100,
        hbmStacksPerAccelerator: 8,
        hbmCapacityGbPerStack: 24
      },
      [-10, 0, 10]
    )

    expect(rows.map((row) => row.acceleratorsThousand)).toEqual([900, 1000, 1100])
    expect(rows.map((row) => row.result.hbmGbPerAccelerator)).toEqual([192, 192, 192])
  })

  it('varies stack capacity while keeping accelerator shipments fixed', () => {
    const rows = buildHbmContentSensitivityRows(
      {
        acceleratorsThousand: 1000,
        attachRatePercent: 100,
        hbmStacksPerAccelerator: 8,
        hbmCapacityGbPerStack: 24
      },
      [16, 24, 36]
    )

    expect(rows.map((row) => row.hbmCapacityGbPerStack)).toEqual([16, 24, 36])
    expect(rows.map((row) => row.result.hbmGbPerAccelerator)).toEqual([128, 192, 288])
  })
})

describe('formatCapacity', () => {
  it('formats HBM GB values into PB and EB', () => {
    expect(formatCapacity(153_600_000)).toBe('153.60 PB')
    expect(formatCapacity(1_536_000_000)).toBe('1.54 EB')
  })
})
