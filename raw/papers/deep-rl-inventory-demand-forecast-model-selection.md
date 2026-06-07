---
source_url: https://www.tandfonline.com/doi/full/10.1080/00207543.2020.1733125
title: "Deep RL for demand forecast model selection (반도체 distributor)"
authors: (IJPR 2020, UNISON framework) 외; VMI 반도체 RL
publisher: Taylor & Francis (IJPR) / ResearchGate / MDPI
published: 2020-2025
ingested: 2026-06-07
type: paper
tags: [demand-forecasting, machine-learning, time-series, supply-chain, scenario-analysis]
confidence: medium
---

# Deep RL — 예측모델 선택·재고 최적화 — extracted notes

> 강화학습으로 (1) 최적 예측모델 동적 선택, (2) 재고정책 최적화. 반도체 distributor 실증.

## 문제/목표

- 수요 패턴이 다양한 반도체 부품 distributor에서 어떤 예측모델을 언제 쓸지 동적 선택 + 재고 최적화.

## 방법론 / 핵심 결과

- **UNISON(deep RL)**: 수요 패턴별 최적 forecast model 동적 선택(Industry 3.5). 반도체 distributor 실증.
- VMI(vendor-managed inventory) 반도체에 deep RL 보충정책.
- 2025 multi-agent RL: transformer 수요모델 + 계층적 RL agent로 예측·재고 공동 최적화. Q-learning+CNN 재고제어.

## 메모리 수요 예측 적용점

- 예측모델 ensemble(M5/grey/ARIMAX 파일)을 RL로 **상황별 동적 선택**(horizon·패턴별 최적, WSTS accuracy 파일 정합).
- 재고-주문 정책(newsvendor 파일)을 RL로 최적화 → bullwhip·가수요 완화 시뮬레이션.
- MemoCast 시뮬레이터의 의사결정 레이어(SD/ABM 파일) 확장 경로.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- VMI 반도체 deep RL (ResearchGate): https://www.researchgate.net/publication/347356402_A_Deep_Reinforcement_Learning_Approach_For_Optimal_Replenishment_Policy_In_A_Vendor_Managed_Inventory_Setting_For_Semiconductors
- Multi-agent RL 예측+재고 (PMC): https://pmc.ncbi.nlm.nih.gov/articles/PMC12031219/
