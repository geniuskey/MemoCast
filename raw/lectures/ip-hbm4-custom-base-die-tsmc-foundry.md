---
source_url: https://www.eetimes.com/the-state-of-hbm4-chronicled-at-ces-2026/
title: "HBM4 Custom Base Die / Logic Die — TSMC Foundry & Memory Makers"
publisher: EE Times / TrendForce
published: 2026-01
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, capacity, demand-forecasting]
confidence: medium
---

# HBM4 Custom Base Die (Logic Die) & TSMC Foundry — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- HBM4의 핵심 변화: stack 최하단 base die(logic die)가 단순 buffer에서 advanced logic node로 제작되는 "custom base die"로 전환.
- Base die는 stack의 control logic(두뇌) 역할 → command/data 분리, RAS, PHY 등을 포함. 고객별 customization으로 IP/foundry 가치사슬이 메모리에 진입.
- 3사 전략 분기: 자체 foundry(Samsung) vs TSMC 위탁(SK hynix, Micron).

## 주요 사실/수치
- SK hynix: TSMC와 협업, HBM4 base die에 12nm logic 적용. HBM4E logic die는 TSMC 3nm 검토 중 (vs Samsung 차별화).
- Samsung: 자사 foundry 4nm로 logic die 제작 + 3D packaging까지 turnkey(silicon~패키징 일괄). HBM5는 Samsung Foundry 2nm base die 계획.
- Micron: HBM4E base logic die를 TSMC에 위탁, 2027년 양산 목표.
- Samsung custom HBM4E 설계: 2026년 5~6월 완료 목표 (SK hynix/Micron도 유사 일정).
- 업계 일정: HBM4E 2027년, HBM5 2029년 예상.

## 메모리 수요 예측 관련성
- Custom base die가 TSMC advanced node로 이동 → HBM 생산 capacity가 DRAM fab뿐 아니라 foundry(logic) capacity에도 종속 (이중 병목).
- NVIDIA Rubin 등 차세대 accelerator의 HBM4 채택이 base die 양산 일정에 의해 gating → AI HBM 수요 timing 예측의 핵심 변수.
- Base die customization은 메모리 ASP 상승 요인 (logic 부가가치 추가) → 메모리 매출/bit 가격 mix에 영향.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.trendforce.com/news/2026/03/20/news-sk-hynix-reportedly-weighs-tsmc-3nm-for-hbm4e-logic-dies-to-gain-edge-over-samsung/
- https://www.trendforce.com/news/2026/01/23/news-samsungs-custom-hbm4e-design-reportedly-aimed-for-mid-2026-parallels-sk-hynix-and-micron/
- https://www.viksnewsletter.com/p/faster-phy-design-in-custom-hbm
- https://www.nomadsemi.com/p/deep-dive-on-hbm
