---
title: Advanced Demand Forecast Simulator
created: 2026-06-07
updated: 2026-06-07
type: simulator
tags: [simulator, advanced-forecasting, demand-forecasting, scenario-analysis, supply-realization]
sources: [raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md, raw/reports/trendforce-hbm-bit-demand-supply-2026.md, raw/reports/hbm-longterm-tam-by-application-2030.md, raw/reports/idc-2026-memory-shortage-supply-growth.md, raw/articles/on-device-ai-smartphone-dram-content-2026.md, raw/reports/trendforce-qlc-enterprise-ssd-nearline-hdd-2026.md]
confidence: medium
---

# Advanced Demand Forecast Simulator

이 simulator는 단순 계산기가 아니라 **고차원 forecast cockpit**입니다. 기존 domain별 계산기는 특정 시점의 `units × mix × content`를 투명하게 보여주는 데 강하지만, 실제 메모리 수요 예측에는 adoption transition, content CAGR, 가격 탄력성, 채널 재고, bullwhip, supply allocation이 동시에 작동합니다.

<ClientOnly>
  <AdvancedDemandForecastSimulator />
</ClientOnly>

## 모델 계층

```text
End demand path
= base demand
× unit growth index
× content growth index
× S-curve adoption/content uplift index

Cycle-adjusted demand
= end demand path × price-inventory-cycle factor

Supply-realized demand
= min(cycle-adjusted demand, available supply × yield × allocation)

Unmet demand
= max(0, cycle-adjusted demand - supply-realized demand)
```

## 확장 분석 계층

- **Stress scenarios**: demand shock, supply shock, price shock를 별도 입력으로 두어 base case가 어느 방향으로 깨지는지 확인합니다.
- **Uncertainty envelope**: downside/base/upside/supply-squeeze 결과를 연도별 low/base/high band로 접어 봅니다.
- **Hierarchy reconciliation**: HBM/NAND/DRAM/DRAM+NAND preset을 family별로 합산해 segment forecast와 전체 forecast의 정합성을 점검합니다.
- **Source-calibrated nowcast overlay**: SIA 월간 매출, 기관별 2026 memory revenue band, HBM 가격/BOM CSV를 `wiki/data/advanced-forecast-source-signals.json`으로 변환해 bounded adjustment factor와 institution forecast band KPI로 표시합니다.
- **CSV-derived preset candidates**: institution low/mid/high band와 SIA momentum을 보수/기준/상방 candidate preset으로 자동 생성해 버튼 클릭만으로 base demand, unit growth, allocation 가정의 민감도를 비교합니다.
- **SIA indexed time-series**: SIA sales row를 `2025-FY = 100` index와 bar chart로 바꿔, 월간/분기별 nowcast 추세를 표와 별개로 시각적으로 확인합니다.
- **Institution-weighted ensemble tuning**: WSTS/TrendForce/IDC/Gartner raw CSV revenue view를 slider weight로 조정해 weighted revenue, demand multiplier, peak effective demand를 즉시 갱신합니다.
- **HBM/BOM stress controls**: HBM price decline, target BOM share, demand elasticity를 affordability stress scenario로 변환해 adjusted HBM cost와 unmet demand를 확인합니다.

## 사용 규칙

- **Unconstrained demand**는 최종 소비/설치 수요가 만드는 이론적 경로입니다.
- **Supply-realized demand**는 실제 공급·수율·allocation gate를 통과한 실행 가능 수요입니다.
- **Unmet demand**는 수요가 사라졌다는 뜻이 아니라 backorder, price rationing, spec downgrade, delayed refresh로 전이될 수 있는 압력입니다.
- `price-inventory-cycle`이 dominant constraint이면 주문량을 end demand로 그대로 읽으면 안 됩니다.
- `supply-realization`이 dominant constraint이면 시장 TAM보다 CoWoS/HBM/NAND wafer/DDR allocation이 near-term cap입니다.

## 구현 파일

- `wiki/lib/advancedDemandForecast.ts`
- `wiki/data/advanced-forecast-presets.json`
- `wiki/data/advanced-forecast-source-signals.json`
- `wiki/components/AdvancedDemandForecastSimulator.vue`
- `tests/advancedDemandForecast.test.ts`
- `tests/advancedForecastUi.test.ts`
- API extensions: stress scenario table, uncertainty envelope, hierarchical forecast rows, source-calibrated nowcast adjustment, CSV-derived preset candidates, SIA indexed time-series, institution-weighted ensemble, HBM/BOM affordability stress

## Source traceability

| Forecast preset | Source-backed axes | Raw source anchors |
| --- | --- | --- |
| HBM AI infrastructure constraint | GPU content uplift, HBM growth, package/supply realization, datacenter constraints, long-term TAM band | `raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md`, `raw/articles/nvidia-gpu-hbm-capacity-roadmap-2026.md`, `raw/reports/trendforce-hbm-bit-demand-supply-2026.md`, `raw/reports/pkg-cowos-allocation-nvidia-amd-2026.md`, `raw/reports/hbm-longterm-tam-by-application-2030.md` |
| PC DRAM shortage elasticity | AI PC content, PC shipment drag, memory shortage price pass-through, refresh cycle | `raw/reports/idc-2026-memory-shortage-supply-growth.md`, `raw/articles/oem-pc-dell-hp-lenovo-price-hike-memory-2026.md`, `raw/articles/oem-windows10-eol-pc-refresh-memory-demand-2026.md`, `raw/articles/microsoft-ai-pc-16gb-ram-baseline.md` |
| Smartphone on-device AI premiumization | on-device AI DRAM uplift, premium mix, storage capacity, spec downgrade risk | `raw/articles/on-device-ai-smartphone-dram-content-2026.md`, `raw/articles/trendforce-smartphone-storage-capacity-2026.md`, `raw/articles/oem-smartphone-dram-content-spec-downgrade-2026.md`, `raw/articles/on-device-slm-smartphone-ram-2026.md` |
| NAND AI storage QLC breakout | QLC enterprise SSD, AI/data-center storage mix, capacity-per-drive uplift | `raw/reports/trendforce-qlc-enterprise-ssd-nearline-hdd-2026.md`, `raw/articles/storage-enterprise-ssd-qlc-nand-demand-2026.md`, `raw/datasets/idc-global-datasphere-zettabytes.md` |
| Ensemble / envelope / nowcast | Monte Carlo-style stress, MinT-style hierarchy reconciliation, high-frequency nowcast, institution forecast band | `raw/papers/monte-carlo-simulation-demand-forecasting-uncertainty.md`, `raw/papers/hierarchical-forecast-reconciliation-mint.md`, `raw/papers/nowcasting-google-trends-bayesian-structural-time-series.md`, `raw/datasets/sia-global-semiconductor-sales-monthly-2026.md`, `raw/datasets/institutional-memory-forecast-comparison-2026.md` |

## CSV signal interface

시뮬레이터의 “Raw CSV signal interface” 섹션은 raw CSV를 직접 mutable app data로 바꾸지 않고, 다음 경로를 유지하는 파생 JSON을 사용합니다.

| UI signal | Derived from | Display role |
| --- | --- | --- |
| Institution forecast band | `raw/datasets/institutional-memory-forecast-comparison-2026.csv` | 2026 memory revenue low/mid/high band ($294.82B–$633.3B) |
| CSV-derived preset strip | `raw/datasets/institutional-memory-forecast-comparison-2026.csv`, `raw/datasets/sia-global-semiconductor-sales-monthly-2026.csv` | low/mid/high institution band와 latest SIA momentum을 보수/기준/상방 preset candidate로 변환 |
| SIA high-frequency nowcast | `raw/datasets/sia-global-semiconductor-sales-monthly-2026.csv` | monthly sales YoY/MoM 기반 nowcast adjustment factor와 indexed time-series bar chart |
| HBM price/cost pressure | `raw/datasets/hbm-price-per-gb-per-stack-by-generation.csv`, `raw/datasets/ai-accelerator-bom-hbm-cost-share.csv` | HBM3/3E/4 price ladder와 accelerator BOM cost share context |
| Institution-weighted ensemble | `raw/datasets/institutional-memory-forecast-comparison-2026.csv` | 기관별 revenue row 가중치를 slider로 조정해 weighted forecast를 산출 |
| HBM/BOM affordability stress | `raw/datasets/hbm-price-per-gb-per-stack-by-generation.csv`, `raw/datasets/ai-accelerator-bom-hbm-cost-share.csv` | HBM 가격 하락률과 BOM share 민감도를 stress scenario shock로 변환 |

각 derived row는 `rawPath`와 `sourceNote`를 포함하므로, 화면의 KPI가 어떤 CSV와 paired markdown source note에서 왔는지 추적할 수 있습니다.

## 관련 문서

- [[forecasting-method-library]]
- [[ai-infrastructure-memory]]
- [[channel-pricing-signal]]
- [[memory-supply-chain-equipment]]
- [[scenario-analysis]]
- [[sensitivity-analysis]]
