import shortagePresetData from '../data/shortage-severity-presets.json'

export type ShortageSeverityRegime = 'normal' | 'tight' | 'shortage' | 'severe-shortage'

export interface ShortageSeverityInput {
  spotPriceIncreasePct: number
  contractPriceQoqPct: number
  nandContractPriceQoqPct?: number
  inventoryWeeks: number
  leadTimeWeeks: number
  allocationScore: number
  grayMarketScore: number
  passThroughLagMonths?: number
}

export interface ShortageSeverityComponentScores {
  priceMomentum: number
  inventoryTightness: number
  leadTimeStress: number
  allocationStress: number
  grayMarketStress: number
}

export interface ShortageSeverityResult {
  severityScore: number
  regime: ShortageSeverityRegime
  componentScores: ShortageSeverityComponentScores
  weightedContributions: ShortageSeverityComponentScores
  passThroughWindowMonths: number
  interpretation: string
}

export interface ShortageSeverityPreset {
  id: 'dram-channel-panic-2026-reference' | 'nand-contract-squeeze-2026-reference' | 'normal-inventory-reference'
  label: string
  description: string
  input: ShortageSeverityInput
  confidence: 'low' | 'medium' | 'high'
  sourceRefs: string[]
  sources: string[]
}

type SourceBackedShortageSeverityPreset = Omit<ShortageSeverityPreset, 'sources'>

const shortageSeverityPresets = shortagePresetData as SourceBackedShortageSeverityPreset[]

const weights: Record<keyof ShortageSeverityComponentScores, number> = {
  priceMomentum: 0.3,
  inventoryTightness: 0.25,
  leadTimeStress: 0.2,
  allocationStress: 0.15,
  grayMarketStress: 0.1
}

const round = (value: number, digits = 2): number => {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export const clamp = (value: number, min = 0, max = 100): number => {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, value))
}

const nonNegative = (value: number | undefined): number => Math.max(0, Number.isFinite(value ?? 0) ? (value ?? 0) : 0)

export function classifyShortageSeverity(score: number): ShortageSeverityRegime {
  if (score >= 75) return 'severe-shortage'
  if (score >= 55) return 'shortage'
  if (score >= 35) return 'tight'
  return 'normal'
}

export function calculateShortageSeverity(input: ShortageSeverityInput): ShortageSeverityResult {
  const spotScore = clamp(nonNegative(input.spotPriceIncreasePct) / 3)
  const contractScore = clamp(nonNegative(input.contractPriceQoqPct))
  const nandContractScore = clamp(nonNegative(input.nandContractPriceQoqPct))
  const activePriceScores = [spotScore, contractScore, nandContractScore].filter((score) => score > 0)
  const priceMomentum = activePriceScores.length > 0 ? round(activePriceScores.reduce((sum, score) => sum + score, 0) / activePriceScores.length) : 0

  const inventoryWeeks = nonNegative(input.inventoryWeeks)
  const inventoryTightness = clamp(((12 - inventoryWeeks) / 10) * 100)
  const leadTimeStress = clamp(((nonNegative(input.leadTimeWeeks) - 8) / 44) * 100)
  const allocationStress = clamp(input.allocationScore)
  const grayMarketStress = clamp(input.grayMarketScore)

  const componentScores: ShortageSeverityComponentScores = {
    priceMomentum: round(priceMomentum),
    inventoryTightness: round(inventoryTightness),
    leadTimeStress: round(leadTimeStress),
    allocationStress: round(allocationStress),
    grayMarketStress: round(grayMarketStress)
  }

  const weightedContributions = Object.fromEntries(
    Object.entries(componentScores).map(([key, value]) => [key, round(value * weights[key as keyof ShortageSeverityComponentScores])])
  ) as ShortageSeverityComponentScores

  const severityScore = round(Object.values(weightedContributions).reduce((sum, value) => sum + value, 0))
  const regime = classifyShortageSeverity(severityScore)
  const passThroughWindowMonths = clamp(nonNegative(input.passThroughLagMonths), 0, 12)

  return {
    severityScore,
    regime,
    componentScores,
    weightedContributions,
    passThroughWindowMonths,
    interpretation: buildShortageSeverityInterpretation(regime, passThroughWindowMonths)
  }
}

export function buildShortageSeverityInterpretation(regime: ShortageSeverityRegime, passThroughWindowMonths: number): string {
  const lag = `${round(passThroughWindowMonths, 1)}개월`

  if (regime === 'severe-shortage') {
    return `가격·재고·리드타임이 동시에 악화된 severe shortage 상태다. OEM/클라우드 가격 전가는 보통 ${lag} 내 후행 반영될 수 있다.`
  }

  if (regime === 'shortage') {
    return `부족장이 channel에 내려온 상태다. spot/contract spread와 ${lag} 가격 전가 지연을 함께 추적해야 한다.`
  }

  if (regime === 'tight') {
    return `재고 또는 가격 중 일부가 타이트한 상태다. 정상 재고 10~12주 회복 여부가 turning point다.`
  }

  return '정상 또는 완만한 tightness 상태다. 가격 급등보다 재고 정상화와 수요 탄력성을 우선 확인한다.'
}

export function listShortageSeverityPresets(): ShortageSeverityPreset[] {
  return shortageSeverityPresets.map((preset) => ({
    ...preset,
    input: { ...preset.input },
    sourceRefs: [...preset.sourceRefs],
    sources: [...preset.sourceRefs]
  }))
}

export function getShortageSeverityPreset(id: ShortageSeverityPreset['id']): ShortageSeverityPreset {
  const preset = shortageSeverityPresets.find((item) => item.id === id)

  if (!preset) {
    throw new Error(`Unknown shortage severity preset: ${id}`)
  }

  return {
    ...preset,
    input: { ...preset.input },
    sourceRefs: [...preset.sourceRefs],
    sources: [...preset.sourceRefs]
  }
}
