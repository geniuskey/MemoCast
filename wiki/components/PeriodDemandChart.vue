<script setup lang="ts">
import { computed, ref } from 'vue'
import chartData from '../public/dataset-charts.json'

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
  x: number
  y: number
}

const periodDemandTimeline = chartData.periodDemandTimeline as PeriodDemandRow[]
const domainTaxonomy = chartData.domainTaxonomy as DomainTaxonomyRow[]
const mode = ref<ChartMode>('dram-demand')
const activeSegment = ref<'all' | 'Smartphone DRAM' | 'Server DRAM'>('all')
const activePointKey = ref<string>('')
const tooltipPoint = ref<ChartPoint>()

const years = [...new Set(periodDemandTimeline.map((row) => row.year))].sort((a, b) => a - b)

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
const xMin = computed(() => visibleRows.value.length ? Math.min(...visibleRows.value.map((row) => row.year), Math.min(...years)) : Math.min(...years))
const xMax = computed(() => visibleRows.value.length ? Math.max(...visibleRows.value.map((row) => row.year), Math.max(...years)) : Math.max(...years))
const visibleMaxValue = computed(() => {
  const max = visibleRows.value.length ? Math.max(...visibleRows.value.map(valueOf)) : 1
  return max > 0 ? max * 1.12 : 1
})
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
  series: seriesName(row),
  x: xScale(row.year),
  y: yScale(valueOf(row))
})))

const seriesLines = computed(() => {
  const grouped = new Map<string, ChartPoint[]>()
  for (const point of chartPoints.value) {
    const items = grouped.get(point.series) ?? []
    items.push(point)
    grouped.set(point.series, items)
  }
  return [...grouped.entries()].map(([series, points]) => ({
    series,
    points,
    d: points.sort((a, b) => a.year - b.year).map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
  }))
})

function valueOf(row: PeriodDemandRow) {
  return row.demandEb ?? row.demandGbPerUnit ?? 0
}

function pointKey(row: PeriodDemandRow) {
  return `${row.year}-${row.segment}-${row.gpuModel ?? 'market'}`
}

function seriesName(row: PeriodDemandRow) {
  if (row.gpuModel) return 'HBM capacity roadmap'
  return row.segment
}

function xScale(year: number) {
  const min = xMin.value
  const range = Math.max(1, xMax.value - min)
  return Math.round(72 + ((year - min) / range) * 700)
}

function yScale(value: number) {
  return Math.round(330 - (value / visibleMaxValue.value) * 260)
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
      <p class="chart-kicker">Reference-backed interactive chart</p>
      <h1>기간별 메모리 수요 히스토리</h1>
      <p>
        raw CSV reference를 결합해 <strong>출하량 × device별 memory content</strong>로 DRAM 수요를 EB로 환산하고,
        HBM은 GPU 세대별 GB/unit roadmap으로 따로 추적합니다. 포인트 선택으로 근거와 계산식을 바로 확인할 수 있습니다.
      </p>
      <div class="mode-tabs" role="tablist" aria-label="period demand chart mode">
        <button :class="{ active: mode === 'dram-demand' }" @click="mode = 'dram-demand'">DRAM 수요 EB</button>
        <button :class="{ active: mode === 'hbm-content' }" @click="mode = 'hbm-content'">HBM GB/unit</button>
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
              <option value="all">Smartphone + Server</option>
              <option value="Smartphone DRAM">Smartphone DRAM</option>
              <option value="Server DRAM">Server DRAM</option>
            </select>
          </label>
        </div>

        <svg class="history-chart" viewBox="0 0 860 380" role="img" :aria-label="chartTitle">
          <defs>
            <linearGradient id="dramLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stop-color="#38bdf8" />
              <stop offset="100%" stop-color="#2563eb" />
            </linearGradient>
            <linearGradient id="hbmLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stop-color="#fb7185" />
              <stop offset="100%" stop-color="#a855f7" />
            </linearGradient>
          </defs>
          <g class="grid-lines">
            <line v-for="tick in [0, 1, 2, 3, 4]" :key="tick" x1="64" x2="812" :y1="70 + tick * 65" :y2="70 + tick * 65" />
          </g>
          <g class="axis-labels">
            <text x="64" y="358">{{ xMin }}</text>
            <text x="392" y="358">{{ Math.round((xMin + xMax) / 2) }}</text>
            <text x="790" y="358">{{ xMax }}</text>
            <text x="18" y="80">{{ unitLabel }}</text>
          </g>
          <path
            v-for="line in seriesLines"
            :key="line.series"
            :d="line.d"
            :class="['series-line', line.series.includes('HBM') ? 'hbm' : line.series.includes('Server') ? 'server' : 'smartphone']"
          />
          <g v-for="point in chartPoints" :key="pointKey(point)" class="point-group">
            <circle
              :cx="point.x"
              :cy="point.y"
              :r="activeRow && pointKey(point) === pointKey(activeRow) ? 11 : 8"
              :class="['chart-point', point.series.includes('HBM') ? 'hbm' : point.series.includes('Server') ? 'server' : 'smartphone']"
              tabindex="0"
              @mouseenter="activePointKey = pointKey(point); tooltipPoint = point"
              @mouseleave="tooltipPoint = undefined"
              @focus="activePointKey = pointKey(point); tooltipPoint = point"
              @blur="tooltipPoint = undefined"
              @click="activePointKey = pointKey(point)"
            />
            <g v-if="tooltipPoint && pointKey(point) === pointKey(tooltipPoint)" class="chart-tooltip">
              <rect :x="point.x - 70" :y="point.y - 58" width="140" height="42" rx="12" />
              <text :x="point.x" :y="point.y - 38" class="tooltip-title">{{ point.year }} · {{ point.label }}</text>
              <text :x="point.x" :y="point.y - 22" class="tooltip-value">{{ formatValue(tooltipPoint) }}</text>
            </g>
            <text :x="point.x" :y="point.y - 18" class="point-label">{{ point.year }}</text>
          </g>
        </svg>

        <div class="legend-row">
          <span><i class="swatch smartphone"></i>Smartphone DRAM</span>
          <span><i class="swatch server"></i>Server DRAM</span>
          <span><i class="swatch hbm"></i>HBM content</span>
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
.chart-workbench { display: grid; grid-template-columns: 1fr; gap: 18px; margin-top: 20px; }
.chart-card { border: 1px solid rgba(15,23,42,.1); border-radius: 26px; background: rgba(255,255,255,.92); box-shadow: 0 18px 60px rgba(15,23,42,.08); }
.chart-card-main { padding: clamp(16px, 3vw, 26px); overflow: hidden; }
.chart-toolbar { display: flex; justify-content: space-between; gap: 16px; align-items: start; }
.chart-toolbar h2, .detail-card h2, .history-panel h2 { margin: 0; letter-spacing: -.03em; }
.segment-filter { display: grid; gap: 6px; color: #64748b; font-size: 12px; font-weight: 800; text-transform: uppercase; }
.segment-filter select { min-width: 190px; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 14px; background: #fff; color: #0f172a; font: inherit; text-transform: none; }
.history-chart { display: block; width: 100%; min-height: 360px; border-radius: 22px; background: linear-gradient(180deg, #0f172a, #1e293b); }
.grid-lines line { stroke: rgba(148,163,184,.2); stroke-width: 1; }
.axis-labels text { fill: #94a3b8; font-size: 12px; font-weight: 800; }
.series-line { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 10px 18px rgba(0,0,0,.28)); }
.series-line.smartphone { stroke: url(#dramLine); }
.series-line.server { stroke: #22c55e; }
.series-line.hbm { stroke: url(#hbmLine); }
.chart-point { stroke: #fff; stroke-width: 3; transition: r .18s ease, filter .18s ease; }
.chart-point:hover, .chart-point:focus { filter: drop-shadow(0 0 14px rgba(255,255,255,.7)); outline: none; }
.chart-point.smartphone { fill: #38bdf8; }
.chart-point.server { fill: #22c55e; }
.chart-point.hbm { fill: #f472b6; }
.point-label { fill: #cbd5e1; font-size: 11px; font-weight: 900; text-anchor: middle; }
.chart-tooltip { pointer-events: none; filter: drop-shadow(0 14px 22px rgba(0,0,0,.32)); }
.chart-tooltip rect { fill: rgba(15,23,42,.94); stroke: rgba(255,255,255,.2); }
.chart-tooltip text { text-anchor: middle; }
.tooltip-title { fill: #cbd5e1; font-size: 10px; font-weight: 800; }
.tooltip-value { fill: #fff; font-size: 13px; font-weight: 950; }
.legend-row, .reference-band, .source-chips { display: flex; flex-wrap: wrap; gap: 10px; }
.legend-row { margin-top: 12px; color: #475569; font-size: 12px; font-weight: 800; }
.swatch { display: inline-block; width: 10px; height: 10px; margin-right: 6px; border-radius: 999px; }
.swatch.smartphone { background: #38bdf8; } .swatch.server { background: #22c55e; } .swatch.hbm { background: #f472b6; }
.detail-card { display: grid; grid-template-columns: minmax(220px, .65fr) minmax(240px, 1fr) minmax(220px, .8fr); gap: 16px; align-items: start; padding: 22px; }
.detail-card .chart-kicker, .detail-card h2 { grid-column: 1 / -1; }
.metric-tile { margin: 18px 0; padding: 18px; border-radius: 22px; color: #fff; background: linear-gradient(135deg, #0f172a, #2563eb); }
.metric-tile span { display: block; color: #bfdbfe; font-size: 12px; font-weight: 850; text-transform: uppercase; }
.metric-tile strong { display: block; margin-top: 4px; font-size: clamp(28px, 4vw, 42px); letter-spacing: -.04em; }
.formula { padding: 12px; border-radius: 16px; background: #f1f5f9; color: #334155; font-size: 13px; font-weight: 750; line-height: 1.6; }
.notes strong { color: #0f172a; }
.notes ul { padding-left: 18px; color: #475569; line-height: 1.65; }
.source-chips a, .reference-band span { padding: 7px 10px; border-radius: 999px; background: #eff6ff; color: #1d4ed8; font-size: 11px; font-weight: 900; text-decoration: none; }
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
@media (max-width: 960px) { .detail-card, .history-panel { grid-template-columns: 1fr; } .chart-toolbar { flex-direction: column; } .story-grid { grid-template-columns: 1fr; } }
</style>
