<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useFullscreenElement } from '../lib/useFullscreen'
import {
  buildEnterpriseMixSensitivityRows,
  buildSsdShipmentSensitivityRows,
  calculateNandSsdDemand,
  formatCapacityTb,
  formatNumber,
  listNandSsdScenarioPresets,
  type NandSsdDemandInput,
  type NandSsdSegmentInput
} from '../lib/nandSsdDemand'

const input = reactive<NandSsdDemandInput>({
  totalSsdShipmentsMillion: 300,
  segments: [
    { id: 'client', label: 'Client SSD', sharePercent: 80, averageCapacityTb: 1 },
    { id: 'enterprise', label: 'Enterprise SSD', sharePercent: 18, averageCapacityTb: 8 },
    { id: 'ai-storage', label: 'AI/Data-center SSD', sharePercent: 2, averageCapacityTb: 16 }
  ]
})

const { targetRef: simulatorRoot, isFullscreen, toggleFullscreen } = useFullscreenElement()

const presets = listNandSsdScenarioPresets()

function applyPreset(presetInput: NandSsdDemandInput) {
  input.totalSsdShipmentsMillion = presetInput.totalSsdShipmentsMillion
  input.segments.splice(0, input.segments.length, ...presetInput.segments.map((segment) => ({ ...segment })))
}

function segmentKey(segment: NandSsdSegmentInput) {
  return `${segment.id}-${segment.label}`
}

const result = computed(() => calculateNandSsdDemand(input))
const shipmentSensitivityRows = computed(() => buildSsdShipmentSensitivityRows(input, [-20, -10, 0, 10, 20]))
const enterpriseMixRows = computed(() => buildEnterpriseMixSensitivityRows(input, [10, 15, 20, 30, 40]))
</script>

<template>
  <section ref="simulatorRoot" class="simulator-card nand-card" :class="{ 'is-fullscreen': isFullscreen }">
    <div class="simulator-header">
      <div>
        <p class="eyebrow">Illustrative NAND SSD Calculator</p>
        <h2>NAND SSD 수요</h2>
      </div>
      <div class="simulator-header-actions">
        <p class="formula">Demand = SSD Shipments × Segment Mix × Avg. NAND TB/SSD</p>
        <button class="simulator-fullscreen-toggle" type="button" @click="toggleFullscreen">
          {{ isFullscreen ? '전체화면 종료' : '전체화면' }}
        </button>
      </div>
    </div>

    <div class="preset-panel">
      <h3>Reference scenario presets</h3>
      <p>
        아래 preset은 Client / Enterprise / AI Data-center SSD mix가 평균 NAND content와 총 bit demand를 어떻게 움직이는지 보여주는 illustrative scenario입니다. 아직 출처 기반 market forecast가 아닙니다.
      </p>
      <div class="preset-grid">
        <button v-for="preset in presets" :key="preset.id" type="button" @click="applyPreset(preset.input)">
          <strong>{{ preset.label }}</strong>
          <span>{{ preset.description }}</span>
        </button>
      </div>
    </div>

    <div class="grid inputs single-input">
      <label>
        <span>SSD 출하량 (백만 대)</span>
        <input v-model.number="input.totalSsdShipmentsMillion" type="number" min="0" step="5" />
      </label>
    </div>

    <div class="segment-grid">
      <article v-for="segment in input.segments" :key="segmentKey(segment)" class="segment-card">
        <h3>{{ segment.label }}</h3>
        <label>
          <span>비중 (%)</span>
          <input v-model.number="segment.sharePercent" type="number" min="0" max="100" step="1" />
        </label>
        <label>
          <span>평균 NAND (TB/SSD)</span>
          <input v-model.number="segment.averageCapacityTb" type="number" min="0" step="0.25" />
        </label>
      </article>
    </div>

    <div class="result-grid">
      <article>
        <span>가중 평균 NAND</span>
        <strong>{{ formatNumber(result.weightedAverageCapacityTb, 2) }} TB/SSD</strong>
      </article>
      <article>
        <span>총 NAND SSD 수요</span>
        <strong>{{ formatCapacityTb(result.totalNandTb) }}</strong>
      </article>
      <article>
        <span>총 NAND SSD 수요</span>
        <strong>{{ formatNumber(result.totalNandEb, 2) }} EB</strong>
      </article>
      <article>
        <span>정규화된 Segment 수</span>
        <strong>{{ result.normalizedSegments.length }}</strong>
      </article>
    </div>

    <div class="table-wrap">
      <h3>정규화된 segment mix</h3>
      <table>
        <thead>
          <tr>
            <th>Segment</th>
            <th>정규화 비중</th>
            <th>출하량</th>
            <th>평균 NAND</th>
            <th>Segment 수요</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="segment in result.normalizedSegments" :key="segmentKey(segment)">
            <td>{{ segment.label }}</td>
            <td>{{ formatNumber(segment.normalizedSharePercent, 2) }}%</td>
            <td>{{ formatNumber(segment.unitsMillion, 1) }}M</td>
            <td>{{ formatNumber(segment.averageCapacityTb, 2) }} TB</td>
            <td>{{ formatCapacityTb(segment.segmentNandTb) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-wrap">
      <h3>SSD shipment 민감도</h3>
      <table>
        <thead>
          <tr>
            <th>출하량 변화</th>
            <th>출하량</th>
            <th>평균 NAND</th>
            <th>총 NAND 수요</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in shipmentSensitivityRows" :key="row.changePercent">
            <td>{{ row.changePercent > 0 ? '+' : '' }}{{ row.changePercent }}%</td>
            <td>{{ formatNumber(row.totalSsdShipmentsMillion, 0) }}M</td>
            <td>{{ formatNumber(row.result.weightedAverageCapacityTb, 2) }} TB/SSD</td>
            <td>{{ formatCapacityTb(row.result.totalNandTb) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-wrap">
      <h3>Enterprise mix 민감도</h3>
      <table>
        <thead>
          <tr>
            <th>Enterprise 비중</th>
            <th>평균 NAND</th>
            <th>총 NAND 수요</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in enterpriseMixRows" :key="row.enterpriseSharePercent">
            <td>{{ row.enterpriseSharePercent }}%</td>
            <td>{{ formatNumber(row.result.weightedAverageCapacityTb, 2) }} TB/SSD</td>
            <td>{{ formatCapacityTb(row.result.totalNandTb) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="note">
      이 계산기는 NAND SSD bit demand 구조를 설명하기 위한 가정 투명화 도구입니다. eMMC/UFS, wafer starts, NAND layer migration, QLC/TLC mix, pricing, inventory correction은 아직 반영하지 않습니다.
    </p>
  </section>
</template>

<style scoped>
.simulator-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 24px;
  margin: 24px 0;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(14, 165, 233, 0.08));
}

.simulator-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.simulator-header h2,
.preset-panel h3,
.segment-card h3 {
  margin-top: 0;
  border-top: 0;
  padding-top: 0;
}

.eyebrow {
  margin: 0 0 4px;
  color: var(--vp-c-brand-1);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
}

.formula,
.preset-panel p,
.note {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.preset-panel,
.segment-card,
.result-grid article {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.preset-grid,
.grid,
.segment-grid,
.result-grid {
  display: grid;
  gap: 14px;
}

.preset-grid {
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 10px;
}

.segment-grid,
.result-grid {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin: 18px 0;
}

.preset-grid button {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 12px;
  text-align: left;
  cursor: pointer;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
}

.preset-grid button:hover {
  border-color: var(--vp-c-brand-1);
}

.preset-grid strong,
.preset-grid span,
.result-grid span,
.result-grid strong,
label span {
  display: block;
}

.preset-grid span,
.result-grid span {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 6px;
}

.result-grid strong {
  font-size: 20px;
  margin-top: 6px;
}

.inputs label,
.segment-card label {
  display: grid;
  gap: 6px;
  margin-bottom: 12px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

input {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 9px 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.table-wrap {
  overflow-x: auto;
  margin-top: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th,
td {
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 10px;
  text-align: left;
}

@media (max-width: 720px) {
  .simulator-header {
    display: block;
  }
}
</style>
