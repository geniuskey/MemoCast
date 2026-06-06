<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

type SuggestedWikiTarget = {
  path: string
  title: string
  score: number
  reason: string
}

type PriorityRawFile = {
  path: string
  title: string
  source_url?: string
  type?: string
  confidence?: string
  tags?: string[]
  priority: number
  suggestedWikiTargets: SuggestedWikiTarget[]
}

type CitationAudit = {
  summary: {
    rawTotal: number
    rawCited: number
    rawUncited: number
    missingRawReferences: number
    wikiPages: number
    wikiPagesWithoutRawReferences: number
  }
  priorityUncitedRawFiles?: PriorityRawFile[]
}

const audit = ref<CitationAudit | null>(null)
const loading = ref(true)
const error = ref('')

const coveragePercent = computed(() => {
  if (!audit.value || audit.value.summary.rawTotal === 0) return '0.0'
  return ((audit.value.summary.rawCited / audit.value.summary.rawTotal) * 100).toFixed(1)
})

const priorityItems = computed(() => audit.value?.priorityUncitedRawFiles?.slice(0, 12) ?? [])

onMounted(async () => {
  try {
    const response = await fetch(withBase('/citation-audit.json'))
    if (!response.ok) throw new Error(`citation audit fetch failed: ${response.status}`)
    audit.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'citation audit를 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
})

function wikiHref(path: string) {
  return withBase(`/${path.replace(/^wiki\//, '').replace(/\.md$/, '')}`)
}
</script>

<template>
  <section class="citation-work-queue">
    <div class="queue-header">
      <p class="queue-kicker">Raw integration queue</p>
      <h2>미연결 raw를 wiki 지식으로 연결하는 다음 작업 목록</h2>
      <p>
        citation audit가 uncited raw를 우선순위화하고, 제목·태그·폴더·도메인 키워드로 연결 후보 wiki page를 제안합니다.
      </p>
    </div>

    <div v-if="loading" class="queue-state">citation audit를 불러오는 중입니다…</div>
    <div v-else-if="error" class="queue-state is-error">{{ error }}</div>

    <template v-else-if="audit">
      <div class="queue-metrics" aria-label="Citation coverage metrics">
        <article>
          <span>Raw coverage</span>
          <strong>{{ coveragePercent }}%</strong>
          <p>{{ audit.summary.rawCited }} / {{ audit.summary.rawTotal }} cited</p>
        </article>
        <article>
          <span>Uncited raw</span>
          <strong>{{ audit.summary.rawUncited }}</strong>
          <p>연결 후보가 필요한 source</p>
        </article>
        <article>
          <span>Wiki pages without raw refs</span>
          <strong>{{ audit.summary.wikiPagesWithoutRawReferences }}</strong>
          <p>근거 보강 대상 page</p>
        </article>
      </div>

      <div v-if="priorityItems.length === 0" class="queue-state">
        우선순위 queue가 아직 생성되지 않았습니다. `npm run audit:citations`를 실행하면 citation-audit.json에 후보가 추가됩니다.
      </div>

      <div v-else class="queue-list">
        <article v-for="item in priorityItems" :key="item.path" class="queue-item">
          <div class="item-main">
            <div class="item-title-row">
              <span class="type-pill">{{ item.type ?? 'raw' }}</span>
              <span class="priority-pill">priority {{ item.priority }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="raw-path">{{ item.path }}</p>
            <a v-if="item.source_url" :href="item.source_url" target="_blank" rel="noreferrer">원문 열기 →</a>
          </div>

          <div class="target-list">
            <p>추천 연결 page</p>
            <a
              v-for="target in item.suggestedWikiTargets"
              :key="target.path"
              :href="wikiHref(target.path)"
              class="target-chip"
            >
              <strong>{{ target.title }}</strong>
              <span>{{ target.reason }}</span>
            </a>
            <span v-if="item.suggestedWikiTargets.length === 0" class="empty-target">후보 없음 — 수동 분류 필요</span>
          </div>
        </article>
      </div>
    </template>
  </section>
</template>

<style scoped>
.citation-work-queue {
  margin: 28px 0 34px;
  padding: clamp(18px, 3vw, 28px);
  border: 1px solid rgba(113, 112, 255, 0.22);
  border-radius: 28px;
  color: #f7f8f8;
  background:
    radial-gradient(circle at 14% 0%, rgba(113, 112, 255, 0.22), transparent 32%),
    radial-gradient(circle at 88% 18%, rgba(14, 165, 233, 0.15), transparent 32%),
    linear-gradient(180deg, #101128 0%, #08090a 100%);
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.28);
}

.queue-header {
  max-width: 900px;
}

.queue-kicker {
  margin: 0 0 10px;
  color: #aeb6ff;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.queue-header h2 {
  margin: 0;
  color: #f7f8f8;
  font-size: clamp(24px, 3.4vw, 38px);
  line-height: 1.1;
  letter-spacing: -0.04em;
  word-break: keep-all;
}

.queue-header p:not(.queue-kicker) {
  margin: 14px 0 0;
  color: #c5ccdc;
  font-size: 15px;
  line-height: 1.65;
}

.queue-state {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  color: #c5ccdc;
  background: rgba(255, 255, 255, 0.04);
}

.queue-state.is-error {
  color: #fecaca;
  border-color: rgba(248, 113, 113, 0.35);
  background: rgba(127, 29, 29, 0.22);
}

.queue-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;
}

.queue-metrics article,
.queue-item {
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.queue-metrics article {
  padding: 16px;
}

.queue-metrics span {
  color: #9aa3b2;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.queue-metrics strong {
  display: block;
  margin-top: 8px;
  color: #ffffff;
  font-size: 30px;
  letter-spacing: -0.04em;
}

.queue-metrics p {
  margin: 6px 0 0;
  color: #c5ccdc;
  font-size: 13px;
}

.queue-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.queue-item {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, 0.8fr);
  gap: 16px;
  padding: 16px;
}

.item-title-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.type-pill,
.priority-pill {
  display: inline-flex;
  min-height: 24px;
  align-items: center;
  padding: 0 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.type-pill {
  color: #dbeafe;
  background: rgba(37, 99, 235, 0.28);
}

.priority-pill {
  color: #fef3c7;
  background: rgba(217, 119, 6, 0.26);
}

.queue-item h3 {
  margin: 10px 0 6px;
  color: #ffffff;
  font-size: 18px;
  line-height: 1.25;
  letter-spacing: -0.025em;
  word-break: keep-all;
}

.raw-path {
  margin: 0;
  color: #9aa3b2;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  overflow-wrap: anywhere;
}

.item-main a {
  display: inline-flex;
  margin-top: 12px;
  color: #aeb6ff;
  font-weight: 800;
  text-decoration: none;
}

.target-list p {
  margin: 0 0 8px;
  color: #9aa3b2;
  font-size: 12px;
  font-weight: 850;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.target-chip {
  display: block;
  padding: 10px 12px;
  border: 1px solid rgba(174, 182, 255, 0.18);
  border-radius: 14px;
  color: #f7f8f8;
  background: rgba(174, 182, 255, 0.07);
  text-decoration: none;
}

.target-chip + .target-chip {
  margin-top: 8px;
}

.target-chip strong,
.target-chip span {
  display: block;
}

.target-chip span,
.empty-target {
  margin-top: 4px;
  color: #aeb6ff;
  font-size: 12px;
}

@media (max-width: 860px) {
  .queue-metrics,
  .queue-item {
    grid-template-columns: 1fr;
  }
}
</style>
