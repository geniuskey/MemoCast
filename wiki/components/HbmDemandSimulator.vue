<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useFullscreenElement } from '../lib/useFullscreen'
import {
  buildHbmContentSensitivityRows,
  buildHbmShipmentSensitivityRows,
  calculateHbmDemand,
  formatCapacity,
  formatNumber,
  listHbmScenarioPresets,
  type HbmDemandInput
} from '../lib/hbmDemand'

const input = reactive<HbmDemandInput>({
  acceleratorsThousand: 1000,
  attachRatePercent: 90,
  hbmStacksPerAccelerator: 8,
  hbmCapacityGbPerStack: 36
})

const { targetRef: simulatorRoot, isFullscreen, toggleFullscreen } = useFullscreenElement()

const presets = listHbmScenarioPresets()

function applyPreset(presetInput: HbmDemandInput) {
  Object.assign(input, presetInput)
}

const result = computed(() => calculateHbmDemand(input))
const shipmentSensitivityRows = computed(() => buildHbmShipmentSensitivityRows(input, [-20, -10, 0, 10, 20]))
const contentSensitivityRows = computed(() => buildHbmContentSensitivityRows(input, [16, 24, 36, 48]))
</script>

<template>
  <section ref="simulatorRoot" class="simulator-card" :class="{ 'is-fullscreen': isFullscreen }">
    <div class="simulator-header">
      <div>
        <p class="eyebrow">Illustrative HBM Calculator</p>
        <h2>AI Server HBM 수요</h2>
      </div>
      <div class="simulator-header-actions">
        <p class="formula">Demand = Accelerators × Attach Rate × Stacks × GB/Stack</p>
        <button class="simulator-fullscreen-toggle" type="button" @click="toggleFullscreen">
          {{ isFullscreen ? '전체화면 종료' : '전체화면' }}
        </button>
      </div>
    </div>

    <div class="preset-panel">
      <h3>Reference scenario presets</h3>
      <p>
        아래 preset은 HBM 제품 capacity anchor를 사용한 source-anchored example scenario입니다. AI accelerator 출하량은 예시 입력값이며 시장 forecast가 아닙니다.
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
        <span>AI accelerator 출하량 (천 개)</span>
        <input v-model.number="input.acceleratorsThousand" type="number" min="0" step="10" />
      </label>
      <label>
        <span>HBM attach rate (%)</span>
        <input v-model.number="input.attachRatePercent" type="number" min="0" max="100" step="1" />
      </label>
      <label>
        <span>Accelerator당 HBM stack 수</span>
        <input v-model.number="input.hbmStacksPerAccelerator" type="number" min="0" step="1" />
      </label>
      <label>
        <span>Stack당 HBM capacity (GB)</span>
        <input v-model.number="input.hbmCapacityGbPerStack" type="number" min="0" step="1" />
      </label>
    </div>

    <div class="result-grid">
      <article>
        <span>Attach 적용 accelerator</span>
        <strong>{{ formatNumber(result.attachedAcceleratorsThousand, 0) }}K</strong>
      </article>
      <article>
        <span>Accelerator당 HBM</span>
        <strong>{{ formatNumber(result.hbmGbPerAccelerator, 0) }} GB</strong>
      </article>
      <article>
        <span>총 HBM 수요</span>
        <strong>{{ formatCapacity(result.totalHbmGb) }}</strong>
      </article>
      <article>
        <span>총 HBM 수요</span>
        <strong>{{ formatNumber(result.totalHbmEb, 4) }} EB</strong>
      </article>
    </div>

    <div class="table-wrap">
      <h3>Accelerator shipment 민감도</h3>
      <table>
        <thead>
          <tr>
            <th>출하량 변화</th>
            <th>출하량</th>
            <th>Accelerator당 HBM</th>
            <th>총 HBM 수요</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in shipmentSensitivityRows" :key="row.changePercent">
            <td>{{ row.changePercent > 0 ? '+' : '' }}{{ row.changePercent }}%</td>
            <td>{{ formatNumber(row.acceleratorsThousand, 0) }}K</td>
            <td>{{ formatNumber(row.result.hbmGbPerAccelerator, 0) }} GB</td>
            <td>{{ formatCapacity(row.result.totalHbmGb) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-wrap">
      <h3>Stack capacity 민감도</h3>
      <table>
        <thead>
          <tr>
            <th>Stack capacity</th>
            <th>Accelerator당 HBM</th>
            <th>총 HBM 수요</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in contentSensitivityRows" :key="row.hbmCapacityGbPerStack">
            <td>{{ formatNumber(row.hbmCapacityGbPerStack, 0) }} GB/stack</td>
            <td>{{ formatNumber(row.result.hbmGbPerAccelerator, 0) }} GB</td>
            <td>{{ formatCapacity(row.result.totalHbmGb) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="note">
      이 계산기는 bit demand 구조를 설명하기 위한 가정 투명화 도구입니다. GPU 공급 제약, 수율, 가격, customer inventory, HBM generation별 실제 출하 mix는 아직 반영하지 않습니다.
    </p>
  </section>
</template>

<style scoped>
.simulator-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 24px;
  margin: 24px 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(236, 72, 153, 0.08));
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
