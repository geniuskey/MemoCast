<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import { Bar, Line } from 'vue-chartjs'
import chartData from '../public/dataset-charts.json'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

type PeriodDemandRow = {
  year: number
  segment: string
  memoryType: string
  demandEb?: number
  demandGbPerUnit?: number
  shipmentsMillionUnits?: number
  avgCapacityGb?: number
  confidence: string
  sourceRefs: string[]
  referenceNotes: string[]
  gpuModel?: string
  hbmType?: string
}

type ChartMode = 'dram-demand' | 'hbm-content'
type SegmentFilter = 'all' | string

type DomainTaxonomyRow = {
  domain: string
  group: string
  memoryTypes: string[]
  demandModel: string
  primaryDrivers: string[]
  sourceRefs: string[]
  confidence: string
  notes: string
}

type ChartPoint = PeriodDemandRow & {
  value: number
  label: string
  series: string
}

const periodDemandTimeline = chartData.periodDemandTimeline as PeriodDemandRow[]
const domainTaxonomy = chartData.domainTaxonomy as DomainTaxonomyRow[]
const mode = ref<ChartMode>('dram-demand')
const activeSegment = ref<SegmentFilter>('all')
const activePointKey = ref<string>('')

const demandSegments = computed(() => [...new Set(periodDemandTimeline.filter((row) => row.demandEb !== undefined).map((row) => row.segment))])
const hbmSegments = computed(() => [...new Set(periodDemandTimeline.filter((row) => row.demandGbPerUnit !== undefined).map((row) => row.gpuModel ? `${row.gpuModel} ${row.hbmType ?? ''}`.trim() : row.segment))])
const richSegmentLabels = computed(() => [
  ...demandSegments.value,
  ...domainTaxonomy.map((domain) => domainLabel(domain.domain))
])

const demandRows = computed(() => periodDemandTimeline
  .filter((row) => row.demandEb !== undefined)
  .filter((row) => activeSegment.value === 'all' || row.segment === activeSegment.value)
  .sort((a, b) => a.year - b.year || a.segment.localeCompare(b.segment)))

const hbmRows = computed(() => periodDemandTimeline
  .filter((row) => row.demandGbPerUnit !== undefined)
  .sort((a, b) => a.year - b.year || (a.gpuModel ?? '').localeCompare(b.gpuModel ?? '')))

const visibleRows = computed(() => mode.value === 'dram-demand' ? demandRows.value : hbmRows.value)
const chartTitle = computed(() => mode.value === 'dram-demand' ? 'DRAM period demand, EB' : 'AI GPU HBM content, GB/unit')
const unitLabel = computed(() => mode.value === 'dram-demand' ? 'EB' : 'GB/unit')
const valueLabel = computed(() => mode.value === 'dram-demand' ? '수요' : 'GPU당 HBM')

const activeRow = computed(() => {
  const rows = visibleRows.value
  return rows.find((row) => pointKey(row) === activePointKey.value) ?? rows.at(-1)
})
const sources = computed(() => [...new Set(visibleRows.value.flatMap((row) => row.sourceRefs))])
const storyRows = computed(() => visibleRows.value
  .slice()
  .sort((a, b) => b.year - a.year || valueOf(b) - valueOf(a))
  .slice(0, 8))

const chartPoints = computed<ChartPoint[]>(() => visibleRows.value.map((row) => ({
  ...row,
  value: valueOf(row),
  label: row.gpuModel ? `${row.gpuModel} ${row.hbmType ?? ''}`.trim() : row.segment,
  series: seriesName(row)
})))

const lineChartData = computed<ChartData<'line'>>(() => {
  const labels = [...new Set(chartPoints.value.map((point) => String(point.year)))].sort()
  const grouped = new Map<string, ChartPoint[]>()
  for (const point of chartPoints.value) grouped.set(point.series, [...(grouped.get(point.series) ?? []), point])

  return {
    labels,
    datasets: [...grouped.entries()].map(([series, points], index) => ({
      label: series,
      data: labels.map((year) => points.find((point) => String(point.year) === year)?.value ?? null),
      borderColor: seriesColor(series, index),
      backgroundColor: seriesColor(series, index, 0.18),
      pointBackgroundColor: seriesColor(series, index),
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 9,
      tension: 0.32,
      spanGaps: false
    }))
  }
})

const lineChartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'nearest', intersect: false },
  onClick: (_event, elements, chart) => {
    const element = elements[0]
    if (!element) return
    const dataset = chart.data.datasets[element.datasetIndex]
    const year = Number(chart.data.labels?.[element.index])
    const row = chartPoints.value.find((point) => point.series === dataset.label && point.year === year)
    if (row) activePointKey.value = pointKey(row)
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: { color: '#cbd5e1', boxWidth: 10, usePointStyle: true, font: { weight: 800 } }
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.94)',
      borderColor: 'rgba(255,255,255,0.18)',
      borderWidth: 1,
      callbacks: {
        label: (context) => `${context.dataset.label}: ${Number(context.parsed.y).toFixed(mode.value === 'dram-demand' ? 4 : 0)} ${unitLabel.value}`,
        afterLabel: (context) => {
          const year = Number(context.label)
          const row = chartPoints.value.find((point) => point.series === context.dataset.label && point.year === year)
          return row ? formatFormula(row) : ''
        }
      }
    }
  },
  scales: {
    x: { grid: { color: 'rgba(148, 163, 184, 0.12)' }, ticks: { color: '#cbd5e1', font: { weight: 800 } } },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(148, 163, 184, 0.16)' },
      ticks: { color: '#cbd5e1', callback: (value) => `${value} ${unitLabel.value}` }
    }
  }
}))

const taxonomyGroups = computed(() => {
  const groups = new Map<string, number>()
  for (const domain of domainTaxonomy) groups.set(domain.group, (groups.get(domain.group) ?? 0) + 1)
  return [...groups.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
})

const memoryTypeCounts = computed(() => {
  const memoryTypes = [...new Set(domainTaxonomy.flatMap((domain) => domain.memoryTypes))].sort()
  return memoryTypes.map((memoryType) => ({
    memoryType,
    count: domainTaxonomy.filter((domain) => domain.memoryTypes.includes(memoryType)).length
  })).sort((a, b) => b.count - a.count || a.memoryType.localeCompare(b.memoryType))
})

const taxonomyChartData = computed<ChartData<'bar'>>(() => ({
  labels: memoryTypeCounts.value.map((item) => item.memoryType),
  datasets: [{
    label: 'Domains using memory type',
    data: memoryTypeCounts.value.map((item) => item.count),
    backgroundColor: memoryTypeCounts.value.map((item, index) => seriesColor(item.memoryType, index, 0.74)),
    borderColor: memoryTypeCounts.value.map((item, index) => seriesColor(item.memoryType, index)),
    borderWidth: 1,
    borderRadius: 10
  }]
}))

const taxonomyChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.94)' }
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#334155', font: { weight: 800 } } },
    y: { beginAtZero: true, ticks: { precision: 0, color: '#64748b' }, grid: { color: 'rgba(148, 163, 184, 0.2)' } }
  }
}

function valueOf(row: PeriodDemandRow) {
  return row.demandEb ?? row.demandGbPerUnit ?? 0
}

function pointKey(row: PeriodDemandRow) {
  return `${row.year}-${row.segment}-${row.gpuModel ?? 'market'}`
}

function seriesName(row: PeriodDemandRow) {
  if (row.gpuModel) return row.gpuModel
  return row.segment
}

function seriesColor(series: string, index = 0, alpha = 1) {
  const palette: Record<string, [number, number, number]> = {
    'Smartphone DRAM': [56, 189, 248],
    'Server DRAM': [34, 197, 94],
    B200: [244, 114, 182],
    B300: [168, 85, 247],
    'Vera Rubin': [251, 146, 60],
    DRAM: [37, 99, 235],
    NAND: [14, 165, 233],
    HBM: [236, 72, 153],
    LPDDR: [34, 197, 94],
    GDDR: [245, 158, 11],
    CXL: [124, 58, 237]
  }
  const fallback = [[37, 99, 235], [124, 58, 237], [14, 165, 233], [217, 119, 6], [5, 150, 105]][index % 5]
  const [r, g, b] = palette[series] ?? fallback
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function formatValue(row?: PeriodDemandRow) {
  if (!row) return 'n/a'
  if (row.demandEb !== undefined) return `${row.demandEb.toFixed(4)} EB`
  return `${row.demandGbPerUnit} GB/unit`
}

function formatFormula(row?: PeriodDemandRow) {
  if (!row) return ''
  if (row.demandEb !== undefined) return `${row.shipmentsMillionUnits}M units × ${row.avgCapacityGb}GB ÷ 1,000,000 = ${row.demandEb.toFixed(4)} EB`
  return `${row.gpuModel} · ${row.hbmType} · ${row.demandGbPerUnit}GB per GPU`
}

function sourceLabel(source: string) {
  return source.replace('raw/datasets/', '').replace('raw/articles/', '').replace('raw/reports/', '').replace('raw/lectures/', '').replace('.md', '')
}

function domainLabel(domain: string) {
  return domain.split('-').map((word) => word === 'ai' ? 'AI' : word.toUpperCase() === word ? word : word[0].toUpperCase() + word.slice(1)).join(' ')
}
</script>

<template>
  <section class="period-chart-shell">
    <div class="chart-hero">
      <p class="chart-kicker">Chart.js powered interactive chart</p>
      <h1>기간별 메모리 수요 히스토리</h1>
      <p>
        raw CSV reference를 결합해 <strong>출하량 × device별 memory content</strong>로 DRAM 수요를 EB로 환산하고,
        HBM은 GPU 세대별 GB/unit roadmap으로 따로 추적합니다. Chart.js tooltip/legend/point click으로 근거와 계산식을 확인합니다.
      </p>
      <div class="mode-tabs" role="tablist" aria-label="period demand chart mode">
        <button :class="{ active: mode === 'dram-demand' }" @click="mode = 'dram-demand'">DRAM 수요 EB</button>
        <button :class="{ active: mode === 'hbm-content' }" @click="mode = 'hbm-content'">HBM GB/unit</button>
      </div>
      <div class="segment-strip" aria-label="Visible demand segments">
        <span v-for="segment in richSegmentLabels" :key="segment">{{ segment }}</span>
      </div>
    </div>

    <div class="chart-workbench">
      <div class="chart-card chart-card-main">
        <div class="chart-toolbar">
          <div>
            <p class="chart-kicker">{{ chartTitle }}</p>
            <h2>전체 히스토리</h2>
          </div>
          <label v-if="mode === 'dram-demand'" class="segment-filter">
            Segment
            <select v-model="activeSegment">
              <option value="all">All quantified DRAM segments</option>
              <option v-for="segment in demandSegments" :key="segment" :value="segment">{{ segment }}</option>
            </select>
          </label>
        </div>

        <div class="chartjs-frame">
          <ClientOnly>
            <Line :data="lineChartData" :options="lineChartOptions" />
          </ClientOnly>
        </div>

        <div class="legend-row">
          <span v-for="segment in mode === 'dram-demand' ? demandSegments : hbmSegments" :key="segment">
            <i class="swatch" :style="{ background: seriesColor(segment) }"></i>{{ segment }}
          </span>
        </div>
      </div>

      <aside class="chart-card detail-card" aria-live="polite">
        <p class="chart-kicker">Selected evidence</p>
        <h2>{{ activeRow?.year }} · {{ activeRow?.gpuModel ?? activeRow?.segment }}</h2>
        <div class="metric-tile">
          <span>{{ valueLabel }}</span>
          <strong>{{ formatValue(activeRow) }}</strong>
        </div>
        <p class="formula">{{ formatFormula(activeRow) }}</p>
        <div class="notes">
          <strong>Reference notes</strong>
          <ul>
            <li v-for="note in activeRow?.referenceNotes ?? []" :key="note">{{ note }}</li>
          </ul>
        </div>
        <div class="source-chips">
          <a v-for="source in activeRow?.sourceRefs ?? []" :key="source" href="/sources/raw-source-map">
            {{ sourceLabel(source) }}
          </a>
        </div>
      </aside>
    </div>

    <section class="segment-panel">
      <div>
        <p class="chart-kicker">Segment diversity</p>
        <h2>14개 end-market과 memory type 분포</h2>
        <p>
          정량 timeline은 아직 Smartphone / Server / HBM 중심이지만, taxonomy layer는 PC, AI accelerator, enterprise storage,
          graphics, automotive, networking, edge AI, AR/VR, HPC 등 다음 모델링 후보를 함께 보여줍니다.
        </p>
      </div>
      <div class="segment-chart-card">
        <ClientOnly>
          <Bar :data="taxonomyChartData" :options="taxonomyChartOptions" />
        </ClientOnly>
      </div>
      <div class="group-chip-row">
        <span v-for="[group, count] in taxonomyGroups" :key="group">{{ group }} · {{ count }}</span>
      </div>
    </section>

    <div class="history-panel">
      <div>
        <p class="chart-kicker">History UX</p>
        <h2>연도별 변곡점을 카드로 훑기</h2>
        <p>주요 수요·content 변곡점을 카드로 고정해 차트와 같은 근거를 빠르게 확인할 수 있습니다.</p>
      </div>
      <div class="story-grid">
        <button
          v-for="row in storyRows"
          :key="pointKey(row)"
          :class="['story-card', { active: activeRow && pointKey(row) === pointKey(activeRow) }]"
          @click="activePointKey = pointKey(row)"
        >
          <span>{{ row.year }} · {{ row.gpuModel ?? row.segment }}</span>
          <strong>{{ formatValue(row) }}</strong>
          <small>{{ row.referenceNotes[0] }}</small>
        </button>
      </div>
    </div>

    <section class="taxonomy-panel">
      <div class="taxonomy-heading">
        <p class="chart-kicker">Demand domain taxonomy</p>
        <h2>Smartphone / PC / Server를 넘는 수요 분류</h2>
        <p>
          MemoCast는 end-market별로 memory product와 forecast-driver가 다르다고 보고,
          각 domain을 별도 demand equation 후보로 추적합니다.
        </p>
      </div>
      <div class="taxonomy-grid">
        <article v-for="domain in domainTaxonomy" :key="domain.domain" class="taxonomy-card">
          <div class="taxonomy-card-head">
            <span>{{ domain.group }}</span>
            <strong>{{ domainLabel(domain.domain) }}</strong>
          </div>
          <p>{{ domain.notes }}</p>
          <div class="memory-chip-row">
            <i v-for="memoryType in domain.memoryTypes" :key="memoryType">{{ memoryType }}</i>
          </div>
          <dl class="forecast-driver">
            <div>
              <dt>Model</dt>
              <dd>{{ domain.demandModel }}</dd>
            </div>
            <div>
              <dt>Drivers</dt>
              <dd>{{ domain.primaryDrivers.join(' · ') }}</dd>
            </div>
          </dl>
          <div class="source-chips taxonomy-sources">
            <a v-for="source in domain.sourceRefs" :key="source" href="/sources/raw-source-map">
              {{ sourceLabel(source) }}
            </a>
          </div>
        </article>
      </div>
    </section>

    <div class="reference-band">
      <span v-for="source in sources" :key="source">{{ sourceLabel(source) }}</span>
    </div>
  </section>
</template>

<style scoped>
.period-chart-shell { margin: 8px 0 40px; }
.chart-hero { padding: clamp(24px, 4vw, 46px); border: 1px solid rgba(37, 99, 235, .16); border-radius: 30px; background: radial-gradient(circle at top left, rgba(59,130,246,.18), transparent 36%), linear-gradient(135deg, #f8fafc, #eff6ff); box-shadow: 0 24px 90px rgba(15,23,42,.08); }
.chart-kicker { margin: 0 0 8px; color: #2563eb; font-size: 12px; font-weight: 900; letter-spacing: .14em; text-transform: uppercase; }
.chart-hero h1 { margin: 0; max-width: 980px; font-size: clamp(36px, 6vw, 72px); line-height: .98; letter-spacing: -.06em; }
.chart-hero p { max-width: 980px; color: #475569; line-height: 1.75; }
.mode-tabs { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
.mode-tabs button, .story-card { cursor: pointer; border: 0; font: inherit; }
.mode-tabs button { padding: 11px 16px; border-radius: 999px; color: #1e293b; background: rgba(255,255,255,.82); box-shadow: inset 0 0 0 1px rgba(15,23,42,.08); font-weight: 850; }
.mode-tabs button.active { color: #fff; background: linear-gradient(135deg, #2563eb, #7c3aed); }
.segment-strip, .group-chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.segment-strip span, .group-chip-row span { padding: 7px 10px; border-radius: 999px; color: #1d4ed8; background: rgba(219, 234, 254, .82); font-size: 11px; font-weight: 900; }
.chart-workbench { display: grid; grid-template-columns: 1fr; gap: 18px; margin-top: 20px; }
.chart-card { border: 1px solid rgba(15,23,42,.1); border-radius: 26px; background: rgba(255,255,255,.92); box-shadow: 0 18px 60px rgba(15,23,42,.08); }
.chart-card-main { padding: clamp(16px, 3vw, 26px); overflow: hidden; }
.chart-toolbar { display: flex; justify-content: space-between; gap: 16px; align-items: start; }
.chart-toolbar h2, .detail-card h2, .history-panel h2, .segment-panel h2 { margin: 0; letter-spacing: -.03em; }
.segment-filter { display: grid; gap: 6px; color: #64748b; font-size: 12px; font-weight: 800; text-transform: uppercase; }
.segment-filter select { min-width: 230px; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 14px; background: #fff; color: #0f172a; font: inherit; text-transform: none; }
.chartjs-frame { height: clamp(360px, 52vw, 520px); margin-top: 14px; padding: 16px; border-radius: 24px; background: linear-gradient(180deg, #0f172a, #1e293b); }
.legend-row, .reference-band, .source-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.legend-row { margin-top: 12px; color: #475569; font-size: 12px; font-weight: 800; }
.swatch { display: inline-block; width: 10px; height: 10px; margin-right: 6px; border-radius: 999px; }
.detail-card { display: grid; grid-template-columns: minmax(220px, .65fr) minmax(240px, 1fr) minmax(220px, .8fr); gap: 16px; align-items: start; padding: 22px; }
.detail-card .chart-kicker, .detail-card h2 { grid-column: 1 / -1; }
.metric-tile { margin: 18px 0; padding: 18px; border-radius: 22px; color: #fff; background: linear-gradient(135deg, #0f172a, #2563eb); }
.metric-tile span { display: block; color: #bfdbfe; font-size: 12px; font-weight: 850; text-transform: uppercase; }
.metric-tile strong { display: block; margin-top: 4px; font-size: clamp(28px, 4vw, 42px); letter-spacing: -.04em; }
.formula { padding: 12px; border-radius: 16px; background: #f1f5f9; color: #334155; font-size: 13px; font-weight: 750; line-height: 1.6; }
.notes strong { color: #0f172a; }
.notes ul { padding-left: 18px; color: #475569; line-height: 1.65; }
.source-chips a, .reference-band span { max-width: 100%; padding: 7px 10px; border-radius: 999px; background: #eff6ff; color: #1d4ed8; font-size: 11px; font-weight: 900; text-decoration: none; overflow-wrap: anywhere; }
.segment-panel { display: grid; grid-template-columns: minmax(260px, .46fr) minmax(320px, .54fr); gap: 20px; margin-top: 18px; padding: 24px; border: 1px solid rgba(15,23,42,.1); border-radius: 28px; background: linear-gradient(135deg, #ffffff, #f8fafc); box-shadow: 0 18px 60px rgba(15,23,42,.07); }
.segment-panel p:not(.chart-kicker) { color: #64748b; line-height: 1.7; }
.segment-chart-card { min-height: 300px; padding: 12px; border-radius: 22px; background: #fff; box-shadow: inset 0 0 0 1px rgba(15,23,42,.08); }
.group-chip-row { grid-column: 1 / -1; margin-top: 0; }
.history-panel { display: grid; grid-template-columns: .45fr 1fr; gap: 18px; margin-top: 18px; padding: 24px; border: 1px solid rgba(15,23,42,.1); border-radius: 26px; background: #fff; box-shadow: 0 18px 60px rgba(15,23,42,.07); }
.history-panel p:not(.chart-kicker) { color: #64748b; line-height: 1.7; }
.story-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.story-card { display: grid; gap: 6px; padding: 14px; text-align: left; border-radius: 18px; background: #f8fafc; color: #0f172a; box-shadow: inset 0 0 0 1px rgba(15,23,42,.06); }
.story-card.active { color: #fff; background: linear-gradient(135deg, #1d4ed8, #7c3aed); }
.story-card span, .story-card small { color: inherit; opacity: .72; }
.story-card strong { font-size: 20px; }
.taxonomy-panel { margin-top: 18px; padding: 24px; border: 1px solid rgba(15,23,42,.1); border-radius: 28px; background: linear-gradient(135deg, #ffffff, #f8fafc); box-shadow: 0 18px 60px rgba(15,23,42,.07); }
.taxonomy-heading { display: grid; gap: 8px; max-width: 920px; margin-bottom: 18px; }
.taxonomy-heading h2 { margin: 0; letter-spacing: -.035em; }
.taxonomy-heading p:not(.chart-kicker) { margin: 0; color: #64748b; line-height: 1.7; }
.taxonomy-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px; }
.taxonomy-card { display: grid; gap: 12px; padding: 16px; border: 1px solid rgba(15,23,42,.08); border-radius: 20px; background: rgba(255,255,255,.9); }
.taxonomy-card-head { display: grid; gap: 5px; }
.taxonomy-card-head span { color: #2563eb; font-size: 11px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; }
.taxonomy-card-head strong { color: #0f172a; font-size: 20px; letter-spacing: -.035em; }
.taxonomy-card p { margin: 0; color: #475569; font-size: 13px; line-height: 1.55; }
.memory-chip-row { display: flex; flex-wrap: wrap; gap: 6px; }
.memory-chip-row i { padding: 5px 8px; border-radius: 999px; color: #0f172a; background: #e0f2fe; font-size: 11px; font-style: normal; font-weight: 900; }
.forecast-driver { display: grid; gap: 8px; margin: 0; }
.forecast-driver div { display: grid; gap: 3px; }
.forecast-driver dt { color: #94a3b8; font-size: 10px; font-weight: 900; letter-spacing: .12em; text-transform: uppercase; }
.forecast-driver dd { margin: 0; color: #334155; font-size: 12px; font-weight: 750; line-height: 1.5; }
.taxonomy-sources { gap: 6px; }
.taxonomy-sources a { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.reference-band { margin-top: 14px; }
@media (max-width: 960px) { .detail-card, .history-panel, .segment-panel { grid-template-columns: 1fr; } .chart-toolbar { flex-direction: column; } .story-grid { grid-template-columns: 1fr; } }
</style>
