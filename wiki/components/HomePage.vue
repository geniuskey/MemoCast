<script setup>
import { withBase } from 'vitepress'
import dashboard from '../data/home-dashboard.json'

const summary = dashboard.summary
const rawSourceFileTotal = summary.rawSourceFiles ?? summary.rawTotal
const rawDataFiles = summary.rawDataFiles ?? 0
const rawTypeRows = Object.entries(dashboard.rawByType)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 5)
const recentUpdates = dashboard.recentUpdates.slice(0, 5)
const lowConfidenceItems = dashboard.lowConfidence.slice(0, 6)
const enrichmentClusters = dashboard.enrichmentClusters.slice(0, 6)

function formatDate(value) {
  if (!value) return 'date n/a'
  return String(value).slice(0, 10)
}

function confidenceLabel(value) {
  return value ? value.toUpperCase() : 'UNRATED'
}
</script>

<template>
  <div class="mc-home">
    <section class="mc-hero">
      <div class="mc-hero-copy">
        <p class="mc-eyebrow">Memory demand forecasting knowledge base</p>
        <h1>메모리 수요 예측을<br /><span>증거에서 시나리오까지</span></h1>
        <p class="mc-lede">
          MemoCast는 DRAM, NAND, HBM, PC·스마트폰 메모리 수요를 raw source 기반으로 정리하고,
          구조적 수요 모델과 인터랙티브 시뮬레이터로 추적하는 반도체 메모리 예측 위키입니다.
        </p>
        <div class="mc-actions">
          <a class="mc-button mc-button-primary" :href="withBase('/simulators/')">시뮬레이터 열기</a>
          <a class="mc-button" :href="withBase('/charts')">인터랙티브 차트</a>
          <a class="mc-button" :href="withBase('/graph')">지식 그래프 보기</a>
        </div>
        <div class="mc-stats" aria-label="MemoCast content statistics">
          <div><strong>{{ summary.wikiPages }}</strong><span>wiki pages</span></div>
          <div><strong>{{ rawSourceFileTotal }}</strong><span>raw files</span></div>
          <div><strong>{{ summary.rawTotal }}</strong><span>source notes</span></div>
          <div><strong>{{ rawDataFiles }}</strong><span>CSV datasets</span></div>
          <div><strong>{{ summary.simulatorPresets }}</strong><span>source-backed presets</span></div>
        </div>
      </div>

      <div class="mc-hero-panel" aria-label="MemoCast forecast cockpit preview">
        <div class="mc-panel-header">
          <span></span><span></span><span></span>
          <em>forecast cockpit</em>
        </div>
        <div class="mc-signal-card mc-signal-card-hot">
          <small>HBM bit demand</small>
          <strong>AI accelerator × attach rate × stack capacity</strong>
          <div class="mc-meter"><i style="width: 82%"></i></div>
        </div>
        <div class="mc-signal-grid">
          <div>
            <small>PC DRAM</small>
            <strong>AI PC penetration</strong>
            <span>16GB+ baseline</span>
          </div>
          <div>
            <small>NAND SSD</small>
            <strong>Enterprise QLC</strong>
            <span>AI storage mix</span>
          </div>
          <div>
            <small>Mobile</small>
            <strong>On-device AI</strong>
            <span>DRAM uplift</span>
          </div>
          <div>
            <small>Supply gap</small>
            <strong>Bit growth delta</strong>
            <span>price/revenue signal</span>
          </div>
        </div>
      </div>
    </section>

    <section class="mc-section mc-dashboard" aria-labelledby="dashboard-heading">
      <div class="mc-section-heading mc-dashboard-heading">
        <div>
          <p class="mc-eyebrow">Work dashboard</p>
          <h2 id="dashboard-heading">수집·추적 상황판</h2>
          <p>
            raw 수집량, markdown source note의 wiki 연결 상태, CSV dataset ledger, 최근 업데이트와 보강 필요 cluster를 한 화면에서 추적합니다.
          </p>
        </div>
        <a class="mc-button" :href="withBase('/sources/citation-matrix')">Citation matrix</a>
      </div>

      <div class="mc-dashboard-grid">
        <article class="mc-dashboard-card mc-dashboard-card-wide">
          <div class="mc-card-title-row">
            <div>
              <p class="mc-eyebrow">Coverage</p>
              <h3>markdown raw → wiki 연결 상태</h3>
            </div>
            <strong>{{ summary.rawCited }}/{{ summary.rawTotal }}</strong>
          </div>
          <div class="mc-progress" aria-label="Raw citation coverage">
            <i :style="{ width: `${Math.round((summary.rawCited / Math.max(summary.rawTotal, 1)) * 100)}%` }"></i>
          </div>
          <div class="mc-mini-metrics">
            <span><b>{{ summary.rawUncited }}</b> uncited source notes</span>
            <span><b>{{ rawDataFiles }}</b> CSV datasets tracked</span>
            <span><b>{{ summary.wikiPagesWithoutRawReferences }}</b> pages without raw refs</span>
            <span><b>{{ summary.missingRawReferences }}</b> missing refs</span>
          </div>
          <div class="mc-type-bars">
            <div v-for="([type, count]) in rawTypeRows" :key="type">
              <span>{{ type }}</span>
              <i :style="{ width: `${Math.round((count / Math.max(summary.rawTotal, 1)) * 100)}%` }"></i>
              <b>{{ count }}</b>
            </div>
          </div>
        </article>

        <article class="mc-dashboard-card">
          <p class="mc-eyebrow">Confidence watch</p>
          <h3>낮은 confidence</h3>
          <div class="mc-watch-number">{{ summary.lowConfidenceRaw + summary.lowConfidencePresets }}</div>
          <p class="mc-watch-copy">
            raw {{ summary.lowConfidenceRaw }}개, simulator preset {{ summary.lowConfidencePresets }}개가 교차검증 후보입니다.
          </p>
          <ul class="mc-compact-list">
            <li v-for="item in lowConfidenceItems" :key="`${item.kind}:${item.path ?? item.domain + item.id}`">
              <span class="mc-pill mc-pill-low">LOW</span>
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </article>
      </div>

      <div class="mc-dashboard-grid mc-dashboard-grid-3">
        <article class="mc-dashboard-card">
          <p class="mc-eyebrow">Recent raw</p>
          <h3>최근 업데이트</h3>
          <ul class="mc-update-list">
            <li v-for="item in recentUpdates" :key="item.path">
              <time>{{ formatDate(item.date) }}</time>
              <a v-if="item.sourceUrl" :href="item.sourceUrl" target="_blank" rel="noreferrer">{{ item.title }}</a>
              <span v-else>{{ item.title }}</span>
              <small>{{ item.type }} · {{ confidenceLabel(item.confidence) }}</small>
            </li>
          </ul>
        </article>

        <article class="mc-dashboard-card mc-dashboard-card-clusters">
          <p class="mc-eyebrow">Needs enrichment</p>
          <h3>보강 필요 cluster</h3>
          <div class="mc-cluster-list">
            <div v-for="cluster in enrichmentClusters" :key="cluster.tag" class="mc-cluster-row">
              <div>
                <strong>#{{ cluster.tag }}</strong>
                <span>{{ cluster.rawTotal }} raw · {{ cluster.uncitedRaw }} uncited · {{ cluster.lowConfidenceRaw }} low</span>
              </div>
              <b>{{ cluster.enrichmentScore }}</b>
            </div>
          </div>
        </article>

        <article class="mc-dashboard-card">
          <p class="mc-eyebrow">Next actions</p>
          <h3>바로 보강할 항목</h3>
          <ul class="mc-action-list">
            <li>신규 raw markdown은 market/concept page의 `sources`로 즉시 연결</li>
            <li>신규 CSV는 paired markdown note와 Dataset CSV Ledger를 함께 갱신</li>
            <li>low confidence preset은 1차 자료 또는 dataset anchor 추가</li>
            <li>상위 cluster는 chart 또는 simulator 후보로 승격</li>
          </ul>
          <div class="mc-actions mc-actions-compact">
            <a class="mc-button" :href="withBase('/sources/raw-source-map')">Raw map</a>
            <a class="mc-button" :href="withBase('/sources/raw-dataset-csv-ledger')">CSV ledger</a>
            <a class="mc-button" :href="withBase('/graph')">Graph</a>
          </div>
        </article>
      </div>
    </section>

    <section class="mc-section">
      <div class="mc-section-heading">
        <p class="mc-eyebrow">Start here</p>
        <h2>분석 흐름</h2>
        <p>개념 정의에서 출처 검증, 시장별 모델링, 시뮬레이션까지 한 번에 이동할 수 있습니다.</p>
      </div>
      <div class="mc-card-grid mc-card-grid-4">
        <a class="mc-card" :href="withBase('/concepts/demand-forecasting')">
          <span>01</span>
          <h3>수요 예측 지도</h3>
          <p>메모리 demand를 unit, bit, capacity, revenue 관점으로 분해합니다.</p>
        </a>
        <a class="mc-card" :href="withBase('/methods/structural-demand-model')">
          <span>02</span>
          <h3>구조적 수요 모델</h3>
          <p>출하량 × 탑재량 × attach rate 기반의 재사용 가능한 예측 골격입니다.</p>
        </a>
        <a class="mc-card" :href="withBase('/sources/citation-matrix')">
          <span>03</span>
          <h3>근거·CSV 추적</h3>
          <p>각 wiki page, simulator preset, paired CSV dataset이 어떤 raw source와 연결되는지 확인합니다.</p>
        </a>
        <a class="mc-card" :href="withBase('/comparisons/domain-comparison')">
          <span>04</span>
          <h3>도메인 비교</h3>
          <p>Smartphone, PC, HBM, NAND SSD 수요를 EB 단위로 비교합니다.</p>
        </a>
      </div>
    </section>

    <section class="mc-section mc-split">
      <div>
        <p class="mc-eyebrow">Markets</p>
        <h2>시장별 수요 드라이버</h2>
        <p>
          MemoCast는 단순 뉴스 스크랩이 아니라, 시장별 수요 변화가 bit demand로 이어지는 경로를
          연결합니다. AI 서버/HBM, AI PC/DRAM, on-device AI 스마트폰, enterprise SSD 전환을
          같은 모델 언어로 비교할 수 있습니다.
        </p>
        <div class="mc-actions mc-actions-compact">
          <a class="mc-button mc-button-primary" :href="withBase('/markets/hbm')">HBM 보기</a>
          <a class="mc-button" :href="withBase('/markets/dram')">DRAM 보기</a>
        </div>
      </div>
      <div class="mc-market-list">
        <a :href="withBase('/markets/hbm')"><strong>HBM</strong><span>AI GPU shipment, stack count, capacity roadmap</span></a>
        <a :href="withBase('/markets/pc-dram')"><strong>PC DRAM</strong><span>AI PC penetration and baseline memory content</span></a>
        <a :href="withBase('/markets/smartphone-memory')"><strong>Smartphone</strong><span>Entry/mainstream/premium DRAM·NAND mix</span></a>
        <a :href="withBase('/markets/nand')"><strong>NAND</strong><span>Client/enterprise/AI storage SSD TB demand</span></a>
      </div>
    </section>

    <section class="mc-section">
      <div class="mc-section-heading">
        <p class="mc-eyebrow">Interactive models</p>
        <h2>시나리오 시뮬레이터</h2>
        <p>Base/Bull/Bear 가정을 빠르게 전환하고, 가정 변화가 EB 단위 수요에 미치는 영향을 확인합니다.</p>
      </div>
      <div class="mc-card-grid">
        <a class="mc-card mc-card-accent" :href="withBase('/simulators/hbm-demand')">
          <span>SIM</span>
          <h3>AI Server HBM Demand</h3>
          <p>Accelerator shipment, HBM attach rate, stack 수, stack당 capacity로 HBM 수요를 계산합니다.</p>
        </a>
        <a class="mc-card mc-card-accent" :href="withBase('/simulators/nand-ssd-demand')">
          <span>SIM</span>
          <h3>NAND SSD Demand</h3>
          <p>Client/Enterprise/AI storage SSD mix와 평균 NAND TB/SSD로 수요를 계산합니다.</p>
        </a>
        <a class="mc-card mc-card-accent" :href="withBase('/simulators/pc-dram-demand')">
          <span>SIM</span>
          <h3>PC DRAM Demand</h3>
          <p>PC 출하량, AI PC penetration, Non-AI/AI PC별 DRAM content를 비교합니다.</p>
        </a>
        <a class="mc-card mc-card-accent" :href="withBase('/simulators/smartphone-memory-demand')">
          <span>SIM</span>
          <h3>Smartphone Memory Demand</h3>
          <p>스마트폰 세그먼트별 평균 DRAM/NAND 탑재량으로 메모리 수요를 계산합니다.</p>
        </a>
      </div>
    </section>

    <section class="mc-section mc-source-band">
      <div>
        <p class="mc-eyebrow">Source-backed updates</p>
        <h2>최근 raw expansion anchor</h2>
        <p>416개 markdown source note와 46개 CSV dataset을 함께 추적합니다.</p>
        <div class="mc-actions mc-actions-compact">
          <a class="mc-button" :href="withBase('/sources/raw-dataset-csv-ledger')">Dataset CSV Ledger</a>
          <a class="mc-button" :href="withBase('/sources/raw-source-map')">Raw Source Map</a>
        </div>
      </div>
      <ul>
        <li><a href="https://www.trendforce.com/presscenter/news/20260122-12893.html">TrendForce — AI architecture evolution and memory revenue peak</a></li>
        <li><a href="https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/">IDC — 2026 DRAM/NAND supply growth below historical norms</a></li>
        <li><a href="https://www.wsts.org/76/Recent-News-Release">WSTS — memory revenue upper-case semiconductor forecast</a></li>
        <li><a href="https://www.tomshardware.com/software/windows/microsofts-baseline-ram-for-ai-pcs-set-at-16gb">Microsoft/Tom's Hardware — AI PC 16GB RAM baseline</a></li>
      </ul>
    </section>
  </div>
</template>
