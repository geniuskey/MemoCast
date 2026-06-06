---
source_url: https://www.mdpi.com/2227-7390/10/13/2158
title: "Hybrid LSTM-ARMA Demand-Forecasting Model Based on Error Compensation for Integrated Circuit Tray Manufacturing"
authors: Chien-Chih Wang, Hsin-Tzu Chang, Chun-Hua Chien
publisher: Mathematics (MDPI), Vol. 10(13), 2158
published: 2022
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, machine-learning, supply-chain]
confidence: high
---

# Hybrid LSTM-ARMA Demand-Forecasting Model Based on Error Compensation for IC Tray Manufacturing — extracted notes

> LSTM(비선형) + ARMA(잔차 보정) 하이브리드로 반도체 IC tray 수요를 예측, 오차보정으로 정확도 향상.

## 문제/목표
- 반도체 생산용 IC tray의 변동성 큰 수요를 정확히 예측.
- 단일 모델(LSTM 또는 ARMA)의 한계를 오차보정(error compensation)으로 극복.

## 방법론
- Rolling LSTM으로 비선형 패턴 학습 → 잔차(residual)를 rolling ARMA로 보정하는 2단계 구조.
- 데이터: 실제 IC tray 주문 데이터.
- 평가 지표: RMSE, MAPE, MAE.

## 핵심 결과
- LSTM-ARMA의 RMSE/MAPE/MAE가 단일 모델 대비 모두 작음 → 오차보정이 정확도 개선.
- 비선형(LSTM) + 선형 잔차(ARMA) 결합이 변동성 큰 수요에 효과적.

## 메모리 수요 예측 적용점
- MemoCast의 하이브리드 예측(딥러닝 + 통계 잔차보정) 아키텍처 템플릿.
- 메모리 출하/주문의 비선형 추세는 LSTM, 잔차의 자기상관은 ARMA로 분리 처리하는 설계.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://ideas.repec.org/a/gam/jmathe/v10y2022i13p2158-d843767.html
- https://www.researchgate.net/publication/362997376
