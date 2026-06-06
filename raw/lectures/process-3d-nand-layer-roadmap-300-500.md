---
source_url: https://www.tomshardware.com/pc-components/storage/inside-the-future-of-3d-nand-the-roadmap-to-500-layers
title: "Inside the Future of 3D NAND — Roadmap to 500 Layers (FMS 2025)"
publisher: Tom's Hardware (Anton Shilov)
published: 2025-08-06
ingested: 2026-06-06
type: lecture
tags: [nand, memory, capacity, bit-demand, demand-forecasting, wafer]
confidence: medium
---

# 3D NAND Layer Roadmap 300 → 500 Layers — extracted notes

> 학습/설명 자료 요약 노트. NAND layer 경쟁과 etch/적층 한계.

## 핵심 개념
- 3D NAND는 셀을 수직 적층 → layer 수가 wafer당 bit(=supply) 성장의 1차 레버.
- layer 증가의 물리 한계: channel hole(채널 홀) 고종횡비 etch가 ~400~500 layer 단일 etch에서 deflection/wafer 변형으로 신뢰성 저하.
- 해법: string/deck stacking(다단 적층), wafer/hybrid bonding(셀-CMOS 분리 후 접합).

## 주요 사실/수치
- 양산 layer 추이: 2023 ~162~238L → 2024 ~218~286L → 2025~2027 300~500L 수렴, interface 4800 MT/s 표준화(2023 2400 MT/s 대비).
- 2027 목표(보고): SK Hynix 500L(V10T/V10Q, 2027 H1), Samsung >400L(V10T, multi-tier stacking), Kioxia/WD >300L, YMTC 300L+.
- 단일 etch로는 셀 구조만일 때 약 500 layer까지 수용 가능 추정 → 그 이상은 bonding 필수.
- die 용량 1Tb·2Tb(특히 QLC) 2026~2027 계획.
- 현재 최고 양산 layer: SK Hynix 321 > Samsung 286 > Micron 276(시점별 변동).

## 메모리 수요 예측 관련성 (bit supply 함의)
- layer 수 증가 = wafer당 bit 증가 = NAND supply 성장의 주 동력(미세화보다 적층 의존).
- 그러나 layer 증가 시 etch step·공정 시간·장비 cost 급증 → layer당 한계 cost 체감 = cost-per-bit 하락 속도 둔화.
- bonding/multi-deck로의 전환은 wafer 처리량(throughput) 저하 → 공급 ramp 속도 제약.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.techinsights.com/blog/3d-nand-technology-roadmap
- https://www.aivon.com/blog/memory-storage-technology/3d-nand-layer-race-300-layers-arrive/
