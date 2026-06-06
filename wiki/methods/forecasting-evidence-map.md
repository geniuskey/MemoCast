---
title: Forecasting Evidence Map
type: method
created: 2026-06-06
updated: 2026-06-06
tags: [forecasting, methodology, evidence-map, memory-cycle]
sources: [raw/INDEX.md, raw/papers/human-vs-machines-semiconductor-market-forecasting-2024.md, raw/papers/information-distortion-supply-chain-bullwhip-effect-1997.md, raw/papers/bass-diffusion-successive-generations-high-tech-1987.md, raw/papers/stochastic-programming-capacity-planning-wafer-fab-2009.md]
confidence: medium
---

# Forecasting Evidence Map

새로 추가된 `raw/papers/`, `raw/datasets/`, `raw/lectures/` 자료는 MemoCast가 단순 bottoms-up calculator에서 출발하되, 이후 cycle model, diffusion model, supply-chain model, capacity planning model로 확장될 수 있음을 보여줍니다.^[MemoCast internal raw source map]

## 방법론 계층

| Layer | 질문 | 대표 raw 자료 | MemoCast 적용 |
| --- | --- | --- | --- |
| Structural model | 수요는 어떤 항의 곱인가? | `memory-demand-forecasting-methodology-bottoms-up.md` | 현재 simulator의 기본 구조 |
| Scenario / sensitivity | 어떤 입력이 결과를 크게 바꾸는가? | `memory-pricing-contract-spot-lta-mechanism.md` | slider/preset, upside/downside 비교 |
| Cycle model | 가격/재고/투자가 어떤 국면인가? | `semiconductor-industry-cycles-explanatory-factors-forecasting-2014.md`, `investigating-semiconductor-industry-cycles-2013.md` | cycle phase dashboard 후보 |
| Bullwhip / supply chain | 주문 왜곡과 재고 조정이 어떻게 증폭되는가? | `information-distortion-supply-chain-bullwhip-effect-1997.md`, `dynamic-analysis-semiconductor-supply-chain-bullwhip-2018.md` | OEM 주문과 실제 end demand 분리 |
| Technology diffusion | AI PC, HBM4, QLC SSD 같은 신기술 채택 속도는? | `bass-diffusion-successive-generations-high-tech-1987.md`, `manufacturing-intelligence-semiconductor-demand-technology-diffusion-2010.md` | penetration curve model 후보 |
| Statistical / ML | historical series로 예측할 수 있는가? | `human-vs-machines-semiconductor-market-forecasting-2024.md`, `arima-lstm-order-demand-short-lead-time-2021.md`, `hybrid-lstm-arma-ic-tray-demand-forecasting-2022.md` | 데이터셋이 충분할 때 forecast module 후보 |
| Capacity planning | 공급이 언제 얼마나 늘어나는가? | `real-options-capacity-investment-semiconductor-2007.md`, `stochastic-programming-capacity-planning-wafer-fab-2009.md` | supply-side scenario와 capex timing |

## 현 단계의 결론

현재 MemoCast는 아직 “정답을 내는 forecast engine”이 아니라, raw source를 해석해 다음 질문에 답하는 knowledge+scenario system입니다.

1. Application별 bit demand는 어느 입력 변수에 의해 결정되는가?
2. 출하량보다 per-device content가 더 중요한 구간은 어디인가?
3. Demand growth가 supply growth보다 클 때 가격/매출은 어떻게 민감해지는가?
4. AI/HBM 수요가 전력, CoWoS, cleanroom, wafer allocation에 의해 지연될 가능성은 어디인가?
5. 기관별 전망치가 서로 얼마나 다른가?

## Dataset 활용 우선순위

`raw/datasets/`의 CSV pair는 다음 순서로 wiki와 simulator에 연결하는 것이 좋습니다.^[MemoCast internal raw source map]

1. `memory-content-per-device.csv`: smartphone/server/notebook content uplift를 simulator anchor로 연결.
2. `pc-server-shipments.csv`, `smartphone-shipments.csv`: unit shipment baseline 연결.
3. `gpu-hbm-capacity.csv`, `hbm-market-size.csv`: HBM simulator의 accelerator/HBM content source anchor 보강.
4. `bit-demand-supply-growth.csv`: 수요-공급 gap과 pricing regime page에 연결.
5. `memory-maker-capex.csv`: supply response timing과 capex page에 연결.
6. `dram-price-history.csv`, `nand-cost-per-bit-trend.csv`: price/revenue model로 확장할 때 사용.

## Simulator로 승격하기 전 체크리스트

- 단위가 GB, TB, bit, wafer, revenue 중 무엇인지 명확한가?
- 동일 수치가 적어도 두 source cluster에서 확인되는가?
- 출하량과 installed base를 혼동하지 않는가?
- 가격/ASP 변화와 bit demand 변화를 분리했는가?
- source confidence가 low인 값은 preset label에 “illustrative” 또는 “candidate”로 표시했는가?

## 관련 문서

- [[demand-forecasting]]
- [[structural-demand-model]]
- [[sensitivity-analysis]]
- [[supply-demand-gap]]
- [[raw-source-map]]
