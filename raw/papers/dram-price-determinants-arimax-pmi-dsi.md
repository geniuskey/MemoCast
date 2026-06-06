---
source_url: https://www.sciencedirect.com/science/article/pii/S1029313224000733
title: "DRAM 가격 결정요인 (ARIMAX: PMI + DSI 등 외생변수)"
authors: (ScienceDirect 2024) + EU Commission 메모리 시장구조 리포트
publisher: ScienceDirect / European Commission / GARP
published: 2024
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, pricing, regression, causal-model, inventory]
confidence: medium
---

# DRAM 가격 결정요인 (ARIMAX) — extracted notes

> DRAM ASP를 매크로(PMI)+공급망(DSI) 외생변수로 설명하는 실증 모델.

## 문제/목표

- DRAM 가격(spot/ASP)을 외생변수로 설명·예측하는 ARIMAX 구축.

## 방법론 / 핵심 결과

- 전문가 식별 고상관 변수: **SK_DSI, MI_DSI(공급사 재고일수), AM_PMI, EU_PMI(지역 PMI)**가 DRAM4G 가격과 고상관.
- ARIMAX(ARIMA + 외생 회귀)로 설명력 강화.
- DRAM ASP의 YoY 변동은 매우 불규칙 → 다요인 상호작용. 공급·수요·재고가 핵심.
- EU Commission: 메모리 시장이 oligopoly→monopoly 경향(구조).

## 메모리 수요 예측 적용점

- MemoCast 가격 모델: ARIMAX(외생 = PMI, DSI, 한국수출, capex, billings)로 ASP 예측.
- DSI(공급사 재고일수)는 강한 가격 선행(memory-inventory·leading-indicators 파일 연계).
- 매크로(PMI)와 미시(DSI) 결합이 ASP 설명의 핵심 → ensemble 입력.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- EU Commission 메모리 시장구조/경쟁: https://ec.europa.eu/docsroom/documents/2732/attachments/1/translations/en/renditions/native
- GARP oligopoly→monopoly: https://www.garp.org/hubfs/Whitepapers/a1Z1W0000054xCeUAI.pdf
- DRAM generations ASP (ResearchGate): https://www.researchgate.net/figure/Evolution-of-the-average-sales-price-ASP-of-the-first-DRAM-generations-22-29-The_fig1_281781184
