import { describe, expect, it } from 'vitest'
import {
  calculateSmartphoneMemoryDemand,
  formatCapacity,
  buildSensitivityRows,
  getScenarioPreset,
  listScenarioPresets
} from '../wiki/lib/smartphoneDemand'

describe('calculateSmartphoneMemoryDemand', () => {
  it('calculates weighted average DRAM/NAND and total demand from entry/mainstream/premium segment assumptions', () => {
    const result = calculateSmartphoneMemoryDemand({
      shipmentsMillion: 1000,
      entrySharePercent: 50,
      mainstreamSharePercent: 30,
      premiumSharePercent: 20,
      entryDramGb: 4,
      mainstreamDramGb: 8,
      premiumDramGb: 12,
      entryNandGb: 128,
      mainstreamNandGb: 256,
      premiumNandGb: 512
    })

    expect(result.segmentShares.entry).toBe(50)
    expect(result.segmentShares.mainstream).toBe(30)
    expect(result.segmentShares.premium).toBe(20)
    expect(result.weightedAverageDramGb).toBe(6.8)
    expect(result.weightedAverageNandGb).toBe(243.2)
    expect(result.totalDramGb).toBe(6_800_000_000)
    expect(result.totalNandGb).toBe(243_200_000_000)
    expect(result.totalDramPb).toBe(6_800)
    expect(result.totalNandPb).toBe(243_200)
  })

  it('normalizes segment shares when the three inputs do not add to 100', () => {
    const result = calculateSmartphoneMemoryDemand({
      shipmentsMillion: 100,
      entrySharePercent: 20,
      mainstreamSharePercent: 20,
      premiumSharePercent: 60,
      entryDramGb: 4,
      mainstreamDramGb: 8,
      premiumDramGb: 16,
      entryNandGb: 128,
      mainstreamNandGb: 256,
      premiumNandGb: 1024
    })

    expect(result.segmentShares.entry).toBe(20)
    expect(result.segmentShares.mainstream).toBe(20)
    expect(result.segmentShares.premium).toBe(60)

    const normalized = calculateSmartphoneMemoryDemand({
      shipmentsMillion: 100,
      entrySharePercent: 1,
      mainstreamSharePercent: 1,
      premiumSharePercent: 3,
      entryDramGb: 4,
      mainstreamDramGb: 8,
      premiumDramGb: 16,
      entryNandGb: 128,
      mainstreamNandGb: 256,
      premiumNandGb: 1024
    })

    expect(normalized.segmentShares.entry).toBe(20)
    expect(normalized.segmentShares.mainstream).toBe(20)
    expect(normalized.segmentShares.premium).toBe(60)
    expect(normalized.weightedAverageDramGb).toBe(result.weightedAverageDramGb)
    expect(normalized.weightedAverageNandGb).toBe(result.weightedAverageNandGb)
  })

  it('falls back to an entry-only mix when all segment shares are zero or invalid', () => {
    const result = calculateSmartphoneMemoryDemand({
      shipmentsMillion: 10,
      entrySharePercent: 0,
      mainstreamSharePercent: 0,
      premiumSharePercent: Number.NaN,
      entryDramGb: 4,
      mainstreamDramGb: 8,
      premiumDramGb: 16,
      entryNandGb: 128,
      mainstreamNandGb: 256,
      premiumNandGb: 1024
    })

    expect(result.segmentShares.entry).toBe(100)
    expect(result.segmentShares.mainstream).toBe(0)
    expect(result.segmentShares.premium).toBe(0)
    expect(result.weightedAverageDramGb).toBe(4)
    expect(result.weightedAverageNandGb).toBe(128)
  })
})

describe('formatCapacity', () => {
  it('formats large GB values into readable capacity units', () => {
    expect(formatCapacity(6_800_000_000)).toBe('6,800.00 PB')
    expect(formatCapacity(243_200_000_000)).toBe('243.20 EB')
  })
})

describe('scenario presets', () => {
  it('lists source-backed example presets for entry, mainstream, and premium devices', () => {
    const presets = listScenarioPresets()

    expect(presets.map((preset) => preset.id)).toEqual([
      'entry-reference',
      'mainstream-reference',
      'premium-reference',
      'on-device-ai-2026-reference'
    ])
    expect(presets.every((preset) => preset.sources.length > 0)).toBe(true)

    const aiPhone = getScenarioPreset('on-device-ai-2026-reference')
    expect(aiPhone.input.premiumDramGb).toBe(12)
    expect(aiPhone.input.premiumNandGb).toBe(512)
    expect(aiPhone.sources).toContain('raw/articles/on-device-ai-smartphone-dram-content-2026.md')
  })

  it('uses explicit entry/mainstream/premium shares and content anchors in presets', () => {
    const preset = getScenarioPreset('premium-reference')

    expect(preset.input.entrySharePercent).toBe(20)
    expect(preset.input.mainstreamSharePercent).toBe(35)
    expect(preset.input.premiumSharePercent).toBe(45)
    expect(preset.input.entryDramGb).toBe(4)
    expect(preset.input.mainstreamDramGb).toBe(8)
    expect(preset.input.premiumDramGb).toBe(12)
    expect(preset.input.premiumNandGb).toBe(512)
  })

  it('returns a defensive copy of a preset input', () => {
    const preset = getScenarioPreset('premium-reference')

    expect(preset.input.premiumDramGb).toBe(12)
    expect(preset.input.premiumNandGb).toBe(512)

    preset.input.premiumDramGb = 99

    expect(getScenarioPreset('premium-reference').input.premiumDramGb).toBe(12)
  })
})

describe('buildSensitivityRows', () => {
  it('keeps segment shares and content fixed while varying shipments', () => {
    const rows = buildSensitivityRows(
      {
        shipmentsMillion: 1000,
        entrySharePercent: 50,
        mainstreamSharePercent: 30,
        premiumSharePercent: 20,
        entryDramGb: 4,
        mainstreamDramGb: 8,
        premiumDramGb: 12,
        entryNandGb: 128,
        mainstreamNandGb: 256,
        premiumNandGb: 512
      },
      [-10, 0, 10]
    )

    expect(rows.map((row) => row.shipmentsMillion)).toEqual([900, 1000, 1100])
    expect(rows.map((row) => row.result.weightedAverageDramGb)).toEqual([6.8, 6.8, 6.8])
  })
})
