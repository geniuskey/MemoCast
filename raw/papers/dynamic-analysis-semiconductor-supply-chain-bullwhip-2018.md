---
source_url: https://orca.cardiff.ac.uk/106037/3/IJPR%20paper.pdf
title: "Dynamic analysis and design of a semiconductor supply chain: a control engineering approach"
authors: Junyi Lin, Virginia L. M. Spiegler, Mohamed M. Naim (Cardiff/Kent)
publisher: International Journal of Production Research (Taylor & Francis)
published: 2018
ingested: 2026-06-06
type: paper
tags: [supply-chain, causal-model, time-series]
confidence: medium
---

# Dynamic Analysis and Design of a Semiconductor Supply Chain (Control Engineering) — extracted notes

> Intel형 하이브리드(MTS-MTO) 반도체 공급망에서 bullwhip 생성 메커니즘을 제어공학으로 분석한 논문.

## 문제/목표
- 반도체에서 흔한 make-to-stock + make-to-order(MTS-MTO) 하이브리드 공급망의 채찍효과(bullwhip) 원인 규명.
- 어떤 정책/설계가 주문변동 증폭을 줄이는가?

## 방법론
- 제어공학(control engineering) 접근: 공급망을 동적 시스템(transfer function)으로 모델링.
- Intel 공급망 구조를 모델화하여 bullwhip 발생 메커니즘 분석.
- feedforward forecasting compensation(MTO 부문) 등 정책 파라미터의 영향 분석.

## 핵심 결과
- MTO 부문의 feedforward 예측보정이 bullwhip 정도를 좌우하는 핵심 요인.
- 공급망 파라미터 튜닝으로 변동 증폭 억제 가능(안정성 설계).

## 메모리 수요 예측 적용점
- 메모리 공급망의 주문변동 증폭(채찍효과)을 동적 시스템으로 모델링 → 재고/주문 신호 정제.
- 최종수요 변화가 메모리사 주문으로 증폭 전달되는 과정을 transfer function으로 보정.
- 2020-2023 칩 부족·재고 과잉 사이클의 채찍효과 해석에 직접 적용.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://kar.kent.ac.uk/64241/
- https://www.semanticscholar.org/paper/3689015e48ce1460cdf56e0bfd402b314b4dccf4
