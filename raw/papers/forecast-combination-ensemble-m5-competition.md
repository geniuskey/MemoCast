---
source_url: https://www.sciencedirect.com/science/article/pii/S0169207021001874
title: "Forecast combination / ensemble (M5 Accuracy competition findings)"
authors: Makridakis, Spiliotis, Assimakopoulos (M5) 외
publisher: ScienceDirect (IJF) / arXiv
published: 2022
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, machine-learning, probabilistic-forecasting, scenario-analysis]
confidence: high
---

# Forecast combination / ensemble (M5) — extracted notes

> 예측 정확도 개선의 실증된 원칙: 이질적 모델 결합. MemoCast 통계 레이어 설계 지침.

## 문제/목표

- 대규모 수요예측 대회(M5, Walmart 데이터)에서 어떤 방법이 정확한가.

## 방법론 / 핵심 결과

- **이질적 모델 ensemble(결합)이 개별 모델보다 평균적으로 우수**(bias·variance 감소).
- **단순 산술평균(equal weights)이 의외로 robust** — 복잡한 가중보다 자주 우수.
- M5 1위: store/category/department별 학습한 **LightGBM 모델들의 equal-weight 결합**.
- 상위 입상자 모두 ensemble 사용. FFORMA(42 features 메타학습 가중), stacking 등 고급 결합도 존재.

## 메모리 수요 예측 적용점

- MemoCast 통계/ML 레이어는 단일 "정답 모델"이 아니라 **여러 모델(ARIMA·LSTM·Transformer·구조모델)의 결합**으로 설계.
- equal-weight 결합을 baseline으로, 성능기반/FFORMA를 옵션으로.
- 결합은 시나리오(가정 기반)와 통계예측을 합치는 MemoCast 철학과 정합.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- M5 accuracy results (PDF): https://statmodeling.stat.columbia.edu/wp-content/uploads/2021/10/M5_accuracy_competition.pdf
- Makridakis Competitions (Wikipedia): https://en.wikipedia.org/wiki/Makridakis_Competitions
- Meta-learning forecast combination (arXiv): https://arxiv.org/html/2504.08940
