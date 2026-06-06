export interface SmartphoneSegmentMix {
  entry: number
  mainstream: number
  premium: number
}

export interface SmartphoneDemandInput {
  shipmentsMillion: number
  entrySharePercent: number
  mainstreamSharePercent: number
  premiumSharePercent: number
  entryDramGb: number
  mainstreamDramGb: number
  premiumDramGb: number
  entryNandGb: number
  mainstreamNandGb: number
  premiumNandGb: number
}

export interface SmartphoneDemandResult {
  segmentShares: SmartphoneSegmentMix
  entryShare: number
  mainstreamShare: number
  premiumShare: number
  weightedAverageDramGb: number
  weightedAverageNandGb: number
  totalDramGb: number
  totalNandGb: number
  totalDramPb: number
  totalNandPb: number
}

export interface SensitivityRow {
  changePercent: number
  shipmentsMillion: number
  result: SmartphoneDemandResult
}

export interface ScenarioPreset {
  id: 'entry-reference' | 'mainstream-reference' | 'premium-reference' | 'on-device-ai-2026-reference'
  label: string
  description: string
  input: SmartphoneDemandInput
  sources: string[]
}

const scenarioPresets: ScenarioPreset[] = [
  {
    id: 'entry-reference',
    label: 'Entry reference',
    description: 'Entry-heavy mix anchored to Galaxy A16 5G storage/RAM examples; not a market-weighted forecast.',
    input: {
      shipmentsMillion: 1200,
      entrySharePercent: 70,
      mainstreamSharePercent: 20,
      premiumSharePercent: 10,
      entryDramGb: 4,
      mainstreamDramGb: 8,
      premiumDramGb: 12,
      entryNandGb: 128,
      mainstreamNandGb: 256,
      premiumNandGb: 256
    },
    sources: [
      'raw/articles/gsmarena-samsung-galaxy-a16-5g-specs.md',
      'raw/articles/gsmarena-samsung-galaxy-a56-specs.md',
      'raw/articles/gsmarena-samsung-galaxy-s25-specs.md'
    ]
  },
  {
    id: 'mainstream-reference',
    label: 'Mainstream reference',
    description: 'Balanced mix anchored to Galaxy A56 and A16 5G examples; useful as a neutral starter scenario.',
    input: {
      shipmentsMillion: 1200,
      entrySharePercent: 40,
      mainstreamSharePercent: 35,
      premiumSharePercent: 25,
      entryDramGb: 4,
      mainstreamDramGb: 8,
      premiumDramGb: 12,
      entryNandGb: 128,
      mainstreamNandGb: 256,
      premiumNandGb: 256
    },
    sources: [
      'raw/articles/gsmarena-samsung-galaxy-a16-5g-specs.md',
      'raw/articles/gsmarena-samsung-galaxy-a56-specs.md',
      'raw/articles/gsmarena-samsung-galaxy-s25-specs.md'
    ]
  },
  {
    id: 'premium-reference',
    label: 'Premium reference',
    description: 'Premiumization mix anchored to Galaxy S25 and A56 examples; emphasizes higher DRAM/storage content.',
    input: {
      shipmentsMillion: 1200,
      entrySharePercent: 20,
      mainstreamSharePercent: 35,
      premiumSharePercent: 45,
      entryDramGb: 4,
      mainstreamDramGb: 8,
      premiumDramGb: 12,
      entryNandGb: 128,
      mainstreamNandGb: 256,
      premiumNandGb: 512
    },
    sources: [
      'raw/articles/gsmarena-samsung-galaxy-a16-5g-specs.md',
      'raw/articles/gsmarena-samsung-galaxy-a56-specs.md',
      'raw/articles/gsmarena-samsung-galaxy-s25-specs.md'
    ]
  },
  {
    id: 'on-device-ai-2026-reference',
    label: 'On-device AI 2026 reference',
    description: 'Source-backed smartphone AI content candidate using 12GB premium DRAM and higher NAND cache/storage anchors; not a market forecast.',
    input: {
      shipmentsMillion: 1200,
      entrySharePercent: 15,
      mainstreamSharePercent: 40,
      premiumSharePercent: 45,
      entryDramGb: 4,
      mainstreamDramGb: 8,
      premiumDramGb: 12,
      entryNandGb: 128,
      mainstreamNandGb: 256,
      premiumNandGb: 512
    },
    sources: [
      'raw/articles/on-device-ai-smartphone-dram-content-2026.md',
      'raw/articles/trendforce-smartphone-storage-capacity-2026.md',
      'raw/datasets/memory-content-per-device.md'
    ]
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

function normalizeSegmentShares(input: SmartphoneDemandInput): SmartphoneSegmentMix {
  const rawEntry = clamp(input.entrySharePercent, 0, 100)
  const rawMainstream = clamp(input.mainstreamSharePercent, 0, 100)
  const rawPremium = clamp(input.premiumSharePercent, 0, 100)
  const total = rawEntry + rawMainstream + rawPremium

  if (total <= 0) {
    return {
      entry: 100,
      mainstream: 0,
      premium: 0
    }
  }

  return {
    entry: round((rawEntry / total) * 100, 2),
    mainstream: round((rawMainstream / total) * 100, 2),
    premium: round((rawPremium / total) * 100, 2)
  }
}

const nonNegative = (value: number): number => Math.max(0, Number.isNaN(value) ? 0 : value)

export function calculateSmartphoneMemoryDemand(input: SmartphoneDemandInput): SmartphoneDemandResult {
  const shipmentsMillion = nonNegative(input.shipmentsMillion)
  const segmentShares = normalizeSegmentShares(input)
  const entryShare = segmentShares.entry / 100
  const mainstreamShare = segmentShares.mainstream / 100
  const premiumShare = segmentShares.premium / 100

  const weightedAverageDramGb = round(
    entryShare * nonNegative(input.entryDramGb) +
      mainstreamShare * nonNegative(input.mainstreamDramGb) +
      premiumShare * nonNegative(input.premiumDramGb),
    2
  )

  const weightedAverageNandGb = round(
    entryShare * nonNegative(input.entryNandGb) +
      mainstreamShare * nonNegative(input.mainstreamNandGb) +
      premiumShare * nonNegative(input.premiumNandGb),
    2
  )

  const totalDramGb = round(shipmentsMillion * 1_000_000 * weightedAverageDramGb, 0)
  const totalNandGb = round(shipmentsMillion * 1_000_000 * weightedAverageNandGb, 0)

  return {
    segmentShares,
    entryShare: segmentShares.entry,
    mainstreamShare: segmentShares.mainstream,
    premiumShare: segmentShares.premium,
    weightedAverageDramGb,
    weightedAverageNandGb,
    totalDramGb,
    totalNandGb,
    totalDramPb: round(totalDramGb / 1_000_000, 2),
    totalNandPb: round(totalNandGb / 1_000_000, 2)
  }
}

export function buildSensitivityRows(
  input: SmartphoneDemandInput,
  changesPercent: number[] = [-20, -10, 0, 10, 20]
): SensitivityRow[] {
  return changesPercent.map((changePercent) => {
    const shipmentsMillion = round(input.shipmentsMillion * (1 + changePercent / 100), 2)
    return {
      changePercent,
      shipmentsMillion,
      result: calculateSmartphoneMemoryDemand({
        ...input,
        shipmentsMillion
      })
    }
  })
}

export function listScenarioPresets(): ScenarioPreset[] {
  return scenarioPresets.map((preset) => ({
    ...preset,
    input: { ...preset.input },
    sources: [...preset.sources]
  }))
}

export function getScenarioPreset(id: ScenarioPreset['id']): ScenarioPreset {
  const preset = scenarioPresets.find((item) => item.id === id)

  if (!preset) {
    throw new Error(`Unknown smartphone demand scenario preset: ${id}`)
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

  // Keep sub-100 EB values in PB so demand changes remain visually comparable in early examples.
  if (absGb >= 100_000_000_000) {
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
