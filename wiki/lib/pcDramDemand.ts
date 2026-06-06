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
  sources: string[]
}

const pcDramScenarioPresets: PcDramScenarioPreset[] = [
  {
    id: 'baseline-pc-reference',
    label: 'Baseline PC reference',
    description: 'Illustrative low-AI-penetration PC DRAM scenario; not a market forecast.',
    input: {
      pcShipmentsMillion: 250,
      aiPcPenetrationPercent: 5,
      nonAiDramGbPerPc: 8,
      aiPcDramGbPerPc: 16
    },
    sources: []
  },
  {
    id: 'ai-pc-transition-reference',
    label: 'AI PC transition reference',
    description: 'Illustrative transition case where AI PC share raises average DRAM content; not a market forecast.',
    input: {
      pcShipmentsMillion: 250,
      aiPcPenetrationPercent: 20,
      nonAiDramGbPerPc: 8,
      aiPcDramGbPerPc: 16
    },
    sources: []
  },
  {
    id: 'ai-heavy-pc-reference',
    label: 'AI-heavy PC reference',
    description: 'Illustrative high-AI-penetration case for DRAM content sensitivity; not a market forecast.',
    input: {
      pcShipmentsMillion: 250,
      aiPcPenetrationPercent: 50,
      nonAiDramGbPerPc: 8,
      aiPcDramGbPerPc: 24
    },
    sources: []
  },
  {
    id: 'copilot-plus-16gb-reference',
    label: 'Copilot+ 16GB AI PC reference',
    description: 'Source-backed AI PC content anchor using Microsoft Copilot+ 16GB minimum; shipments and penetration are scenario assumptions, not a market forecast.',
    input: {
      pcShipmentsMillion: 250,
      aiPcPenetrationPercent: 30,
      nonAiDramGbPerPc: 8,
      aiPcDramGbPerPc: 16
    },
    sources: ['raw/articles/microsoft-ai-pc-16gb-ram-baseline.md', 'raw/datasets/memory-content-per-device.md']
  },
  {
    id: 'idc-shortage-downside-reference',
    label: 'IDC shortage downside reference',
    description: 'Source-backed shortage-feedback scenario using lower PC shipments while preserving AI PC content uplift; not a market forecast.',
    input: {
      pcShipmentsMillion: 222,
      aiPcPenetrationPercent: 30,
      nonAiDramGbPerPc: 8,
      aiPcDramGbPerPc: 16
    },
    sources: ['raw/reports/idc-2026-memory-shortage-supply-growth.md', 'raw/articles/microsoft-ai-pc-16gb-ram-baseline.md']
  }
]

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
    sources: [...preset.sources]
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
    sources: [...preset.sources]
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
