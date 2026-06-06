---
source_url: https://arxiv.org/pdf/2312.06402
title: "Structural VAR (SVAR) — 수요/공급 충격 식별·impulse response"
authors: (Structural Analysis of VAR 문헌) + Kilian-Murphy 오일시장 SVAR
publisher: arXiv / ECB / MIT
published: 2008-2024
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, causal-model, scenario-analysis, pricing]
confidence: medium
---

# Structural VAR (SVAR) — 충격 식별 — extracted notes

> 메모리 가격/수요에 대한 수요충격 vs 공급충격을 분리 식별하는 인과 프레임.

## 문제/목표

- 가격·물량의 공동 움직임에서 구조적 충격(수요 vs 공급)을 분리 식별.

## 방법론

- VAR innovation을 회전(rotation)·제약(sign restriction 등)으로 구조충격 식별.
- impulse response로 특정 충격이 다른 변수에 미치는 동태 추정. local projection으로도 추정.
- Kilian-Murphy(오일): 공급/aggregate demand/specific demand 충격 분리(sign restriction) — 메모리에 직접 유추 가능.

## 핵심 결과

- 수요충격 vs 공급충격은 가격·물량에 다른 부호·지속성 패턴 → 식별 가능.
- 공급충격은 장기 실질 영향, 수요충격은 단기 영향(일반 거시 결과).

## 메모리 수요 예측 적용점

- 메모리 ASP/bit를 SVAR로 모델링: HBM 수요충격 vs capacity 공급충격 분리(sign restriction: 수요충격은 가격·물량 동반 상승, 공급충격은 반대).
- impulse response로 "AI 수요 +1σ 충격이 ASP/bit에 미치는 동태" 정량화 → [[scenario-analysis]].
- cobweb·VAR(기존 논문)과 결합해 인과 구조 강화.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- ECB nonfundamentalness review: https://www.ecb.europa.eu/pub/pdf/scpwps/ecbwp922.pdf
- MIT LP vs VAR impulse response: https://economics.mit.edu/sites/default/files/publications/lp_var.pdf
- Applied Causal Inference ML/AI (arXiv): https://arxiv.org/pdf/2403.02467
