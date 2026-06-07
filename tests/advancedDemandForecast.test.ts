import { describe, expect, it } from 'vitest'
import {
  buildAdvancedDemandForecast,
  buildCsvDerivedAdvancedForecastPresets,
  buildInstitutionWeightedEnsemble,
  buildForecastEnvelope,
  buildHierarchicalForecastRows,
  buildSiaNowcastTimeSeries,
  calculateHbmBomStress,
  buildSourceCalibratedForecastContext,
  buildStressScenarioTable,
  calculateNowcastAdjustment,
  calculateSourceCalibratedNowcast,
  getAdvancedForecastPreset,
  getAdvancedForecastSourceSignals,
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



  it('builds stress scenarios and an uncertainty envelope around a base forecast', () => {
    const preset = getAdvancedForecastPreset('nand-ai-storage-qlc-breakout-reference')
    const stressTable = buildStressScenarioTable(preset.input)
    const envelope = buildForecastEnvelope(preset.input)

    expect(stressTable.map((scenario) => scenario.id)).toContain('supply-squeeze')
    expect(stressTable.find((scenario) => scenario.id === 'supply-squeeze')!.cumulativeUnmetDemandEb).toBeGreaterThan(0)
    expect(envelope).toHaveLength(preset.input.horizonYears)
    expect(envelope[0].lowEffectiveDemandEb).toBeLessThanOrEqual(envelope[0].baseEffectiveDemandEb)
    expect(envelope[0].highEffectiveDemandEb).toBeGreaterThanOrEqual(envelope[0].baseEffectiveDemandEb)
  })

  it('reconciles preset outputs into a hierarchy by year and memory family', () => {
    const rows = buildHierarchicalForecastRows()
    const first = rows[0]

    expect(rows.length).toBeGreaterThan(0)
    expect(first.year).toBe(2026)
    expect(first.totalEffectiveDemandEb).toBeGreaterThan(0)
    expect(first.byFamily.HBM).toBeGreaterThan(0)
    expect(first.byFamily.NAND).toBeGreaterThan(0)
  })

  it('converts weighted nowcast signals into a bounded base-demand adjustment', () => {
    const preset = getAdvancedForecastPreset('pc-dram-shortage-elasticity-reference')
    const result = calculateNowcastAdjustment(preset.input, [
      { name: 'spot price momentum', weight: 0.45, zScore: 1.2, direction: 'negative' },
      { name: 'ODM shipment revision', weight: 0.35, zScore: 0.8, direction: 'positive' },
      { name: 'inventory digestion', weight: 0.2, zScore: 0.6, direction: 'negative' }
    ])

    expect(result.adjustmentFactor).toBeGreaterThanOrEqual(0.75)
    expect(result.adjustmentFactor).toBeLessThanOrEqual(1.35)
    expect(result.adjustedBaseDemandEb).toBeCloseTo(preset.input.baseDemandEb * result.adjustmentFactor, 6)
    expect(result.signals[0].name).toBe('spot price momentum')
  })

  it('loads raw CSV-derived source signals into institution bands and SIA nowcast overlays', () => {
    const sourceSignals = getAdvancedForecastSourceSignals()
    const context = buildSourceCalibratedForecastContext()
    const preset = getAdvancedForecastPreset('hbm-ai-infrastructure-constraint-reference')
    const nowcast = calculateSourceCalibratedNowcast(preset.input)

    expect(sourceSignals.generatedFromRaw).toContain('raw/datasets/institutional-memory-forecast-comparison-2026.csv')
    expect(sourceSignals.generatedFromRaw).toContain('raw/datasets/sia-global-semiconductor-sales-monthly-2026.csv')
    expect(sourceSignals.summary.signalCount).toBeGreaterThan(20)
    expect(context.revenueBandUsdB.low).toBeCloseTo(294.82, 2)
    expect(context.revenueBandUsdB.high).toBeCloseTo(633.3, 1)
    expect(context.nowcastSignals.map((signal) => signal.name)).toContain('SIA high-frequency sales YoY')
    expect(nowcast.adjustmentFactor).toBeGreaterThan(1)
    expect(nowcast.adjustedBaseDemandEb).toBeCloseTo(preset.input.baseDemandEb * nowcast.adjustmentFactor, 6)
  })

  it('derives transparent preset candidates from raw CSV institution bands and SIA momentum', () => {
    const derived = buildCsvDerivedAdvancedForecastPresets()

    expect(derived.map((preset) => preset.id)).toContain('csv-derived-conservative-memory-revenue-band')
    expect(derived.map((preset) => preset.id)).toContain('csv-derived-upside-memory-revenue-band')
    expect(derived.every((preset) => preset.input.evidence.sourceRefs.includes('raw/datasets/institutional-memory-forecast-comparison-2026.md'))).toBe(true)
    expect(derived.every((preset) => preset.input.evidence.sourceRefs.includes('raw/datasets/sia-global-semiconductor-sales-monthly-2026.md'))).toBe(true)

    const conservative = derived.find((preset) => preset.id === 'csv-derived-conservative-memory-revenue-band')!
    const upside = derived.find((preset) => preset.id === 'csv-derived-upside-memory-revenue-band')!
    expect(conservative.input.baseDemandEb).toBeLessThan(upside.input.baseDemandEb)
    expect(conservative.input.unitGrowthCagrPercent).toBeLessThan(upside.input.unitGrowthCagrPercent)
    expect(upside.description).toContain('raw CSV')
  })

  it('builds a SIA time-series chart model with indexed monthly and quarterly signals', () => {
    const rows = buildSiaNowcastTimeSeries()

    expect(rows.map((row) => row.period)).toEqual(['2025-FY', '2026-02', '2026-03', '2026-04', '2026Q1', '2026-FY'])
    expect(rows[0].salesIndex).toBe(100)
    expect(rows.find((row) => row.period === '2026-04')!.salesIndex).toBeGreaterThan(rows.find((row) => row.period === '2026-03')!.salesIndex)
    expect(rows.find((row) => row.period === '2026-04')!.barWidthPercent).toBeGreaterThan(0)
    expect(rows.every((row) => row.rawPath === 'raw/datasets/sia-global-semiconductor-sales-monthly-2026.csv')).toBe(true)
  })

  it('builds a user-adjustable institution-weighted ensemble from raw CSV revenue rows', () => {
    const balanced = buildInstitutionWeightedEnsemble()
    const upsideWeighted = buildInstitutionWeightedEnsemble([
      { institution: 'wsts', weight: 0.2 },
      { institution: 'trendforce', weight: 1 },
      { institution: 'idc', weight: 1 },
      { institution: 'gartner', weight: 4 }
    ])

    expect(balanced.weightedRevenueUsdB).toBeGreaterThan(294)
    expect(balanced.weightedRevenueUsdB).toBeLessThan(634)
    expect(upsideWeighted.weightedRevenueUsdB).toBeGreaterThan(balanced.weightedRevenueUsdB)
    expect(upsideWeighted.demandMultiplier).toBeGreaterThan(balanced.demandMultiplier)
    expect(upsideWeighted.forecast.peakEffectiveDemandEb).toBeGreaterThan(0)
    expect(upsideWeighted.sourceRefs).toContain('raw/datasets/institutional-memory-forecast-comparison-2026.md')
  })

  it('turns HBM price and BOM share controls into an affordability stress scenario', () => {
    const preset = getAdvancedForecastPreset('hbm-ai-infrastructure-constraint-reference')
    const stress = calculateHbmBomStress(preset.input, {
      hbmPriceDeclinePercent: 30,
      targetBomSharePercent: 42,
      demandElasticity: 0.22,
      supplyReliefPassThrough: 0.4
    })

    expect(stress.referenceBomSharePercent).toBeGreaterThanOrEqual(35)
    expect(stress.adjustedHbmCostUsd).toBeLessThan(3200)
    expect(stress.affordabilityDemandShockPercent).toBeGreaterThan(0)
    expect(stress.supplyReliefShockPercent).toBeGreaterThan(0)
    expect(stress.result.id).toBe('interactive-hbm-bom-affordability')
    expect(stress.sourceRefs).toContain('raw/datasets/ai-accelerator-bom-hbm-cost-share.md')
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
