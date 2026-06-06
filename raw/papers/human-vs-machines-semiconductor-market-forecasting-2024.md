---
source_url: https://arxiv.org/abs/2404.09334
title: "Human Vs. Machines: Who Wins In Semiconductor Market Forecasting?"
authors: Louis Steinmeister, Markus Pauly
publisher: arXiv (preprint, 2404.09334)
published: 2024
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, machine-learning, scenario-analysis]
confidence: medium
---

# Human Vs. Machines: Who Wins In Semiconductor Market Forecasting? — extracted notes

> 전문가(WSTS) 예측 vs 데이터 기반(ML/통계) 예측을 반도체 시장 매출 예측에서 비교한 논문.

## 문제/목표
- 반도체 시장 매출 예측에서 인간 전문가(World Semiconductor Trade Statistics, WSTS)의 합의 전망이 데이터 기반 모델보다 우수한가?
- 전문가 예측의 편향(bias)·비일관성("열 명에게 물으면 열 개의 의견") 문제를 정량적으로 검증.

## 방법론
- 데이터: WSTS의 반도체 시장 통계(전문가 합의 전망 포함) + 추가 거시·산업 데이터.
- 비교 대상: 과거 시장 데이터만으로 학습한 statistical/ML forecasting 모델 vs WSTS 전문가 전망.
- 평가: mean error 지표 및 mean rank 기반 비교, 예측 구간 길이별 성능 분석.

## 핵심 결과
- 과거 시장 데이터만 사용하면 WSTS 전문가가 mean error/mean rank에서 더 우수.
- 추가로 활용 가능한 데이터(보조 지표)를 데이터 기반 모델에 투입하면 ML 모델이 전문가를 능가.
- 예측 대상 시계열의 길이는 데이터 기반 예측의 상대 성능에 큰 영향을 주지 않음.

## 메모리 수요 예측 적용점
- MemoCast에서 애널리스트/전문가 컨센서스(예: WSTS, 시장 리서치)를 baseline으로 두고, 보조 변수(매크로·수주·재고)를 추가한 ML 모델로 상회 여부를 벤치마크하는 설계에 직접 적용.
- "전문가 vs 모델" 앙상블/블렌딩 전략의 근거: 데이터가 풍부할 때만 모델이 전문가를 이긴다는 점을 의사결정 규칙으로 활용.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://arxiv.org/html/2404.09334v1
- https://arxiv.org/pdf/2404.09334
