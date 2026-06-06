---
source_url: https://www.tandfonline.com/doi/abs/10.1080/00036840600706995
title: "Forecasting the semiconductor industry cycles by bootstrap prediction intervals"
authors: Wen-Hsien Liu
publisher: Applied Economics, Vol. 39, Iss. 13, pp. 1731-1742 (Taylor & Francis)
published: 2007
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, probabilistic-forecasting]
confidence: high
---

# Forecasting the semiconductor industry cycles by bootstrap prediction intervals — extracted notes

> VAR 모델 + bootstrap으로 반도체 사이클의 점예측이 아닌 예측구간(불확실성)을 산출한 연구.

## 문제/목표
- 점예측(point forecast)만으로는 투자/생산 의사결정에 한계 → 예측 불확실성(예측구간) 정량화가 필요.
- 글로벌 반도체 산업 사이클을 예측구간 형태로 제시.

## 방법론
- 월별 미국 데이터: 거시 4개 + 산업 7개 변수, 총 92개 관측치.
- 11변수 VAR 모델(적절한 시차)로 사이클 동학 포착.
- Bootstrap으로 예측구간 생성, 다른 VAR 모델 대비 성능 비교.

## 핵심 결과
- 11변수 VAR + 적정 시차 모델이 사이클 행태를 잘 포착하고 타 VAR 모델 능가.
- 점예측 대비 예측구간이 정책결정자/투자자에게 더 유용한 정보 제공.

## 메모리 수요 예측 적용점
- MemoCast의 확률적 예측(probabilistic forecasting) 모듈 설계의 직접적 선례: VAR + bootstrap 예측구간.
- 메모리 수요/가격 시나리오의 불확실성 밴드(P10/P50/P90) 산출 방법론으로 활용.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1002479
- https://www.researchgate.net/publication/24075959_Forecasting_the_semiconductor_industry_cycles_by_bootstrap_prediction_intervals
