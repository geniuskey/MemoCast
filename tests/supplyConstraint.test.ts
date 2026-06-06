import { describe, expect, it } from 'vitest'
import {
  calculateEffectiveConventionalWaferShare,
  calculateSupplyConstraint,
  getSupplyConstraintPreset,
  listSupplyConstraintPresets
} from '../wiki/lib/supplyConstraint'

describe('memory supply constraint model', () => {
  it('classifies HBM4 packaging/test gate as a severely constrained supply regime', () => {
    const preset = getSupplyConstraintPreset('hbm4-packaging-test-gated-reference')
    const result = calculateSupplyConstraint(preset.input)

    expect(result.regime).toBe('severely-constrained')
    expect(result.constraintScore).toBeGreaterThanOrEqual(75)
    expect(result.realizationFactor).toBeLessThan(0.45)
    expect(result.componentScores.packagingBottleneck).toBeGreaterThan(90)
    expect(result.componentScores.testBottleneck).toBeGreaterThan(90)
  })

  it('keeps 300mm capex expansion in lagged-expansion rather than treating capex as instant bit supply', () => {
    const preset = getSupplyConstraintPreset('300mm-memory-capex-expansion-reference')
    const result = calculateSupplyConstraint(preset.input)

    expect(result.regime).toBe('lagged-expansion')
    expect(result.constraintScore).toBeGreaterThanOrEqual(35)
    expect(result.constraintScore).toBeLessThan(55)
  })

  it('captures regional/material concentration as a constrained supply ceiling', () => {
    const preset = getSupplyConstraintPreset('regional-material-export-risk-reference')
    const result = calculateSupplyConstraint(preset.input)

    expect(result.regime).toBe('lagged-expansion')
    expect(result.componentScores.regionalMaterialRisk).toBeGreaterThan(70)
    expect(result.weightedContributions.regionalMaterialRisk).toBeGreaterThan(7)
  })

  it('converts HBM wafer share and wafer multiple into effective conventional wafer share', () => {
    expect(calculateEffectiveConventionalWaferShare({
      waferCapacityGrowthPct: 5,
      hbmWaferSharePct: 20,
      hbmWaferMultiple: 3,
      packagingOrderGrowthPct: 0,
      packagingRevenueGrowthPct: 0,
      testerLeadTimeMonths: 0,
      memoryTestGrowthPct: 0,
      processControlGrowthPct: 0,
      materialRiskScore: 0,
      exportControlRiskScore: 0
    })).toBe(40)
  })

  it('returns defensive copies of source-backed presets', () => {
    const [firstPreset] = listSupplyConstraintPresets()
    firstPreset.input.hbmWaferSharePct = 999
    firstPreset.sourceRefs.push('raw/fake.md')

    const freshPreset = getSupplyConstraintPreset(firstPreset.id)
    expect(freshPreset.input.hbmWaferSharePct).not.toBe(999)
    expect(freshPreset.sourceRefs).not.toContain('raw/fake.md')
  })

  it('clamps invalid or extreme values before scoring', () => {
    const result = calculateSupplyConstraint({
      waferCapacityGrowthPct: Number.NaN,
      hbmWaferSharePct: 999,
      hbmWaferMultiple: 999,
      packagingOrderGrowthPct: 999,
      packagingRevenueGrowthPct: 999,
      testerLeadTimeMonths: 999,
      memoryTestGrowthPct: 999,
      processControlGrowthPct: 999,
      materialRiskScore: 999,
      exportControlRiskScore: -999
    })

    expect(result.componentScores.waferCannibalization).toBe(100)
    expect(result.componentScores.capacityLag).toBe(100)
    expect(result.componentScores.packagingBottleneck).toBe(100)
    expect(result.componentScores.testBottleneck).toBe(100)
    expect(result.componentScores.processControlBottleneck).toBe(100)
    expect(result.componentScores.regionalMaterialRisk).toBe(50)
    expect(result.realizationFactor).toBeGreaterThanOrEqual(0.15)
  })
})
