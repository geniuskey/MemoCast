---
source_url: https://news.skhynix.com/sk-hynix-starts-mass-production-of-world-first-321-high-nand/
title: "SK hynix 321-Layer NAND — Triple-Stack (Three-Plug) String Stacking"
publisher: SK hynix Newsroom / Tom's Hardware (compiled)
published: 2024-11-21
ingested: 2026-06-06
type: lecture
tags: [nand, memory, capacity, bit-demand, wafer]
confidence: high
---

# SK hynix 321-Layer NAND — String Stacking — extracted notes

> 학습/설명 자료 요약 노트. string(deck) stacking으로 layer 한계를 넘는 방식.

## 핵심 개념
- string stacking(= deck stacking): 한 번에 etch 가능한 layer 한계를 넘기 위해 약 100단 deck를 여러 번 쌓아 연결(plug 접합).
- SK Hynix는 triple-stack("three-plugs") 기술로 ~100단 deck 3개를 연결 → 321단 구현.
- deck마다 channel hole 정렬(overlay)이 critical → bonding/정렬 정밀도가 yield 결정.

## 주요 사실/수치
- SK Hynix 321-layer NAND: 세계 최초 양산 발표 2024-11-21, 1Tb TLC(3 bit/cell), 고객 공급 2025 H1.
- 적층 구성(보고): ~120 + 110 + 91 layer triple stack 등 deck 분할.
- 동급 양산 layer 비교: SK Hynix 321 > Samsung 286 > Micron 276.
- 차세대 SK Hynix V10: 500 layer(TLC V10T / QLC V10Q) 2027 H1 목표.

## 메모리 수요 예측 관련성 (bit supply 함의)
- 321→500 layer = wafer당 bit 추가 성장 동력 → NAND supply 증가 핵심 경로.
- 그러나 deck 추가마다 공정 step·시간 급증 → wafer throughput↓, layer당 한계 bit 이득 체감.
- 100TB+ SSD를 가능케 해 enterprise/AI storage 수요 흡수 → demand측에도 영향.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://news.skhynix.com/sk-hynix-showcases-samples-of-worlds-first-321-layer-nand/
- https://www.tomshardware.com/pc-components/storage/sk-hynix-announces-production-of-its-321-layer-nand-flash-shipments-will-start-in-the-first-half-of-2025
- https://blocksandfiles.com/2024/11/21/3-plugs-gets-sk-hynix-mass-producing-321-layer-nand/
