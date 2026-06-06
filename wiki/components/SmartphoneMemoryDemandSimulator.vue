<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useFullscreenElement } from '../lib/useFullscreen'
import {
  buildSensitivityRows,
  calculateSmartphoneMemoryDemand,
  formatCapacity,
  formatNumber,
  listScenarioPresets,
  type SmartphoneDemandInput
} from '../lib/smartphoneDemand'

const input = reactive<SmartphoneDemandInput>({
  shipmentsMillion: 1200,
  entrySharePercent: 40,
  mainstreamSharePercent: 35,
  premiumSharePercent: 25,
  entryDramGb: 4,
  mainstreamDramGb: 8,
  premiumDramGb: 12,
  entryNandGb: 128,
  mainstreamNandGb: 256,
  premiumNandGb: 256
})

const { targetRef: simulatorRoot, isFullscreen, toggleFullscreen } = useFullscreenElement()

const presets = listScenarioPresets()

function applyPreset(presetInput: SmartphoneDemandInput) {
  Object.assign(input, presetInput)
}

const result = computed(() => calculateSmartphoneMemoryDemand(input))
const sensitivityRows = computed(() => buildSensitivityRows(input, [-20, -10, 0, 10, 20]))

const segmentRows = computed(() => [
  {
    key: 'entry',
    label: 'Entry',
    share: result.value.segmentShares.entry,
    dram: input.entryDramGb,
    nand: input.entryNandGb,
    source: 'Galaxy A16 5G anchor'
  },
  {
    key: 'mainstream',
    label: 'Mainstream',
    share: result.value.segmentShares.mainstream,
    dram: input.mainstreamDramGb,
    nand: input.mainstreamNandGb,
    source: 'Galaxy A56 anchor'
  },
  {
    key: 'premium',
    label: 'Premium',
    share: result.value.segmentShares.premium,
    dram: input.premiumDramGb,
    nand: input.premiumNandGb,
    source: 'Galaxy S25 anchor'
  }
])
</script>

<template>
  <section ref="simulatorRoot" class="simulator-card" :class="{ 'is-fullscreen': isFullscreen }">
    <div class="simulator-header">
      <div>
        <p class="eyebrow">Illustrative Scenario Calculator</p>
        <h2>스마트폰 DRAM/NAND 수요</h2>
      </div>
      <div class="simulator-header-actions">
        <p class="formula">Demand = Shipments × Σ(Segment Share × Content)</p>
        <button class="simulator-fullscreen-toggle" type="button" @click="toggleFullscreen">
          {{ isFullscreen ? '전체화면 종료' : '전체화면' }}
        </button>
      </div>
    </div>

    <div class="preset-panel">
      <h3>Reference scenario presets</h3>
      <p>
        아래 preset은 시장 평균이 아니라 공개 제품 사양 예시에서 가져온 entry/mainstream/premium 3-segment content anchor입니다.
        세 비중의 합이 100이 아니면 계산 로직이 자동 정규화합니다.
      </p>
      <div class="preset-grid">
        <button v-for="preset in presets" :key="preset.id" type="button" @click="applyPreset(preset.input)">
          <strong>{{ preset.label }}</strong>
          <span>{{ preset.description }}</span>
          <small class="preset-source-row">
            <b class="confidence-badge">{{ preset.confidence }}</b>
            <em>{{ preset.sourceRefs.length }} source refs</em>
          </small>
        </button>
      </div>
    </div>

    <div class="grid top-inputs">
      <label>
        <span>스마트폰 출하량 (백만 대)</span>
        <input v-model.number="input.shipmentsMillion" type="number" min="0" step="10" />
      </label>
    </div>

    <div class="segment-grid">
      <article class="segment-card">
        <h3>Entry</h3>
        <p>Galaxy A16 5G class anchor</p>
        <label>
          <span>비중 입력값 (%)</span>
          <input v-model.number="input.entrySharePercent" type="number" min="0" max="100" step="1" />
        </label>
        <label>
          <span>DRAM (GB/대)</span>
          <input v-model.number="input.entryDramGb" type="number" min="0" step="1" />
        </label>
        <label>
          <span>NAND (GB/대)</span>
          <input v-model.number="input.entryNandGb" type="number" min="0" step="16" />
        </label>
      </article>

      <article class="segment-card">
        <h3>Mainstream</h3>
        <p>Galaxy A56 class anchor</p>
        <label>
          <span>비중 입력값 (%)</span>
          <input v-model.number="input.mainstreamSharePercent" type="number" min="0" max="100" step="1" />
        </label>
        <label>
          <span>DRAM (GB/대)</span>
          <input v-model.number="input.mainstreamDramGb" type="number" min="0" step="1" />
        </label>
        <label>
          <span>NAND (GB/대)</span>
          <input v-model.number="input.mainstreamNandGb" type="number" min="0" step="16" />
        </label>
      </article>

      <article class="segment-card">
        <h3>Premium</h3>
        <p>Galaxy S25 class anchor</p>
        <label>
          <span>비중 입력값 (%)</span>
          <input v-model.number="input.premiumSharePercent" type="number" min="0" max="100" step="1" />
        </label>
        <label>
          <span>DRAM (GB/대)</span>
          <input v-model.number="input.premiumDramGb" type="number" min="0" step="1" />
        </label>
        <label>
          <span>NAND (GB/대)</span>
          <input v-model.number="input.premiumNandGb" type="number" min="0" step="16" />
        </label>
      </article>
    </div>

    <div class="result-grid">
      <article>
        <span>가중 평균 DRAM</span>
        <strong>{{ formatNumber(result.weightedAverageDramGb, 2) }} GB/대</strong>
      </article>
      <article>
        <span>가중 평균 NAND</span>
        <strong>{{ formatNumber(result.weightedAverageNandGb, 2) }} GB/대</strong>
      </article>
      <article>
        <span>총 DRAM 수요</span>
        <strong>{{ formatCapacity(result.totalDramGb) }}</strong>
      </article>
      <article>
        <span>총 NAND 수요</span>
        <strong>{{ formatCapacity(result.totalNandGb) }}</strong>
      </article>
    </div>

    <div class="table-wrap">
      <h3>정규화된 segment mix</h3>
      <table>
        <thead>
          <tr>
            <th>Segment</th>
            <th>정규화 비중</th>
            <th>DRAM</th>
            <th>NAND</th>
            <th>Anchor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in segmentRows" :key="row.key">
            <td>{{ row.label }}</td>
            <td>{{ formatNumber(row.share, 2) }}%</td>
            <td>{{ formatNumber(row.dram, 0) }} GB/대</td>
            <td>{{ formatNumber(row.nand, 0) }} GB/대</td>
            <td>{{ row.source }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-wrap">
      <h3>출하량 민감도</h3>
      <table>
        <thead>
          <tr>
            <th>출하량 변화</th>
            <th>출하량</th>
            <th>DRAM 수요</th>
            <th>NAND 수요</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in sensitivityRows" :key="row.changePercent">
            <td>{{ row.changePercent > 0 ? '+' : '' }}{{ row.changePercent }}%</td>
            <td>{{ formatNumber(row.shipmentsMillion, 0) }}M</td>
            <td>{{ formatCapacity(row.result.totalDramGb) }}</td>
            <td>{{ formatCapacity(row.result.totalNandGb) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="note">
      현재 기본값은 출처 기반 시장 forecast가 아니라 구조를 보여주기 위한 예시 가정입니다. 가격, 재고 조정, 공급 제약은 아직 반영하지 않습니다.
    </p>
  </section>
</template>

<style scoped>
.simulator-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 24px;
  margin: 24px 0;
  background: linear-gradient(135deg, rgba(100, 108, 255, 0.08), rgba(16, 185, 129, 0.08));
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
.segment-grid,
.preset-source-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  margin-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 11px;
}

.confidence-badge {
  padding: 2px 7px;
  border-radius: 999px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-size: 10px;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.preset-source-row em {
  font-style: normal;
}

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

.top-inputs {
  margin-bottom: 16px;
}

.segment-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.segment-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 16px;
  background: var(--vp-c-bg);
}

.segment-card h3 {
  margin-top: 0;
}

.segment-card p {
  margin-top: -6px;
  color: var(--vp-c-text-2);
  font-size: 13px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 10px;
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
