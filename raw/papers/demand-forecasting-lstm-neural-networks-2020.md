---
source_url: https://arxiv.org/abs/2008.08522
title: "Demand Forecasting using Long Short-Term Memory Neural Networks"
authors: Marta Gołąbek, Robin Senge, Rainer Neumann
publisher: arXiv (preprint, 2008.08522)
published: 2020
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, machine-learning, probabilistic-forecasting]
confidence: medium
---

# Demand Forecasting using Long Short-Term Memory Neural Networks — extracted notes

> univariate vs multivariate LSTM을 e-grocery 100개 FMCG 수요예측에 적용·비교한 방법론 논문.

## 문제/목표
- LSTM이 수요예측(특히 변동성/계절성 있는 소비재)에 적합한지 실증.
- univariate LSTM vs multivariate LSTM(외생변수 포함) 성능 비교.

## 방법론
- e-grocery 소매 데이터(빠른 회전 소비재 100종)에 univariate·multivariate LSTM 적용.
- 외생변수(가격, 프로모션, 캘린더 등)를 multivariate 모델에 투입.
- 전통 baseline 대비 정확도 비교.

## 핵심 결과
- multivariate LSTM이 외생변수 활용으로 univariate 및 단순 baseline 대비 개선.
- LSTM이 비선형·다변량 수요 패턴 포착에 유효하나 데이터/튜닝 의존적.

## 메모리 수요 예측 적용점
- 메모리 수요 예측의 multivariate LSTM 설계 템플릿: 가격·프로모션 대신 ASP·매크로·재고를 외생변수로 투입.
- univariate(추세) vs multivariate(드라이버 반영) 비교를 통한 변수 기여도 진단.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://arxiv.org/pdf/2008.08522
- https://www.researchgate.net/publication/343759000
