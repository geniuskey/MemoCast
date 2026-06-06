---
source_url: https://www.hindawi.com/journals/mpe/2013/658630/
title: "Analyzing Taiwan IC Assembly Industry by Grey-Markov Forecasting Model"
authors: Liang-Chih Lin, Sin-Ye Wu
publisher: Mathematical Problems in Engineering (Article ID 658630)
published: 2013
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, regression]
confidence: medium
---

# Analyzing Taiwan IC Assembly Industry by Grey-Markov Forecasting Model — extracted notes

> GM(1,1)과 Markov chain을 결합한 Grey-Markov 모델로 IC 패키징·테스트(어셈블리) 산업 매출을 예측.

## 문제/목표
- 글로벌 금융위기 등 급변 환경에서 대만 반도체 패키징·테스트 산업의 분기 매출 추세 예측.
- 비선형·소표본 문제를 다루면서 변동성이 큰 구간의 예측 오차 보정.

## 방법론
- 데이터: 2009 Q1 ~ 2010 Q4 분기 매출 추세.
- Grey GM(1,1)로 추세 추정 후, Markov chain으로 잔차(상태 전이) 보정 → Grey-Markov 결합.
- GM(1,1), DGM(1,1) 등 벤치마크와 정확도 비교.

## 핵심 결과
- 2010 Q1~Q3 정확도 88.37%, 90.27%, 91.13%로, GM(1,1)·DGM(1,1)(73~86%대)보다 우수.
- 급변 환경에서도 Grey-Markov가 의사결정 기준으로 신뢰 가능함을 시사.

## 메모리 수요 예측 적용점
- 패키징·테스트 산업 매출은 HBM/advanced packaging 후공정 수요의 대리 지표 — 후공정 capacity 수요 예측에 응용 가능.
- 추세(Grey) + 상태 전이(Markov) 결합 구조는 사이클 변동이 큰 메모리 bit 수요·가격 예측의 잔차 보정 기법으로 차용 가능.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://www.hindawi.com/journals/mpe/2013/658630/
- https://onlinelibrary.wiley.com/doi/abs/10.1155/2013/658630
