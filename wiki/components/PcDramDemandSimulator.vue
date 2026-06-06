<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useFullscreenElement } from '../lib/useFullscreen'
import {
  buildAiPcPenetrationSensitivityRows,
  buildPcShipmentSensitivityRows,
  calculatePcDramDemand,
  formatCapacity,
  formatNumber,
  listPcDramScenarioPresets,
  type PcDramDemandInput
} from '../lib/pcDramDemand'

const input = reactive<PcDramDemandInput>({
  pcShipmentsMillion: 250,
  aiPcPenetrationPercent: 20,
  nonAiDramGbPerPc: 8,
  aiPcDramGbPerPc: 16
})

const { targetRef: simulatorRoot, isFullscreen, toggleFullscreen } = useFullscreenElement()

const presets = listPcDramScenarioPresets()

function applyPreset(presetInput: PcDramDemandInput) {
  Object.assign(input, presetInput)
}

const result = computed(() => calculatePcDramDemand(input))
const shipmentSensitivityRows = computed(() => buildPcShipmentSensitivityRows(input, [-20, -10, 0, 10, 20]))
const aiPcPenetrationRows = computed(() => buildAiPcPenetrationSensitivityRows(input, [0, 10, 20, 30, 50]))
</script>

<template>
  <section ref="simulatorRoot" class="simulator-card" :class="{ 'is-fullscreen': isFullscreen }">
    <div class="simulator-header">
      <div>
        <p class="eyebrow">Illustrative PC DRAM Calculator</p>
        <h2>PC DRAM 수요</h2>
      </div>
      <div class="simulator-header-actions">
        <p class="formula">Demand = PC Shipments × Weighted Avg. DRAM/PC</p>
        <button class="simulator-fullscreen-toggle" type="button" @click="toggleFullscreen">
          {{ isFullscreen ? '전체화면 종료' : '전체화면' }}
        </button>
      </div>
    </div>

    <div class="preset-panel">
      <h3>Reference scenario presets</h3>
      <p>
        아래 preset은 PC DRAM 구조를 설명하기 위한 illustrative scenario입니다. 아직 출처 기반 market forecast가 아니며, AI PC 비중과 평균 DRAM 탑재량 가정을 투명하게 바꿔보는 용도입니다.
      </p>
      <div class="preset-grid">
        <button v-for="preset in presets" :key="preset.id" type="button" @click="applyPreset(preset.input)">
          <strong>{{ preset.label }}</strong>
          <span>{{ preset.description }}</span>
        </button>
      </div>
    </div>

    <div class="grid inputs">
      <label>
        <span>PC 출하량 (백만 대)</span>
        <input v-model.number="input.pcShipmentsMillion" type="number" min="0" step="5" />
      </label>
      <label>
        <span>AI PC 비중 (%)</span>
        <input v-model.number="input.aiPcPenetrationPercent" type="number" min="0" max="100" step="1" />
      </label>
      <label>
        <span>Non-AI PC DRAM (GB/대)</span>
        <input v-model.number="input.nonAiDramGbPerPc" type="number" min="0" step="1" />
      </label>
      <label>
        <span>AI PC DRAM (GB/대)</span>
        <input v-model.number="input.aiPcDramGbPerPc" type="number" min="0" step="1" />
      </label>
    </div>

    <div class="result-grid">
      <article>
        <span>AI PC / Non-AI PC</span>
        <strong>{{ formatNumber(result.aiPcUnitsMillion, 1) }}M / {{ formatNumber(result.nonAiPcUnitsMillion, 1) }}M</strong>
      </article>
      <article>
        <span>가중 평균 DRAM</span>
        <strong>{{ formatNumber(result.weightedAverageDramGb, 2) }} GB/대</strong>
      </article>
      <article>
        <span>총 PC DRAM 수요</span>
        <strong>{{ formatCapacity(result.totalDramGb) }}</strong>
      </article>
      <article>
        <span>총 PC DRAM 수요</span>
        <strong>{{ formatNumber(result.totalDramEb, 4) }} EB</strong>
      </article>
    </div>

    <div class="table-wrap">
      <h3>PC shipment 민감도</h3>
      <table>
        <thead>
          <tr>
            <th>출하량 변화</th>
            <th>출하량</th>
            <th>평균 DRAM</th>
            <th>총 DRAM 수요</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in shipmentSensitivityRows" :key="row.changePercent">
            <td>{{ row.changePercent > 0 ? '+' : '' }}{{ row.changePercent }}%</td>
            <td>{{ formatNumber(row.pcShipmentsMillion, 0) }}M</td>
            <td>{{ formatNumber(row.result.weightedAverageDramGb, 2) }} GB/대</td>
            <td>{{ formatCapacity(row.result.totalDramGb) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-wrap">
      <h3>AI PC penetration 민감도</h3>
      <table>
        <thead>
          <tr>
            <th>AI PC 비중</th>
            <th>AI PC 출하량</th>
            <th>평균 DRAM</th>
            <th>총 DRAM 수요</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in aiPcPenetrationRows" :key="row.aiPcPenetrationPercent">
            <td>{{ row.aiPcPenetrationPercent }}%</td>
            <td>{{ formatNumber(row.result.aiPcUnitsMillion, 1) }}M</td>
            <td>{{ formatNumber(row.result.weightedAverageDramGb, 2) }} GB/대</td>
            <td>{{ formatCapacity(row.result.totalDramGb) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="note">
      이 계산기는 PC DRAM bit demand 구조를 설명하기 위한 가정 투명화 도구입니다. DDR4/DDR5 mix, 채널 수, ASP, 재고 조정, notebook/desktop/workstation mix는 아직 반영하지 않습니다.
    </p>
  </section>
</template>

<style scoped>
.simulator-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 24px;
  margin: 24px 0;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(132, 204, 22, 0.08));
}

.simulator-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.simulator-header h2 {
  margin: 0;
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

.formula {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.preset-panel {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 16px;
  background: var(--vp-c-bg);
  margin-bottom: 18px;
}

.preset-panel h3 {
  margin-top: 0;
}

.preset-panel p {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.preset-grid,
.grid {
  display: grid;
  gap: 14px;
}

.preset-grid {
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 10px;
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
.preset-grid span {
  display: block;
}

.preset-grid span {
  color: var(--vp-c-text-2);
  font-size: 12px;
  margin-top: 4px;
}

.grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

input {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 10px 12px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin: 22px 0;
}

.result-grid article {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.result-grid span {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 13px;
  margin-bottom: 8px;
}

.result-grid strong {
  font-size: 22px;
}

.table-wrap {
  overflow-x: auto;
  margin-top: 18px;
}

.table-wrap h3 {
  margin-top: 8px;
}

.note {
  color: var(--vp-c-text-2);
  font-size: 13px;
  margin-bottom: 0;
}
</style>
