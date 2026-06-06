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

  it('scales low-EB DRAM values against the visible data instead of a hard 1 EB floor', () => {
    const component = readRepoFile('wiki/components/PeriodDemandChart.vue')

    expect(component).toContain('visibleMaxValue')
    expect(component).not.toContain('Math.max(...visibleRows.value.map(valueOf), 1)')
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

  it('renders a hover tooltip with the selected point y value', () => {
    const component = readRepoFile('wiki/components/PeriodDemandChart.vue')

    expect(component).toContain('tooltipPoint')
    expect(component).toContain('chart-tooltip')
    expect(component).toContain('{{ formatValue(tooltipPoint) }}')
    expect(component).toContain('@mouseleave="tooltipPoint = undefined"')
  })

  it('surfaces the expanded demand domain taxonomy on the chart page', () => {
    const component = readRepoFile('wiki/components/PeriodDemandChart.vue')
    const schema = readRepoFile('wiki/SCHEMA.md')

    expect(component).toContain('domainTaxonomy')
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
