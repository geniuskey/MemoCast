import advancedForecastPresetData from '../data/advanced-forecast-presets.json'

export type AdvancedForecastFamily = 'DRAM' | 'NAND' | 'HBM' | 'DRAM+NAND'
export type AdvancedForecastConfidence = 'low' | 'medium' | 'high'
export type ForecastConstraint = 'supply-realization' | 'price-inventory-cycle' | 'adoption-transition' | 'content-growth' | 'balanced'

export interface AdoptionCurveInput {
  startPercent: number
  saturationPercent: number
  midpointYear: number
  steepness: number
  contentUpliftPercentAtSaturation: number
}

export interface CycleAdjustmentInput {
  channelInventoryWeeks: number
  normalInventoryWeeks: number
  inventorySensitivity: number
  orderAmplificationScore: number
  bullwhipSensitivity: number
  priceChangePercent: number
  priceElasticity: number
}

export interface SupplyRealizationInput {
  startingAvailableEb: number
  supplyGrowthCagrPercent: number
  yieldFactor: number
  allocationFactor: number
}

export interface ForecastEvidenceInput {
  sourceRefs: string[]
  signalCoverageScore: number
  confidence: AdvancedForecastConfidence
}

export interface AdvancedDemandForecastInput {
  id: string
  label: string
  domain: string
  family: AdvancedForecastFamily
  baseYear: number
  horizonYears: number
  baseDemandEb: number
  unitGrowthCagrPercent: number
  contentGrowthCagrPercent: number
  adoption: AdoptionCurveInput
  cycle: CycleAdjustmentInput
  supply: SupplyRealizationInput
  evidence: ForecastEvidenceInput
}

export interface ForecastDriverBreakdown {
  unitIndex: number
  contentIndex: number
  adoptionIndex: number
  supplyAvailableEb: number
}

export interface AdvancedDemandForecastRow {
  year: number
  step: number
  adoptionSharePercent: number
  unconstrainedDemandEb: number
  cycleAdjustmentFactor: number
  cycleAdjustedDemandEb: number
  realizationFactor: number
  effectiveDemandEb: number
  unmetDemandEb: number
  driverBreakdown: ForecastDriverBreakdown
}

export interface AdvancedDemandForecastResult {
  input: AdvancedDemandForecastInput
  rows: AdvancedDemandForecastRow[]
  peakEffectiveDemandEb: number
  cumulativeEffectiveDemandEb: number
  cumulativeUnmetDemandEb: number
  dominantConstraint: ForecastConstraint
  confidenceScore: number
}

export interface AdvancedForecastPreset {
  id: string
  label: string
  description: string
  input: AdvancedDemandForecastInput
  sourceRefs: string[]
  confidence: AdvancedForecastConfidence
}

interface RawAdvancedForecastPreset {
  id: string
  label: string
  description: string
  input: AdvancedDemandForecastInput
}

const presets = advancedForecastPresetData as RawAdvancedForecastPreset[]

const round = (value: number, digits = 4): number => {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

const finiteOrZero = (value: number): number => (Number.isFinite(value) ? value : 0)
const nonNegative = (value: number): number => Math.max(0, finiteOrZero(value))
const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, finiteOrZero(value)))

function cloneInput(input: AdvancedDemandForecastInput): AdvancedDemandForecastInput {
  return {
    ...input,
    adoption: { ...input.adoption },
    cycle: { ...input.cycle },
    supply: { ...input.supply },
    evidence: {
      ...input.evidence,
      sourceRefs: [...input.evidence.sourceRefs]
    }
  }
}

function adoptionShareForYear(adoption: AdoptionCurveInput, year: number): number {
  const start = clamp(adoption.startPercent, 0, 100)
  const saturation = clamp(Math.max(adoption.saturationPercent, start), 0, 100)
  const steepness = Math.max(0.01, finiteOrZero(adoption.steepness))
  const logistic = 1 / (1 + Math.exp(-steepness * (year - adoption.midpointYear)))
  const midpointStart = 1 / (1 + Math.exp(-steepness * (0 - adoption.midpointYear)))
  const normalized = clamp((logistic - midpointStart) / Math.max(0.0001, 1 - midpointStart), 0, 1)

  return round(start + (saturation - start) * normalized, 2)
}

function calculateCycleAdjustment(cycle: CycleAdjustmentInput): number {
  const inventoryGapWeeks = finiteOrZero(cycle.channelInventoryWeeks) - finiteOrZero(cycle.normalInventoryWeeks)
  const inventoryEffect = inventoryGapWeeks * finiteOrZero(cycle.inventorySensitivity)
  const bullwhipEffect = clamp(cycle.orderAmplificationScore, 0, 100) * finiteOrZero(cycle.bullwhipSensitivity)
  const priceEffect = finiteOrZero(cycle.priceChangePercent) * finiteOrZero(cycle.priceElasticity) / 100

  return round(clamp(1 + inventoryEffect + bullwhipEffect + priceEffect, 0.55, 1.45), 4)
}

function supplyAvailableForStep(supply: SupplyRealizationInput, step: number): number {
  const growth = 1 + finiteOrZero(supply.supplyGrowthCagrPercent) / 100
  const available = nonNegative(supply.startingAvailableEb) * growth ** step
  return round(available * clamp(supply.yieldFactor, 0, 1.2) * clamp(supply.allocationFactor, 0, 1.2), 4)
}

function classifyDominantConstraint(rows: AdvancedDemandForecastRow[], input: AdvancedDemandForecastInput): ForecastConstraint {
  const totalUnmet = rows.reduce((sum, row) => sum + row.unmetDemandEb, 0)
  const totalCycleDrag = rows.reduce((sum, row) => sum + Math.max(0, 1 - row.cycleAdjustmentFactor), 0)
  const adoptionDelta = rows.length > 1 ? rows[rows.length - 1].adoptionSharePercent - rows[0].adoptionSharePercent : 0
  const contentGrowth = finiteOrZero(input.contentGrowthCagrPercent)

  if (totalUnmet > rows.length * 0.01) return 'supply-realization'
  if (totalCycleDrag > rows.length * 0.05) return 'price-inventory-cycle'
  if (adoptionDelta > 20) return 'adoption-transition'
  if (contentGrowth > Math.abs(input.unitGrowthCagrPercent)) return 'content-growth'
  return 'balanced'
}

function confidenceScore(input: AdvancedDemandForecastInput): number {
  const base = input.evidence.confidence === 'high' ? 90 : input.evidence.confidence === 'medium' ? 72 : 50
  const coverage = clamp(input.evidence.signalCoverageScore, 0, 100)
  const sourceDepth = clamp(input.evidence.sourceRefs.length / 5 * 100, 0, 100)
  return round(base * 0.45 + coverage * 0.4 + sourceDepth * 0.15, 1)
}

export function buildAdvancedDemandForecast(rawInput: AdvancedDemandForecastInput): AdvancedDemandForecastResult {
  const input = cloneInput(rawInput)
  const horizonYears = Math.max(1, Math.floor(nonNegative(input.horizonYears)))
  const rows: AdvancedDemandForecastRow[] = []

  for (let step = 0; step < horizonYears; step += 1) {
    const year = input.baseYear + step
    const unitIndex = round((1 + finiteOrZero(input.unitGrowthCagrPercent) / 100) ** step, 4)
    const contentIndex = round((1 + finiteOrZero(input.contentGrowthCagrPercent) / 100) ** step, 4)
    const adoptionSharePercent = adoptionShareForYear(input.adoption, year)
    const adoptionIndex = round(1 + (adoptionSharePercent / 100) * (finiteOrZero(input.adoption.contentUpliftPercentAtSaturation) / 100), 4)
    const unconstrainedDemandEb = round(nonNegative(input.baseDemandEb) * unitIndex * contentIndex * adoptionIndex, 4)
    const cycleAdjustmentFactor = calculateCycleAdjustment(input.cycle)
    const cycleAdjustedDemandEb = round(unconstrainedDemandEb * cycleAdjustmentFactor, 4)
    const supplyAvailableEb = supplyAvailableForStep(input.supply, step)
    const realizationFactor = cycleAdjustedDemandEb <= 0 ? 1 : round(clamp(supplyAvailableEb / cycleAdjustedDemandEb, 0, 1), 4)
    const effectiveDemandEb = round(cycleAdjustedDemandEb * realizationFactor, 4)
    const unmetDemandEb = round(Math.max(0, cycleAdjustedDemandEb - effectiveDemandEb), 4)

    rows.push({
      year,
      step,
      adoptionSharePercent,
      unconstrainedDemandEb,
      cycleAdjustmentFactor,
      cycleAdjustedDemandEb,
      realizationFactor,
      effectiveDemandEb,
      unmetDemandEb,
      driverBreakdown: {
        unitIndex,
        contentIndex,
        adoptionIndex,
        supplyAvailableEb
      }
    })
  }

  return {
    input,
    rows,
    peakEffectiveDemandEb: round(Math.max(...rows.map((row) => row.effectiveDemandEb)), 4),
    cumulativeEffectiveDemandEb: round(rows.reduce((sum, row) => sum + row.effectiveDemandEb, 0), 4),
    cumulativeUnmetDemandEb: round(rows.reduce((sum, row) => sum + row.unmetDemandEb, 0), 4),
    dominantConstraint: classifyDominantConstraint(rows, input),
    confidenceScore: confidenceScore(input)
  }
}

export function listAdvancedForecastPresets(): AdvancedForecastPreset[] {
  return presets.map((preset) => ({
    ...preset,
    input: cloneInput(preset.input),
    sourceRefs: [...preset.input.evidence.sourceRefs],
    confidence: preset.input.evidence.confidence
  }))
}

export function getAdvancedForecastPreset(id: string): AdvancedForecastPreset {
  const preset = presets.find((item) => item.id === id)
  if (!preset) throw new Error(`Unknown advanced demand forecast preset: ${id}`)

  return {
    ...preset,
    input: cloneInput(preset.input),
    sourceRefs: [...preset.input.evidence.sourceRefs],
    confidence: preset.input.evidence.confidence
  }
}

export function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
}

export function formatEb(value: number, digits = Math.abs(value) < 1 ? 4 : 2): string {
  return `${formatNumber(value, digits)} EB`
}
