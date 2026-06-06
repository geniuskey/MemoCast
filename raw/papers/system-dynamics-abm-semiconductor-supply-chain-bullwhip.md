---
source_url: https://www.anylogic.com/resources/case-studies/bullwhip-effect-in-semiconductor-supply-chain/
title: "System Dynamics / Agent-Based 반도체 공급망 bullwhip 시뮬레이션"
authors: AnyLogic case studies / Infineon / WSC proceedings
publisher: AnyLogic / IEEE Xplore / TU Delft
published: 2021-2022
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, supply-chain, scenario-analysis, causal-model]
confidence: medium
---

# SD/ABM 반도체 공급망 시뮬레이션 — extracted notes

> 메모리 수요/공급/재고를 동적 시뮬레이션하는 방법론. MemoCast 시뮬레이터의 상위 확장 경로.

## 문제/목표

- 반도체 공급망의 bullwhip(수요 변동 증폭)·재고·lead time 동학을 시뮬레이션.

## 방법론

- **System Dynamics(SD)**: 거시·전체 시스템 feedback loop(echelon별 재고-주문). Infineon이 AnyLogic SD로 수요회복 시나리오 + 대시보드 구축.
- **Agent-Based(ABM)**: 분산 의사결정·행태(Beer Game 기반 에이전트, 정보지연·재고연동 주문).
- **DES**: 운영 수준 이벤트.

## 핵심 결과

- 반도체 수요는 불안정·혁신 사이클 의존 → bullwhip에 취약.
- 정보 공유·risk pooling이 bullwhip 완화(ABM 실증).

## 메모리 수요 예측 적용점

- MemoCast 시뮬레이터를 정적 계산기 → 동적 SD/ABM(재고·주문·가격 feedback)으로 확장하는 청사진.
- echelon별(fab→모듈→OEM→채널) 재고-주문 loop으로 가격/수급 사이클 내생화.
- 시나리오 대시보드(Infineon 사례)는 MemoCast UI 설계 참고.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- AnyLogic supply chain forecasting/bullwhip: https://www.anylogic.com/resources/case-studies/supply-chain-forecasting-and-bullwhip-effect-evaluation-using-simulation-software/
- SD multi-stage random demand (IEEE): https://ieeexplore.ieee.org/document/5591082/
- TU Delft bullwhip simulation review: https://simulation.tudelft.nl/SEN9110/results/Group10_Simulation%20Methods%20for%20the%20Bullwhip%20Effect.pdf
