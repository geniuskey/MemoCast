---
source_url: https://arxiv.org/pdf/2202.08756
title: "확률예측: Conformalized Quantile Regression (CQR) + conformal prediction"
authors: Romano et al. (CQR) / 관련 conformal prediction 문헌
publisher: arXiv / ScienceDirect / skforecast
published: 2022-2025
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, probabilistic-forecasting, machine-learning, scenario-analysis, time-series]
confidence: high
---

# 확률예측 CQR / conformal prediction — extracted notes

> 점추정이 아닌 예측구간(분포)을 보장 → MemoCast의 시나리오 band를 통계적으로 정당화.

## 문제/목표

- 비등분산(heteroscedastic)·비정상 수요에서 valid한 예측구간(coverage 보장) 생성.

## 방법론

- **Quantile regression**: Q=0.1, Q=0.9 회귀로 80% 구간 상·하한 추정(국소 변동성 적응).
- **Conformal prediction**: 과거 residual로 구간 폭 보정, 지정 coverage 확률 보장(분포가정 무관).
- **CQR**: 둘 결합 — quantile의 국소 적응 + conformal의 marginal coverage 보장. width-adaptive 확장.

## 핵심 결과

- CQR이 단순 quantile/conformal 대비 valid·효율적 구간. 전력가격·수요 예측에 적용 실적.

## 메모리 수요 예측 적용점

- MemoCast의 가정 기반 시나리오(bull/base/bear)를 **데이터 기반 예측구간**으로 보완.
- 메모리 가격/bit 수요의 분포 예측 → P10/P50/P90 시나리오를 통계적으로 산출.
- 사이클 급변(이분산)에 robust → turning point 불확실성 표현에 적합.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[sensitivity-analysis]] · [[structural-demand-model]]

## 추가 출처

- Heteroscedastic QR + width-adaptive conformal (arXiv): https://arxiv.org/html/2406.14904v2
- Conformal prediction electricity price (ScienceDirect): https://www.sciencedirect.com/science/article/pii/S266654682500103X
- skforecast probabilistic forecasting: https://skforecast.org/0.18.0/user_guides/probabilistic-forecasting-overview
