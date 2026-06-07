<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  buildAdvancedDemandForecast,
  formatEb,
  formatNumber,
  listAdvancedForecastPresets,
  type AdvancedForecastPreset
} from '../lib/advancedDemandForecast'

const presets = listAdvancedForecastPresets()
const selectedPresetId = ref(presets[0]?.id ?? '')

const selectedPreset = computed<AdvancedForecastPreset>(() => {
  return presets.find((preset) => preset.id === selectedPresetId.value) ?? presets[0]
})

const forecast = computed(() => buildAdvancedDemandForecast(selectedPreset.value.input))
const maxUnconstrained = computed(() => Math.max(...forecast.value.rows.map((row) => row.unconstrainedDemandEb)))
const maxEffective = computed(() => Math.max(...forecast.value.rows.map((row) => row.effectiveDemandEb)))
const maxUnmet = computed(() => Math.max(0.0001, ...forecast.value.rows.map((row) => row.unmetDemandEb)))
</script>

<template>
  <section class="advanced-forecast-workbench">
    <div class="forecast-hero">
      <div>
        <p class="eyebrow">Advanced Forecast Cockpit</p>
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
          @click="selectedPresetId = preset.id"
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
.preset-card,
.forecast-chart,
.exact-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 14px;
  background: var(--vp-c-bg);
}
.hero-kpis span,
.driver-stack span {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-bottom: 5px;
}
.hero-kpis strong {
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
