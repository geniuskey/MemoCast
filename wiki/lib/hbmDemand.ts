import simulatorPresetData from '../data/simulator-presets.json'

export interface HbmDemandInput {
  acceleratorsThousand: number
  attachRatePercent: number
  hbmStacksPerAccelerator: number
  hbmCapacityGbPerStack: number
}

export interface HbmDemandResult {
  attachRate: number
  attachedAcceleratorsThousand: number
  hbmGbPerAccelerator: number
  totalHbmGb: number
  totalHbmPb: number
  totalHbmEb: number
}

export interface HbmShipmentSensitivityRow {
  changePercent: number
  acceleratorsThousand: number
  result: HbmDemandResult
}

export interface HbmContentSensitivityRow {
  hbmCapacityGbPerStack: number
  result: HbmDemandResult
}

export interface HbmScenarioPreset {
  id:
    | 'hbm3e-8hi-reference'
    | 'hbm3e-12hi-reference'
    | 'hbm4-12hi-reference'
    | 'trendforce-2026-hbm-growth-reference'
    | 'gb200-nvl72-ramp-reference'
    | 'gb300-rubin-288gb-reference'
  label: string
  description: string
  input: HbmDemandInput
  confidence: 'low' | 'medium' | 'high'
  sourceRefs: string[]
  sources: string[]
}

type SourceBackedHbmScenarioPreset = Omit<HbmScenarioPreset, 'sources'>

const hbmScenarioPresets = simulatorPresetData.hbm as SourceBackedHbmScenarioPreset[]

const round = (value: number, digits = 2): number => {
  const factor = 10 ** digits
  return Math.round((value + Number.EPSILON) * factor) / factor
}

export const clamp = (value: number, min: number, max: number): number => {
  if (Number.isNaN(value)) return min
  return Math.min(max, Math.max(min, value))
}

const nonNegative = (value: number): number => Math.max(0, Number.isNaN(value) ? 0 : value)

export function calculateHbmDemand(input: HbmDemandInput): HbmDemandResult {
  const acceleratorsThousand = nonNegative(input.acceleratorsThousand)
  const attachRate = clamp(input.attachRatePercent, 0, 100)
  const hbmStacksPerAccelerator = nonNegative(input.hbmStacksPerAccelerator)
  const hbmCapacityGbPerStack = nonNegative(input.hbmCapacityGbPerStack)

  const attachedAcceleratorsThousand = round(acceleratorsThousand * (attachRate / 100), 2)
  const hbmGbPerAccelerator = round(hbmStacksPerAccelerator * hbmCapacityGbPerStack, 2)
  const totalHbmGb = round(attachedAcceleratorsThousand * 1_000 * hbmGbPerAccelerator, 0)

  return {
    attachRate,
    attachedAcceleratorsThousand,
    hbmGbPerAccelerator,
    totalHbmGb,
    totalHbmPb: round(totalHbmGb / 1_000_000, 2),
    totalHbmEb: round(totalHbmGb / 1_000_000_000, 4)
  }
}

export function buildHbmShipmentSensitivityRows(
  input: HbmDemandInput,
  changesPercent: number[] = [-20, -10, 0, 10, 20]
): HbmShipmentSensitivityRow[] {
  return changesPercent.map((changePercent) => {
    const acceleratorsThousand = round(input.acceleratorsThousand * (1 + changePercent / 100), 2)
    return {
      changePercent,
      acceleratorsThousand,
      result: calculateHbmDemand({
        ...input,
        acceleratorsThousand
      })
    }
  })
}

export function buildHbmContentSensitivityRows(
  input: HbmDemandInput,
  stackCapacitiesGb: number[] = [16, 24, 36, 48]
): HbmContentSensitivityRow[] {
  return stackCapacitiesGb.map((hbmCapacityGbPerStack) => ({
    hbmCapacityGbPerStack,
    result: calculateHbmDemand({
      ...input,
      hbmCapacityGbPerStack
    })
  }))
}

export function listHbmScenarioPresets(): HbmScenarioPreset[] {
  return hbmScenarioPresets.map((preset) => ({
    ...preset,
    input: { ...preset.input },
    sourceRefs: [...preset.sourceRefs],
    sources: [...preset.sourceRefs]
  }))
}

export function getHbmScenarioPreset(id: HbmScenarioPreset['id']): HbmScenarioPreset {
  const preset = hbmScenarioPresets.find((item) => item.id === id)

  if (!preset) {
    throw new Error(`Unknown HBM demand scenario preset: ${id}`)
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
