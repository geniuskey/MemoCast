---
source_url: https://people.ischool.berkeley.edu/~hal/Papers/2011/ptp.pdf
title: "Predicting the Present with Google Trends"
authors: Hyunyoung Choi, Hal R. Varian
publisher: The Economic Record (Vol. 88, S1)
published: 2012
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, regression, machine-learning]
confidence: medium
---

# Predicting the Present with Google Trends — extracted notes

> Google 검색 쿼리 데이터로 경제 지표를 nowcasting(현재 예측)하는 방법론의 기초 논문.

## 문제/목표
- 검색 쿼리 데이터(Google Trends)가 자동차 판매, 실업청구, 여행, 소비자 신뢰 등 경제 변수의 "현재 값"을 더 빠르게 예측할 수 있는지 검증.
- 공식 통계는 시차(lag)를 두고 발표되므로, 실시간 검색 데이터로 "현재를 예측(predicting the present)"하는 것이 목표.

## 방법론
- 기준 시계열 모델(seasonal AR baseline)에 관련 Google Trends 검색 카테고리 변수를 추가한 회귀 모델 비교.
- in-sample 적합도 및 out-of-sample 예측 오차(MAE) 개선 여부로 평가.

## 핵심 결과
- Google Trends 변수를 추가하면 다양한 경제 지표의 단기 예측 정확도가 개선됨(예: 자동차 판매 예측 오차 감소).
- 검색 데이터는 turning point(전환점) 근처에서 특히 유용한 선행 신호 제공.

## 메모리 수요 예측 적용점
- 소비자 전자제품(스마트폰, PC, GPU) 관련 검색 트렌드를 메모리 최종 수요의 선행 지표(alternative data)로 활용 가능.
- 공식 출하 통계 발표 전 nowcasting으로 단기 bit 수요 변화를 조기 포착하는 회귀 프레임워크의 출발점.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://people.ischool.berkeley.edu/~hal/Papers/2011/ptp.pdf
- https://onlinelibrary.wiley.com/doi/10.1111/j.1475-4932.2012.00809.x
