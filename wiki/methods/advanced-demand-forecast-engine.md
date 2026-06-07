---
title: Advanced Demand Forecast Engine
created: 2026-06-07
updated: 2026-06-07
type: method
tags: [demand-forecasting, advanced-forecasting, structural-model, inventory-cycle, supply-realization]
sources: [raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md, raw/articles/aisilicon-neocloud-gpu-rental-hbm-demand-2026.md, raw/articles/model-computer-use-browser-agents-memory-2026.md, raw/articles/model-test-time-compute-reasoning-memory-demand-2026.md, raw/datasets/ddr5-ddr4-adoption-share-by-year.md, raw/reports/cxmt-ddr5-lpddr5x-yield-progress-2026.md, raw/reports/china-15th-five-year-plan-memory-self-sufficiency.md, raw/reports/dram-demand-by-region-datacenter-share-2026.md, raw/lectures/memory-contract-price-negotiation-quarterly-process.md, raw/reports/esg-fab-carbon-pfc-scope123-quantitative.md, raw/reports/trendforce-2h26-hbm4-mainstream-outlook.md, raw/reports/idc-2026-memory-shortage-supply-growth.md, raw/articles/channel-shi-datacenter-buyer-allocation-leadtimes-2026.md, raw/articles/oem-memory-procurement-hedging-multisourcing-2026.md, raw/reports/hbm-longterm-tam-by-application-2030.md, raw/papers/nowcasting-google-trends-bayesian-structural-time-series.md, raw/papers/deep-rl-inventory-demand-forecast-model-selection.md, raw/reports/semiconductor-antitrust-regulation-environment-2026.md, raw/reports/semiconductor-talent-shortage-memory-rd-2026.md, raw/datasets/enterprise-ssd-exabytes-capacity.md, raw/datasets/nand-supplier-market-share-2025.md, raw/reports/trendforce-qlc-enterprise-ssd-nearline-hdd-2026.md, raw/articles/on-device-ai-smartphone-dram-content-2026.md]
confidence: medium
---

# Advanced Demand Forecast Engine

기존 structural demand model의 기본식은 가정 투명성에는 좋지만, 실제 메모리 수요 예측에서는 너무 단순하다. 고차원 forecast engine은 demand를 하나의 수치로 바로 계산하지 않고, 여러 evidence layer를 같은 assumption graph 안에 올려 비교한다.

## Executive model summary

Advanced Demand Forecast Engine은 **정답 예측기**가 아니라, raw source에서 나온 수요·가격·재고·공급·nowcast 신호를 서로 다른 계층으로 분해해 “어떤 가정이 결과를 움직였는가”를 보여주는 설명 가능한 forecast system이다. ^[raw/lectures/memory-demand-forecasting-methodology-bottoms-up.md] ^[raw/papers/nowcasting-google-trends-bayesian-structural-time-series.md] ^[raw/papers/deep-rl-inventory-demand-forecast-model-selection.md]

### What it calculates

| Output | Meaning | Main evidence layer |
| --- | --- | --- |
| effective demand path | unit/content/adoption/cycle/supply gate를 반영한 연도별 수요 | structural model + supply realization |
| unmet demand | 수요 path와 available supply gap; lost sales가 아니라 backlog/allocation/spec downgrade 후보 | supply-realization + price-inventory-cycle |
| scenario envelope | bear/base/bull/squeeze 가정에서 low/base/high range | stress scenarios + institution band |
| nowcast adjustment | 공식 연간 통계 전 고빈도 신호로 base demand를 bounded 보정 | SIA monthly, exports, price/inventory signals |
| dominant constraint | 결과를 가장 많이 움직이는 병목 분류 | classifier over model layers |
| UI control response | slider/card 조작이 어떤 assumption을 바꾸는지 즉시 노출 | typed calculation APIs |

### What it does not calculate

- 하나의 확정 HBM/DRAM/NAND “정답 수요”를 내지 않는다.
- revenue forecast를 bit demand로 자동 변환하지 않는다. ASP/mix 효과는 별도 해석한다.
- single-source headline을 default forecast로 승격하지 않는다.
- announced capex나 GPU cluster 수를 installed memory demand로 전량 인정하지 않는다.
- unmet demand를 모두 lost sales로 간주하지 않는다; delayed shipment, backlog, price rationing, spec downgrade, substitution을 구분해야 한다.

### Evidence-to-layer map

| Raw signal family | Engine layer | Default use | Confidence rule |
| --- | --- | --- | --- |
| shipment/unit/content data | End-demand path | base candidate if repeatable | medium/high with 2+ source families |
| adoption/roadmap data | S-curve adoption | scenario or mix-shift layer | roadmap-only is medium/low |
| spot/contract/inventory/lead time | price-inventory-cycle | order-vs-end-demand correction | high when signals align |
| wafer/package/test/power constraints | supply-realization | realization factor / supply ceiling | medium until timing is confirmed |
| SIA/monthly/export/price data | nowcast overlay | bounded short-horizon adjustment | do not override structural model alone |
| institution revenue forecasts | ensemble/envelope | forecast band and confidence context | revenue ≠ bit demand |

### Reader workflow

1. Start with [[forecasting-method-library]] to choose the method family.
2. Use [[ai-infrastructure-memory]], [[channel-pricing-signal]], and [[memory-supply-chain-equipment]] to interpret the main evidence layers.
3. Use this page to see how those layers combine into engine outputs.
4. Use [[advanced-demand-forecast]] only after the model assumptions are clear.

## 1. End-demand path

```text
end_demand_t = base_demand
  × unit_index_t
  × content_index_t
  × adoption_content_index_t
```

- `unit_index`: device/server/SSD/GPU 출하 또는 설치 기반 성장.
- `content_index`: 단위당 DRAM/NAND/HBM 탑재량의 CAGR.
- `S-curve adoption`: AI PC, on-device AI, HBM4, QLC enterprise SSD처럼 초기에는 느리고 중간 구간에서 급격히 전환되는 adoption transition.

## 2. S-curve adoption

```text
adoption_share_t = start + (saturation - start) × logistic(year, midpoint, steepness)
adoption_content_index_t = 1 + adoption_share_t × content_uplift_at_saturation
```

S-curve adoption은 “침투율이 매년 같은 속도로 오른다”는 단순 가정을 피한다. HBM 세대 전환, AI PC 침투율, on-device AI premiumization, enterprise QLC 전환처럼 비선형 diffusion이 중요한 경우에 사용한다.

## 3. price-inventory-cycle

```text
cycle_factor = clamp(
  1
  + (channel_inventory_weeks - normal_inventory_weeks) × inventory_sensitivity
  + order_amplification_score × bullwhip_sensitivity
  + price_change_percent × price_elasticity / 100,
  0.55,
  1.45
)
```

이 계층의 목적은 **주문량과 실제 최종 수요를 분리**하는 것이다.

- 가격 급등 구간에서는 일부 PC/smartphone/consumer SSD demand가 지연되거나 spec downgrade될 수 있다.
- 반대로 HBM/enterprise SSD처럼 공급 부족이 allocation 주문을 증폭시키는 경우 bullwhip이 단기 주문을 부풀릴 수 있다.
- 따라서 `price-inventory-cycle`이 dominant constraint이면 order ≠ end demand로 해석한다.

## 4. supply-realization

```text
available_supply_t = starting_available_supply × supply_growth_index_t × yield × allocation
supply_realized_demand_t = min(cycle_adjusted_demand_t, available_supply_t)
unmet_demand_t = cycle_adjusted_demand_t - supply_realized_demand_t
```

`Supply-realization`은 TAM이 아니라 실행 가능한 공급 cap이다. HBM은 CoWoS/HBM stack/테스트 capacity, NAND는 wafer 및 QLC enterprise ramp, PC DRAM은 DDR4/DDR5 allocation과 HBM crowding-out이 realization gate가 된다.

## 5. Nowcasting overlay

고차원 예측은 분기·연간 통계만 기다리지 않는다. Google Trends, ODM 매출, 가격 견적, 수출 데이터 같은 고빈도 대체데이터를 Bayesian Structural Time Series(BSTS)나 ML nowcasting feature로 결합해 공식 통계 발표 전의 현재 수요를 보정한다.

- `raw/papers/nowcasting-google-trends-bayesian-structural-time-series.md`는 검색·고빈도 신호로 short-horizon nowcast를 개선하는 방법론 anchor다.
- `raw/articles/oem-memory-procurement-hedging-multisourcing-2026.md`는 OEM buffer build, speculative order, allocation-only 전환이 주문 신호를 왜곡하는 미시적 근거다.
- `raw/papers/deep-rl-inventory-demand-forecast-model-selection.md`는 forecast model selection과 재고정책을 동적으로 선택하는 decision layer 확장 근거다.
- `raw/reports/semiconductor-antitrust-regulation-environment-2026.md`는 가격 급등기의 규제·반독점 리스크를 price scenario 상단 제약으로 반영하는 정책 shock anchor다.
- `raw/articles/model-computer-use-browser-agents-memory-2026.md`와 `raw/articles/aisilicon-neocloud-gpu-rental-hbm-demand-2026.md`는 agentic inference와 neocloud GPU-as-a-Service가 HBM/KV-cache demand를 확대하는 신규 workload anchor다.
- `raw/articles/model-test-time-compute-reasoning-memory-demand-2026.md`는 reasoning token과 KV-cache가 inference HBM demand를 비선형으로 증폭시키는 test-time compute anchor다.
- `raw/datasets/ddr5-ddr4-adoption-share-by-year.md`, `raw/reports/cxmt-ddr5-lpddr5x-yield-progress-2026.md`, `raw/reports/china-15th-five-year-plan-memory-self-sufficiency.md`, `raw/reports/dram-demand-by-region-datacenter-share-2026.md`, `raw/lectures/memory-contract-price-negotiation-quarterly-process.md`, `raw/reports/trendforce-2h26-hbm4-mainstream-outlook.md`는 DDR5/HBM4 세대전환, CXMT/중국 자급 substitution, 지역·데이터센터 mix, 분기 계약가 step, 2H26 가격/공급 전환을 S-curve 및 mix-shift signal로 연결한다.
- `raw/reports/esg-fab-carbon-pfc-scope123-quantitative.md`와 `raw/reports/semiconductor-talent-shortage-memory-rd-2026.md`는 carbon cost와 숙련 인력 부족을 장기 supply-realization gate로 승격하는 근거다.
- `raw/datasets/enterprise-ssd-exabytes-capacity.md`와 `raw/datasets/nand-supplier-market-share-2025.md`는 enterprise SSD EB 환산과 NAND 공급사 과점도를 NAND scenario의 unit/content/supply discipline 입력으로 연결한다.

## 6. Ensemble, uncertainty, reconciliation, nowcast

고차원 엔진은 2026-06-07 raw intake의 advanced methodology bucket을 반영해 단일 base case를 네 가지 보정 계층으로 확장한다.

| Layer | 목적 | Raw anchors |
| --- | --- | --- |
| Stress scenario table | demand shock, supply shock, price shock를 분리해 downside/base/upside/supply squeeze를 비교 | `raw/papers/monte-carlo-simulation-demand-forecasting-uncertainty.md`, `raw/reports/trendforce-spot-price-june-2026-ddr4-ddr5.md` |
| Uncertainty envelope | stress scenario들의 effective demand low/base/high band를 연도별로 계산 | `raw/papers/monte-carlo-simulation-demand-forecasting-uncertainty.md`, `raw/datasets/institutional-memory-forecast-comparison-2026.md` |
| Hierarchical reconciliation | HBM, NAND, DRAM, DRAM+NAND preset을 연도별 family hierarchy로 합산해 top-down/segment mismatch를 점검 | `raw/papers/hierarchical-forecast-reconciliation-mint.md`, `raw/reports/wsts-2027-semiconductor-memory-forecast.md` |
| Source-calibrated nowcast | SIA 월간 매출, 기관별 2026 memory revenue band, HBM 가격 ladder를 raw path가 보존된 파생 JSON으로 승격해 bounded base-demand factor와 revenue band KPI로 변환 | `raw/datasets/sia-global-semiconductor-sales-monthly-2026.md`, `raw/datasets/institutional-memory-forecast-comparison-2026.md`, `raw/datasets/hbm-price-per-gb-per-stack-by-generation.md`, `raw/datasets/ai-accelerator-bom-hbm-cost-share.md` |
| CSV-derived preset strip | institution low/mid/high band와 SIA momentum을 보수/기준/상방 preset 후보로 자동 변환해 base demand, unit CAGR, supply allocation을 투명하게 비교 | `raw/datasets/institutional-memory-forecast-comparison-2026.md`, `raw/datasets/sia-global-semiconductor-sales-monthly-2026.md` |
| SIA indexed time-series | SIA 월별/분기별 sales row를 index=100 baseline과 bar width로 변환해 표보다 빠르게 추세를 읽게 함 | `raw/datasets/sia-global-semiconductor-sales-monthly-2026.md` |
| Institution-weighted ensemble | WSTS/TrendForce/IDC/Gartner revenue rows를 사용자 slider weight로 정규화하고 weighted revenue를 HBM demand multiplier와 confidence score로 변환 | `raw/datasets/institutional-memory-forecast-comparison-2026.md` |
| HBM/BOM affordability stress | HBM price decline, target BOM share, demand elasticity, supply relief pass-through를 stress scenario shock로 변환 | `raw/datasets/hbm-price-per-gb-per-stack-by-generation.md`, `raw/datasets/ai-accelerator-bom-hbm-cost-share.md` |

이 계층은 예측치를 더 “정확해 보이게” 만드는 장식이 아니라, 서로 다른 기관 전망·가격 신호·공급 병목을 같은 테이블에 올려서 어떤 가정이 결과를 움직이는지 드러내는 검증 장치다.

```text
stress_input = base_input × demand_shock × supply_shock + price_shock
envelope_year = min/base/max(stress_effective_demand_by_year)
hierarchy_year = Σ preset_effective_demand_by_family
nowcast_base = base_demand × clamp(1 + weighted_signal × 0.06, 0.75, 1.35)
institution_band = min/mid/max(institutional_2026_memory_revenue_usd_b)
csv_signal_json = raw/datasets/*.csv → wiki/data/advanced-forecast-source-signals.json
csv_preset_candidates = institution_low/mid/high × SIA_momentum → conservative/base/upside preset strip
sia_index_row = sales_usd_b / first_sales_usd_b × 100
institution_ensemble = Σ(revenue_i × normalized_weight_i) → hbm_demand_multiplier
hbm_bom_stress = price_decline × elasticity + bom_share_relief → demand/supply shock
```

`wiki/data/advanced-forecast-source-signals.json`은 CSV 원본을 직접 수정하지 않고 브라우저 시뮬레이터가 사용할 수 있는 typed signal layer로 변환한 파일이다. 현재 연결된 raw CSV는 `institutional-memory-forecast-comparison-2026.csv`, `sia-global-semiconductor-sales-monthly-2026.csv`, `hbm-price-per-gb-per-stack-by-generation.csv`, `ai-accelerator-bom-hbm-cost-share.csv`이며, JSON 각 row에는 `rawPath`와 paired markdown `sourceNote`가 함께 들어간다. 이 구조 덕분에 UI는 $294.82B–$633.3B의 2026 기관 forecast band와 SIA 월간 high-frequency nowcast를 노출하면서도 raw traceability를 잃지 않는다.

CSV-derived preset strip은 하드코딩된 네 개 reference preset을 대체하지 않고, raw CSV에서 바로 나온 institution band와 SIA momentum이 base demand·unit CAGR·supply allocation을 얼마나 흔드는지 비교하는 보조 candidate layer다. 사용자가 strip의 보수/기준/상방 카드를 누르면 같은 forecast engine이 해당 candidate input으로 재계산된다. SIA indexed time-series는 `2025-FY` row를 100으로 놓고 이후 월별/분기별 sales를 상대 index와 bar width로 바꿔, 표의 숫자를 다시 계산하지 않아도 nowcast 추세를 눈으로 확인하게 한다.

최종 polish layer는 두 개의 직접 조작 control을 추가한다. Institution-weighted ensemble은 WSTS/TrendForce/IDC/Gartner의 revenue row를 slider weight로 정규화해 weighted revenue와 demand multiplier를 즉시 갱신한다. HBM/BOM affordability stress는 B200 중심 HBM cost/share anchor를 기준으로 HBM price decline과 target BOM share를 demand shock 및 supply relief shock로 바꿔 unmet demand가 어떻게 변하는지 보여준다.

## 7. Dominant constraint classifier

엔진은 각 forecast path에서 가장 중요한 병목을 다음 중 하나로 분류한다.

| Constraint | 의미 |
| --- | --- |
| `supply-realization` | 수요는 있으나 공급·수율·allocation cap이 effective demand를 제한 |
| `price-inventory-cycle` | 가격, 재고, bullwhip 때문에 주문량과 end demand가 분리 |
| `adoption-transition` | S-curve 침투율 전환이 forecast의 주된 민감도 |
| `content-growth` | 단위당 탑재량 증가가 unit growth보다 더 큰 driver |
| `balanced` | 특정 단일 병목보다 여러 축이 균형적으로 작동 |

## Model quality gates

Before changing defaults or interpreting simulator output, every candidate assumption should pass these gates:

| Gate | Question | Reject / downgrade if |
| --- | --- | --- |
| Unit clarity | Is the input units, bits, capacity, or revenue? | source only reports market revenue CAGR |
| Product clarity | Does it distinguish DRAM, NAND, HBM, GDDR, LPDDR? | “memory” is used generically |
| Timing clarity | Is the date shipment, order, qualification, capex, or installation? | roadmap timing is treated as volume timing |
| Realization clarity | Which physical/commercial gate limits conversion? | no package/test/power/allocation factor is attached |
| Cross-source support | Does another source family agree? | single article becomes default value |
| UI traceability | Can the user trace slider/card output back to rawPath/sourceNote? | generated data lacks raw path |

## 구현

- `wiki/lib/advancedDemandForecast.ts`
- `wiki/data/advanced-forecast-presets.json`
- `wiki/components/AdvancedDemandForecastSimulator.vue`
- `tests/advancedDemandForecast.test.ts`
- 추가 API: `buildStressScenarioTable`, `buildForecastEnvelope`, `buildHierarchicalForecastRows`, `calculateNowcastAdjustment`, `getAdvancedForecastSourceSignals`, `buildSourceCalibratedForecastContext`, `calculateSourceCalibratedNowcast`, `buildCsvDerivedAdvancedForecastPresets`, `buildSiaNowcastTimeSeries`, `buildInstitutionWeightedEnsemble`, `calculateHbmBomStress`

## Source-backed preset map

| Preset | Primary model axes | Raw anchors |
| --- | --- | --- |
| `hbm-ai-infrastructure-constraint-reference` | HBM content uplift, AI accelerator unit growth, CoWoS/HBM supply realization, long-term TAM band | `raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md`, `raw/reports/trendforce-hbm-bit-demand-supply-2026.md`, `raw/reports/pkg-cowos-allocation-nvidia-amd-2026.md`, `raw/reports/hbm-longterm-tam-by-application-2030.md` |
| `pc-dram-shortage-elasticity-reference` | AI PC content uplift, price elasticity, inventory drag, refresh cycle | `raw/reports/idc-2026-memory-shortage-supply-growth.md`, `raw/articles/oem-pc-dell-hp-lenovo-price-hike-memory-2026.md`, `raw/articles/oem-windows10-eol-pc-refresh-memory-demand-2026.md` |
| `smartphone-on-device-ai-premiumization-reference` | on-device AI S-curve, premiumization, spec downgrade risk | `raw/articles/on-device-ai-smartphone-dram-content-2026.md`, `raw/articles/trendforce-smartphone-storage-capacity-2026.md`, `raw/articles/oem-smartphone-dram-content-spec-downgrade-2026.md` |
| `nand-ai-storage-qlc-breakout-reference` | enterprise QLC diffusion, AI storage content, SSD mix transition | `raw/reports/trendforce-qlc-enterprise-ssd-nearline-hdd-2026.md`, `raw/articles/storage-enterprise-ssd-qlc-nand-demand-2026.md`, `raw/datasets/idc-global-datasphere-zettabytes.md` |

## 사용상 주의

- 이 엔진은 “정답 예측치”가 아니라 **assumption graph**다.
- raw source가 부족한 축은 confidence score가 낮아지며, output은 scenario ensemble로만 해석한다.
- `unmet demand`는 반드시 lost sales가 아니다. delayed shipment, backlog, price rationing, spec downgrade, substitution으로 갈라진다.

## 관련 문서

- [[forecasting-method-library]]
- [[structural-demand-model]]
- [[sensitivity-analysis]]
- [[scenario-analysis]]
