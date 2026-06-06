<script setup lang="ts">
import { computed } from 'vue'
import { useFullscreenElement } from '../lib/useFullscreen'
import {
  buildDefaultDomainComparisonRows,
  buildScenarioDeltaRows,
  formatEb,
  rankComparisonRowsByDemand
} from '../lib/domainComparison'

const { targetRef: simulatorRoot, isFullscreen, toggleFullscreen } = useFullscreenElement()

const baseRows = computed(() => buildDefaultDomainComparisonRows())
const rankedRows = computed(() => rankComparisonRowsByDemand(baseRows.value))
const deltaRows = computed(() => buildScenarioDeltaRows())
</script>

<template>
  <section ref="simulatorRoot" class="comparison-card" :class="{ 'is-fullscreen': isFullscreen }">
    <div class="comparison-header">
      <div>
        <p class="eyebrow">Cross-domain Scenario Panel</p>
        <h2>메모리 수요 도메인 비교</h2>
      </div>
      <div class="simulator-header-actions">
        <p class="formula">Common unit = EB, assumptions remain simulator-specific</p>
        <button class="simulator-fullscreen-toggle" type="button" @click="toggleFullscreen">
          {{ isFullscreen ? '전체화면 종료' : '전체화면' }}
        </button>
      </div>
    </div>

    <p class="intro">
      이 패널은 Smartphone DRAM/NAND, PC DRAM, AI Server HBM, NAND SSD 시뮬레이터의 현재 기준 preset을 EB 단위로 나란히 놓습니다. 서로 다른 시장을 하나의 “정답”으로 합산하기보다, 어떤 application이 bit demand 규모와 민감도를 크게 움직이는지 비교하는 용도입니다.
    </p>

    <div class="rank-grid">
      <article v-for="row in rankedRows" :key="row.id">
        <span>{{ row.family }}</span>
        <strong>{{ row.label }}</strong>
        <em>{{ formatEb(row.totalDemandEb) }}</em>
      </article>
    </div>

    <div class="table-wrap">
      <h3>기준 preset 비교</h3>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Family</th>
            <th>Demand basis</th>
            <th>Total demand</th>
            <th>Preset</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in baseRows" :key="row.id">
            <td>{{ row.label }}</td>
            <td>{{ row.family }}</td>
            <td>{{ row.demandBasis }}</td>
            <td>{{ formatEb(row.totalDemandEb) }}</td>
            <td>{{ row.sourcePreset }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-wrap">
      <h3>Base → upside scenario delta</h3>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Base</th>
            <th>Upside</th>
            <th>Δ EB</th>
            <th>Δ %</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in deltaRows" :key="row.id">
            <td>{{ row.label }}</td>
            <td>{{ formatEb(row.baseDemandEb) }}</td>
            <td>{{ formatEb(row.upsideDemandEb) }}</td>
            <td>{{ formatEb(row.deltaEb) }}</td>
            <td>{{ row.deltaPercent.toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="note">
      주의: EB 단위 비교는 scale 감각을 제공하지만 DRAM, NAND, HBM은 가격, 공정, 공급 제약, 재고 사이클이 서로 다릅니다. 이 패널은 cross-domain sensitivity map이지 통합 시장 전망 모델이 아닙니다.
    </p>
  </section>
</template>

<style scoped>
.comparison-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  padding: 24px;
  margin: 24px 0;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(14, 165, 233, 0.08));
}

.comparison-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.comparison-header h2,
.table-wrap h3 {
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
.intro,
.note {
  color: var(--vp-c-text-2);
  font-size: 13px;
}

.rank-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin: 18px 0;
}

.rank-grid article {
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  padding: 14px;
  background: var(--vp-c-bg);
}

.rank-grid span,
.rank-grid strong,
.rank-grid em {
  display: block;
}

.rank-grid span {
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.rank-grid strong {
  margin-top: 4px;
}

.rank-grid em {
  color: var(--vp-c-brand-1);
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  margin-top: 8px;
}

.table-wrap {
  overflow-x: auto;
  margin-top: 22px;
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
  .comparison-header {
    display: block;
  }
}
</style>
