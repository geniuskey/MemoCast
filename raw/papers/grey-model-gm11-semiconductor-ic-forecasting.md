---
source_url: https://www.sciencedirect.com/science/article/abs/pii/S0040162502001956
title: "Grey model GM(1,1) — 반도체/IC 산업 수요 예측 (소표본)"
authors: (Technological Forecasting & Social Change) 외 grey systems 문헌
publisher: ScienceDirect / Emerald / arXiv
published: 2002-2019
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, scenario-analysis, machine-learning]
confidence: medium
---

# Grey model GM(1,1) — 반도체/IC 수요 예측 — extracted notes

> 데이터가 적은(소표본) 신제품·신세대 메모리 수요 예측에 적합한 방법론.

## 문제/목표

- 데이터가 제한적·불완전할 때(소표본) 추세 예측. 신세대(HBM4, 신응용)처럼 history 짧은 경우.

## 방법론 / 핵심 결과

- **GM(1,1)**: 최소 4개 점으로 예측 가능. 데이터 분포 가정 낮음, 단순 계산, 만족할 만한 정확도.
- 누적생성(AGO)으로 노이즈 평활 후 미분방정식 적합.
- 글로벌 IC 산업 추세 예측에 적용. Markov 결합(MCGM)으로 변동 보정.

## 메모리 수요 예측 적용점

- HBM4/신응용처럼 history 짧은 세그먼트의 단기 추세 예측에 grey model 활용.
- 데이터 풍부한 세그먼트(DRAM 장기)는 ARIMA/LSTM, 소표본은 GM(1,1)로 분리(horizon별 모델, WSTS accuracy 파일 정합).
- ensemble(M5 파일)에 grey model을 소표본 컴포넌트로 포함.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- Improved GM(1,1) Simpson (arXiv): https://arxiv.org/pdf/1908.03493
- MCGM(1,1) demand forecasting (Emerald): https://www.emerald.com/gs/article-abstract/16/2/225/1331230/Application-of-a-grey-model-MCGM-1-1-for-demand
- GM(1,1) 충분조건 (ScienceDirect): https://www.sciencedirect.com/science/article/abs/pii/S0096300312012829
