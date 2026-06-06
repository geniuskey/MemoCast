---
source_url: https://www.sciencedirect.com/science/article/abs/pii/S0378779624011416
title: "Transformer-based probabilistic demand forecasting with adaptive online learning (2024)"
authors: (Electric Power Systems Research 2024) + MCDFN(arXiv 2405.15598) 병기
publisher: Electric Power Systems Research / arXiv
published: 2024
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, machine-learning, probabilistic-forecasting, supply-chain]
confidence: medium
---

# Transformer 확률적 수요예측 + 적응형 온라인학습 (2024) — extracted notes

> 메모리 수요의 비선형·장기의존성·불확실성을 다루는 최신 딥러닝 방법론.

## 문제/목표

- 비정상(non-stationary) 시계열에서 확률적(분포) 수요 예측 + concept drift 대응(adaptive online learning).
- 보조: MCDFN(Multi-Channel Data Fusion Network) — CNN+LSTM+GRU 융합, explainable 공급망 수요예측.

## 방법론

- Transformer attention으로 장기 의존성 포착, 온라인 학습으로 분포 파라미터 적응 갱신.
- MCDFN: 다채널(가격·출하·매크로 등) 융합 + SHAP 기반 설명.

## 핵심 결과

- attention 기반 모델이 RNN/CNN 대비 장기 의존성·복잡 특징 포착 우수.
- 확률적 출력으로 예측구간(불확실성) 제공 → point forecast보다 의사결정 친화.

## 메모리 수요 예측 적용점

- 메모리 bit demand/가격의 다채널 입력(출하·재고·spot·매크로·수출 프록시)을 Transformer로 결합.
- 확률적 출력은 [[scenario-analysis]]의 band(분포)와 자연스럽게 연결.
- online learning은 사이클 급변(turning point) 시 모델 적응에 유효.

## 관련 wiki

- [[demand-forecasting]] · [[structural-demand-model]] · [[scenario-analysis]] · [[sensitivity-analysis]]

## 추가 출처

- MCDFN explainable (arXiv): https://arxiv.org/pdf/2405.15598
- Foundation Models for Demand Forecasting (arXiv 2507.22053): https://arxiv.org/pdf/2507.22053
