---
source_url: https://arxiv.org/abs/2305.11059
title: "Understanding Interactions Between Chip Architecture and Uncertainties in Semiconductor Supply and Demand"
authors: Ramakrishna Kanungo, Swamynathan Siva, Nathaniel Bleier, Muhammad Husnain Mubarik, Lav R. Varshney, Rakesh Kumar
publisher: arXiv (cs.AR) preprint
published: 2023
ingested: 2026-06-06
type: paper
tags: [supply-chain, scenario-analysis, bit-demand, demand-forecasting]
confidence: medium
---

# Understanding Interactions Between Chip Architecture and Uncertainties in Semiconductor Supply and Demand — extracted notes

> 칩 아키텍처 설계 선택이 공급/수요 변동성에 대한 회복력에 미치는 영향을 분석한 논문.

## 문제/목표
- 반도체 공급망의 취약성은 부분적으로 "single demand path"에서 비롯됨: 한 칩이 단 하나의 수요만 충족 가능.
- 아키텍처 설계가 공급/수요 불확실성에 대한 비용·회복력에 어떻게 영향을 주는지 정량적으로 이해하는 것이 목표.

## 방법론
- 세 가지 아키텍처 전략 제안: composition(구성), adaptation(적응), dispersion(분산) — 칩 수요를 충족하는 다중 경로(multiple pathways) 생성.
- 분석적 모델(analytical model)을 구축하여 다양한 불확실성 조건에서 각 기법이 공급망 비용에 미치는 영향과 기법 조합 효과를 평가.

## 핵심 결과
- 아키텍처 변경에 기반한 제품 재설계가 공급/수요 변동성으로 인한 손실의 약 절반을 완화할 수 있음.
- 어떤 제품 구성·시장 조건이 이러한 개입에서 가장 큰 이득을 보는지에 대해 비직관적(counterintuitive) 통찰 제시.
- 칩 아키텍처와 공급망 회복력을 연결한 최초 연구로 자리매김.

## 메모리 수요 예측 적용점
- DRAM/NAND/HBM에서 단일 SKU(single demand path)에 묶인 수요를 "대체 가능 수요 경로"로 모델링하면 수요 변동 시 다이/웨이퍼 재배분 시나리오 분석에 활용 가능.
- HBM 다이 등급 분류(binning)·재활용을 통한 수요 충족 다중 경로는 시나리오 기반 수요-공급 매칭 모델의 입력으로 사용.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://arxiv.org/abs/2305.11059
- https://arxiv.org/pdf/2305.11059
