import simulatorPresetData from '../data/simulator-presets.json'

export type NandSsdSegmentId = 'client' | 'enterprise' | 'ai-storage'

export interface NandSsdSegmentInput {
  id: NandSsdSegmentId
  label: string
  sharePercent: number
  averageCapacityTb: number
}

export interface NandSsdDemandInput {
  totalSsdShipmentsMillion: number
  segments: NandSsdSegmentInput[]
}

export interface NormalizedNandSsdSegment extends NandSsdSegmentInput {
  normalizedSharePercent: number
  unitsMillion: number
  segmentNandTb: number
}

export interface NandSsdDemandResult {
  normalizedSegments: NormalizedNandSsdSegment[]
  weightedAverageCapacityTb: number
  totalNandTb: number
  totalNandPb: number
  totalNandEb: number
}

export interface SsdShipmentSensitivityRow {
  changePercent: number
  totalSsdShipmentsMillion: number
  result: NandSsdDemandResult
}

export interface EnterpriseMixSensitivityRow {
  enterpriseSharePercent: number
  result: NandSsdDemandResult
}

export interface NandSsdScenarioPreset {
  id: 'client-heavy-ssd-reference' | 'enterprise-transition-ssd-reference' | 'ai-storage-heavy-ssd-reference' | 'qlc-enterprise-breakout-reference'
  label: string
  description: string
  input: NandSsdDemandInput
  confidence: 'low' | 'medium' | 'high'
  sourceRefs: string[]
  sources: string[]
}

const round = (value: number, digits = 2): number => {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

const finiteOrZero = (value: number): number => (Number.isFinite(value) ? value : 0)
const nonNegative = (value: number): number => Math.max(0, finiteOrZero(value))

const defaultSegments: NandSsdSegmentInput[] = [
  { id: 'client', label: 'Client SSD', sharePercent: 80, averageCapacityTb: 1 },
  { id: 'enterprise', label: 'Enterprise SSD', sharePercent: 18, averageCapacityTb: 8 },
  { id: 'ai-storage', label: 'AI/Data-center SSD', sharePercent: 2, averageCapacityTb: 16 }
]

type SourceBackedNandSsdScenarioPreset = Omit<NandSsdScenarioPreset, 'sources'>

const nandSsdScenarioPresets = simulatorPresetData['nand-ssd'] as SourceBackedNandSsdScenarioPreset[]

function cloneSegments(segments: NandSsdSegmentInput[]): NandSsdSegmentInput[] {
  return segments.map((segment) => ({ ...segment }))
}

function normalizeShares(segments: NandSsdSegmentInput[]): number[] {
  const positiveShares = segments.map((segment) => nonNegative(segment.sharePercent))
  const totalShare = positiveShares.reduce((sum, share) => sum + share, 0)

  if (totalShare <= 0) {
    const equalShare = round(100 / Math.max(segments.length, 1), 2)
    return segments.map(() => equalShare)
  }

  return positiveShares.map((share) => round((share / totalShare) * 100, 2))
}

export function calculateNandSsdDemand(input: NandSsdDemandInput): NandSsdDemandResult {
  const sourceSegments = input.segments.length > 0 ? input.segments : defaultSegments
  const totalSsdShipmentsMillion = nonNegative(input.totalSsdShipmentsMillion)
  const normalizedShares = normalizeShares(sourceSegments)

  const normalizedSegments = sourceSegments.map((segment, index) => {
    const normalizedSharePercent = normalizedShares[index]
    const averageCapacityTb = nonNegative(segment.averageCapacityTb)
    const unitsMillion = round(totalSsdShipmentsMillion * (normalizedSharePercent / 100), 2)
    const segmentNandTb = round(unitsMillion * 1_000_000 * averageCapacityTb, 0)

    return {
      ...segment,
      sharePercent: nonNegative(segment.sharePercent),
      averageCapacityTb,
      normalizedSharePercent,
      unitsMillion,
      segmentNandTb
    }
  })

  const weightedAverageCapacityTb = round(
    normalizedSegments.reduce((sum, segment) => sum + (segment.normalizedSharePercent / 100) * segment.averageCapacityTb, 0),
    2
  )
  const totalNandTb = round(totalSsdShipmentsMillion * 1_000_000 * weightedAverageCapacityTb, 0)

  return {
    normalizedSegments,
    weightedAverageCapacityTb,
    totalNandTb,
    totalNandPb: round(totalNandTb / 1_000, 2),
    totalNandEb: round(totalNandTb / 1_000_000, 2)
  }
}

export function buildSsdShipmentSensitivityRows(
  input: NandSsdDemandInput,
  changesPercent: number[] = [-20, -10, 0, 10, 20]
): SsdShipmentSensitivityRow[] {
  return changesPercent.map((changePercent) => {
    const totalSsdShipmentsMillion = round(input.totalSsdShipmentsMillion * (1 + changePercent / 100), 2)
    return {
      changePercent,
      totalSsdShipmentsMillion,
      result: calculateNandSsdDemand({
        ...input,
        totalSsdShipmentsMillion,
        segments: cloneSegments(input.segments)
      })
    }
  })
}

export function buildEnterpriseMixSensitivityRows(
  input: NandSsdDemandInput,
  enterpriseSharePercentages: number[] = [10, 15, 20, 30, 40]
): EnterpriseMixSensitivityRow[] {
  const baseAiShare = input.segments.find((segment) => segment.id === 'ai-storage')?.sharePercent ?? 0

  return enterpriseSharePercentages.map((enterpriseSharePercent) => {
    const enterpriseShare = Math.min(100, nonNegative(enterpriseSharePercent))
    const aiShare = Math.min(baseAiShare, Math.max(0, 100 - enterpriseShare))
    const clientShare = Math.max(0, 100 - enterpriseShare - aiShare)
    const segments = input.segments.map((segment) => {
      if (segment.id === 'client') return { ...segment, sharePercent: clientShare }
      if (segment.id === 'enterprise') return { ...segment, sharePercent: enterpriseShare }
      if (segment.id === 'ai-storage') return { ...segment, sharePercent: aiShare }
      return { ...segment }
    })

    return {
      enterpriseSharePercent: enterpriseShare,
      result: calculateNandSsdDemand({
        ...input,
        segments
      })
    }
  })
}

export function listNandSsdScenarioPresets(): NandSsdScenarioPreset[] {
  return nandSsdScenarioPresets.map((preset) => ({
    ...preset,
    input: {
      ...preset.input,
      segments: cloneSegments(preset.input.segments)
    },
    sourceRefs: [...preset.sourceRefs],
    sources: [...preset.sourceRefs]
  }))
}

export function getNandSsdScenarioPreset(id: NandSsdScenarioPreset['id']): NandSsdScenarioPreset {
  const preset = nandSsdScenarioPresets.find((item) => item.id === id)

  if (!preset) {
    throw new Error(`Unknown NAND SSD demand scenario preset: ${id}`)
  }

  return {
    ...preset,
    input: {
      ...preset.input,
      segments: cloneSegments(preset.input.segments)
    },
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

export function formatCapacityTb(tb: number): string {
  const absTb = Math.abs(tb)

  if (absTb >= 1_000_000) {
    return `${formatNumber(tb / 1_000_000)} EB`
  }

  if (absTb >= 1_000) {
    return `${formatNumber(tb / 1_000)} PB`
  }

  return `${formatNumber(tb)} TB`
}
