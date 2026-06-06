import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

function readRepoFile(relativePath: string) {
  return readFileSync(join(repoRoot, relativePath), 'utf8')
}

const simulatorComponents = [
  'wiki/components/HbmDemandSimulator.vue',
  'wiki/components/NandSsdDemandSimulator.vue',
  'wiki/components/PcDramDemandSimulator.vue',
  'wiki/components/SmartphoneMemoryDemandSimulator.vue'
]

describe('simulator workbench UX', () => {
  it('puts simulator components before long explanatory formula sections on simulator pages', () => {
    const pages = [
      ['wiki/simulators/hbm-demand.md', '<HbmDemandSimulator />'],
      ['wiki/simulators/pc-dram-demand.md', '<PcDramDemandSimulator />'],
      ['wiki/simulators/nand-ssd-demand.md', '<NandSsdDemandSimulator />'],
      ['wiki/simulators/smartphone-memory-demand.md', '<SmartphoneMemoryDemandSimulator />']
    ] as const

    for (const [pagePath, componentTag] of pages) {
      const page = readRepoFile(pagePath)
      expect(page.indexOf(componentTag)).toBeGreaterThan(-1)
      expect(page.indexOf(componentTag)).toBeLessThan(page.indexOf('## 공식'))
    }
  })

  it('exposes a result-first workbench shell with sticky KPI summary in every simulator', () => {
    for (const componentPath of simulatorComponents) {
      const component = readRepoFile(componentPath)
      expect(component).toContain('simulator-workbench')
      expect(component).toContain('workbench-main')
      expect(component).toContain('result-rail')
      expect(component).toContain('sticky-result-panel')
      expect(component).toContain('Primary result')
    }
  })

  it('uses slider or segmented quick controls instead of number-only assumptions', () => {
    for (const componentPath of simulatorComponents) {
      const component = readRepoFile(componentPath)
      expect(component).toContain('control-row')
      expect(component).toContain('type="range"')
      expect(component).toContain('quick-chip')
      expect(component).toContain('Impact')
    }
  })

  it('shows preset comparison and visual sensitivity charts before exact tables', () => {
    for (const componentPath of simulatorComponents) {
      const component = readRepoFile(componentPath)
      expect(component).toContain('preset-comparison')
      expect(component).toContain('Apply scenario')
      expect(component).toContain('sensitivity-bars')
      expect(component).toContain('Exact values')
    }
  })

  it('turns the simulator index into a tool hub rather than a plain link list', () => {
    const index = readRepoFile('wiki/simulators/index.md')

    expect(index).toContain('simulator-hub')
    expect(index).toContain('Assumption Workbench')
    expect(index).toContain('Units × Mix × Content × Realization')
    expect(index).toContain('tool-card')
  })
})
