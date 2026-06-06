---
title: Demand Forecasting
created: 2026-06-06
updated: 2026-06-06
type: concept
tags: [demand-forecasting, time-series, causal-model, scenario-analysis]
sources: [raw/INDEX.md, raw/papers/human-vs-machines-semiconductor-market-forecasting-2024.md, raw/datasets/bit-demand-supply-growth.md]
confidence: medium
---

# Demand Forecasting

수요 예측은 미래 수요를 추정하는 작업입니다. MemoCast에서는 메모리 산업에 맞춰 세 가지 층위로 접근합니다.

## 1. 구조적 계산

가장 먼저 “수요가 어떻게 계산되는가”를 명확히 합니다.

```text
수요 = 출하량 × 평균 탑재량 × 침투율 × 기타 조정 계수
```

## 2. 시나리오와 민감도

다음으로 입력 가정이 결과를 어떻게 바꾸는지 확인합니다. 이 단계가 [[scenario-analysis]]와 [[sensitivity-analysis]]입니다.

## 3. 통계/ML 예측

충분한 데이터가 쌓이면 시계열, 회귀, 머신러닝 모델을 붙입니다. 단, 모델 출력은 항상 구조적 해석과 함께 검토해야 합니다.


## Raw evidence layer

새로 추가된 raw 자료 이후 MemoCast의 예측 구조는 네 층으로 확장됩니다.

1. Structural calculator: 출하량, penetration, 평균 content를 명시적으로 계산합니다.
2. Source-backed assumptions: raw reports/articles/datasets에서 shipments, content, supply growth, price signal을 추출합니다.
3. Evidence map: 학술 논문과 dataset을 통해 cycle, bullwhip, diffusion, capacity planning 방법론을 연결합니다. 자세한 분류는 [[forecasting-evidence-map]]을 봅니다.
4. Supply-demand gap: bit demand가 bit supply를 얼마나 초과하는지에 따라 가격/매출 민감도를 해석합니다. 자세한 구조는 [[supply-demand-gap]]을 봅니다.

[[raw-source-map]]는 papers, articles, reports, earnings, datasets, lectures를 cluster별로 정리합니다.^[MemoCast internal raw source map]

## 관련 문서

- [[memory-demand]]
- [[structural-demand-model]]
- [[scenario-analysis]]
- [[forecasting-evidence-map]]
- [[supply-demand-gap]]
