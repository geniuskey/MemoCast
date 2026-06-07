---
source_url: https://arxiv.org/abs/1912.09363
title: "Temporal Fusion Transformer (TFT) — interpretable multi-horizon forecasting"
authors: Lim, Arık, Loeff, Pfister (Oxford / Google Cloud AI)
publisher: arXiv / International Journal of Forecasting
published: 2021
ingested: 2026-06-07
type: paper
tags: [demand-forecasting, time-series, machine-learning, probabilistic-forecasting, scenario-analysis]
confidence: high
---

# Temporal Fusion Transformer (TFT) — extracted notes

> static·known-future·observed-past 입력을 통합하는 해석가능 multi-horizon attention 모델. MemoCast 입력 구조에 최적.

## 문제/목표

- multi-horizon 예측의 복잡한 입력(static covariate, known future, observed past)을 통합하고 black-box 탈피(해석성).

## 방법론 / 핵심 결과

- recurrent(국소) + interpretable self-attention(장기) 결합. variable selection network + gating으로 불필요 입력 억제.
- quantile 출력으로 예측구간(확률예측). 다수 실데이터에서 벤치마크 능가, 3가지 해석성 use case.

## 메모리 수요 예측 적용점

- 메모리 입력을 TFT 구조로 매핑: **static**(제품/지역), **known future**(capex 계획·fab 가동 일정·세대전환), **observed past**(spot·재고·수출·PMI).
- quantile 출력 → P10/P50/P90 시나리오(CQR/Monte Carlo 파일 정합).
- variable selection의 해석성 → 어떤 driver가 수요/가격을 견인하는지 투명화(MemoCast 철학: 가정 투명성).

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- TFT IJF 버전 (ScienceDirect): https://www.sciencedirect.com/science/article/pii/S0169207021000637
- Google Research TFT: https://research.google/pubs/temporal-fusion-transformers-for-interpretable-multi-horizon-time-series-forecasting/
