---
source_url: https://www.sciencedirect.com/science/article/abs/pii/S016763770600054X
title: "Inventory management under highly uncertain demand (newsvendor/base-stock)"
authors: (ScienceDirect EJOR/IJPE 계열) + Deep Inventory Management(arXiv 2210.03137)
publisher: ScienceDirect / arXiv / Nature Scientific Reports
published: 2006-2026
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, supply-chain, scenario-analysis, probabilistic-forecasting, inventory]
confidence: medium
---

# Newsvendor / base-stock — 고불확실성 수요 재고관리 — extracted notes

> 메모리처럼 단기 lifecycle·고변동 수요에서 재고/주문 정책의 이론적 기초.

## 문제/목표

- 수요 분포 불확실성 하에서 최적 재고/주문량 결정(과잉/부족 비용 트레이드오프).
- 메모리: 짧은 제품수명(세대전환) + 긴 fab lead time → 전형적 newsvendor 구조.

## 방법론

- **Newsvendor**: 단일기간, critical ratio = Cu/(Cu+Co)로 최적 재고수준.
- **Base-stock / (R,s,Q)**: 다기간, lead time·안전재고 반영.
- Deep Inventory Management(arXiv): 신경망으로 lead time·비정상 수요 하 정책 학습.

## 핵심 결과

- 수요 분포·과부족 비용 비대칭이 최적 재고를 좌우. 부분정보 하 robust 정책 연구.
- 데이터기반(deep) 정책이 고전 newsvendor/base-stock 대비 개선(특정 조건).

## 메모리 수요 예측 적용점

- 공급사·OEM 재고 행태(bullwhip, double-ordering) 모델링의 미시 기초.
- 안전재고·critical ratio로 shortage 시 over-ordering(가수요) 정량화 → [[scenario-analysis]].
- lead time(fab~6개월+)·세대전환 위험을 반영한 주문 정책 시뮬레이션.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- Deep Inventory Management (arXiv): https://arxiv.org/pdf/2210.03137
- Inventory theory (Wikipedia): https://en.wikipedia.org/wiki/Inventory_theory
- (R,s,Q) replenishment (Nature SR 2026): https://www.nature.com/articles/s41598-025-32537-2
