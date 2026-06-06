import { describe, expect, it } from 'vitest'
import {
  calculateLongTailDomainDemand,
  getLongTailDomainPreset,
  listLongTailDomainPresets
} from '../wiki/lib/longTailDomainDemand'

describe('long-tail domain demand model', () => {
  it('turns automotive L4 content anchors into a DRAM/NAND demand sensitivity bucket', () => {
    const preset = getLongTailDomainPreset('automotive-l4-memory-reference')
    const result = calculateLongTailDomainDemand(preset.input)

    expect(result.totalDramEb).toBeGreaterThan(1.5)
    expect(result.totalNandEb).toBeGreaterThan(5)
    expect(result.segmentResults.find((segment) => segment.id === 'l4-memory-rich-car')?.dramEb).toBeGreaterThan(1)
    expect(result.interpretation).toContain('scenario')
  })

  it('separates non-AI-server HBM from DRAM and NAND for networking/HPC buckets', () => {
    const preset = getLongTailDomainPreset('networking-hpc-hbm-reference')
    const result = calculateLongTailDomainDemand(preset.input)

    expect(result.totalHbmEb).toBeGreaterThan(0.01)
    expect(result.totalDramEb).toBeGreaterThan(0.05)
    expect(result.memoryMix.hbmPct).toBeGreaterThan(5)
  })

  it('returns defensive copies of source-backed long-tail presets', () => {
    const [firstPreset] = listLongTailDomainPresets()
    firstPreset.input.segments[0].dramGbPerUnit = 999999
    firstPreset.sourceRefs.push('raw/fake.md')

    const freshPreset = getLongTailDomainPreset(firstPreset.id)
    expect(freshPreset.input.segments[0].dramGbPerUnit).not.toBe(999999)
    expect(freshPreset.sourceRefs).not.toContain('raw/fake.md')
  })

  it('clamps invalid segment values before calculating EB contribution', () => {
    const result = calculateLongTailDomainDemand({
      segments: [
        {
          id: 'bad-input',
          label: 'Bad input',
          unitsMillion: Number.NaN,
          attachRatePercent: 999,
          dramGbPerUnit: -10,
          nandGbPerUnit: 10,
          hbmGbPerUnit: 5
        }
      ]
    })

    expect(result.totalDramEb).toBe(0)
    expect(result.totalNandEb).toBe(0)
    expect(result.totalHbmEb).toBe(0)
  })
})
