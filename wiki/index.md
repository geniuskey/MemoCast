# MemoCast Wiki Index

> 메모리 수요 예측 지식베이스의 콘텐츠 카탈로그입니다.  
> Last updated: 2026-06-06 | Total pages: 20 | Raw sources: 196

## Navigation

- [[graph]] — raw evidence에서 concepts/methods/markets/simulators/comparison으로 이어지는 지식 그래프.

## Concepts

- [[memory-demand]] — 메모리 수요를 bit/capacity/unit/revenue 관점에서 구분하는 핵심 개념.
- [[bit-demand]] — DRAM/NAND/HBM 수요를 bit 단위로 환산하는 방법.
- [[scenario-analysis]] — base/bull/bear case를 통한 가정 기반 분석 방법.
- [[demand-forecasting]] — 수요 예측 문제 정의와 방법론 지도.
- [[supply-demand-gap]] — bit demand와 bit supply 성장률 gap이 가격/매출에 미치는 영향.

## Markets

- [[dram]] — DRAM 수요 구조와 주요 driver.
- [[pc-dram]] — PC 출하량과 AI PC penetration 중심의 PC DRAM 수요 구조.
- [[nand]] — NAND 수요 구조와 주요 driver.
- [[hbm]] — AI 서버/GPU 중심 HBM 수요 구조.
- [[smartphone-memory]] — 스마트폰 DRAM/NAND 탑재량 기반 수요 구조.

## Methods

- [[structural-demand-model]] — 출하량 × 탑재량 방식의 구조적 수요 모델.
- [[sensitivity-analysis]] — 입력 가정 변화가 결과에 미치는 영향 분석.
- [[forecasting-evidence-map]] — raw papers/datasets/lectures를 forecasting 방법론 계층에 매핑.

## Simulators

- [[simulators/index]] — MemoCast 시뮬레이터 개요.
- [[hbm-demand]] — AI accelerator 출하량, HBM attach rate, stack 수, stack당 capacity로 HBM 수요를 계산하는 웹 시뮬레이터.
- [[nand-ssd-demand]] — Client/Enterprise/AI storage SSD mix와 평균 NAND TB/SSD로 NAND SSD 수요를 계산하는 웹 시뮬레이터.
- [[pc-dram-demand]] — PC 출하량, AI PC penetration, Non-AI/AI PC별 DRAM content로 PC DRAM 수요를 계산하는 웹 시뮬레이터.
- [[smartphone-memory-demand]] — 스마트폰 출하량과 entry/mainstream/premium 3-segment 평균 탑재량으로 DRAM/NAND 수요를 계산하는 웹 시뮬레이터.

## Sources

- [[raw-source-map]] — 신규 raw 자료 196개를 source cluster별로 정리한 인덱스.
- [[citation-matrix]] — wiki 페이지와 simulator preset이 어떤 raw source를 인용하는지 추적하는 표.

## Source-backed Updates

### 2026 raw expansion clusters

- [[raw-source-map]] — papers/articles/reports/earnings/datasets/lectures 전체 원천 자료 인덱스.
- [TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html) — DRAM/NAND revenue, capex, tight supply context.
- [IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/) — 2026 DRAM/NAND supply growth below historical norms and PC shortage impact.
- [WSTS (World Semiconductor Trade Statistics) — WSTS Spring 2026 Forecast — Memory Revenue +250% to >$800B, Total Semi $1.5T](https://www.wsts.org/76/Recent-News-Release) — memory revenue upper-case forecast.
- [TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html) — HBM bit demand growth and supplier share.
- [TrendForce — TrendForce — QLC Enterprise SSD Breakout 2026 as Nearline HDD Shortage Bites](https://www.trendforce.com/presscenter/news/20250915-12714.html) — QLC enterprise SSD and HDD shortage trigger.
- [Tom's Hardware / TrendForce / Microsoft — Microsoft, AI PC(Copilot+) 최소 RAM 16GB·NPU 40 TOPS 기준 설정](https://www.tomshardware.com/software/windows/microsofts-baseline-ram-for-ai-pcs-set-at-16gb) — AI PC 16GB memory content anchor.
- [Android Authority / Memeburn / Samsung (집계) — On-device AI가 스마트폰 DRAM 견인: Gemini 12GB·Apple Intelligence 8GB, S25 전 모델 12GB](https://www.androidauthority.com/samsung-galaxy-s25-ai-features-cloud-on-device-3517555/) — on-device AI smartphone DRAM content uplift.

- [counterpointresearch.com — Global Smartphone Revenues Resume Growth in 2024 After Two Years, ASP Hits Record High](https://www.counterpointresearch.com/insights/global-smartphone-market-2024/) — 2024 smartphone shipments/revenue/ASP growth and premiumization context.
- [micron.com — Mobile Memory and Storage for Phones](https://www.micron.com/solutions/mobile) — mobile DRAM/LPDRAM, UFS storage, and AI smartphone memory/storage context.
- [micron.com — High-bandwidth memory (HBM)](https://www.micron.com/products/memory/hbm) — HBM capacity/bandwidth context for AI/HPC demand models.
- [semiconductor.samsung.com — HBM | DRAM | Samsung Semiconductor Global](https://semiconductor.samsung.com/dram/hbm/) — Samsung HBM product context for HBM market page cross-check.
- [gsmarena.com — Samsung Galaxy S25 - Full phone specifications](https://www.gsmarena.com/samsung_galaxy_s25-13610.php) — Premium smartphone RAM/storage example: Galaxy S25 128/256/512GB storage with 12GB RAM.
- [gsmarena.com — Samsung Galaxy A56 - Full phone specifications](https://www.gsmarena.com/samsung_galaxy_a56-13603.php) — Mainstream smartphone RAM/storage example: Galaxy A56 128/256GB storage with 6/8/12GB RAM options.
- [gsmarena.com — Samsung Galaxy A16 5G - Full phone specifications](https://www.gsmarena.com/samsung_galaxy_a16_5g-13346.php) — Entry smartphone RAM/storage example: Galaxy A16 5G 128/256GB storage with 4/6/8GB RAM options.

## Comparisons

- [[domain-comparison]] — Smartphone/PC/HBM/NAND SSD simulator preset을 EB 단위로 비교하는 cross-domain 패널.

## Queries

- 준비 중.
