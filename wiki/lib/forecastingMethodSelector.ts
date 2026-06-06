import forecastingMethodPresetData from '../data/forecasting-method-presets.json'

export type ForecastingMethodId =
  | 'structural-var-arimax'
  | 'bullwhip-inventory-system-dynamics'
  | 'diffusion-grey-scenario'
  | 'capacity-constrained-optimization'
  | 'probabilistic-ensemble'

export interface ForecastingMethodInput {
  historyMonths: number
  signalCount: number
  leadLagKnownScore: number
  causalInterpretabilityNeedScore: number
  nonlinearPatternScore: number
  smallSampleScore: number
  inventoryDistortionScore: number
  capacityConstraintScore: number
}

export type ForecastingMethodScores = Record<ForecastingMethodId, number>

export interface ForecastingMethodSelectionResult {
  primaryMethod: ForecastingMethodId
  methodScores: ForecastingMethodScores
  interpretation: string
}

export interface ForecastingMethodPreset {
  id:
    | 'structural-var-leading-indicator-reference'
    | 'bullwhip-inventory-cycle-reference'
    | 'technology-diffusion-small-sample-reference'
  label: string
  description: string
  confidence: 'low' | 'medium' | 'high'
  input: ForecastingMethodInput
  recommendedMethods: string[]
}

const presets = forecastingMethodPresetData as ForecastingMethodPreset[]

const round = (value: number, digits = 2): number => {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

const finiteNonNegative = (value: number): number => (Number.isFinite(value) ? Math.max(0, value) : 0)
const clamp = (value: number, min = 0, max = 100): number => Math.min(max, Math.max(min, finiteNonNegative(value)))
const historyAdequacy = (months: number): number => clamp((finiteNonNegative(months) / 48) * 100)
const signalBreadth = (count: number): number => clamp((finiteNonNegative(count) / 6) * 100)

export function scoreForecastingMethods(input: ForecastingMethodInput): ForecastingMethodScores {
  const history = historyAdequacy(input.historyMonths)
  const breadth = signalBreadth(input.signalCount)
  const leadLag = clamp(input.leadLagKnownScore)
  const interpretability = clamp(input.causalInterpretabilityNeedScore)
  const nonlinear = clamp(input.nonlinearPatternScore)
  const smallSample = clamp(input.smallSampleScore)
  const inventory = clamp(input.inventoryDistortionScore)
  const capacity = clamp(input.capacityConstraintScore)

  return {
    'structural-var-arimax': round(history * 0.25 + breadth * 0.15 + leadLag * 0.3 + interpretability * 0.25 + inventory * 0.05),
    'bullwhip-inventory-system-dynamics': round(inventory * 0.45 + leadLag * 0.15 + interpretability * 0.2 + capacity * 0.15 + history * 0.05),
    'diffusion-grey-scenario': round(smallSample * 0.35 + nonlinear * 0.25 + interpretability * 0.15 + capacity * 0.1 + (100 - history) * 0.15),
    'capacity-constrained-optimization': round(capacity * 0.45 + interpretability * 0.2 + breadth * 0.1 + leadLag * 0.1 + inventory * 0.15),
    'probabilistic-ensemble': round(history * 0.2 + breadth * 0.25 + nonlinear * 0.2 + leadLag * 0.15 + capacity * 0.1 + inventory * 0.1)
  }
}

export function classifyForecastingMethod(input: ForecastingMethodInput): ForecastingMethodSelectionResult {
  const methodScores = scoreForecastingMethods(input)
  const primaryMethod = (Object.entries(methodScores).sort(([, left], [, right]) => right - left)[0][0]) as ForecastingMethodId

  return {
    primaryMethod,
    methodScores,
    interpretation: buildForecastingMethodInterpretation(primaryMethod)
  }
}

export function buildForecastingMethodInterpretation(primaryMethod: ForecastingMethodId): string {
  if (primaryMethod === 'structural-var-arimax') {
    return 'lead/lag가 관측되고 해석 가능성이 중요하므로 VAR/SVAR 또는 ARIMAX로 driver transmission을 먼저 식별한다.'
  }
  if (primaryMethod === 'bullwhip-inventory-system-dynamics') {
    return '주문·재고 왜곡이 강하므로 bullwhip transfer function, system dynamics, base-stock inventory 계층을 우선 적용한다.'
  }
  if (primaryMethod === 'diffusion-grey-scenario') {
    return '표본이 짧고 기술 전환 비선형성이 강하므로 Bass diffusion, grey GM(1,1), scenario ensemble로 민감도를 둔다.'
  }
  if (primaryMethod === 'capacity-constrained-optimization') {
    return '수요보다 capacity/product-mix 제약이 우세하므로 wafer fab optimization 또는 stochastic capacity planning이 우선이다.'
  }
  return '단일 방법 대신 probabilistic ensemble로 여러 신호의 예측구간을 결합한다.'
}

const copyPreset = (preset: ForecastingMethodPreset): ForecastingMethodPreset => ({
  ...preset,
  input: { ...preset.input },
  recommendedMethods: [...preset.recommendedMethods]
})

export function listForecastingMethodPresets(): ForecastingMethodPreset[] {
  return presets.map(copyPreset)
}

export function getForecastingMethodPreset(id: ForecastingMethodPreset['id']): ForecastingMethodPreset {
  const preset = presets.find((item) => item.id === id)
  if (!preset) throw new Error(`Unknown forecasting method preset: ${id}`)
  return copyPreset(preset)
}
