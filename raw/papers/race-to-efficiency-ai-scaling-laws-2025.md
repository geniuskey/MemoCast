---
source_url: https://arxiv.org/abs/2501.02156
title: "The Race to Efficiency: A New Perspective on AI Scaling Laws"
authors: Chien-Ping Lu
publisher: arXiv (cs.LG) preprint
published: 2025
ingested: 2026-06-06
type: paper
tags: [scenario-analysis, demand-forecasting, machine-learning, bit-demand]
confidence: medium
---

# The Race to Efficiency: A New Perspective on AI Scaling Laws — extracted notes

> 고전적 스케일링 법칙에 시간·효율(efficiency) 차원을 추가한 경제학적 관점의 스케일링 프레임워크.

## 문제/목표
- 고전 스케일링 법칙(Kaplan et al. 2020, Hoffmann et al. 2022)은 고정 compute 예산에서 training loss를 예측하지만 시간과 효율 요인을 무시.
- 효율 향상 없이는 고성능 달성에 비현실적으로 긴 학습 시간 또는 거대한 GPU fleet이 필요해짐 — 이를 정량적으로 다루는 것이 목표.

## 방법론
- relative-loss equation(상대 손실 방정식) 도입: 고전 스케일링 법칙을 시간·효율 인식(time- and efficiency-aware) 프레임워크로 확장.
- "efficiency-doubling rate"(효율 2배 주기) 개념을 Moore's Law와 정렬하여 진보 속도를 분석.

## 핵심 결과
- 지속적 AI 진보는 역사적 속도의 효율 2배 주기 유지에 달려 있음.
- 효율 개선이 역사적 추세로 지속되면 향후 10년간 near-exponential 진보가 가능함을 시사 (비현실적 자원 불필요).

## 메모리 수요 적용점
- AI compute 수요 → HBM/DRAM bit 수요로 연결되는 핵심 매개 변수가 "compute 효율 향상 속도"임을 시사. 효율이 빠르게 개선되면 동일 성능당 필요한 compute(따라서 HBM bit)가 감소 → 메모리 수요 시나리오의 상·하방 리스크 변수.
- 시나리오 분석에서 "효율 doubling rate" 가정을 메모리 bit 수요의 민감도 파라미터로 사용 가능.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://arxiv.org/abs/2501.02156
- https://arxiv.org/html/2501.02156v3
