import { describe, expect, it } from 'vitest'
import simulatorPresets from '../wiki/data/simulator-presets.json'
import { listHbmScenarioPresets } from '../wiki/lib/hbmDemand'
import { listNandSsdScenarioPresets } from '../wiki/lib/nandSsdDemand'
import { listPcDramScenarioPresets } from '../wiki/lib/pcDramDemand'
import { listScenarioPresets } from '../wiki/lib/smartphoneDemand'

const domains = ['smartphone', 'pc-dram', 'hbm', 'nand-ssd'] as const

describe('source-backed simulator preset catalog', () => {
  it('keeps simulator presets in a shared JSON file with confidence and sourceRefs', () => {
    expect(Object.keys(simulatorPresets)).toEqual(domains)

    for (const domain of domains) {
      const presets = simulatorPresets[domain]
      expect(presets.length).toBeGreaterThan(0)
      expect(presets.every((preset) => ['low', 'medium', 'high'].includes(preset.confidence))).toBe(true)
      expect(presets.every((preset) => preset.sourceRefs.length > 0)).toBe(true)
      expect(presets.every((preset) => !('sources' in preset))).toBe(true)
    }
  })

  it('exposes confidence and sourceRefs through each simulator preset API', () => {
    const allPresets = [
      ...listScenarioPresets(),
      ...listPcDramScenarioPresets(),
      ...listHbmScenarioPresets(),
      ...listNandSsdScenarioPresets()
    ]

    expect(allPresets.every((preset) => ['low', 'medium', 'high'].includes(preset.confidence))).toBe(true)
    expect(allPresets.every((preset) => preset.sourceRefs.length > 0)).toBe(true)

    const pcBaseline = listPcDramScenarioPresets().find((preset) => preset.id === 'baseline-pc-reference')
    expect(pcBaseline?.sourceRefs).toContain('raw/datasets/pc-server-shipments.md')
    expect(pcBaseline?.confidence).toBe('low')
  })
})
