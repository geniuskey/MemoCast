---
source_url: https://robjhyndman.com/papers/mint.pdf
title: "Hierarchical forecast reconciliation (MinT, top-down/bottom-up)"
authors: Wickramasuriya, Athanasopoulos, Hyndman (MinT, JASA 2019) 외
publisher: JASA / arXiv / ResearchGate
published: 2019-2025
ingested: 2026-06-07
type: paper
tags: [demand-forecasting, time-series, scenario-analysis, structural-demand-model]
confidence: high
---

# Hierarchical forecast reconciliation (MinT) — extracted notes

> 응용처별·제품별·지역별 계층 예측을 일관(coherent)되게 조정. MemoCast의 다계층 수요 통합 핵심.

## 문제/목표

- 계층(총 DRAM → 제품(HBM/DDR5/LPDDR/GDDR) → 응용(server/mobile/PC) → 지역) 예측을 합산 일관성 있게 조정.

## 방법론 / 핵심 결과

- **Bottom-up**: 최하위(응용별) 독립 예측 후 상향 합산. **Top-down**: 총량 예측을 하향 분배.
- **MinT(Minimum Trace)**: reconciled 예측오차 공분산의 trace 최소화 → 모든 계층 정보 동시 활용(linear mapping). bottom-up·top-down 능가.
- 공분산 정보는 모델 mis-specification 시 특히 유효. 최근 연구 3~40배 속도 개선.

## 메모리 수요 예측 적용점

- MemoCast 구조: 응용별(structural, units×content) bottom-up + 시장 총량(WSTS/TrendForce) top-down을 **MinT로 reconcile** → 일관된 다계층 예측.
- 제품(HBM/DDR5/LPDDR/GDDR, 별도 점유 dataset)·지역(region 파일) 계층을 coherent하게.
- ensemble(M5)·확률예측(CQR)과 결합해 계층별 불확실성 전파.

## 관련 wiki

- [[demand-forecasting]] · [[structural-demand-model]] · [[scenario-analysis]] · [[sensitivity-analysis]]

## 추가 출처

- Robust reconciliation (arXiv): https://arxiv.org/html/2510.20383v1
- Bottom-up/Top-down/MinT 비교 (ResearchGate): https://www.researchgate.net/publication/393695551_Comparative_Analysis_of_Reconciliation_Techniques_Bottom-Up_Top-Down_and_MinT_for_Product_Forecasting_in_Retail_SMEs
- Network flow reconciliation (arXiv): https://arxiv.org/html/2505.03955v1
