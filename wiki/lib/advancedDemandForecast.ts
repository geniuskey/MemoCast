import advancedForecastPresetData from '../data/advanced-forecast-presets.json'
import advancedForecastSourceSignalsData from '../data/advanced-forecast-source-signals.json'

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


export interface ForecastStressScenarioInput {
  id: string
  label: string
  demandShockPercent: number
  supplyShockPercent: number
  priceShockPercent: number
}

export interface ForecastStressScenarioResult {
  id: string
  label: string
  demandShockPercent: number
  supplyShockPercent: number
  priceShockPercent: number
  peakEffectiveDemandEb: number
  cumulativeEffectiveDemandEb: number
  cumulativeUnmetDemandEb: number
  dominantConstraint: ForecastConstraint
}

export interface ForecastEnvelopeRow {
  year: number
  lowEffectiveDemandEb: number
  baseEffectiveDemandEb: number
  highEffectiveDemandEb: number
  lowUnmetDemandEb: number
  highUnmetDemandEb: number
}

export interface HierarchicalForecastRow {
  year: number
  totalEffectiveDemandEb: number
  totalUnmetDemandEb: number
  byFamily: Record<AdvancedForecastFamily, number>
}

export interface NowcastSignalInput {
  name: string
  weight: number
  zScore: number
  direction: 'positive' | 'negative'
}

export interface NowcastAdjustmentResult {
  adjustmentFactor: number
  adjustedBaseDemandEb: number
  signals: NowcastSignalInput[]
}

export interface SourceSignalRef {
  rawPath: string
  sourceNote: string
  confidence: AdvancedForecastConfidence
}

export interface InstitutionalForecastSignal extends SourceSignalRef {
  institution: string
  metric: string
  value: string
  numericValue: number | null
  unit: string
  note: string
}

export interface MonthlyNowcastSignal extends SourceSignalRef {
  period: string
  salesUsdB: number | null
  momPct: number | null
  yoyPct: number | null
  note: string
}

export interface HbmPriceSignal extends SourceSignalRef {
  generation: string
  capacityGbPerStack: number | null
  pricePerStackUsd: number | null
  pricePerGbUsd: string
  note: string
}

export interface AcceleratorBomSignal extends SourceSignalRef {
  accelerator: string
  totalMfgCostUsd: string
  hbmCostUsd: string
  hbmSharePct: string
  hbmGb: string
  hbmPricePerGbUsd: string
  note: string
}

export interface AdvancedForecastSourceSignals {
  generatedFromRaw: string[]
  institutionalForecasts: InstitutionalForecastSignal[]
  nowcastMonthlySales: MonthlyNowcastSignal[]
  hbmPriceLadder: HbmPriceSignal[]
  acceleratorBomHbmCostShare: AcceleratorBomSignal[]
  summary: {
    institutionalUsdBMin: number
    institutionalUsdBMax: number
    institutionalUsdBMid: number
    latestHighConfidenceSiaYoyPct: number
    averageHighFrequencyMomPct: number
    signalCount: number
  }
}

export interface SourceCalibratedForecastContext {
  revenueBandUsdB: { low: number; mid: number; high: number }
  nowcastSignals: NowcastSignalInput[]
  hbmCostPressureSignals: HbmPriceSignal[]
  sourceRefs: string[]
}

export interface SiaNowcastTimeSeriesRow extends SourceSignalRef {
  period: string
  salesUsdB: number
  momPct: number | null
  yoyPct: number | null
  salesIndex: number
  barWidthPercent: number
  signalLabel: string
}

export interface InstitutionWeightInput {
  institution: string
  weight: number
}

export interface InstitutionEnsembleResult {
  weights: InstitutionWeightInput[]
  weightedRevenueUsdB: number
  revenueBandPosition: number
  demandMultiplier: number
  confidenceScore: number
  sourceRefs: string[]
  preset: AdvancedForecastPreset
  forecast: AdvancedDemandForecastResult
}

export interface HbmBomStressControlInput {
  hbmPriceDeclinePercent: number
  targetBomSharePercent: number
  demandElasticity: number
  supplyReliefPassThrough: number
}

export interface HbmBomStressResult {
  control: HbmBomStressControlInput
  referenceBomSharePercent: number
  affordabilityDemandShockPercent: number
  supplyReliefShockPercent: number
  adjustedHbmCostUsd: number
  adjustedBomSharePercent: number
  stressScenario: ForecastStressScenarioInput
  result: ForecastStressScenarioResult
  sourceRefs: string[]
}

interface RawAdvancedForecastPreset {
  id: string
  label: string
  description: string
  input: AdvancedDemandForecastInput
}

const presets = advancedForecastPresetData as RawAdvancedForecastPreset[]
const sourceSignals = advancedForecastSourceSignalsData as AdvancedForecastSourceSignals

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


function inputWithStress(input: AdvancedDemandForecastInput, stress: ForecastStressScenarioInput): AdvancedDemandForecastInput {
  const stressed = cloneInput(input)
  stressed.id = `${input.id}__${stress.id}`
  stressed.label = `${input.label} — ${stress.label}`
  stressed.baseDemandEb = round(nonNegative(input.baseDemandEb) * (1 + finiteOrZero(stress.demandShockPercent) / 100), 6)
  stressed.supply.startingAvailableEb = round(nonNegative(input.supply.startingAvailableEb) * (1 + finiteOrZero(stress.supplyShockPercent) / 100), 6)
  stressed.cycle.priceChangePercent = finiteOrZero(input.cycle.priceChangePercent) + finiteOrZero(stress.priceShockPercent)
  stressed.evidence.signalCoverageScore = clamp(input.evidence.signalCoverageScore - Math.abs(stress.demandShockPercent) * 0.15 - Math.abs(stress.supplyShockPercent) * 0.15, 0, 100)
  return stressed
}

export const defaultStressScenarios: ForecastStressScenarioInput[] = [
  { id: 'downside-demand-price-shock', label: 'Downside demand + price shock', demandShockPercent: -12, supplyShockPercent: -5, priceShockPercent: 30 },
  { id: 'base-reference', label: 'Base reference', demandShockPercent: 0, supplyShockPercent: 0, priceShockPercent: 0 },
  { id: 'upside-adoption', label: 'Upside adoption pull-forward', demandShockPercent: 16, supplyShockPercent: 0, priceShockPercent: 8 },
  { id: 'supply-squeeze', label: 'Supply squeeze / allocation cap', demandShockPercent: 6, supplyShockPercent: -18, priceShockPercent: 22 }
]

export function buildStressScenarioTable(rawInput: AdvancedDemandForecastInput, scenarios = defaultStressScenarios): ForecastStressScenarioResult[] {
  return scenarios.map((scenario) => {
    const forecast = buildAdvancedDemandForecast(inputWithStress(rawInput, scenario))
    return {
      id: scenario.id,
      label: scenario.label,
      demandShockPercent: scenario.demandShockPercent,
      supplyShockPercent: scenario.supplyShockPercent,
      priceShockPercent: scenario.priceShockPercent,
      peakEffectiveDemandEb: forecast.peakEffectiveDemandEb,
      cumulativeEffectiveDemandEb: forecast.cumulativeEffectiveDemandEb,
      cumulativeUnmetDemandEb: forecast.cumulativeUnmetDemandEb,
      dominantConstraint: forecast.dominantConstraint
    }
  })
}

export function buildForecastEnvelope(rawInput: AdvancedDemandForecastInput, scenarios = defaultStressScenarios): ForecastEnvelopeRow[] {
  const forecasts = scenarios.map((scenario) => buildAdvancedDemandForecast(inputWithStress(rawInput, scenario)))
  const base = buildAdvancedDemandForecast(rawInput)

  return base.rows.map((baseRow, rowIndex) => {
    const effectiveValues = forecasts.map((forecast) => forecast.rows[rowIndex]?.effectiveDemandEb ?? baseRow.effectiveDemandEb)
    const unmetValues = forecasts.map((forecast) => forecast.rows[rowIndex]?.unmetDemandEb ?? baseRow.unmetDemandEb)
    return {
      year: baseRow.year,
      lowEffectiveDemandEb: round(Math.min(...effectiveValues), 4),
      baseEffectiveDemandEb: baseRow.effectiveDemandEb,
      highEffectiveDemandEb: round(Math.max(...effectiveValues), 4),
      lowUnmetDemandEb: round(Math.min(...unmetValues), 4),
      highUnmetDemandEb: round(Math.max(...unmetValues), 4)
    }
  })
}

export function buildHierarchicalForecastRows(presetIds = presets.map((preset) => preset.id)): HierarchicalForecastRow[] {
  const forecasts = presetIds.map((id) => buildAdvancedDemandForecast(getAdvancedForecastPreset(id).input))
  const allYears = Array.from(new Set(forecasts.flatMap((forecast) => forecast.rows.map((row) => row.year)))).sort((a, b) => a - b)

  return allYears.map((year) => {
    const byFamily: Record<AdvancedForecastFamily, number> = { DRAM: 0, NAND: 0, HBM: 0, 'DRAM+NAND': 0 }
    let totalEffectiveDemandEb = 0
    let totalUnmetDemandEb = 0

    forecasts.forEach((forecast) => {
      const row = forecast.rows.find((item) => item.year === year)
      if (!row) return
      totalEffectiveDemandEb += row.effectiveDemandEb
      totalUnmetDemandEb += row.unmetDemandEb
      byFamily[forecast.input.family] = round(byFamily[forecast.input.family] + row.effectiveDemandEb, 4)
    })

    return {
      year,
      totalEffectiveDemandEb: round(totalEffectiveDemandEb, 4),
      totalUnmetDemandEb: round(totalUnmetDemandEb, 4),
      byFamily
    }
  })
}

export function calculateNowcastAdjustment(rawInput: AdvancedDemandForecastInput, signals: NowcastSignalInput[]): NowcastAdjustmentResult {
  const totalWeight = signals.reduce((sum, signal) => sum + Math.max(0, finiteOrZero(signal.weight)), 0)
  const weightedSignal = totalWeight === 0
    ? 0
    : signals.reduce((sum, signal) => {
      const direction = signal.direction === 'negative' ? -1 : 1
      return sum + direction * finiteOrZero(signal.zScore) * Math.max(0, finiteOrZero(signal.weight))
    }, 0) / totalWeight
  const adjustmentFactor = round(clamp(1 + weightedSignal * 0.06, 0.75, 1.35), 4)

  return {
    adjustmentFactor,
    adjustedBaseDemandEb: round(nonNegative(rawInput.baseDemandEb) * adjustmentFactor, 6),
    signals: signals.map((signal) => ({ ...signal }))
  }
}

export function getAdvancedForecastSourceSignals(): AdvancedForecastSourceSignals {
  return {
    ...sourceSignals,
    generatedFromRaw: [...sourceSignals.generatedFromRaw],
    institutionalForecasts: sourceSignals.institutionalForecasts.map((signal) => ({ ...signal })),
    nowcastMonthlySales: sourceSignals.nowcastMonthlySales.map((signal) => ({ ...signal })),
    hbmPriceLadder: sourceSignals.hbmPriceLadder.map((signal) => ({ ...signal })),
    acceleratorBomHbmCostShare: sourceSignals.acceleratorBomHbmCostShare.map((signal) => ({ ...signal })),
    summary: { ...sourceSignals.summary }
  }
}

export function buildSourceCalibratedForecastContext(): SourceCalibratedForecastContext {
  const highFrequencyRows = sourceSignals.nowcastMonthlySales.filter((signal) => signal.confidence !== 'low')
  const yoyRows = highFrequencyRows.filter((signal) => signal.yoyPct !== null)
  const latestYoy = yoyRows.at(-1)?.yoyPct ?? sourceSignals.summary.latestHighConfidenceSiaYoyPct
  const momRows = highFrequencyRows.filter((signal) => signal.momPct !== null)
  const latestMom = momRows.at(-1)?.momPct ?? sourceSignals.summary.averageHighFrequencyMomPct
  const highRevenueSignal = clamp((sourceSignals.summary.institutionalUsdBMid - sourceSignals.summary.institutionalUsdBMin) / Math.max(1, sourceSignals.summary.institutionalUsdBMin), 0, 2)

  return {
    revenueBandUsdB: {
      low: sourceSignals.summary.institutionalUsdBMin,
      mid: sourceSignals.summary.institutionalUsdBMid,
      high: sourceSignals.summary.institutionalUsdBMax
    },
    nowcastSignals: [
      { name: 'SIA high-frequency sales YoY', weight: 0.45, zScore: round(latestYoy / 50, 3), direction: 'positive' },
      { name: 'SIA monthly sales momentum', weight: 0.25, zScore: round(latestMom / 10, 3), direction: 'positive' },
      { name: 'Institutional 2026 revenue band width', weight: 0.3, zScore: round(highRevenueSignal, 3), direction: 'positive' }
    ],
    hbmCostPressureSignals: sourceSignals.hbmPriceLadder.filter((signal) => signal.generation.startsWith('hbm')),
    sourceRefs: Array.from(new Set(sourceSignals.generatedFromRaw))
  }
}

export function calculateSourceCalibratedNowcast(rawInput: AdvancedDemandForecastInput): NowcastAdjustmentResult {
  return calculateNowcastAdjustment(rawInput, buildSourceCalibratedForecastContext().nowcastSignals)
}

function sourceNotesForGeneratedRaw(): string[] {
  return Array.from(new Set(sourceSignals.generatedFromRaw.map((rawPath) => rawPath.replace(/\.csv$/, '.md'))))
}

export function buildSiaNowcastTimeSeries(): SiaNowcastTimeSeriesRow[] {
  const rows = sourceSignals.nowcastMonthlySales.filter((signal) => signal.salesUsdB !== null)
  const baseline = rows[0]?.salesUsdB ?? 1
  const maxSales = Math.max(1, ...rows.map((signal) => signal.salesUsdB ?? 0))

  return rows.map((signal) => {
    const salesUsdB = signal.salesUsdB ?? 0
    const strongestPct = signal.yoyPct ?? signal.momPct
    return {
      ...signal,
      salesUsdB,
      salesIndex: round(salesUsdB / Math.max(0.0001, baseline) * 100, 1),
      barWidthPercent: round(salesUsdB / maxSales * 100, 1),
      signalLabel: strongestPct === null ? signal.note : `${formatNumber(strongestPct, 1)}% ${signal.yoyPct === null ? 'MoM' : 'YoY'}`
    }
  })
}

function buildCsvDerivedPresetFromRevenuePoint(
  hbmReference: AdvancedDemandForecastInput,
  sourceRefs: string[],
  options: {
    id: string
    label: string
    description: string
    revenuePoint: number
    revenueRatio: number
    demandMultiplier: number
    supplyMultiplier: number
    confidence?: AdvancedForecastConfidence
  }
): AdvancedForecastPreset {
  const revenue = buildSourceCalibratedForecastContext().revenueBandUsdB
  const siaRows = buildSiaNowcastTimeSeries()
  const latestHighConfidence = sourceSignals.nowcastMonthlySales.filter((row) => row.confidence === 'high' && row.yoyPct !== null).at(-1)
  const momentumBoost = clamp((latestHighConfidence?.yoyPct ?? sourceSignals.summary.latestHighConfidenceSiaYoyPct) / 100, 0.2, 1.2)
  const unitGrowthCagrPercent = round(clamp(hbmReference.unitGrowthCagrPercent * options.revenueRatio + momentumBoost * 4, 8, 52), 1)
  const contentGrowthCagrPercent = round(clamp(hbmReference.contentGrowthCagrPercent * (0.85 + options.revenueRatio * 0.18), 8, 28), 1)
  const baseDemandEb = round(hbmReference.baseDemandEb * options.demandMultiplier * Math.sqrt(Math.max(0.2, options.revenueRatio)), 4)
  const input: AdvancedDemandForecastInput = {
    ...cloneInput(hbmReference),
    id: options.id,
    label: options.label,
    domain: 'CSV-derived Memory Forecast Band',
    family: 'HBM',
    baseDemandEb,
    unitGrowthCagrPercent,
    contentGrowthCagrPercent,
    adoption: {
      ...hbmReference.adoption,
      startPercent: round(clamp(34 + options.revenueRatio * 6, 20, 55), 1),
      saturationPercent: round(clamp(78 + options.revenueRatio * 8, 65, 94), 1)
    },
    cycle: {
      ...hbmReference.cycle,
      priceChangePercent: round(clamp((options.revenuePoint - revenue.low) / Math.max(1, revenue.low) * 65, 15, 110), 1),
      orderAmplificationScore: round(clamp(45 + momentumBoost * 20 + options.revenueRatio * 8, 30, 88), 1)
    },
    supply: {
      ...hbmReference.supply,
      startingAvailableEb: round(hbmReference.supply.startingAvailableEb * options.supplyMultiplier, 4),
      allocationFactor: round(clamp(hbmReference.supply.allocationFactor * options.supplyMultiplier, 0.55, 0.98), 3)
    },
    evidence: {
      sourceRefs,
      signalCoverageScore: round(clamp(78 + siaRows.filter((row) => row.confidence === 'high').length * 2, 70, 92), 1),
      confidence: options.confidence ?? 'medium'
    }
  }

  return {
    id: options.id,
    label: options.label,
    description: options.description,
    input,
    sourceRefs: [...sourceRefs],
    confidence: input.evidence.confidence
  }
}

export function buildCsvDerivedAdvancedForecastPresets(): AdvancedForecastPreset[] {
  const hbmReference = getAdvancedForecastPreset('hbm-ai-infrastructure-constraint-reference').input
  const revenue = buildSourceCalibratedForecastContext().revenueBandUsdB
  const sourceRefs = sourceNotesForGeneratedRaw()

  const variants = [
    {
      id: 'csv-derived-conservative-memory-revenue-band',
      label: 'CSV-derived conservative memory revenue band',
      description: 'Conservative raw CSV-derived preset using the low institution revenue band and SIA momentum as bounded growth context.',
      revenuePoint: revenue.low,
      revenueRatio: revenue.low / Math.max(1, revenue.mid),
      demandMultiplier: 0.82,
      supplyMultiplier: 0.9
    },
    {
      id: 'csv-derived-base-memory-revenue-band',
      label: 'CSV-derived base memory revenue band',
      description: 'Base raw CSV-derived preset using the mid institution revenue band and latest SIA high-frequency sales signal.',
      revenuePoint: revenue.mid,
      revenueRatio: 1,
      demandMultiplier: 1,
      supplyMultiplier: 1
    },
    {
      id: 'csv-derived-upside-memory-revenue-band',
      label: 'CSV-derived upside memory revenue band',
      description: 'Upside raw CSV-derived preset using the high institution revenue band, SIA acceleration, and HBM cost-pressure context.',
      revenuePoint: revenue.high,
      revenueRatio: revenue.high / Math.max(1, revenue.mid),
      demandMultiplier: 1.18,
      supplyMultiplier: 0.78
    }
  ]

  return variants.map((variant) => buildCsvDerivedPresetFromRevenuePoint(hbmReference, sourceRefs, variant))
}

function parseRangeCenter(value: string): number | null {
  const numbers = value.match(/-?\d+(?:\.\d+)?/g)?.map(Number).filter(Number.isFinite) ?? []
  if (numbers.length === 0) return null
  return round(numbers.reduce((sum, item) => sum + item, 0) / numbers.length, 4)
}

export function buildInstitutionWeightedEnsemble(rawWeights: InstitutionWeightInput[] = []): InstitutionEnsembleResult {
  const revenueRows = sourceSignals.institutionalForecasts.filter((signal) => signal.unit === 'usd_b' && signal.numericValue !== null)
  const rawWeightByInstitution = new Map(rawWeights.map((item) => [item.institution, Math.max(0, finiteOrZero(item.weight))]))
  const weightedRows = revenueRows.map((row) => ({
    row,
    weight: rawWeightByInstitution.get(row.institution) ?? 1
  }))
  const totalWeight = weightedRows.reduce((sum, item) => sum + item.weight, 0) || revenueRows.length || 1
  const normalized = weightedRows.map((item) => ({
    institution: item.row.institution,
    weight: round(item.weight / totalWeight, 4)
  }))
  const weightedRevenueUsdB = round(weightedRows.reduce((sum, item) => sum + (item.row.numericValue ?? 0) * item.weight, 0) / totalWeight, 2)
  const revenue = buildSourceCalibratedForecastContext().revenueBandUsdB
  const revenueBandPosition = round(clamp((weightedRevenueUsdB - revenue.low) / Math.max(1, revenue.high - revenue.low), 0, 1), 4)
  const demandMultiplier = round(clamp(0.82 + revenueBandPosition * 0.48, 0.72, 1.42), 4)
  const sourceRefs = sourceNotesForGeneratedRaw()
  const hbmReference = getAdvancedForecastPreset('hbm-ai-infrastructure-constraint-reference').input
  const preset = buildCsvDerivedPresetFromRevenuePoint(hbmReference, sourceRefs, {
    id: 'institution-weighted-ensemble-memory-band',
    label: 'Institution-weighted ensemble memory band',
    description: 'User-adjustable institution-weighted ensemble that converts raw CSV revenue views into an HBM demand path.',
    revenuePoint: weightedRevenueUsdB,
    revenueRatio: weightedRevenueUsdB / Math.max(1, revenue.mid),
    demandMultiplier,
    supplyMultiplier: round(clamp(1.05 - revenueBandPosition * 0.3, 0.72, 1.05), 4),
    confidence: 'medium'
  })
  const forecast = buildAdvancedDemandForecast(preset.input)

  return {
    weights: normalized,
    weightedRevenueUsdB,
    revenueBandPosition,
    demandMultiplier,
    confidenceScore: forecast.confidenceScore,
    sourceRefs,
    preset,
    forecast
  }
}

export function calculateHbmBomStress(rawInput: AdvancedDemandForecastInput, rawControl: Partial<HbmBomStressControlInput> = {}): HbmBomStressResult {
  const control: HbmBomStressControlInput = {
    hbmPriceDeclinePercent: clamp(rawControl.hbmPriceDeclinePercent ?? 0, -40, 80),
    targetBomSharePercent: clamp(rawControl.targetBomSharePercent ?? 50, 20, 75),
    demandElasticity: clamp(rawControl.demandElasticity ?? 0.18, 0, 0.8),
    supplyReliefPassThrough: clamp(rawControl.supplyReliefPassThrough ?? 0.35, 0, 1)
  }
  const bomRows = sourceSignals.acceleratorBomHbmCostShare
  const b200 = bomRows.find((row) => row.accelerator === 'b200') ?? bomRows.find((row) => row.hbmCostUsd)
  const referenceBomSharePercent = parseRangeCenter(b200?.hbmSharePct ?? '') ?? 50
  const referenceHbmCostUsd = parseRangeCenter(b200?.hbmCostUsd ?? '') ?? 3200
  const priceDecline = control.hbmPriceDeclinePercent / 100
  const adjustedHbmCostUsd = round(referenceHbmCostUsd * (1 - priceDecline), 2)
  const adjustedBomSharePercent = round(clamp(referenceBomSharePercent * (1 - priceDecline), 5, 90), 2)
  const bomShareReliefPct = Math.max(0, referenceBomSharePercent - control.targetBomSharePercent)
  const affordabilityDemandShockPercent = round(clamp(control.hbmPriceDeclinePercent * control.demandElasticity + bomShareReliefPct * 0.08, -15, 28), 2)
  const supplyReliefShockPercent = round(clamp(control.hbmPriceDeclinePercent * control.supplyReliefPassThrough * 0.25, -12, 18), 2)
  const stressScenario: ForecastStressScenarioInput = {
    id: 'interactive-hbm-bom-affordability',
    label: 'Interactive HBM/BOM affordability stress',
    demandShockPercent: affordabilityDemandShockPercent,
    supplyShockPercent: supplyReliefShockPercent,
    priceShockPercent: round(-control.hbmPriceDeclinePercent, 2)
  }
  const result = buildStressScenarioTable(rawInput, [stressScenario])[0]
  const sourceRefs = Array.from(new Set([
    ...sourceNotesForGeneratedRaw(),
    ...bomRows.map((row) => row.sourceNote)
  ]))

  return {
    control,
    referenceBomSharePercent,
    affordabilityDemandShockPercent,
    supplyReliefShockPercent,
    adjustedHbmCostUsd,
    adjustedBomSharePercent,
    stressScenario,
    result,
    sourceRefs
  }
}

export function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)
}

export function formatEb(value: number, digits = Math.abs(value) < 1 ? 4 : 2): string {
  return `${formatNumber(value, digits)} EB`
}
