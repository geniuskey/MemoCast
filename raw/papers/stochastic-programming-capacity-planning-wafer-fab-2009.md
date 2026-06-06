---
source_url: https://www.sciencedirect.com/science/article/abs/pii/S0377221708007789
title: "Stochastic programming based capacity planning for semiconductor wafer fab with uncertain demand and capacity"
authors: Na Geng, Zhibin Jiang, Feng Chen
publisher: European Journal of Operational Research, Vol. 198(3), pp. 899-908 (Elsevier)
published: 2009
ingested: 2026-06-06
type: paper
tags: [scenario-analysis, supply-chain, causal-model]
confidence: high
---

# Stochastic Programming Based Capacity Planning for Semiconductor Wafer Fab — extracted notes

> 시나리오 기반 stochastic programming으로 수요·생산능력 불확실성 하 fab 장비/capacity 계획을 최적화.

## 문제/목표
- 반도체 wafer fab의 capacity 계획을 수요 불확실성 + 생산능력 불확실성(설비효율) 하에서 수립.
- 기대이익을 최대화하는 강건한(robust) 장비 투자 결정.

## 방법론
- 시나리오 기반 2단계 stochastic programming 모델.
- 수요·capacity 불확실성을 시나리오로 표현, OEE(overall equipment efficiency)로 불확실 capacity 묘사(최초 시도).
- 분권형 의사결정(장비조달·생산·재고·결품)에 정보공유 수준별 recourse 근사 전략.

## 핵심 결과
- 도출된 장비 세트가 다양한 시나리오의 capacity 변화에 강건, 기대이익 최대화.
- 합리적 계산시간 내 우수 해 산출.

## 메모리 수요 예측 적용점
- 메모리 capacity 계획에서 수요 시나리오(P10/P50/P90)를 stochastic programming 입력으로 직접 사용.
- 수요 예측 → 시나리오 트리 → capacity/CapEx 의사결정으로 연결하는 공급측 파이프라인 설계.
- OEE 불확실성 모델링은 실효 capacity(=공급 bit) 추정의 정밀화에 활용.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://ideas.repec.org/a/eee/ejores/v198y2009i3p899-908.html
- https://www.sciencedirect.com/science/article/abs/pii/S0925527309004083
