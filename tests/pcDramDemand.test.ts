import { describe, expect, it } from 'vitest'
import {
  buildAiPcPenetrationSensitivityRows,
  buildPcShipmentSensitivityRows,
  calculatePcDramDemand,
  formatCapacity,
  getPcDramScenarioPreset,
  listPcDramScenarioPresets
} from '../wiki/lib/pcDramDemand'

describe('calculatePcDramDemand', () => {
  it('calculates PC DRAM demand from non-AI and AI PC segment assumptions', () => {
    const result = calculatePcDramDemand({
      pcShipmentsMillion: 250,
      aiPcPenetrationPercent: 20,
      nonAiDramGbPerPc: 8,
      aiPcDramGbPerPc: 16
    })

    expect(result.segmentShares.nonAiPc).toBe(80)
    expect(result.segmentShares.aiPc).toBe(20)
    expect(result.weightedAverageDramGb).toBe(9.6)
    expect(result.totalDramGb).toBe(2_400_000_000)
    expect(result.totalDramPb).toBe(2400)
    expect(result.aiPcUnitsMillion).toBe(50)
    expect(result.nonAiPcUnitsMillion).toBe(200)
  })

  it('clamps AI PC penetration and non-negative DRAM inputs', () => {
    const over = calculatePcDramDemand({
      pcShipmentsMillion: 100,
      aiPcPenetrationPercent: 125,
      nonAiDramGbPerPc: 8,
      aiPcDramGbPerPc: 16
    })

    const under = calculatePcDramDemand({
      pcShipmentsMillion: -100,
      aiPcPenetrationPercent: -10,
      nonAiDramGbPerPc: -8,
      aiPcDramGbPerPc: 16
    })

    expect(over.segmentShares.aiPc).toBe(100)
    expect(over.weightedAverageDramGb).toBe(16)
    expect(under.segmentShares.aiPc).toBe(0)
    expect(under.totalDramGb).toBe(0)
  })
})

describe('PC DRAM scenario presets', () => {
  it('lists illustrative PC DRAM scenarios for baseline, AI transition, and AI-heavy cases', () => {
    const presets = listPcDramScenarioPresets()

    expect(presets.map((preset) => preset.id)).toEqual([
      'baseline-pc-reference',
      'ai-pc-transition-reference',
      'ai-heavy-pc-reference',
      'copilot-plus-16gb-reference',
      'idc-shortage-downside-reference'
    ])
    expect(presets.every((preset) => preset.description.includes('not a market forecast'))).toBe(true)

    const copilot = getPcDramScenarioPreset('copilot-plus-16gb-reference')
    expect(copilot.input.aiPcDramGbPerPc).toBe(16)
    expect(copilot.sources).toContain('raw/articles/microsoft-ai-pc-16gb-ram-baseline.md')

    const shortage = getPcDramScenarioPreset('idc-shortage-downside-reference')
    expect(shortage.input.pcShipmentsMillion).toBe(222)
    expect(shortage.sources).toContain('raw/reports/idc-2026-memory-shortage-supply-growth.md')
  })

  it('returns defensive copies of preset inputs', () => {
    const preset = getPcDramScenarioPreset('ai-pc-transition-reference')

    expect(preset.input.aiPcPenetrationPercent).toBe(20)
    expect(preset.input.aiPcDramGbPerPc).toBe(16)

    preset.input.aiPcDramGbPerPc = 64

    expect(getPcDramScenarioPreset('ai-pc-transition-reference').input.aiPcDramGbPerPc).toBe(16)
  })
})

describe('PC DRAM sensitivity rows', () => {
  it('varies PC shipments while keeping DRAM content fixed', () => {
    const rows = buildPcShipmentSensitivityRows(
      {
        pcShipmentsMillion: 250,
        aiPcPenetrationPercent: 20,
        nonAiDramGbPerPc: 8,
        aiPcDramGbPerPc: 16
      },
      [-10, 0, 10]
    )

    expect(rows.map((row) => row.pcShipmentsMillion)).toEqual([225, 250, 275])
    expect(rows.map((row) => row.result.weightedAverageDramGb)).toEqual([9.6, 9.6, 9.6])
  })

  it('varies AI PC penetration while keeping total PC shipments fixed', () => {
    const rows = buildAiPcPenetrationSensitivityRows(
      {
        pcShipmentsMillion: 250,
        aiPcPenetrationPercent: 20,
        nonAiDramGbPerPc: 8,
        aiPcDramGbPerPc: 16
      },
      [0, 20, 50]
    )

    expect(rows.map((row) => row.aiPcPenetrationPercent)).toEqual([0, 20, 50])
    expect(rows.map((row) => row.result.weightedAverageDramGb)).toEqual([8, 9.6, 12])
  })
})

describe('formatCapacity', () => {
  it('formats PC DRAM GB values into PB and EB', () => {
    expect(formatCapacity(2_400_000_000)).toBe('2.40 EB')
    expect(formatCapacity(2_400_000)).toBe('2.40 PB')
  })
})
