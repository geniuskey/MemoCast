import longTailDomainPresetData from '../data/long-tail-domain-presets.json'

export interface LongTailDomainSegmentInput {
  id: string
  label: string
  unitsMillion: number
  attachRatePercent: number
  dramGbPerUnit: number
  nandGbPerUnit: number
  hbmGbPerUnit?: number
}

export interface LongTailDomainDemandInput {
  segments: LongTailDomainSegmentInput[]
}

export interface LongTailDomainSegmentResult extends LongTailDomainSegmentInput {
  effectiveUnitsMillion: number
  dramEb: number
  nandEb: number
  hbmEb: number
  totalEb: number
}

export interface LongTailMemoryMix {
  dramPct: number
  nandPct: number
  hbmPct: number
}

export interface LongTailDomainDemandResult {
  totalDramEb: number
  totalNandEb: number
  totalHbmEb: number
  totalEb: number
  memoryMix: LongTailMemoryMix
  segmentResults: LongTailDomainSegmentResult[]
  interpretation: string
}

export interface LongTailDomainPreset {
  id: 'automotive-l4-memory-reference' | 'edge-robotics-surveillance-reference' | 'networking-hpc-hbm-reference'
  label: string
  description: string
  confidence: 'low' | 'medium' | 'high'
  sourceRefs: string[]
  sources: string[]
  input: LongTailDomainDemandInput
}

type SourceBackedLongTailPreset = Omit<LongTailDomainPreset, 'sources'>

const longTailDomainPresets = longTailDomainPresetData as SourceBackedLongTailPreset[]

const round = (value: number, digits = 3): number => {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

const finiteNonNegative = (value: number): number => (Number.isFinite(value) ? Math.max(0, value) : 0)
const clamp = (value: number, min = 0, max = 100): number => Math.min(max, Math.max(min, finiteNonNegative(value)))

const gbMillionToEb = (gbPerUnit: number, effectiveUnitsMillion: number): number => {
  return round((finiteNonNegative(gbPerUnit) * finiteNonNegative(effectiveUnitsMillion)) / 1000)
}

export function calculateLongTailDomainDemand(input: LongTailDomainDemandInput): LongTailDomainDemandResult {
  const segmentResults = input.segments.map((segment) => {
    const effectiveUnitsMillion = round(finiteNonNegative(segment.unitsMillion) * (clamp(segment.attachRatePercent) / 100), 6)
    const dramEb = gbMillionToEb(segment.dramGbPerUnit, effectiveUnitsMillion)
    const nandEb = gbMillionToEb(segment.nandGbPerUnit, effectiveUnitsMillion)
    const hbmEb = gbMillionToEb(segment.hbmGbPerUnit ?? 0, effectiveUnitsMillion)
    const totalEb = round(dramEb + nandEb + hbmEb)

    return {
      ...segment,
      attachRatePercent: clamp(segment.attachRatePercent),
      dramGbPerUnit: finiteNonNegative(segment.dramGbPerUnit),
      nandGbPerUnit: finiteNonNegative(segment.nandGbPerUnit),
      hbmGbPerUnit: finiteNonNegative(segment.hbmGbPerUnit ?? 0),
      effectiveUnitsMillion,
      dramEb,
      nandEb,
      hbmEb,
      totalEb
    }
  })

  const totalDramEb = round(segmentResults.reduce((sum, segment) => sum + segment.dramEb, 0))
  const totalNandEb = round(segmentResults.reduce((sum, segment) => sum + segment.nandEb, 0))
  const totalHbmEb = round(segmentResults.reduce((sum, segment) => sum + segment.hbmEb, 0))
  const totalEb = round(totalDramEb + totalNandEb + totalHbmEb)
  const pct = (value: number) => (totalEb === 0 ? 0 : round((value / totalEb) * 100, 2))

  return {
    totalDramEb,
    totalNandEb,
    totalHbmEb,
    totalEb,
    memoryMix: {
      dramPct: pct(totalDramEb),
      nandPct: pct(totalNandEb),
      hbmPct: pct(totalHbmEb)
    },
    segmentResults,
    interpretation: buildLongTailInterpretation(totalEb, totalHbmEb)
  }
}

export function buildLongTailInterpretation(totalEb: number, totalHbmEb: number): string {
  if (totalEb === 0) return '유효 unit 또는 attach-rate가 없어 long-tail scenario 기여도가 0 EB로 계산된다.'
  if (totalHbmEb > 0) return 'long-tail scenario 중 일부는 HBM을 포함하므로 AI server HBM bucket과 중복되지 않게 별도 민감도로 추적한다.'
  return 'long-tail scenario는 smartphone/PC/server 외부의 content-per-device 상승 민감도를 보완하는 scenario bucket이다.'
}

const copyPreset = (preset: SourceBackedLongTailPreset): LongTailDomainPreset => ({
  ...preset,
  input: {
    segments: preset.input.segments.map((segment) => ({ ...segment }))
  },
  sourceRefs: [...preset.sourceRefs],
  sources: [...preset.sourceRefs]
})

export function listLongTailDomainPresets(): LongTailDomainPreset[] {
  return longTailDomainPresets.map(copyPreset)
}

export function getLongTailDomainPreset(id: LongTailDomainPreset['id']): LongTailDomainPreset {
  const preset = longTailDomainPresets.find((item) => item.id === id)
  if (!preset) throw new Error(`Unknown long-tail domain preset: ${id}`)
  return copyPreset(preset)
}
