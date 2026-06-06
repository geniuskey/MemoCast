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
          <a class="mc-button mc-button-primary" href="simulators/">시뮬레이터 열기</a>
          <a class="mc-button" href="charts">인터랙티브 차트</a>
          <a class="mc-button" href="graph">지식 그래프 보기</a>
        </div>
        <div class="mc-stats" aria-label="MemoCast content statistics">
          <div><strong>20</strong><span>wiki pages</span></div>
          <div><strong>196</strong><span>raw sources</span></div>
          <div><strong>4</strong><span>market simulators</span></div>
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

    <section class="mc-section">
      <div class="mc-section-heading">
        <p class="mc-eyebrow">Start here</p>
        <h2>분석 흐름</h2>
        <p>개념 정의에서 출처 검증, 시장별 모델링, 시뮬레이션까지 한 번에 이동할 수 있습니다.</p>
      </div>
      <div class="mc-card-grid mc-card-grid-4">
        <a class="mc-card" href="concepts/demand-forecasting">
          <span>01</span>
          <h3>수요 예측 지도</h3>
          <p>메모리 demand를 unit, bit, capacity, revenue 관점으로 분해합니다.</p>
        </a>
        <a class="mc-card" href="methods/structural-demand-model">
          <span>02</span>
          <h3>구조적 수요 모델</h3>
          <p>출하량 × 탑재량 × attach rate 기반의 재사용 가능한 예측 골격입니다.</p>
        </a>
        <a class="mc-card" href="sources/citation-matrix">
          <span>03</span>
          <h3>근거 추적</h3>
          <p>각 wiki page와 simulator preset이 어떤 source를 인용하는지 확인합니다.</p>
        </a>
        <a class="mc-card" href="comparisons/domain-comparison">
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
          <a class="mc-button mc-button-primary" href="markets/hbm">HBM 보기</a>
          <a class="mc-button" href="markets/dram">DRAM 보기</a>
        </div>
      </div>
      <div class="mc-market-list">
        <a href="markets/hbm"><strong>HBM</strong><span>AI GPU shipment, stack count, capacity roadmap</span></a>
        <a href="markets/pc-dram"><strong>PC DRAM</strong><span>AI PC penetration and baseline memory content</span></a>
        <a href="markets/smartphone-memory"><strong>Smartphone</strong><span>Entry/mainstream/premium DRAM·NAND mix</span></a>
        <a href="markets/nand"><strong>NAND</strong><span>Client/enterprise/AI storage SSD TB demand</span></a>
      </div>
    </section>

    <section class="mc-section">
      <div class="mc-section-heading">
        <p class="mc-eyebrow">Interactive models</p>
        <h2>시나리오 시뮬레이터</h2>
        <p>Base/Bull/Bear 가정을 빠르게 전환하고, 가정 변화가 EB 단위 수요에 미치는 영향을 확인합니다.</p>
      </div>
      <div class="mc-card-grid">
        <a class="mc-card mc-card-accent" href="simulators/hbm-demand">
          <span>SIM</span>
          <h3>AI Server HBM Demand</h3>
          <p>Accelerator shipment, HBM attach rate, stack 수, stack당 capacity로 HBM 수요를 계산합니다.</p>
        </a>
        <a class="mc-card mc-card-accent" href="simulators/nand-ssd-demand">
          <span>SIM</span>
          <h3>NAND SSD Demand</h3>
          <p>Client/Enterprise/AI storage SSD mix와 평균 NAND TB/SSD로 수요를 계산합니다.</p>
        </a>
        <a class="mc-card mc-card-accent" href="simulators/pc-dram-demand">
          <span>SIM</span>
          <h3>PC DRAM Demand</h3>
          <p>PC 출하량, AI PC penetration, Non-AI/AI PC별 DRAM content를 비교합니다.</p>
        </a>
        <a class="mc-card mc-card-accent" href="simulators/smartphone-memory-demand">
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
