---
source_url: https://www.sciencedirect.com/science/article/pii/S1029313224000733
title: "ARIMA-driven DRAM spot price forecasting + 수요 탄력성 맥락 (2024)"
authors: (ScienceDirect 2024) + 탄력성 논의 종합
publisher: ScienceDirect / UncoverAlpha / ResearchGate
published: 2024
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, pricing, regression, scenario-analysis]
confidence: medium
---

# DRAM spot price ARIMA + 수요 탄력성 — extracted notes

> DRAM 가격예측(ARIMA + 외생변수)과 메모리 수요의 elastic/공급 inelastic 비대칭.

## 문제/목표

- DRAM spot price를 ARIMA + 반도체 관련 외생변수로 rolling 예측.
- 메모리 경제의 핵심: **수요는 탄력적(가격↓→소비↑), 공급은 단기 비탄력** → 가격 진폭 증폭.

## 방법론

- ARIMA(p,d,q) + 외생 설명변수(반도체 관련) 통합, rolling prediction.
- 탄력성 맥락: "intelligence 수요는 에너지처럼 가격 하락에 탄력적"(cheaper→more consumption).

## 핵심 결과

- 외생변수 결합 ARIMA가 단순 ARIMA 대비 spot price 예측 개선.
- 수요탄력성 vs 공급비탄력성 mismatch가 사이클 진폭의 근본 원인(cobweb과 정합).

## 메모리 수요 예측 적용점

- 가격탄력성 가정(가격↓→bit 수요↑)은 시나리오의 수요-가격 피드백 핵심 파라미터.
- ARIMA+외생(spot·재고·수출·매크로) 구조는 MemoCast 통계 예측 레이어의 baseline.
- 정밀 elasticity 계수는 미공개 → 시나리오에서 범위로 가정(`confidence` 명시).

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- UncoverAlpha elasticity mismatch: https://www.uncoveralpha.com/p/every-memory-cycle-ends-the-same
- DRAM generations unit sales (ResearchGate): https://www.researchgate.net/figure/Displayed-are-the-absolute-empirical-unit-sales-of-DRAM-generations-22-29-33-The-total_fig4_281781184
