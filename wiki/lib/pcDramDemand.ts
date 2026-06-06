import simulatorPresetData from '../data/simulator-presets.json'

export interface PcDramDemandInput {
  pcShipmentsMillion: number
  aiPcPenetrationPercent: number
  nonAiDramGbPerPc: number
  aiPcDramGbPerPc: number
}

export interface PcDramSegmentShares {
  nonAiPc: number
  aiPc: number
}

export interface PcDramDemandResult {
  segmentShares: PcDramSegmentShares
  nonAiPcUnitsMillion: number
  aiPcUnitsMillion: number
  weightedAverageDramGb: number
  totalDramGb: number
  totalDramPb: number
  totalDramEb: number
}

export interface PcShipmentSensitivityRow {
  changePercent: number
  pcShipmentsMillion: number
  result: PcDramDemandResult
}

export interface AiPcPenetrationSensitivityRow {
  aiPcPenetrationPercent: number
  result: PcDramDemandResult
}

export interface PcDramScenarioPreset {
  id: 'baseline-pc-reference' | 'ai-pc-transition-reference' | 'ai-heavy-pc-reference' | 'copilot-plus-16gb-reference' | 'idc-shortage-downside-reference'
  label: string
  description: string
  input: PcDramDemandInput
  confidence: 'low' | 'medium' | 'high'
  sourceRefs: string[]
  sources: string[]
}

type SourceBackedPcDramScenarioPreset = Omit<PcDramScenarioPreset, 'sources'>

const pcDramScenarioPresets = simulatorPresetData['pc-dram'] as SourceBackedPcDramScenarioPreset[]

const round = (value: number, digits = 2): number => {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export const clamp = (value: number, min: number, max: number): number => {
  if (Number.isNaN(value)) return min
  return Math.min(max, Math.max(min, value))
}

const nonNegative = (value: number): number => Math.max(0, Number.isNaN(value) ? 0 : value)

export function calculatePcDramDemand(input: PcDramDemandInput): PcDramDemandResult {
  const pcShipmentsMillion = nonNegative(input.pcShipmentsMillion)
  const aiPcShare = clamp(input.aiPcPenetrationPercent, 0, 100)
  const nonAiPcShare = round(100 - aiPcShare, 2)
  const nonAiDramGbPerPc = nonNegative(input.nonAiDramGbPerPc)
  const aiPcDramGbPerPc = nonNegative(input.aiPcDramGbPerPc)

  const aiPcUnitsMillion = round(pcShipmentsMillion * (aiPcShare / 100), 2)
  const nonAiPcUnitsMillion = round(pcShipmentsMillion - aiPcUnitsMillion, 2)
  const weightedAverageDramGb = round(
    (nonAiPcShare / 100) * nonAiDramGbPerPc + (aiPcShare / 100) * aiPcDramGbPerPc,
    2
  )
  const totalDramGb = round(pcShipmentsMillion * 1_000_000 * weightedAverageDramGb, 0)

  return {
    segmentShares: {
      nonAiPc: nonAiPcShare,
      aiPc: aiPcShare
    },
    nonAiPcUnitsMillion,
    aiPcUnitsMillion,
    weightedAverageDramGb,
    totalDramGb,
    totalDramPb: round(totalDramGb / 1_000_000, 2),
    totalDramEb: round(totalDramGb / 1_000_000_000, 4)
  }
}

export function buildPcShipmentSensitivityRows(
  input: PcDramDemandInput,
  changesPercent: number[] = [-20, -10, 0, 10, 20]
): PcShipmentSensitivityRow[] {
  return changesPercent.map((changePercent) => {
    const pcShipmentsMillion = round(input.pcShipmentsMillion * (1 + changePercent / 100), 2)
    return {
      changePercent,
      pcShipmentsMillion,
      result: calculatePcDramDemand({
        ...input,
        pcShipmentsMillion
      })
    }
  })
}

export function buildAiPcPenetrationSensitivityRows(
  input: PcDramDemandInput,
  penetrationPercentages: number[] = [0, 10, 20, 30, 50]
): AiPcPenetrationSensitivityRow[] {
  return penetrationPercentages.map((aiPcPenetrationPercent) => ({
    aiPcPenetrationPercent,
    result: calculatePcDramDemand({
      ...input,
      aiPcPenetrationPercent
    })
  }))
}

export function listPcDramScenarioPresets(): PcDramScenarioPreset[] {
  return pcDramScenarioPresets.map((preset) => ({
    ...preset,
    input: { ...preset.input },
    sourceRefs: [...preset.sourceRefs],
    sources: [...preset.sourceRefs]
  }))
}

export function getPcDramScenarioPreset(id: PcDramScenarioPreset['id']): PcDramScenarioPreset {
  const preset = pcDramScenarioPresets.find((item) => item.id === id)

  if (!preset) {
    throw new Error(`Unknown PC DRAM demand scenario preset: ${id}`)
  }

  return {
    ...preset,
    input: { ...preset.input },
    sourceRefs: [...preset.sourceRefs],
    sources: [...preset.sourceRefs]
  }
}

export function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value)
}

export function formatCapacity(gb: number): string {
  const absGb = Math.abs(gb)

  if (absGb >= 1_000_000_000) {
    return `${formatNumber(gb / 1_000_000_000)} EB`
  }

  if (absGb >= 1_000_000) {
    return `${formatNumber(gb / 1_000_000)} PB`
  }

  if (absGb >= 1_000) {
    return `${formatNumber(gb / 1_000)} TB`
  }

  return `${formatNumber(gb)} GB`
}
