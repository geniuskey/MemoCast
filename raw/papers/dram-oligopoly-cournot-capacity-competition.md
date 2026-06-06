---
source_url: https://users.ox.ac.uk/~sedm1375/Teaching/Micro/week7.2.pdf
title: "DRAM 과점·capacity 경쟁 (Cournot/Stackelberg) 게임이론"
authors: (Oxford IO lecture notes 외) + Cumbul Stackelberg
publisher: Oxford / GT Center / arXiv
published: 2024
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, scenario-analysis, pricing, causal-model, capex]
confidence: medium
---

# DRAM 과점·capacity 경쟁 게임이론 — extracted notes

> 3사 과점의 capacity/투자 게임이 공급(=가격) 사이클을 결정 → "절제된 capex" 해석 틀.

## 문제/목표

- capacity를 가격경쟁 이전에 선투자해야 하는 시장(DRAM)의 균형 분석.

## 방법론

- **Cournot**: capacity(수량)를 사전 commit, 이후 가격경쟁 → 자본집약·비가역 투자 산업에 적합.
- **Stackelberg**: 순차적 capacity 선택(선도자-추종자) — DRAM의 순차 투자 행태 묘사.
- R&D/투자: 기업 수 증가 시 기업당 투자 감소(과점 집중이 투자 규율↑).

## 핵심 결과

- capacity는 개발에 오래 걸리고 가격은 빨리 변함 → 대규모 산업은 Cournot presumption.
- 과점 집중(3사)일수록 capacity 경쟁 완화·투자 규율 → 공급 과잉 억제(가격 지지).

## 메모리 수요 예측 적용점

- "이번 사이클은 다르다"(절제된 capex, HBM 우선)를 과점 게임 균형으로 설명 → [[scenario-analysis]].
- capacity commit의 비가역성·lag이 cobweb(별도 논문)과 결합해 사이클 진폭 결정.
- 3사 capex 의사결정을 Cournot/Stackelberg 반응함수로 시나리오화.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[memory-demand]]

## 추가 출처

- Cumbul Stackelberg vs Cournot: http://dev.gtcenter.org/Downloads/Conf/Cumbul1857.pdf
- Differential game R&D oligopoly (arXiv): https://arxiv.org/pdf/1906.03995
