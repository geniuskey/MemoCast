<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFullscreenElement } from '../lib/useFullscreen'
import {
  buildAdvancedDemandForecast,
  buildCsvDerivedAdvancedForecastPresets,
  buildForecastEnvelope,
  buildInstitutionWeightedEnsemble,
  buildHierarchicalForecastRows,
  buildSiaNowcastTimeSeries,
  buildSourceCalibratedForecastContext,
  buildStressScenarioTable,
  calculateHbmBomStress,
  calculateSourceCalibratedNowcast,
  formatEb,
  formatNumber,
  getAdvancedForecastSourceSignals,
  listAdvancedForecastPresets,
  type AdvancedForecastPreset
} from '../lib/advancedDemandForecast'

const basePresets = listAdvancedForecastPresets()
const csvDerivedPresets = buildCsvDerivedAdvancedForecastPresets()
const presets = [...basePresets, ...csvDerivedPresets]
const { targetRef: advancedForecastRoot, isFullscreen, toggleFullscreen } = useFullscreenElement()
const selectedPresetId = ref(presets[0]?.id ?? '')
const institutionWeights = ref<Record<string, number>>({
  wsts: 1,
  trendforce: 1,
  idc: 1,
  gartner: 1
})
const hbmPriceDeclinePercent = ref(20)
const targetBomSharePercent = ref(45)
const demandElasticity = ref(0.22)
const supplyReliefPassThrough = ref(0.4)

const selectedPreset = computed<AdvancedForecastPreset>(() => {
  return presets.find((preset) => preset.id === selectedPresetId.value) ?? presets[0]
})

function selectPreset(id: string) {
  selectedPresetId.value = id
}

const forecast = computed(() => buildAdvancedDemandForecast(selectedPreset.value.input))
const maxUnconstrained = computed(() => Math.max(...forecast.value.rows.map((row) => row.unconstrainedDemandEb)))
const maxEffective = computed(() => Math.max(...forecast.value.rows.map((row) => row.effectiveDemandEb)))
const maxUnmet = computed(() => Math.max(0.0001, ...forecast.value.rows.map((row) => row.unmetDemandEb)))
const stressTable = computed(() => buildStressScenarioTable(selectedPreset.value.input))
const forecastEnvelope = computed(() => buildForecastEnvelope(selectedPreset.value.input))
const hierarchyRows = computed(() => buildHierarchicalForecastRows())
const sourceSignals = getAdvancedForecastSourceSignals()
const sourceContext = computed(() => buildSourceCalibratedForecastContext())
const nowcastAdjustment = computed(() => calculateSourceCalibratedNowcast(selectedPreset.value.input))
const institutionalRevenueRows = computed(() => sourceSignals.institutionalForecasts.filter((signal) => signal.unit === 'usd_b'))
const latestMonthlySalesRows = computed(() => sourceSignals.nowcastMonthlySales.filter((signal) => signal.period.startsWith('2026')).slice(0, 4))
const siaNowcastRows = computed(() => buildSiaNowcastTimeSeries())
const institutionWeightRows = computed(() => {
  return Array.from(new Set(institutionalRevenueRows.value.map((signal) => signal.institution))).map((institution) => ({
    institution,
    weight: institutionWeights.value[institution] ?? 1
  }))
})
const institutionWeightedEnsemble = computed(() => buildInstitutionWeightedEnsemble(
  institutionWeightRows.value.map((row) => ({ institution: row.institution, weight: row.weight }))
))
const hbmBomStress = computed(() => calculateHbmBomStress(selectedPreset.value.input, {
  hbmPriceDeclinePercent: hbmPriceDeclinePercent.value,
  targetBomSharePercent: targetBomSharePercent.value,
  demandElasticity: demandElasticity.value,
  supplyReliefPassThrough: supplyReliefPassThrough.value
}))
</script>

<template>
  <section
    ref="advancedForecastRoot"
    class="advanced-forecast-workbench"
    :class="{ 'is-fullscreen': isFullscreen }"
  >
    <div class="forecast-hero">
      <div>
        <div class="hero-title-row">
          <p class="eyebrow">Advanced Forecast Cockpit</p>
          <button class="advanced-fullscreen-toggle" type="button" @click="toggleFullscreen">
            {{ isFullscreen ? '전체화면 종료' : '전체화면' }}
          </button>
        </div>
        <h2>고차원 메모리 수요 예측 엔진</h2>
        <p>
          단순 <code>units × content</code> 계산을 넘어 end demand, S-curve adoption, content CAGR,
          price-inventory-cycle, bullwhip, supply-realization을 분리해 다년 경로를 계산합니다.
        </p>
      </div>
      <div class="hero-kpis">
        <article>
          <span>Peak supply-realized demand</span>
          <strong>{{ formatEb(forecast.peakEffectiveDemandEb) }}</strong>
        </article>
        <article>
          <span>Cumulative unmet demand</span>
          <strong>{{ formatEb(forecast.cumulativeUnmetDemandEb) }}</strong>
        </article>
        <article>
          <span>Dominant constraint</span>
          <strong>{{ forecast.dominantConstraint }}</strong>
        </article>
      </div>
    </div>

    <div class="cockpit-grid">
      <aside class="preset-column">
        <h3>Scenario layer</h3>
        <button
          v-for="preset in presets"
          :key="preset.id"
          class="preset-card"
          :class="{ active: preset.id === selectedPresetId }"
          type="button"
          @click="selectPreset(preset.id)"
        >
          <strong>{{ preset.label }}</strong>
          <span>{{ preset.description }}</span>
          <small class="preset-source-row">
            <b class="confidence-badge">{{ preset.confidence }}</b>
            {{ preset.sourceRefs.length }} source refs
          </small>
        </button>
      </aside>

      <div class="forecast-main">
        <div class="driver-stack">
          <article>
            <span>Domain</span>
            <strong>{{ selectedPreset.input.domain }}</strong>
          </article>
          <article>
            <span>Base demand</span>
            <strong>{{ formatEb(selectedPreset.input.baseDemandEb) }}</strong>
          </article>
          <article>
            <span>Unit growth</span>
            <strong>{{ formatNumber(selectedPreset.input.unitGrowthCagrPercent, 1) }}%</strong>
          </article>
          <article>
            <span>Content growth</span>
            <strong>{{ formatNumber(selectedPreset.input.contentGrowthCagrPercent, 1) }}%</strong>
          </article>
          <article>
            <span>S-curve adoption</span>
            <strong>{{ selectedPreset.input.adoption.startPercent }}% → {{ selectedPreset.input.adoption.saturationPercent }}%</strong>
          </article>
          <article>
            <span>Confidence score</span>
            <strong>{{ forecast.confidenceScore }}/100</strong>
          </article>
        </div>

        <div class="advanced-layer-grid">
          <article>
            <span>Nowcast-adjusted base</span>
            <strong>{{ formatEb(nowcastAdjustment.adjustedBaseDemandEb) }}</strong>
            <small>{{ formatNumber(nowcastAdjustment.adjustmentFactor, 2) }}× SIA + institution signal overlay</small>
          </article>
          <article>
            <span>Envelope range (last year)</span>
            <strong>
              {{ formatEb(forecastEnvelope[forecastEnvelope.length - 1].lowEffectiveDemandEb) }} →
              {{ formatEb(forecastEnvelope[forecastEnvelope.length - 1].highEffectiveDemandEb) }}
            </strong>
            <small>stress scenario effective demand band</small>
          </article>
          <article>
            <span>Hierarchy total (last year)</span>
            <strong>{{ formatEb(hierarchyRows[hierarchyRows.length - 1].totalEffectiveDemandEb) }}</strong>
            <small>all presets reconciled by memory family</small>
          </article>
          <article>
            <span>Institution forecast band</span>
            <strong>${{ formatNumber(sourceContext.revenueBandUsdB.low, 0) }}B → ${{ formatNumber(sourceContext.revenueBandUsdB.high, 0) }}B</strong>
            <small>raw CSV calibrated 2026 memory revenue range</small>
          </article>
        </div>

        <div class="source-signal-panel">
          <div>
            <p class="eyebrow">Raw CSV signal interface</p>
            <h3>기관 forecast band + SIA 고빈도 nowcast 입력</h3>
            <p>
              아래 signal layer는 CSV를 브라우저에서 직접 읽지 않고, 원본 raw path를 보존한 파생 JSON으로 변환해
              nowcast overlay와 forecast band KPI에 연결합니다. 원본은 계속 immutable source로 유지됩니다.
            </p>
          </div>
          <div class="source-chip-row">
            <span v-for="rawPath in sourceContext.sourceRefs" :key="rawPath">{{ rawPath }}</span>
          </div>
          <div class="csv-derived-preset-strip" aria-label="CSV-derived preset candidates">
            <button
              v-for="preset in csvDerivedPresets"
              :key="preset.id"
              class="csv-derived-preset"
              :class="{ active: preset.id === selectedPresetId }"
              type="button"
              @click="selectPreset(preset.id)"
            >
              <span>{{ preset.label }}</span>
              <strong>{{ formatEb(preset.input.baseDemandEb) }}</strong>
              <small>{{ formatNumber(preset.input.unitGrowthCagrPercent, 1) }}% unit CAGR · {{ preset.sourceRefs.length }} raw refs</small>
            </button>
          </div>
          <div class="source-table-grid">
            <div class="source-table-card">
              <h4>Institution revenue band</h4>
              <table>
                <thead>
                  <tr>
                    <th>Institution</th>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="signal in institutionalRevenueRows" :key="`${signal.institution}-${signal.metric}`">
                    <td>{{ signal.institution }}</td>
                    <td>{{ signal.metric }}</td>
                    <td>${{ formatNumber(signal.numericValue ?? 0, 1) }}B</td>
                    <td>{{ signal.confidence }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="source-table-card">
              <h4>SIA high-frequency nowcast</h4>
              <table>
                <thead>
                  <tr>
                    <th>Period</th>
                    <th>Sales</th>
                    <th>MoM</th>
                    <th>YoY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="signal in latestMonthlySalesRows" :key="signal.period">
                    <td>{{ signal.period }}</td>
                    <td>${{ formatNumber(signal.salesUsdB ?? 0, 1) }}B</td>
                    <td>{{ signal.momPct === null ? '—' : `${formatNumber(signal.momPct, 1)}%` }}</td>
                    <td>{{ signal.yoyPct === null ? '—' : `${formatNumber(signal.yoyPct, 1)}%` }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="sia-nowcast-chart" aria-label="SIA nowcast time-series chart">
            <div class="sia-chart-header">
              <h4>SIA indexed time-series</h4>
              <small>Baseline = first raw row sales index 100; each bar keeps raw path traceability.</small>
            </div>
            <div v-for="row in siaNowcastRows" :key="row.period" class="sia-chart-row">
              <span class="sia-period">{{ row.period }}</span>
              <div class="sia-bar-track">
                <div class="sia-bar" :style="{ width: `${row.barWidthPercent}%` }"></div>
              </div>
              <strong>${{ formatNumber(row.salesUsdB, 1) }}B</strong>
              <small>{{ row.signalLabel }} · idx {{ formatNumber(row.salesIndex, 1) }}</small>
            </div>
          </div>
        </div>

        <div class="interactive-polish-grid">
          <section class="interactive-control-panel" aria-label="Institution-weighted forecast ensemble">
            <div class="control-panel-header">
              <p class="eyebrow">Interactive ensemble tuning</p>
              <h3>기관별 전망 가중치 조정</h3>
              <p>
                WSTS/TrendForce/IDC/Gartner CSV revenue view를 사용자가 직접 가중하고, 그 weighted revenue를
                HBM demand path와 confidence score로 즉시 변환합니다.
              </p>
            </div>
            <div class="slider-stack">
              <label v-for="row in institutionWeightRows" :key="row.institution" class="slider-row">
                <span>{{ row.institution }}</span>
                <input v-model.number="institutionWeights[row.institution]" min="0" max="5" step="0.1" type="range" />
                <strong>{{ formatNumber(row.weight, 1) }}×</strong>
              </label>
            </div>
            <div class="control-kpi-grid">
              <article>
                <span>Weighted revenue</span>
                <strong>${{ formatNumber(institutionWeightedEnsemble.weightedRevenueUsdB, 1) }}B</strong>
              </article>
              <article>
                <span>Demand multiplier</span>
                <strong>{{ formatNumber(institutionWeightedEnsemble.demandMultiplier, 2) }}×</strong>
              </article>
              <article>
                <span>Peak effective demand</span>
                <strong>{{ formatEb(institutionWeightedEnsemble.forecast.peakEffectiveDemandEb) }}</strong>
              </article>
            </div>
          </section>

          <section class="interactive-control-panel" aria-label="HBM BOM affordability stress controls">
            <div class="control-panel-header">
              <p class="eyebrow">HBM/BOM stress controls</p>
              <h3>가격 하락과 BOM 비중 민감도</h3>
              <p>
                HBM 가격 하락률과 목표 BOM share를 바꿔 affordability demand shock, supply relief, unmet demand 변화를
                stress scenario로 즉시 계산합니다.
              </p>
            </div>
            <div class="slider-stack">
              <label class="slider-row">
                <span>HBM price decline</span>
                <input v-model.number="hbmPriceDeclinePercent" min="-20" max="60" step="1" type="range" />
                <strong>{{ formatNumber(hbmPriceDeclinePercent, 0) }}%</strong>
              </label>
              <label class="slider-row">
                <span>Target BOM share</span>
                <input v-model.number="targetBomSharePercent" min="25" max="70" step="1" type="range" />
                <strong>{{ formatNumber(targetBomSharePercent, 0) }}%</strong>
              </label>
              <label class="slider-row">
                <span>Demand elasticity</span>
                <input v-model.number="demandElasticity" min="0" max="0.6" step="0.01" type="range" />
                <strong>{{ formatNumber(demandElasticity, 2) }}</strong>
              </label>
            </div>
            <div class="control-kpi-grid">
              <article>
                <span>Adjusted HBM cost</span>
                <strong>${{ formatNumber(hbmBomStress.adjustedHbmCostUsd, 0) }}</strong>
              </article>
              <article>
                <span>Demand shock</span>
                <strong>{{ formatNumber(hbmBomStress.affordabilityDemandShockPercent, 1) }}%</strong>
              </article>
              <article>
                <span>Stress unmet demand</span>
                <strong>{{ formatEb(hbmBomStress.result.cumulativeUnmetDemandEb) }}</strong>
              </article>
            </div>
          </section>
        </div>

        <div class="forecast-chart">
          <h3>Multi-year forecast path</h3>
          <div v-for="row in forecast.rows" :key="row.year" class="year-row">
            <span class="year-label">{{ row.year }}</span>
            <div class="bar-pack">
              <div class="bar-line">
                <span>Unconstrained demand</span>
                <div class="bar-track"><div class="bar unconstrained" :style="{ width: `${(row.unconstrainedDemandEb / maxUnconstrained) * 100}%` }"></div></div>
                <strong>{{ formatEb(row.unconstrainedDemandEb) }}</strong>
              </div>
              <div class="bar-line">
                <span>Supply-realized demand</span>
                <div class="bar-track"><div class="bar effective" :style="{ width: `${(row.effectiveDemandEb / maxEffective) * 100}%` }"></div></div>
                <strong>{{ formatEb(row.effectiveDemandEb) }}</strong>
              </div>
              <div class="bar-line unmet-line">
                <span>Unmet demand</span>
                <div class="bar-track"><div class="bar unmet" :style="{ width: `${(row.unmetDemandEb / maxUnmet) * 100}%` }"></div></div>
                <strong>{{ formatEb(row.unmetDemandEb) }}</strong>
              </div>
            </div>
          </div>
        </div>

        <details class="exact-table" open>
          <summary>Stress scenarios, uncertainty envelope, and hierarchy reconciliation</summary>
          <table>
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Demand shock</th>
                <th>Supply shock</th>
                <th>Price shock</th>
                <th>Cumulative unmet</th>
                <th>Constraint</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="scenario in stressTable" :key="scenario.id">
                <td>{{ scenario.label }}</td>
                <td>{{ scenario.demandShockPercent }}%</td>
                <td>{{ scenario.supplyShockPercent }}%</td>
                <td>{{ scenario.priceShockPercent }}%</td>
                <td>{{ formatEb(scenario.cumulativeUnmetDemandEb) }}</td>
                <td>{{ scenario.dominantConstraint }}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Envelope low</th>
                <th>Base</th>
                <th>Envelope high</th>
                <th>Hierarchy total</th>
                <th>Hierarchy unmet</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in forecastEnvelope" :key="row.year">
                <td>{{ row.year }}</td>
                <td>{{ formatEb(row.lowEffectiveDemandEb) }}</td>
                <td>{{ formatEb(row.baseEffectiveDemandEb) }}</td>
                <td>{{ formatEb(row.highEffectiveDemandEb) }}</td>
                <td>{{ formatEb(hierarchyRows.find((item) => item.year === row.year)?.totalEffectiveDemandEb ?? 0) }}</td>
                <td>{{ formatEb(hierarchyRows.find((item) => item.year === row.year)?.totalUnmetDemandEb ?? 0) }}</td>
              </tr>
            </tbody>
          </table>
        </details>

        <details class="exact-table" open>
          <summary>Exact values and driver decomposition</summary>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Adoption</th>
                <th>Unit index</th>
                <th>Content index</th>
                <th>Adoption index</th>
                <th>Cycle factor</th>
                <th>Realization</th>
                <th>Effective demand</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in forecast.rows" :key="row.year">
                <td>{{ row.year }}</td>
                <td>{{ formatNumber(row.adoptionSharePercent, 1) }}%</td>
                <td>{{ formatNumber(row.driverBreakdown.unitIndex, 2) }}×</td>
                <td>{{ formatNumber(row.driverBreakdown.contentIndex, 2) }}×</td>
                <td>{{ formatNumber(row.driverBreakdown.adoptionIndex, 2) }}×</td>
                <td>{{ formatNumber(row.cycleAdjustmentFactor, 2) }}×</td>
                <td>{{ formatNumber(row.realizationFactor * 100, 1) }}%</td>
                <td>{{ formatEb(row.effectiveDemandEb) }}</td>
              </tr>
            </tbody>
          </table>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.advanced-forecast-workbench {
  border: 1px solid var(--vp-c-divider);
  border-radius: 24px;
  padding: 24px;
  margin: 24px 0;
  background: linear-gradient(135deg, rgba(79, 70, 229, .12), rgba(14, 165, 233, .08));
}
.forecast-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 430px);
  gap: 22px;
  align-items: start;
}
.hero-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}
.hero-title-row .eyebrow {
  margin-bottom: 0;
}
.advanced-fullscreen-toggle {
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 999px;
  padding: 7px 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
}
.advanced-fullscreen-toggle:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}
.advanced-forecast-workbench.is-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  max-width: none;
  margin: 0;
  border-radius: 0;
  padding: clamp(16px, 2vw, 30px);
  overflow: auto;
  background: var(--vp-c-bg-soft);
  box-sizing: border-box;
}
.advanced-forecast-workbench.is-fullscreen .cockpit-grid {
  grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
}
.advanced-forecast-workbench.is-fullscreen .source-table-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.eyebrow {
  margin: 0 0 6px;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.forecast-hero h2 {
  margin: 0 0 10px;
  border-top: 0;
  padding-top: 0;
  font-size: 32px;
}
.hero-kpis,
.driver-stack {
  display: grid;
  gap: 10px;
}
.hero-kpis article,
.driver-stack article,
.advanced-layer-grid article,
.preset-card,
.forecast-chart,
.exact-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 14px;
  background: var(--vp-c-bg);
}
.hero-kpis span,
.driver-stack span,
.advanced-layer-grid span,
.advanced-layer-grid small {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-bottom: 5px;
}
.hero-kpis strong,
.advanced-layer-grid strong {
  display: block;
  font-size: 22px;
  color: var(--vp-c-brand-1);
}
.cockpit-grid {
  display: grid;
  grid-template-columns: minmax(240px, 310px) minmax(0, 1fr);
  gap: 18px;
  margin-top: 20px;
}
.preset-column {
  display: grid;
  gap: 10px;
  align-content: start;
}
.preset-column h3,
.forecast-chart h3 {
  margin: 0;
}
.preset-card {
  text-align: left;
  cursor: pointer;
}
.preset-card.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: inset 0 0 0 1px var(--vp-c-brand-1);
}
.preset-card strong,
.preset-card span {
  display: block;
}
.preset-card span {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 5px;
}
.preset-source-row {
  display: flex;
  gap: 7px;
  align-items: center;
  margin-top: 10px;
  color: var(--vp-c-text-2);
}
.confidence-badge {
  border-radius: 999px;
  padding: 2px 7px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-size: 10px;
  text-transform: uppercase;
}
.forecast-main {
  display: grid;
  gap: 16px;
}
.driver-stack {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
.advanced-layer-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}
.source-signal-panel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 16px;
  background: color-mix(in srgb, var(--vp-c-bg) 88%, var(--vp-c-brand-soft));
}
.source-signal-panel h3,
.source-signal-panel p {
  margin: 0 0 8px;
}
.source-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}
.source-chip-row span {
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 4px 9px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 11px;
  overflow-wrap: anywhere;
}
.source-table-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.source-table-card {
  overflow-x: auto;
}
.source-table-card h4 {
  margin: 0 0 8px;
  color: var(--vp-c-brand-1);
}
.source-table-card table {
  min-width: 520px;
  margin: 0;
  background: var(--vp-c-bg);
}
.csv-derived-preset-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 14px 0;
}
.csv-derived-preset {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 12px;
  background: var(--vp-c-bg);
  text-align: left;
  cursor: pointer;
}
.csv-derived-preset.active {
  border-color: var(--vp-c-brand-1);
  box-shadow: inset 0 0 0 1px var(--vp-c-brand-1);
}
.csv-derived-preset span,
.csv-derived-preset strong,
.csv-derived-preset small {
  display: block;
}
.csv-derived-preset span,
.sia-nowcast-chart small {
  color: var(--vp-c-text-2);
  font-size: 11px;
}
.csv-derived-preset strong {
  margin: 5px 0;
  color: var(--vp-c-brand-1);
  font-size: 20px;
}
.sia-nowcast-chart {
  display: grid;
  gap: 8px;
  margin-top: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 12px;
  background: var(--vp-c-bg);
}
.sia-chart-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
}
.sia-chart-header h4 {
  margin: 0;
  color: var(--vp-c-brand-1);
}
.sia-chart-row {
  display: grid;
  grid-template-columns: 72px minmax(80px, 1fr) 82px minmax(120px, .8fr);
  gap: 10px;
  align-items: center;
  font-size: 12px;
}
.sia-period {
  font-weight: 900;
}
.sia-bar-track {
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}
.sia-bar {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #38bdf8, #6366f1);
}
.interactive-polish-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.interactive-control-panel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 16px;
  background: var(--vp-c-bg);
}
.control-panel-header h3,
.control-panel-header p {
  margin: 0 0 8px;
}
.slider-stack {
  display: grid;
  gap: 10px;
  margin: 14px 0;
}
.slider-row {
  display: grid;
  grid-template-columns: minmax(82px, .75fr) minmax(0, 1fr) 46px;
  gap: 8px;
  min-width: 0;
  align-items: center;
  font-size: 12px;
}
.slider-row span {
  min-width: 0;
  color: var(--vp-c-text-2);
  font-weight: 800;
  text-transform: capitalize;
  overflow-wrap: anywhere;
}
.slider-row input {
  width: 100%;
  min-width: 0;
  accent-color: var(--vp-c-brand-1);
}
.slider-row strong {
  min-width: 0;
  color: var(--vp-c-brand-1);
  text-align: right;
  font-size: 11px;
}
.control-kpi-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}
.control-kpi-grid article {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 10px;
  background: var(--vp-c-bg-soft);
}
.control-kpi-grid span {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 11px;
  margin-bottom: 4px;
}
.control-kpi-grid strong {
  display: block;
  color: var(--vp-c-brand-1);
  font-size: 17px;
}
@media (max-width: 1180px) {
  .advanced-layer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 900px) {
  .advanced-layer-grid,
  .source-table-grid,
  .csv-derived-preset-strip,
  .interactive-polish-grid,
  .control-kpi-grid {
    grid-template-columns: 1fr;
  }
  .sia-chart-header,
  .sia-chart-row,
  .slider-row {
    display: grid;
    grid-template-columns: 1fr;
  }
  .slider-row strong {
    text-align: left;
  }
}
.year-row {
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--vp-c-divider);
}
.year-row:first-of-type {
  border-top: 0;
}
.year-label {
  font-weight: 900;
  color: var(--vp-c-brand-1);
}
.bar-pack {
  display: grid;
  gap: 7px;
}
.bar-line {
  display: grid;
  grid-template-columns: 170px minmax(100px, 1fr) 90px;
  gap: 10px;
  align-items: center;
  font-size: 12px;
}
.bar-track {
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}
.bar {
  height: 100%;
  border-radius: 999px;
}
.unconstrained { background: #818cf8; }
.effective { background: #22c55e; }
.unmet { background: #f97316; }
.exact-table {
  overflow-x: auto;
}
.exact-table summary {
  cursor: pointer;
  color: var(--vp-c-brand-1);
  font-weight: 900;
  margin-bottom: 10px;
}
.exact-table table {
  min-width: 860px;
}
@media (max-width: 960px) {
  .forecast-hero,
  .cockpit-grid {
    grid-template-columns: 1fr;
  }
  .bar-line {
    grid-template-columns: 1fr;
  }
}
</style>
