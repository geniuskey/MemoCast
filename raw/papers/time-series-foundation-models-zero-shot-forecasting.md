---
source_url: https://otexts.com/fpppy/15-foundation-models.html
title: "시계열 Foundation Models (TimeGPT/Chronos/Moirai) — zero-shot 예측"
authors: Nixtla(TimeGPT) / Ansari(Chronos) / Salesforce(Moirai) / Tsinghua(Sundial)
publisher: OTexts(FPP) / arXiv / ACM
published: 2024-2026
ingested: 2026-06-07
type: paper
tags: [demand-forecasting, time-series, machine-learning, probabilistic-forecasting, scenario-analysis]
confidence: high
---

# 시계열 Foundation Models (zero-shot) — extracted notes

> 대규모 사전학습 시계열 모델로 zero-shot 예측. 데이터 짧은 메모리 신세그먼트에 강력.

## 핵심 모델

- **TimeGPT(Nixtla)**: 최초 시계열 foundation model, 방대한 시계열 사전학습, zero-shot. Chronos/TimesFM 대비 정확·빠름(주장).
- **Chronos/Chronos-2(2025-10)**: time series patch 토큰화 + group attention(multivariate). SOTA zero-shot(uni/multi/covariate).
- **Moirai(Salesforce)**: masked encoder transformer, LOTSA(270억 관측/9개 도메인). trend·seasonal zero-shot.
- **Sundial(Tsinghua)**: TimeFlow Loss(flow-matching), 1조 time point 사전학습.

## 메모리 수요 예측 적용점

- HBM4/신응용처럼 **history 짧은 세그먼트에 zero-shot 예측**(grey model 파일과 상보).
- covariate-informed(Chronos-2)로 외생변수(PMI·재고·수출, nowcasting 파일) 결합.
- ensemble(M5)에 foundation model 컴포넌트 추가 → 데이터 부족 구간 보강.
- 단 도메인 특수성(메모리 사이클)은 fine-tune·구조모델 보완 필요.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- 2026 Time Series Toolkit 5 foundation models: https://machinelearningmastery.com/the-2026-time-series-toolkit-5-foundation-models-for-autonomous-forecasting/
- Reverso efficient TS foundation (arXiv): https://arxiv.org/pdf/2602.17634
- TimeRAF retrieval-augmented zero-shot (arXiv): https://arxiv.org/pdf/2412.20810
