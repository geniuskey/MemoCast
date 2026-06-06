import { describe, expect, it } from 'vitest'
import {
  calculateShortageSeverity,
  getShortageSeverityPreset,
  listShortageSeverityPresets
} from '../wiki/lib/shortageSeverity'

describe('channel shortage severity model', () => {
  it('classifies source-backed DRAM channel panic as severe shortage', () => {
    const preset = getShortageSeverityPreset('dram-channel-panic-2026-reference')
    const result = calculateShortageSeverity(preset.input)

    expect(result.regime).toBe('severe-shortage')
    expect(result.severityScore).toBeGreaterThanOrEqual(75)
    expect(result.componentScores.priceMomentum).toBeGreaterThan(90)
    expect(result.componentScores.inventoryTightness).toBe(80)
    expect(result.componentScores.leadTimeStress).toBeGreaterThan(80)
  })

  it('keeps NAND contract squeeze in a shortage regime without over-weighting gray-market DRAM signals', () => {
    const preset = getShortageSeverityPreset('nand-contract-squeeze-2026-reference')
    const result = calculateShortageSeverity(preset.input)

    expect(result.regime).toBe('shortage')
    expect(result.componentScores.grayMarketStress).toBeLessThan(result.componentScores.leadTimeStress)
    expect(result.weightedContributions.priceMomentum).toBeGreaterThan(20)
  })

  it('keeps normal inventory comparator below shortage thresholds', () => {
    const preset = getShortageSeverityPreset('normal-inventory-reference')
    const result = calculateShortageSeverity(preset.input)

    expect(result.regime).toBe('normal')
    expect(result.severityScore).toBeLessThan(35)
  })

  it('returns defensive copies of source-backed presets', () => {
    const [firstPreset] = listShortageSeverityPresets()
    firstPreset.input.inventoryWeeks = 999
    firstPreset.sourceRefs.push('raw/fake.md')

    const freshPreset = getShortageSeverityPreset(firstPreset.id)
    expect(freshPreset.input.inventoryWeeks).not.toBe(999)
    expect(freshPreset.sourceRefs).not.toContain('raw/fake.md')
  })

  it('clamps invalid or extreme values before scoring', () => {
    const result = calculateShortageSeverity({
      spotPriceIncreasePct: Number.NaN,
      contractPriceQoqPct: 999,
      nandContractPriceQoqPct: 999,
      inventoryWeeks: -10,
      leadTimeWeeks: 999,
      allocationScore: 999,
      grayMarketScore: -100,
      passThroughLagMonths: 99
    })

    expect(result.componentScores.priceMomentum).toBe(100)
    expect(result.componentScores.inventoryTightness).toBe(100)
    expect(result.componentScores.leadTimeStress).toBe(100)
    expect(result.componentScores.allocationStress).toBe(100)
    expect(result.componentScores.grayMarketStress).toBe(0)
    expect(result.passThroughWindowMonths).toBe(12)
  })
})
