import supplyConstraintPresetData from '../data/supply-constraint-presets.json'

export type SupplyConstraintRegime = 'expansion' | 'lagged-expansion' | 'constrained' | 'severely-constrained'

export interface SupplyConstraintInput {
  waferCapacityGrowthPct: number
  hbmWaferSharePct: number
  hbmWaferMultiple: number
  packagingOrderGrowthPct: number
  packagingRevenueGrowthPct: number
  testerLeadTimeMonths: number
  memoryTestGrowthPct: number
  processControlGrowthPct: number
  materialRiskScore: number
  exportControlRiskScore: number
}

export interface SupplyConstraintComponentScores {
  waferCannibalization: number
  capacityLag: number
  packagingBottleneck: number
  testBottleneck: number
  processControlBottleneck: number
  regionalMaterialRisk: number
}

export interface SupplyConstraintResult {
  constraintScore: number
  regime: SupplyConstraintRegime
  realizationFactor: number
  componentScores: SupplyConstraintComponentScores
  weightedContributions: SupplyConstraintComponentScores
  effectiveConventionalWaferSharePct: number
  interpretation: string
}

export interface SupplyConstraintPreset {
  id: 'hbm4-packaging-test-gated-reference' | '300mm-memory-capex-expansion-reference' | 'regional-material-export-risk-reference'
  label: string
  description: string
  input: SupplyConstraintInput
  confidence: 'low' | 'medium' | 'high'
  sourceRefs: string[]
  sources: string[]
}

type SourceBackedSupplyConstraintPreset = Omit<SupplyConstraintPreset, 'sources'>

const supplyConstraintPresets = supplyConstraintPresetData as SourceBackedSupplyConstraintPreset[]

const weights: Record<keyof SupplyConstraintComponentScores, number> = {
  waferCannibalization: 0.25,
  capacityLag: 0.15,
  packagingBottleneck: 0.2,
  testBottleneck: 0.2,
  processControlBottleneck: 0.1,
  regionalMaterialRisk: 0.1
}

const round = (value: number, digits = 2): number => {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export const clamp = (value: number, min = 0, max = 100): number => {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, value))
}

const nonNegative = (value: number): number => Math.max(0, Number.isFinite(value) ? value : 0)

export function classifySupplyConstraint(score: number): SupplyConstraintRegime {
  if (score >= 75) return 'severely-constrained'
  if (score >= 55) return 'constrained'
  if (score >= 35) return 'lagged-expansion'
  return 'expansion'
}

export function calculateEffectiveConventionalWaferShare(input: SupplyConstraintInput): number {
  const hbmShare = clamp(input.hbmWaferSharePct)
  const hbmMultiple = Math.max(1, nonNegative(input.hbmWaferMultiple))
  const equivalentHbmWaferLoad = clamp(hbmShare * hbmMultiple)
  return round(clamp(100 - equivalentHbmWaferLoad))
}

export function calculateSupplyConstraint(input: SupplyConstraintInput): SupplyConstraintResult {
  const waferCapacityGrowthPct = nonNegative(input.waferCapacityGrowthPct)
  const effectiveConventionalWaferSharePct = calculateEffectiveConventionalWaferShare(input)

  const waferCannibalization = clamp((100 - effectiveConventionalWaferSharePct) / 0.8)
  const capacityLag = clamp(((8 - waferCapacityGrowthPct) / 8) * 100)
  const packagingBottleneck = clamp((nonNegative(input.packagingOrderGrowthPct) + nonNegative(input.packagingRevenueGrowthPct)) / 2)
  const testBottleneck = clamp(nonNegative(input.testerLeadTimeMonths) * 10 + nonNegative(input.memoryTestGrowthPct) / 3)
  const processControlBottleneck = clamp(nonNegative(input.processControlGrowthPct))
  const regionalMaterialRisk = clamp((clamp(input.materialRiskScore) + clamp(input.exportControlRiskScore)) / 2)

  const componentScores: SupplyConstraintComponentScores = {
    waferCannibalization: round(waferCannibalization),
    capacityLag: round(capacityLag),
    packagingBottleneck: round(packagingBottleneck),
    testBottleneck: round(testBottleneck),
    processControlBottleneck: round(processControlBottleneck),
    regionalMaterialRisk: round(regionalMaterialRisk)
  }

  const weightedContributions = Object.fromEntries(
    Object.entries(componentScores).map(([key, value]) => [key, round(value * weights[key as keyof SupplyConstraintComponentScores])])
  ) as SupplyConstraintComponentScores

  const constraintScore = round(Object.values(weightedContributions).reduce((sum, value) => sum + value, 0))
  const regime = classifySupplyConstraint(constraintScore)
  const realizationFactor = round(clamp(1 - constraintScore / 130, 0.15, 1), 3)

  return {
    constraintScore,
    regime,
    realizationFactor,
    componentScores,
    weightedContributions,
    effectiveConventionalWaferSharePct,
    interpretation: buildSupplyConstraintInterpretation(regime, realizationFactor)
  }
}

export function buildSupplyConstraintInterpretation(regime: SupplyConstraintRegime, realizationFactor: number): string {
  if (regime === 'severely-constrained') {
    return `headline capex가 늘어도 wafer·packaging·test gate가 동시에 물량화를 제한한다. 수요 모델에는 realization factor ${realizationFactor}를 먼저 적용한다.`
  }

  if (regime === 'constrained') {
    return `일부 공급축이 병목이다. HBM/고단 NAND처럼 후공정 의존도가 높은 제품은 realization factor ${realizationFactor}로 보수화한다.`
  }

  if (regime === 'lagged-expansion') {
    return `장비 투자는 증가하지만 12~24개월 공급 전환 lag가 남아 있다. 단기 수요 모델에는 완전한 bit 공급으로 즉시 반영하지 않는다.`
  }

  return 'headline capex와 장비 투자가 공급 확장으로 비교적 원활히 전환되는 expansion 상태다.'
}

export function listSupplyConstraintPresets(): SupplyConstraintPreset[] {
  return supplyConstraintPresets.map((preset) => ({
    ...preset,
    input: { ...preset.input },
    sourceRefs: [...preset.sourceRefs],
    sources: [...preset.sourceRefs]
  }))
}

export function getSupplyConstraintPreset(id: SupplyConstraintPreset['id']): SupplyConstraintPreset {
  const preset = supplyConstraintPresets.find((item) => item.id === id)

  if (!preset) {
    throw new Error(`Unknown supply constraint preset: ${id}`)
  }

  return {
    ...preset,
    input: { ...preset.input },
    sourceRefs: [...preset.sourceRefs],
    sources: [...preset.sourceRefs]
  }
}
