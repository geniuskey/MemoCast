<script setup lang="ts">
import chartData from '../public/dataset-charts.json'

type BitGrowthRow = { year: number; memoryType: string; metric: string; growthPercent: number; notes: string }
type RevenueCycleRow = { year: number; dramRevenueUsdB: number; yoyPct: number | null; cyclePhase: string; confidence: string; sourceNote: string }
type FinancialRow = { company: string; period: string; revenue: number | null; revenueUnit: string; operatingProfit: number | null; profitUnit: string; note: string; confidence: string }
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

const bitGrowth = chartData.bitGrowth as BitGrowthRow[]
const revenueCycle = chartData.revenueCycle as RevenueCycleRow[]
const financials = chartData.financials as FinancialRow[]
const periodDemandTimeline = chartData.periodDemandTimeline as PeriodDemandRow[]

const dramGrowth = bitGrowth.filter((row) => row.memoryType === 'DRAM')
const nandGrowth = bitGrowth.filter((row) => row.memoryType === 'NAND')
const latestFinancials = financials.filter((row) => ['FY2024', 'FY2024Q4'].includes(row.period)).slice(0, 6)
const demandRows = periodDemandTimeline.filter((row) => row.demandEb !== undefined)
const hbmContentRows = periodDemandTimeline.filter((row) => row.demandGbPerUnit !== undefined)
const maxRevenue = Math.max(...revenueCycle.map((row) => row.dramRevenueUsdB), 1)
const maxGrowth = Math.max(...bitGrowth.map((row) => row.growthPercent), 1)
const maxDemandEb = Math.max(...demandRows.map((row) => row.demandEb ?? 0), 0.001)
const maxHbmGb = Math.max(...hbmContentRows.map((row) => row.demandGbPerUnit ?? 0), 1)

function barWidth(value: number, max: number) {
  return `${Math.max(4, Math.round((value / max) * 100))}%`
}

function formatMoney(value: number | null, unit: string) {
  if (value === null) return 'n/a'
  return `${value}${unit === 'usd_b' ? 'B USD' : unit === 'krw_t' ? 'T KRW' : ` ${unit}`}`
}

function formatDemand(row: PeriodDemandRow) {
  if (row.demandEb !== undefined) return `${row.demandEb.toFixed(4)} EB`
  return `${row.demandGbPerUnit} GB/unit`
}

function sourceLabel(source: string) {
  return source.replace('raw/datasets/', '').replace('.md', '')
}
</script>

<template>
  <section class="dataset-panel">
    <div class="dataset-heading">
      <p class="dataset-kicker">Dataset-backed signals</p>
      <h2>raw CSV에서 바로 그리는 수요·매출·재무 사이클</h2>
      <p>
        <code>raw/datasets</code>의 CSV를 빌드 시점에 <code>dataset-charts.json</code>으로 변환해 DRAM/NAND bit growth,
        DRAM revenue cycle, 메모리 업체 실적 회복 신호를 한 화면에서 봅니다.
      </p>
    </div>

    <div class="timeline-card">
      <div class="timeline-copy">
        <p class="dataset-kicker">Reference-based period graph</p>
        <h3>기간별 메모리 수요</h3>
        <p>
          출하량 CSV와 device별 memory content CSV를 결합해 기간별 DRAM 수요를 EB로 환산하고,
          HBM은 GPU 세대별 GB/unit content reference로 분리해 표시합니다.
        </p>
      </div>
      <div class="timeline-grid">
        <div class="timeline-bars">
          <div v-for="row in demandRows" :key="`${row.year}-${row.segment}`" class="timeline-row">
            <span>{{ row.year }} · {{ row.segment }}</span>
            <div class="bar-track demand-track"><i :style="{ width: barWidth(row.demandEb ?? 0, maxDemandEb) }"></i></div>
            <strong>{{ formatDemand(row) }}</strong>
            <small>{{ row.shipmentsMillionUnits }}M × {{ row.avgCapacityGb }}GB</small>
          </div>
        </div>
        <div class="hbm-content-bars">
          <div v-for="row in hbmContentRows" :key="`${row.year}-${row.gpuModel}`" class="timeline-row hbm-row">
            <span>{{ row.year }} · {{ row.gpuModel }} {{ row.hbmType }}</span>
            <div class="bar-track hbm-track"><i :style="{ width: barWidth(row.demandGbPerUnit ?? 0, maxHbmGb) }"></i></div>
            <strong>{{ formatDemand(row) }}</strong>
          </div>
        </div>
      </div>
      <div class="reference-strip">
        <span v-for="source in [...new Set(periodDemandTimeline.flatMap((row) => row.sourceRefs))]" :key="source">
          {{ sourceLabel(source) }}
        </span>
      </div>
    </div>

    <div class="dataset-grid">
      <article class="dataset-card">
        <h3>Bit demand / supply growth</h3>
        <div class="bar-list">
          <div v-for="row in [...dramGrowth, ...nandGrowth]" :key="`${row.memoryType}-${row.year}-${row.metric}`" class="bar-row">
            <span>{{ row.year }} {{ row.memoryType }} {{ row.metric.replace('bit_', '').replace('_growth', '') }}</span>
            <div class="bar-track"><i :style="{ width: barWidth(row.growthPercent, maxGrowth) }"></i></div>
            <strong>{{ row.growthPercent }}%</strong>
          </div>
        </div>
      </article>

      <article class="dataset-card dataset-card-wide">
        <h3>DRAM revenue cycle</h3>
        <div class="cycle-chart" aria-label="DRAM revenue cycle bar chart">
          <div v-for="row in revenueCycle" :key="`${row.year}-${row.cyclePhase}-${row.dramRevenueUsdB}`" class="cycle-col">
            <div class="cycle-bar" :style="{ height: barWidth(row.dramRevenueUsdB, maxRevenue) }">
              <span>{{ row.dramRevenueUsdB }}</span>
            </div>
            <small>{{ row.year }}</small>
          </div>
        </div>
        <p class="dataset-note">2026은 low/high case가 함께 표시됩니다. 단위: USD B.</p>
      </article>

      <article class="dataset-card">
        <h3>Maker financials</h3>
        <div class="finance-list">
          <div v-for="row in latestFinancials" :key="`${row.company}-${row.period}`">
            <span>{{ row.company.replace('_', ' ') }} · {{ row.period }}</span>
            <strong>{{ formatMoney(row.revenue, row.revenueUnit) }}</strong>
            <small>OP {{ formatMoney(row.operatingProfit, row.profitUnit) }}</small>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.dataset-panel {
  margin: 34px 0;
  padding: clamp(20px, 3vw, 34px);
  border: 1px solid rgba(30, 64, 175, 0.16);
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(239, 246, 255, 0.94), rgba(250, 250, 250, 0.98));
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
}
.dataset-kicker { margin: 0 0 8px; color: #2563eb; font-size: 12px; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
.dataset-heading h2 { margin: 0; font-size: clamp(28px, 4vw, 44px); line-height: 1.05; letter-spacing: -0.04em; }
.dataset-heading p { max-width: 860px; color: #475569; line-height: 1.7; }
.timeline-card { margin-top: 22px; padding: 20px; border: 1px solid rgba(37, 99, 235, .16); border-radius: 24px; background: linear-gradient(135deg, rgba(15,23,42,.96), rgba(30,41,59,.92)); color: #f8fafc; }
.timeline-copy h3 { margin: 0; font-size: clamp(24px, 3vw, 34px); letter-spacing: -.03em; }
.timeline-copy p:not(.dataset-kicker) { max-width: 900px; color: #cbd5e1; line-height: 1.7; }
.timeline-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 18px; margin-top: 18px; }
.timeline-bars, .hbm-content-bars { display: grid; gap: 10px; }
.timeline-row { display: grid; grid-template-columns: 1.35fr 1fr auto; gap: 10px; align-items: center; padding: 10px; border: 1px solid rgba(148,163,184,.18); border-radius: 16px; background: rgba(15,23,42,.45); font-size: 12px; }
.timeline-row small { grid-column: 1 / -1; color: #94a3b8; }
.timeline-row strong { color: #fff; }
.demand-track { background: rgba(219,234,254,.16); }
.demand-track i { background: linear-gradient(90deg, #38bdf8, #2563eb); }
.hbm-track { background: rgba(236,72,153,.14); }
.hbm-track i { background: linear-gradient(90deg, #fb7185, #a855f7); }
.reference-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.reference-strip span { padding: 6px 9px; border: 1px solid rgba(203,213,225,.18); border-radius: 999px; color: #bfdbfe; background: rgba(59,130,246,.12); font-size: 11px; font-weight: 800; }
.dataset-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 22px; }
.dataset-card { padding: 18px; border: 1px solid rgba(15, 23, 42, .08); border-radius: 22px; background: rgba(255,255,255,.86); }
.dataset-card-wide { grid-column: span 1; }
.dataset-card h3 { margin: 0 0 16px; }
.bar-row { display: grid; grid-template-columns: 1.6fr 1fr auto; gap: 10px; align-items: center; margin: 10px 0; font-size: 12px; }
.bar-track { height: 10px; overflow: hidden; border-radius: 999px; background: #e2e8f0; }
.bar-track i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #2563eb, #7c3aed); }
.cycle-chart { display: flex; align-items: end; gap: 8px; height: 220px; padding-top: 24px; }
.cycle-col { flex: 1; display: flex; min-width: 0; flex-direction: column; align-items: center; gap: 8px; }
.cycle-bar { position: relative; width: 100%; min-height: 8px; border-radius: 10px 10px 3px 3px; background: linear-gradient(180deg, #f43f5e, #7c3aed); }
.cycle-bar span { position: absolute; left: 50%; top: -20px; transform: translateX(-50%); font-size: 11px; font-weight: 800; }
.cycle-col small { font-size: 10px; writing-mode: vertical-rl; }
.dataset-note, .finance-list small { color: #64748b; }
.finance-list { display: grid; gap: 10px; }
.finance-list div { display: grid; gap: 3px; padding: 10px; border-radius: 14px; background: #f8fafc; }
.finance-list span { color: #475569; font-size: 12px; text-transform: capitalize; }
.finance-list strong { color: #0f172a; }
@media (max-width: 960px) { .dataset-grid, .timeline-grid { grid-template-columns: 1fr; } .timeline-row { grid-template-columns: 1fr; } }
</style>
