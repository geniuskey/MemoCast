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

기존 structural demand model의 기본식은 가정 투명성에는 좋지만, 실제 메모리 수요 예측에서는 너무 단순하다. 고차원 forecast engine은 demand를 하나의 수치로 바로 계산하지 않고, 다음 다섯 계층으로 나눈다.

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

## 6. Dominant constraint classifier

엔진은 각 forecast path에서 가장 중요한 병목을 다음 중 하나로 분류한다.

| Constraint | 의미 |
| --- | --- |
| `supply-realization` | 수요는 있으나 공급·수율·allocation cap이 effective demand를 제한 |
| `price-inventory-cycle` | 가격, 재고, bullwhip 때문에 주문량과 end demand가 분리 |
| `adoption-transition` | S-curve 침투율 전환이 forecast의 주된 민감도 |
| `content-growth` | 단위당 탑재량 증가가 unit growth보다 더 큰 driver |
| `balanced` | 특정 단일 병목보다 여러 축이 균형적으로 작동 |

## 구현

- `wiki/lib/advancedDemandForecast.ts`
- `wiki/data/advanced-forecast-presets.json`
- `wiki/components/AdvancedDemandForecastSimulator.vue`
- `tests/advancedDemandForecast.test.ts`

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
