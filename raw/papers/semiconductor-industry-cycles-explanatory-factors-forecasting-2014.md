---
source_url: https://www.sciencedirect.com/science/article/abs/pii/S0264999314000832
title: "Semiconductor industry cycles: Explanatory factors and forecasting"
authors: Mathilde Aubry, Patricia Renou-Maissant
publisher: Economic Modelling, Vol. 39, pp. 221-231 (Elsevier)
published: 2014
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, causal-model, regression]
confidence: high
---

# Semiconductor industry cycles: Explanatory factors and forecasting — extracted notes

> 반도체 산업 사이클의 설명요인(금융·거시·산업 변수)을 규명하고 다양한 시계열 기법으로 예측한 연구.

## 문제/목표
- 반도체 산업의 주기성(cyclicality)을 유발하는 설명요인을 식별.
- 정책결정자·기업의 의사결정을 지원할 예측 도구 제공.

## 방법론
- Vector Error Correction Model(VECM)로 금융·거시·산업 데이터 간 단기·장기 상호관계 분석.
- 변수 선택: 시장 리포트/전문가 및 경제·계량 문헌의 사이클 지표 + 단기 Granger causality 검정.
- 예측 비교: 지수평활(exponential smoothing), Box-Jenkins(ARMA), Markov-switching autoregressive 모델.

## 핵심 결과
- 반도체 사이클은 거시경제·금융 변수와 장기 공적분(cointegration) 관계로 연결됨.
- VECM 기반 구조가 단순 시계열 대비 사이클 전환 설명력 우수.
- Markov-switching 모델이 호황/불황 국면 전환 포착에 유효.

## 메모리 수요 예측 적용점
- MemoCast의 사이클 국면(boom/bust) 식별에 Markov-switching/VECM 결합 적용 가능.
- 메모리 수요 드라이버로 거시(산업생산, IT 지출)와 산업지표(SOX, 출하)를 공적분 프레임에서 결합하는 구조적 모델 설계 근거.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://shs.hal.science/halshs-01101975/
- https://ideas.repec.org/a/eee/ecmode/v39y2014icp221-231.html
