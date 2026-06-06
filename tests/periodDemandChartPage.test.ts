import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('..', import.meta.url))

function readRepoFile(relativePath: string) {
  return readFileSync(join(repoRoot, relativePath), 'utf8')
}

describe('period demand chart page', () => {
  it('exposes the reference-backed period demand chart as a dedicated chart page', () => {
    const chartsPage = readRepoFile('wiki/charts.md')
    const config = readRepoFile('wiki/.vitepress/config.ts')

    expect(chartsPage).toContain('<PeriodDemandChart />')
    expect(config).toContain("{ text: 'Charts', link: '/charts' }")
  })

  it('keeps Home as a gateway instead of the only period demand graph surface', () => {
    const home = readRepoFile('wiki/index.md')

    expect(home).toContain('/charts')
    expect(home).not.toContain('<DatasetChartsPanel />')
  })

  it('uses Chart.js through vue-chartjs instead of a hand-rolled SVG chart', () => {
    const component = readRepoFile('wiki/components/PeriodDemandChart.vue')
    const packageJson = readRepoFile('package.json')

    expect(component).toContain("from 'chart.js'")
    expect(component).toContain("from 'vue-chartjs'")
    expect(component).toContain('ChartJS.register')
    expect(component).toContain('<Line :data="lineChartData" :options="lineChartOptions" />')
    expect(component).toContain('<Bar :data="taxonomyChartData" :options="taxonomyChartOptions" />')
    expect(component).not.toContain('<svg class="history-chart"')
    expect(packageJson).toContain('chart.js')
    expect(packageJson).toContain('vue-chartjs')
  })

  it('prioritizes chart reading width over a cramped side-by-side chart column', () => {
    const component = readRepoFile('wiki/components/PeriodDemandChart.vue')

    expect(component).toContain('.chart-workbench { display: grid; grid-template-columns: 1fr;')
    expect(component).toContain('.detail-card { display: grid;')
  })

  it('shows all history without the meaningless until-year filter', () => {
    const component = readRepoFile('wiki/components/PeriodDemandChart.vue')

    expect(component).not.toContain('selectedYear')
    expect(component).not.toContain('년까지 보기')
    expect(component).not.toContain('history year scrubber')
    expect(component).not.toContain('type="range"')
  })

  it('renders chart-library tooltip callbacks with selected point values', () => {
    const component = readRepoFile('wiki/components/PeriodDemandChart.vue')

    expect(component).toContain('tooltip:')
    expect(component).toContain('callbacks:')
    expect(component).toContain('formatFormula(row)')
    expect(component).toContain('onClick: (_event, elements, chart)')
  })

  it('surfaces the expanded demand domain taxonomy on the chart page', () => {
    const component = readRepoFile('wiki/components/PeriodDemandChart.vue')
    const schema = readRepoFile('wiki/SCHEMA.md')

    expect(component).toContain('domainTaxonomy')
    expect(component).toContain('Segment diversity')
    expect(component).toContain('taxonomyChartData')
    expect(component).toContain('richSegmentLabels')
    expect(component).toContain('Demand domain taxonomy')
    expect(component).toContain('taxonomy-grid')
    expect(component).toContain('forecast-driver')
    expect(schema).toContain('- ai-accelerator')
    expect(schema).toContain('- enterprise-storage')
    expect(schema).toContain('- graphics-gaming')
    expect(schema).toContain('- edge-ai')
    expect(schema).toContain('- wearables')
    expect(schema).toContain('- hpc')
  })
})
