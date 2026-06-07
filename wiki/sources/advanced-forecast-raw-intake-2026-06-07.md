---
title: Advanced Forecast Raw Intake 2026-06-07
created: 2026-06-07
updated: 2026-06-07
type: source-map
tags: [raw-intake, advanced-forecasting, demand-forecasting, citation-audit]
sources: [raw/articles/model-vector-database-rag-memory-demand-2026.md, raw/articles/aisilicon-rubin-cpx-gddr7-inference-memory-2026.md, raw/articles/domain-cloud-gaming-streaming-memory-demand-2026.md, raw/articles/oem-memory-price-consumer-electronics-passthrough-cpi-2026.md, raw/datasets/ai-accelerator-bom-hbm-cost-share.md, raw/datasets/hbm-price-per-gb-per-stack-by-generation.md, raw/datasets/institutional-memory-forecast-comparison-2026.md, raw/datasets/lpddr-gddr-supplier-share-2025.md, raw/datasets/sia-global-semiconductor-sales-monthly-2026.md, raw/datasets/smartphone-memory-content-spec-2026.md, raw/earnings/ase-amkor-q1-2026-packaging-test.md, raw/earnings/nanya-winbond-1q26-specialty-dram.md, raw/earnings/rambus-memory-ip-royalty-2026.md, raw/lectures/memory-inventory-writedown-lcm-accounting.md, raw/lectures/semiconductor-cycle-structural-vs-cyclical-framework.md, raw/papers/bullwhip-effect-empirical-semiconductor-amplification.md, raw/papers/hierarchical-forecast-reconciliation-mint.md, raw/papers/monte-carlo-simulation-demand-forecasting-uncertainty.md, raw/papers/temporal-fusion-transformer-multihorizon-forecasting.md, raw/papers/time-series-foundation-models-zero-shot-forecasting.md, raw/reports/korea-taiwan-power-grid-fab-constraint-2026.md, raw/reports/trendforce-spot-price-june-2026-ddr4-ddr5.md, raw/reports/wsts-2027-semiconductor-memory-forecast.md]
confidence: medium
---

# Advanced Forecast Raw Intake 2026-06-07

이 페이지는 고차원 메모리 수요 예측 엔진을 확장하는 과정에서 추가로 수집된 raw source의 **임시 추적 맵**이다. 모든 source는 `advanced-demand-forecast-engine` 또는 개별 market/concept 페이지로 후속 승격될 수 있지만, citation audit에서 미반영 raw가 발생하지 않도록 우선 source traceability를 보장한다.

## Forecast extension buckets

| Bucket | Raw anchors | Forecast relevance |
| --- | --- | --- |
| AI inference workload | `raw/articles/model-vector-database-rag-memory-demand-2026.md`, `raw/articles/aisilicon-rubin-cpx-gddr7-inference-memory-2026.md` | RAG/vector database와 Rubin CPX/GDDR7 inference tier가 DRAM·SSD·HBM/GDDR memory hierarchy 수요로 전이되는 workload signal |
| HBM price ladder | `raw/datasets/ai-accelerator-bom-hbm-cost-share.md`, `raw/datasets/hbm-price-per-gb-per-stack-by-generation.md` | AI accelerator BOM 내 HBM cost share와 HBM3E/HBM4 세대별 ASP·GB/stack 가정의 price-realization input |
| Institutional forecast ensemble | `raw/datasets/institutional-memory-forecast-comparison-2026.md`, `raw/reports/wsts-2027-semiconductor-memory-forecast.md` | WSTS·기관 전망을 scenario ensemble baseline으로 보정 |
| Mobile/graphics supplier mix | `raw/datasets/lpddr-gddr-supplier-share-2025.md`, `raw/datasets/smartphone-memory-content-spec-2026.md`, `raw/articles/oem-memory-price-consumer-electronics-passthrough-cpi-2026.md`, `raw/articles/domain-cloud-gaming-streaming-memory-demand-2026.md` | LPDDR/GDDR supplier share, smartphone content, consumer price pass-through, cloud gaming demand를 product mix/allocation model에 연결 |
| High-frequency nowcast | `raw/datasets/sia-global-semiconductor-sales-monthly-2026.md`, `raw/reports/trendforce-spot-price-june-2026-ddr4-ddr5.md` | 월간 매출·spot price를 near-term nowcasting feature로 활용 |
| Packaging/IP/specialty supply | `raw/earnings/ase-amkor-q1-2026-packaging-test.md`, `raw/earnings/nanya-winbond-1q26-specialty-dram.md`, `raw/earnings/rambus-memory-ip-royalty-2026.md` | packaging/test, specialty DRAM, memory IP royalty를 supply-realization 및 cycle signal로 연결 |
| Inventory/cycle framework | `raw/lectures/memory-inventory-writedown-lcm-accounting.md`, `raw/lectures/semiconductor-cycle-structural-vs-cyclical-framework.md`, `raw/papers/bullwhip-effect-empirical-semiconductor-amplification.md` | 재고 write-down, LCM accounting, structural/cyclical 구분, bullwhip amplification을 cycle classifier에 연결 |
| Advanced methodology | `raw/papers/hierarchical-forecast-reconciliation-mint.md`, `raw/papers/monte-carlo-simulation-demand-forecasting-uncertainty.md`, `raw/papers/temporal-fusion-transformer-multihorizon-forecasting.md`, `raw/papers/time-series-foundation-models-zero-shot-forecasting.md` | 계층 forecast reconciliation, uncertainty simulation, TFT, foundation model을 고차원 forecast roadmap으로 승격 |
| Physical constraints | `raw/reports/korea-taiwan-power-grid-fab-constraint-2026.md` | 전력망·fab capacity 병목을 supply-realization gate로 반영 |

## 승격 완료

- `advancedDemandForecast.ts`에 stress scenario table, uncertainty envelope, hierarchical forecast reconciliation, nowcast adjustment API를 추가했다.
- `AdvancedDemandForecastSimulator.vue`에서 nowcast-adjusted base, institution forecast band, envelope range, hierarchy total KPI, raw CSV signal table, stress/envelope table을 노출한다.
- `advanced-demand-forecast-engine`와 `advanced-demand-forecast` 문서에 raw anchor별 역할을 연결했다.
- `wiki/data/advanced-forecast-source-signals.json`을 생성해 `institutional-memory-forecast-comparison-2026.csv`, `sia-global-semiconductor-sales-monthly-2026.csv`, `hbm-price-per-gb-per-stack-by-generation.csv`, `ai-accelerator-bom-hbm-cost-share.csv`를 immutable raw에서 브라우저용 typed signal layer로 승격했다.
- `buildCsvDerivedAdvancedForecastPresets`로 institution low/mid/high band와 SIA momentum을 보수/기준/상방 preset candidate로 자동 생성하고, `buildSiaNowcastTimeSeries`로 SIA sales row를 index=100 time-series chart model로 변환했다.
- `buildInstitutionWeightedEnsemble`로 WSTS/TrendForce/IDC/Gartner revenue row를 사용자 가중치 slider에 연결하고, weighted revenue를 HBM demand multiplier와 confidence score로 변환했다.
- `calculateHbmBomStress`로 HBM price decline, target BOM share, demand elasticity를 affordability demand shock/supply relief stress scenario로 연결했다.

## 후속 승격 방향

- `advanced-demand-forecast-engine`에는 이미 S-curve, price-inventory-cycle, nowcasting, supply-realization 계층을 반영했다.
- 1차 승격과 CSV signal UI 연결, CSV-derived preset strip, SIA indexed time-series chart, institution별 ensemble weight control layer, HBM price/BOM stress slider까지 이번 패스에서 연결했다.
- 현재 목적은 100% raw traceability 유지와 source-backed extension queue 형성이다.

## 관련 문서

- [[advanced-demand-forecast-engine]]
- [[advanced-demand-forecast]]
- [[forecasting-method-library]]
- [[raw-integration-ledger]]
- [[citation-matrix]]

