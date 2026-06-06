---
source_url: https://link.springer.com/article/10.1007/s00181-016-1198-x
title: "On predicting the semiconductor industry cycle: a Bayesian model averaging approach"
authors: Wen-Hsien Liu, Shu-Shih Weng
publisher: Empirical Economics, Vol. 54, pp. 673-703 (Springer)
published: 2018
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, probabilistic-forecasting, causal-model]
confidence: high
---

# On predicting the semiconductor industry cycle: a Bayesian model averaging approach — extracted notes

> 70개 후보 예측변수 중 모델 불확실성을 고려한 BMA로 반도체 사이클 핵심 결정요인을 식별·예측한 연구.

## 문제/목표
- 모델 불확실성(model uncertainty)을 명시적으로 다루며 반도체 산업 사이클의 유용 예측변수를 선별.
- 단일 모델 선택의 임의성을 피하고 강건한 장기 예측을 제공.

## 방법론
- Bayesian Model Averaging(BMA)로 70개 후보 예측변수에 대해 posterior inclusion probability/mean/sd 추정.
- 표본 기간 1995:05–2012:10 월별 데이터.
- 표본외(out-of-sample) 예측 평가로 BMA 유용성 검증.

## 핵심 결과
- Philadelphia Semiconductor Index(SOX)와 다운스트림 산업 재고(total inventories)가 사이클 신호로 중요.
- BMA가 장기 예측에서 예측 잠재력과 유용성을 보임(개별 모델 대비 강건).

## 메모리 수요 예측 적용점
- MemoCast의 다중 후보 지표(매크로·재고·주가지수) 중 변수 선택을 BMA/베이지안 가중으로 수행 → 모델 위험 분산.
- "다운스트림 재고"가 핵심 선행지표라는 발견은 메모리 수요 모델의 재고 변수 우선순위에 직접 반영.
- posterior inclusion probability를 사용해 변수 중요도 기반 확률적 예측 산출.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://ideas.repec.org/a/spr/empeco/v54y2018i2d10.1007_s00181-016-1198-x.html
