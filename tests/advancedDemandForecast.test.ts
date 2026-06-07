import { describe, expect, it } from 'vitest'
import {
  buildAdvancedDemandForecast,
  getAdvancedForecastPreset,
  listAdvancedForecastPresets,
  type AdvancedDemandForecastInput
} from '../wiki/lib/advancedDemandForecast'

describe('advanced demand forecast engine', () => {
  it('compounds unit, content, and S-curve adoption into an unconstrained multi-year demand path', () => {
    const preset = getAdvancedForecastPreset('hbm-ai-infrastructure-constraint-reference')
    const forecast = buildAdvancedDemandForecast(preset.input)

    expect(forecast.rows).toHaveLength(5)
    expect(forecast.rows[4].adoptionSharePercent).toBeGreaterThan(forecast.rows[0].adoptionSharePercent)
    expect(forecast.rows[4].unconstrainedDemandEb).toBeGreaterThan(forecast.rows[0].unconstrainedDemandEb)
    expect(forecast.rows[4].driverBreakdown.contentIndex).toBeGreaterThan(1)
    expect(forecast.rows[4].driverBreakdown.adoptionIndex).toBeGreaterThan(1)
  })

  it('separates unconstrained end demand from supply-realized demand and unmet demand', () => {
    const preset = getAdvancedForecastPreset('hbm-ai-infrastructure-constraint-reference')
    const forecast = buildAdvancedDemandForecast(preset.input)
    const constrainedYear = forecast.rows.find((row) => row.realizationFactor < 1)

    expect(constrainedYear).toBeDefined()
    expect(constrainedYear!.effectiveDemandEb).toBeLessThan(constrainedYear!.cycleAdjustedDemandEb)
    expect(constrainedYear!.unmetDemandEb).toBeGreaterThan(0)
    expect(forecast.dominantConstraint).toBe('supply-realization')
  })

  it('models price elasticity and inventory/bullwhip adjustment instead of treating orders as end demand', () => {
    const base: AdvancedDemandForecastInput = {
      id: 'elasticity-check',
      label: 'Elasticity check',
      domain: 'PC DRAM',
      family: 'DRAM',
      baseYear: 2026,
      horizonYears: 3,
      baseDemandEb: 0.004,
      unitGrowthCagrPercent: 2,
      contentGrowthCagrPercent: 8,
      adoption: { startPercent: 20, saturationPercent: 70, midpointYear: 2028, steepness: 1.1, contentUpliftPercentAtSaturation: 45 },
      cycle: { channelInventoryWeeks: 9, normalInventoryWeeks: 6, inventorySensitivity: -0.04, orderAmplificationScore: 12, bullwhipSensitivity: -0.003, priceChangePercent: 80, priceElasticity: -0.18 },
      supply: { startingAvailableEb: 0.01, supplyGrowthCagrPercent: 20, yieldFactor: 0.95, allocationFactor: 0.9 },
      evidence: { sourceRefs: ['raw/reports/idc-2026-memory-shortage-supply-growth.md'], signalCoverageScore: 70, confidence: 'medium' }
    }

    const forecast = buildAdvancedDemandForecast(base)

    expect(forecast.rows[0].cycleAdjustmentFactor).toBeLessThan(1)
    expect(forecast.rows[0].cycleAdjustedDemandEb).toBeLessThan(forecast.rows[0].unconstrainedDemandEb)
    expect(forecast.dominantConstraint).toBe('price-inventory-cycle')
  })

  it('returns defensive copies of presets and source references', () => {
    const first = getAdvancedForecastPreset('smartphone-on-device-ai-premiumization-reference')
    first.input.evidence.sourceRefs.push('mutated.md')
    first.input.baseDemandEb = 999

    const second = getAdvancedForecastPreset('smartphone-on-device-ai-premiumization-reference')
    expect(second.input.baseDemandEb).not.toBe(999)
    expect(second.input.evidence.sourceRefs).not.toContain('mutated.md')

    const listed = listAdvancedForecastPresets()
    listed[0].input.evidence.sourceRefs.push('mutated-again.md')
    expect(listAdvancedForecastPresets()[0].input.evidence.sourceRefs).not.toContain('mutated-again.md')
  })

  it('throws on unknown advanced forecast preset id', () => {
    expect(() => getAdvancedForecastPreset('missing-preset')).toThrow(/Unknown advanced demand forecast preset/)
  })
})
