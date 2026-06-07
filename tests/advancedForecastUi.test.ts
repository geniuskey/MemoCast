import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

function readRepoFile(relativePath: string) {
  return readFileSync(join(repoRoot, relativePath), 'utf8')
}

describe('advanced forecasting surface', () => {
  it('exposes a high-dimensional forecast simulator and method page', () => {
    const component = readRepoFile('wiki/components/AdvancedDemandForecastSimulator.vue')
    const page = readRepoFile('wiki/simulators/advanced-demand-forecast.md')
    const method = readRepoFile('wiki/methods/advanced-demand-forecast-engine.md')
    const config = readRepoFile('wiki/.vitepress/config.ts')
    const theme = readRepoFile('wiki/.vitepress/theme/index.ts')

    expect(component).toContain('advanced-forecast-workbench')
    expect(component).toContain('Unconstrained demand')
    expect(component).toContain('Supply-realized demand')
    expect(component).toContain('Unmet demand')
    expect(component).toContain('driver-stack')
    expect(component).toContain('preset.sourceRefs')
    expect(page).toContain('<AdvancedDemandForecastSimulator />')
    expect(method).toContain('S-curve adoption')
    expect(method).toContain('price-inventory-cycle')
    expect(method).toContain('supply-realization')
    expect(config).toContain("{ text: 'Advanced Forecast', link: '/simulators/advanced-demand-forecast' }")
    expect(theme).toContain("import AdvancedDemandForecastSimulator")
    expect(theme).toContain("app.component('AdvancedDemandForecastSimulator', AdvancedDemandForecastSimulator)")
  })

  it('promotes the simulator hub from simple calculators to an integrated forecast cockpit', () => {
    const index = readRepoFile('wiki/simulators/index.md')

    expect(index).toContain('Advanced Forecast Cockpit')
    expect(index).toContain('End demand × adoption × cycle × supply realization')
    expect(index).toContain('/simulators/advanced-demand-forecast')
  })
})
