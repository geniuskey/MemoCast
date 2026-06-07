---
source_url: https://www.sciencedirect.com/science/article/pii/S0169207022000620
title: "Nowcasting with Google Trends (Bayesian Structural Time Series)"
authors: Choi & Varian (Predicting the Present) 외; BSTS nowcasting 문헌
publisher: ScienceDirect / IJF / arXiv
published: 2009-2024
ingested: 2026-06-07
type: paper
tags: [demand-forecasting, time-series, machine-learning, probabilistic-forecasting, scenario-analysis]
confidence: medium
---

# Nowcasting (Google Trends / BSTS) — extracted notes

> 대체데이터(검색·고빈도)로 현재/근미래를 nowcast. 메모리 수요의 실시간 추정 방법론.

## 문제/목표

- 공식 통계 발표 시차를 메우는 nowcasting(현재·근미래·최근과거 예측)에 대체데이터 활용.

## 방법론 / 핵심 결과

- **Choi & Varian "Predicting the Present"**: Google Trends가 단기 예측 개선.
- **BSTS(Bayesian Structural Time Series)**: trend+seasonal+regression(Trends) 결합, spike-and-slab 변수선택.
- XGBoost + 검색쿼리가 AR benchmark 능가. U-MIDAS+ML로 주간 실업 nowcast RMSFE 25~45% 개선.

## 메모리 수요 예측 적용점

- 메모리 수요/가격 nowcasting: Google Trends("RAM price", "DDR5"), 한국 수출(고빈도), 대만 ODM 매출, 재고를 대체데이터로.
- BSTS는 trend/seasonal(seasonality 파일)+회귀(선행지표 파일)를 베이지안 결합 → 불확실성 정량(CQR/확률예측 정합).
- 발표 시차 큰 공식 통계(WSTS 분기) 사이를 고빈도 신호로 nowcast.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- Choi & Varian Predicting the Present: https://www.researchgate.net/publication/228279908_Predicting_the_Present_with_Google_Trends
- 일별 Google Trends 실업 nowcast: https://www.sciencedirect.com/science/article/pii/S0038012124001629
- Econometrics of ML forecasting (arXiv): https://arxiv.org/pdf/2308.10993
