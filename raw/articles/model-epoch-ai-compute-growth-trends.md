---
source_url: https://epoch.ai/trends
title: "Epoch AI — AI compute 성장 추세 (메모리 수요 최상류 동인)"
publisher: Epoch AI
published: 2026
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, datacenter, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# Epoch AI — AI compute 성장 추세 — extracted notes

> 학습/추론 compute 성장률이 가속기·HBM 수요의 최상류 driver. 정량적·방법론적으로 강한 외생 입력.

## 핵심 수치

- **frontier LLM 학습 compute: 2020년 이후 연 5배(doubling ~5.2개월)**.
- 전체 notable AI 모델: 2010년 이후 연 **4.4배** 성장.
- **AI 칩 stock 총 연산력: 연 3.4배, doubling 6.8개월**. 글로벌 AI computing capacity doubling **7개월**.
- 학습비용 연 3.5배, frontier 모델 학습 전력 **연 2배**.
- 2026년 1e26 FLOP 초과 모델 ~10개 → 2030년 200개+. 2026 단일 학습 run 전력수요 중앙값 ~1GW.

## 수요 동인

- compute 성장 = 가속기 수요 = HBM/메모리 bit 수요의 1차 상류 신호.
- AI 칩 stock 연 3.4배가 누적 설치기반 → 누적 HBM 수요 곡선.

## 메모리 수요 예측 관련성

- top-down 모델: HBM bit demand ≈ f(설치 compute stock 성장률, 가속기당 HBM 용량).
- doubling time(5~7개월)은 수요 증가율 가정의 외생 앵커.
- 단, 알고리즘 효율(DeepSeek 등)·양자화가 compute→메모리 전환계수를 낮출 수 있어 Jevons 분기 필요.

## 관련 wiki

- [[memory-demand]] · [[hbm]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- Epoch frontier 4-5x/yr: https://epoch.ai/blog/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year
- AI chip production doubling 7mo: https://epoch.ai/data-insights/ai-chip-production
- Power usage trend: https://epoch.ai/data-insights/power-usage-trend
- Our World in Data: https://ourworldindata.org/grapher/exponential-growth-of-computation-in-the-training-of-notable-ai-systems
