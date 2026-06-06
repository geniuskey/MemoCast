---
source_url: https://www.sciencedirect.com/science/article/abs/pii/S0305054814001087
title: "Semiconductor fab product mix optimization (LP/decomposition)"
authors: (Computers & Operations Research) 외; CAPPA 광식각 capacity 할당
publisher: ScienceDirect / IEEE / INFORMS WSC
published: 2014
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, supply-chain, capacity, scenario-analysis, causal-model]
confidence: medium
---

# Fab product mix 최적화 (LP) — extracted notes

> 메모리 제조사가 wafer를 HBM/DDR5/LPDDR/NAND에 어떻게 배분하는지의 최적화 이론.

## 문제/목표

- 유한 capacity·제품별 수요한도(obligation·forecast)·이익 하에서 제품믹스(=wafer 배분) 최적화.

## 방법론

- LP/MIP: 이익 최대화 s.t. capacity·수요 제약. CAPPA(광식각 capacity 할당)에 LP 기반 휴리스틱(LPBHA).
- decomposition: 제품믹스와 자원할당 분리해 소규모 sub-LP 반복.
- 비정수 time lag 반영 LP로 재고/capacity 정확도 개선.

## 핵심 결과

- 이익·capacity 제약 하 최적 제품믹스가 마진 높은 제품(현재 HBM/server DDR5)으로 편향됨을 정량화.

## 메모리 수요 예측 적용점

- 제조사의 "HBM 우선 배분(crowding out)"을 이익최대화 LP로 설명 → 공급(제품별 bit) 모델링.
- wafer 환산계수(별도 dataset) × 제품별 마진(별도 report) → 공급사 배분 시나리오.
- MemoCast 공급측 모델: capacity × 제품믹스(LP) = 제품별 bit 공급.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[bit-demand]]

## 추가 출처

- INFORMS WSC product mix: https://informs-sim.org/wsc12papers/includes/files/inv213.pdf
- Stochastic capacity planning uncertain demand (ScienceDirect): https://www.sciencedirect.com/science/article/abs/pii/S0377221708007789
- Product mix methodology foundry (ResearchGate): https://www.researchgate.net/publication/3283824_A_methodology_for_product_mix_planning_in_semiconductor_foundry_manufacturing
