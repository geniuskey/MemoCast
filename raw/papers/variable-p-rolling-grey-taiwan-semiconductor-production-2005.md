---
source_url: https://www.researchgate.net/publication/223041722_A_variable_P_value_rolling_Grey_forecasting_model_for_Taiwan_semiconductor_industry_production
title: "A variable P value rolling Grey forecasting model for Taiwan semiconductor industry production"
authors: Shih-Chi Chang, Hsin-Chia Lai, Hsiao-Cheng Yu
publisher: Technological Forecasting and Social Change (Vol. 72, Issue 5)
published: 2005
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, regression]
confidence: medium
---

# A variable P value rolling Grey forecasting model for Taiwan semiconductor industry production — extracted notes

> 회색이론(Grey, GM(1,1)) 기반 rolling 모델에 시변(time-varying) P값을 도입해 반도체 생산을 예측.

## 문제/목표
- 대만 연간 반도체 생산량 예측 정확도 향상.
- 소표본(small sample)·비선형 환경에서 작동하는 Grey 예측 모델의 한계 개선.

## 방법론
- rolling Grey forecasting model(RGM) 구축 — 최신 데이터를 순차 반영.
- 핵심 가설: P값을 시간의 함수(variable)로 두면 정확도가 향상됨.
- P값을 미국 제조업 실질 GDP의 연간 변화율(%)로 결정.

## 핵심 결과
- variable P value RGM이 fixed P value RGM보다 더 우수한 예측 성능.
- 거시 경기 변수(GDP 증가율)를 Grey 모델 파라미터에 연계하면 산업 사이클 반영도가 높아짐.

## 메모리 수요 예측 적용점
- 소표본·짧은 history를 갖는 신규 메모리 세대(예: 신규 HBM gen) bit 수요 예측에 Grey rolling 기법 적용 가능.
- 거시 변수(GDP, 제조업 지수)를 모델 파라미터에 연동하는 방식은 반도체 사이클 민감도 모델 설계에 시사점.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://www.researchgate.net/publication/223041722_A_variable_P_value_rolling_Grey_forecasting_model_for_Taiwan_semiconductor_industry_production
- https://doi.org/10.1016/j.techfore.2004.07.001
