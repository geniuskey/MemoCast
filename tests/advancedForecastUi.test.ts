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
    expect(component).toContain('csv-derived-preset-strip')
    expect(component).toContain('sia-nowcast-chart')
    expect(component).toContain('buildCsvDerivedAdvancedForecastPresets')
    expect(component).toContain('buildSiaNowcastTimeSeries')
    expect(component).toContain('buildInstitutionWeightedEnsemble')
    expect(component).toContain('calculateHbmBomStress')
    expect(component).toContain('interactive-polish-grid')
    expect(component).toContain('HBM/BOM stress controls')
    expect(component).toContain("import { useFullscreenElement } from '../lib/useFullscreen'")
    expect(component).toContain('ref="advancedForecastRoot"')
    expect(component).toContain("'is-fullscreen': isFullscreen")
    expect(component).toContain('advanced-fullscreen-toggle')
    expect(component).toContain('@click="toggleFullscreen"')
    expect(component).toContain("isFullscreen ? '전체화면 종료' : '전체화면'")
    expect(page).toContain('<ClientOnly>')
    expect(page).toContain('<AdvancedDemandForecastSimulator />')
    expect(method).toContain('S-curve adoption')
    expect(method).toContain('price-inventory-cycle')
    expect(method).toContain('supply-realization')
    expect(config).toContain("{ text: 'Advanced Forecast', link: '/simulators/advanced-demand-forecast' }")
    expect(theme).toContain("import AdvancedDemandForecastSimulator")
    expect(theme).toContain("app.component('AdvancedDemandForecastSimulator', AdvancedDemandForecastSimulator)")
  })

  it('keeps the fullscreen cockpit hero in normal document flow instead of overlaying content', () => {
    const component = readRepoFile('wiki/components/AdvancedDemandForecastSimulator.vue')

    expect(component).toContain('.advanced-forecast-workbench.is-fullscreen')
    expect(component).not.toContain('.advanced-forecast-workbench.is-fullscreen .forecast-hero {\n  position: sticky')
    expect(component).not.toContain('.advanced-forecast-workbench.is-fullscreen .forecast-hero {\n  position: fixed')
  })

  it('renders the multi-year forecast path with Chart.js index tooltips', () => {
    const component = readRepoFile('wiki/components/AdvancedDemandForecastSimulator.vue')

    expect(component).toContain("import { Line } from 'vue-chartjs'")
    expect(component).toContain("from 'chart.js'")
    expect(component).toContain('ChartJS.register')
    expect(component).toContain('forecastChartData')
    expect(component).toContain('forecastChartOptions')
    expect(component).toContain('forecast-chart-canvas')
    expect(component).toContain('mode: \'index\'')
    expect(component).toContain('intersect: false')
    expect(component).toContain('Unconstrained demand')
    expect(component).toContain('Supply-realized demand')
    expect(component).toContain('Unmet demand')
    expect(component).toContain('Weighted ensemble demand')
    expect(component).toContain('BOM stress demand')
    expect(component).toContain('institutionWeightedEnsemble.value.forecast.rows.map')
    expect(component).toContain('hbmBomStressChartRows.value.map')
    expect(component).toContain('hbmBomStressPeakEffectiveDemandEb')
    expect(component).toContain('forecast-control-impact-summary')
    expect(component).toContain('Controls currently linked to chart')
    expect(component).not.toContain('v-for="row in forecast.rows" :key="row.year" class="year-row"')
  })

  it('promotes the simulator hub from simple calculators to an integrated forecast cockpit', () => {
    const index = readRepoFile('wiki/simulators/index.md')

    expect(index).toContain('Advanced Forecast Cockpit')
    expect(index).toContain('End demand × adoption × cycle × supply realization')
    expect(index).toContain('/simulators/advanced-demand-forecast')
  })
})
