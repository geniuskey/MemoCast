---
source_url: https://www.mdpi.com/2227-9717/9/7/1157
title: "On the Application of ARIMA and LSTM to Predict Order Demand Based on Short Lead Time and On-Time Delivery Requirements"
authors: Chien-Chih Wang, Chun-Hua Chien, Amy J. C. Trappey
publisher: Processes (MDPI), Vol. 9(7), 1157
published: 2021
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, machine-learning, supply-chain]
confidence: medium
---

# Application of ARIMA and LSTM to Predict Order Demand (Short Lead Time / OTD) — extracted notes

> 반도체 생산용 IC tray 주문 수요를 ARIMA와 LSTM으로 예측하고 기업 경험식과 비교.

## 문제/목표
- 짧은 리드타임과 정시납기(OTD) 요건 하에서 주문 수요를 정확히 예측.
- 제조사의 경험 기반(empirical) 예측 대비 통계/딥러닝 모델의 우위 검증.

## 방법론
- ARIMA(선형 시계열) 및 LSTM(딥러닝) 모델 구축·비교.
- 데이터: 반도체 생산 공장의 IC tray 실주문.
- 평가: RMSE, 평균 절대 오차율(MAPE 계열).

## 핵심 결과
- ARIMA·LSTM 모두 제조사 경험식 대비 우수.
- 특히 단기 예측에서 LSTM 성능이 향상됨.

## 메모리 수요 예측 적용점
- 단기 vs 중기 horizon에 따라 ARIMA/LSTM을 선택·병행하는 규칙 수립 근거.
- 메모리 수요의 단기 예측은 LSTM, 안정 추세는 ARIMA로 분담하는 ensemble 설계.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://www.researchgate.net/publication/352969270
