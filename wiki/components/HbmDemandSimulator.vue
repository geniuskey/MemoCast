<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useFullscreenElement } from '../lib/useFullscreen'
import { buildHbmContentSensitivityRows, buildHbmShipmentSensitivityRows, calculateHbmDemand, formatCapacity, formatNumber, listHbmScenarioPresets, type HbmDemandInput } from '../lib/hbmDemand'

const input = reactive<HbmDemandInput>({ acceleratorsThousand: 1000, attachRatePercent: 90, hbmStacksPerAccelerator: 8, hbmCapacityGbPerStack: 36 })
const { targetRef: simulatorRoot, isFullscreen, toggleFullscreen } = useFullscreenElement()
const presets = listHbmScenarioPresets()
function applyPreset(presetInput: HbmDemandInput) { Object.assign(input, presetInput) }
const result = computed(() => calculateHbmDemand(input))
const shipmentSensitivityRows = computed(() => buildHbmShipmentSensitivityRows(input, [-20, -10, 0, 10, 20]))
const contentSensitivityRows = computed(() => buildHbmContentSensitivityRows(input, [16, 24, 36, 48]))
const maxShipmentPb = computed(() => Math.max(...shipmentSensitivityRows.value.map((row) => row.result.totalHbmGb)))
const maxContentPb = computed(() => Math.max(...contentSensitivityRows.value.map((row) => row.result.totalHbmGb)))
const currentScenarioLabel = computed(() => presets.find((preset) => JSON.stringify(preset.input) === JSON.stringify({ ...input }))?.label ?? 'Custom user scenario')
</script>

<template>
  <section ref="simulatorRoot" class="simulator-card" :class="{ 'is-fullscreen': isFullscreen }">
    <div class="simulator-header">
      <div><p class="eyebrow">Assumption Workbench · HBM</p><h2>AI Server HBM 수요</h2></div>
      <div class="simulator-header-actions"><p class="formula">Demand = Accelerators × Attach Rate × Stacks × GB/Stack</p><button class="simulator-fullscreen-toggle" type="button" @click="toggleFullscreen">{{ isFullscreen ? '전체화면 종료' : '전체화면' }}</button></div>
    </div>
    <div class="simulator-workbench">
      <div class="workbench-main">
        <div class="preset-comparison">
          <h3>Scenario presets</h3>
          <table><thead><tr><th>Preset</th><th>Content</th><th>Attach</th><th>Confidence</th><th></th></tr></thead><tbody>
            <tr v-for="preset in presets" :key="preset.id"><td><strong>{{ preset.label }}</strong><br/><small>{{ preset.description }}</small></td><td>{{ preset.input.hbmStacksPerAccelerator * preset.input.hbmCapacityGbPerStack }} GB/GPU</td><td>{{ preset.input.attachRatePercent }}%</td><td class="preset-source-row"><b class="confidence-badge">{{ preset.confidence }}</b> · {{ preset.sourceRefs.length }} refs</td><td><button class="apply-button" type="button" @click="applyPreset(preset.input)">Apply scenario</button></td></tr>
          </tbody></table>
        </div>
        <div class="panel"><h3>Assumptions</h3><div class="control-grid">
          <article class="control-row"><label>Accelerator shipments <input v-model.number="input.acceleratorsThousand" type="number" min="0" step="10" /></label><input v-model.number="input.acceleratorsThousand" type="range" min="0" max="2000" step="10" /><div class="quick-chips"><button class="quick-chip" type="button" @click="input.acceleratorsThousand = 500">500K</button><button class="quick-chip" type="button" @click="input.acceleratorsThousand = 1000">1,000K</button><button class="quick-chip" type="button" @click="input.acceleratorsThousand = 1500">1,500K</button></div><p class="impact">Impact: unit growth directly scales total HBM demand.</p><span class="source-pill">User input · illustrative</span></article>
          <article class="control-row"><label>HBM attach rate <input v-model.number="input.attachRatePercent" type="number" min="0" max="100" step="1" /></label><input v-model.number="input.attachRatePercent" type="range" min="0" max="100" step="1" /><div class="quick-chips"><button class="quick-chip" type="button" @click="input.attachRatePercent = 85">85%</button><button class="quick-chip" type="button" @click="input.attachRatePercent = 90">90%</button><button class="quick-chip" type="button" @click="input.attachRatePercent = 95">95%</button></div><p class="impact">Impact: filters shipped accelerators into attached accelerators.</p><span class="source-pill">Assumption · attach mix</span></article>
          <article class="control-row"><label>Stacks per accelerator <input v-model.number="input.hbmStacksPerAccelerator" type="number" min="0" step="1" /></label><input v-model.number="input.hbmStacksPerAccelerator" type="range" min="0" max="12" step="1" /><div class="quick-chips"><button class="quick-chip" type="button" @click="input.hbmStacksPerAccelerator = 6">6</button><button class="quick-chip" type="button" @click="input.hbmStacksPerAccelerator = 8">8</button><button class="quick-chip" type="button" @click="input.hbmStacksPerAccelerator = 12">12</button></div><p class="impact">Impact: package configuration changes GB per accelerator.</p><span class="source-pill">Package content</span></article>
          <article class="control-row"><label>GB per stack <input v-model.number="input.hbmCapacityGbPerStack" type="number" min="0" step="1" /></label><input v-model.number="input.hbmCapacityGbPerStack" type="range" min="16" max="48" step="1" /><div class="quick-chips"><button class="quick-chip" type="button" @click="input.hbmCapacityGbPerStack = 24">24GB</button><button class="quick-chip" type="button" @click="input.hbmCapacityGbPerStack = 36">36GB</button><button class="quick-chip" type="button" @click="input.hbmCapacityGbPerStack = 48">48GB</button></div><p class="impact">Impact: content uplift is often the largest sensitivity.</p><span class="source-pill">Source-backed content anchor</span></article>
        </div></div>
        <div class="sensitivity-bars"><h3>Visual sensitivity</h3><div v-for="row in shipmentSensitivityRows" :key="row.changePercent" class="bar-row"><span>{{ row.changePercent > 0 ? '+' : '' }}{{ row.changePercent }}% units</span><div class="bar-track"><div class="bar-fill" :style="{ width: `${(row.result.totalHbmGb / maxShipmentPb) * 100}%` }"></div></div><strong>{{ formatCapacity(row.result.totalHbmGb) }}</strong></div><details class="table-wrap"><summary>Exact values</summary><table><tbody><tr v-for="row in contentSensitivityRows" :key="row.hbmCapacityGbPerStack"><td>{{ row.hbmCapacityGbPerStack }} GB/stack</td><td>{{ formatCapacity(row.result.totalHbmGb) }}</td></tr></tbody></table></details></div>
      </div>
      <aside class="result-rail"><div class="sticky-result-panel"><span class="primary-result-label">Primary result</span><strong class="primary-result-value">{{ formatNumber(result.totalHbmEb, 4) }} EB</strong><p class="primary-result-note">{{ formatCapacity(result.totalHbmGb) }} · {{ currentScenarioLabel }}</p><div class="result-grid"><article><span>Attached accelerators</span><strong>{{ formatNumber(result.attachedAcceleratorsThousand, 0) }}K</strong></article><article><span>HBM per accelerator</span><strong>{{ formatNumber(result.hbmGbPerAccelerator, 0) }} GB</strong></article></div><p class="note">Formula: {{ formatNumber(input.acceleratorsThousand, 0) }}K × {{ input.attachRatePercent }}% × {{ input.hbmStacksPerAccelerator }} × {{ input.hbmCapacityGbPerStack }}GB</p></div></aside>
    </div>
  </section>
</template>

<style scoped>
.simulator-card { border: 1px solid var(--vp-c-divider); border-radius: 22px; padding: 22px; margin: 20px 0 28px; background: linear-gradient(135deg, var(--sim-a, rgba(99,102,241,.10)), var(--sim-b, rgba(236,72,153,.07))); }
.simulator-header { display:flex; justify-content:space-between; gap:16px; align-items:flex-start; margin-bottom:18px; }
.simulator-header h2 { margin:0; border-top:0; padding-top:0; font-size:28px; }
.eyebrow { margin:0 0 4px; color:var(--vp-c-brand-1); font-weight:800; text-transform:uppercase; letter-spacing:.08em; font-size:12px; }
.formula { margin:0 0 8px; color:var(--vp-c-text-2); font-size:13px; }
.simulator-fullscreen-toggle, .quick-chip, .apply-button { border:1px solid var(--vp-c-brand-1); border-radius:999px; padding:7px 12px; background:var(--vp-c-bg); color:var(--vp-c-brand-1); cursor:pointer; font-weight:700; }
.simulator-workbench { display:grid; grid-template-columns:minmax(0, 1fr) minmax(260px, 330px); gap:18px; align-items:start; }
.workbench-main { display:grid; gap:16px; }
.result-rail { position:relative; }
.sticky-result-panel { position:sticky; top:84px; border:1px solid var(--vp-c-divider); border-radius:18px; padding:18px; background:var(--vp-c-bg); box-shadow:0 16px 44px rgba(0,0,0,.08); }
.primary-result-label { color:var(--vp-c-text-2); font-size:12px; text-transform:uppercase; letter-spacing:.08em; font-weight:800; }
.primary-result-value { display:block; font-size:38px; line-height:1; margin:10px 0 8px; font-weight:900; color:var(--vp-c-brand-1); }
.primary-result-note { color:var(--vp-c-text-2); font-size:13px; margin:0 0 14px; }
.result-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:10px; }
.result-grid article, .panel { border:1px solid var(--vp-c-divider); border-radius:16px; padding:14px; background:rgba(255,255,255,.72); }
.result-grid span { display:block; color:var(--vp-c-text-2); font-size:12px; margin-bottom:6px; }
.result-grid strong { font-size:20px; }
.preset-comparison { border:1px solid var(--vp-c-divider); border-radius:16px; padding:14px; background:var(--vp-c-bg); overflow-x:auto; }
.preset-comparison h3, .panel h3 { margin-top:0; border-top:0; padding-top:0; }
.preset-comparison table { min-width:720px; }
.confidence-badge { padding:2px 7px; border-radius:999px; color:var(--vp-c-brand-1); background:var(--vp-c-brand-soft); font-size:10px; letter-spacing:.06em; text-transform:uppercase; }
.control-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.control-row { border:1px solid var(--vp-c-divider); border-radius:16px; padding:14px; background:var(--vp-c-bg); }
.control-row label { display:flex; justify-content:space-between; gap:12px; font-size:14px; font-weight:750; color:var(--vp-c-text-1); }
.control-row input[type='number'] { max-width:110px; border:1px solid var(--vp-c-divider); border-radius:10px; padding:8px; background:var(--vp-c-bg); color:var(--vp-c-text-1); }
.control-row input[type='range'] { width:100%; margin:12px 0 10px; accent-color:var(--vp-c-brand-1); }
.quick-chips { display:flex; flex-wrap:wrap; gap:6px; margin:8px 0; }
.quick-chip { padding:5px 9px; font-size:12px; }
.impact { margin:8px 0 0; color:var(--vp-c-text-2); font-size:12px; }
.source-pill { display:inline-flex; margin-top:8px; border-radius:999px; padding:3px 8px; background:var(--vp-c-bg-soft); color:var(--vp-c-text-2); font-size:11px; }
.sensitivity-bars { border:1px solid var(--vp-c-divider); border-radius:16px; padding:14px; background:var(--vp-c-bg); }
.sensitivity-bars h3 { margin-top:0; }
.bar-row { display:grid; grid-template-columns:92px minmax(120px,1fr) 92px; gap:10px; align-items:center; margin:10px 0; font-size:13px; }
.bar-track { height:12px; border-radius:999px; background:var(--vp-c-bg-soft); overflow:hidden; }
.bar-fill { height:100%; border-radius:999px; background:linear-gradient(90deg,var(--vp-c-brand-1),var(--vp-c-brand-2)); }
.table-wrap { overflow-x:auto; margin-top:10px; }
.table-wrap summary { cursor:pointer; color:var(--vp-c-brand-1); font-weight:800; margin:10px 0; }
.note { color:var(--vp-c-text-2); font-size:13px; margin-bottom:0; }
@media (max-width: 960px) { .simulator-workbench { grid-template-columns:1fr; } .result-rail { order:-1; } .sticky-result-panel { position:static; } .simulator-header { flex-direction:column; } }
</style>

