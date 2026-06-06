---
source_url: https://www.jedec.org/news/pressreleases/jedec%C2%AE-releases-new-lpddr6-standard-enhance-mobile-and-ai-memory-performance
title: "JEDEC LPDDR6 Standard (JESD209-6) — up to 14,400 MT/s"
publisher: JEDEC
published: 2025-07-09
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, demand-forecasting]
confidence: high
---

# JEDEC LPDDR6 Standard (JESD209-6) — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- LPDDR6 = JEDEC JESD209-6, 2025-07-09 발표. mobile + AI(edge·data center) 메모리 성능 향상 목표.
- 구조 변화: dual sub-channel + 작은 access granularity(32 byte). DDR5 대비 4×24-bit sub-channel로 latency↓, concurrency↑.
- DVFSL(Dynamic Voltage Frequency Scaling for Low Power) 등 전력 절감 기능 추가, 동작 전압 하향.

## 주요 사실/수치
- peak data rate: 10,667–14,400 MT/s (약 28.5–38.4 GB/s).
- 최대 대역폭: 64-bit bus에서 38.4 GB/s → LPDDR5 초기 대비 2배.
- IP 대응: Cadence가 업계 최초 LPDDR6/5X 14.4 Gbps memory IP tapeout; Synopsys는 TSMC N2P에서 LPDDR6 IP bring-up(최대 86 GB/s).

## 메모리 수요 예측 관련성
- LPDDR6의 고대역폭·저전력 특성은 LPDDR을 mobile을 넘어 AI server/edge의 HBM 보완 메모리로 끌어올림 → server DRAM 수요 mix 변화.
- 14.4 Gbps 표준 상한이 controller/PHY IP와 함께 차세대 AP/AI SoC의 LPDDR bit 수요를 견인.
- 작은 32B granularity는 AI inference의 random access 효율을 높여 LPDDR 채택 동기를 강화.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.tomshardware.com/pc-components/dram/jedec-publishes-first-lpddr6-standard-new-interface-promises-double-the-effective-bandwidth-of-current-gen
- https://www.storagenewsletter.com/2025/07/10/jedec-published-jesd209-6-lpddr6-standard-to-enhance-mobile-and-ai-memory-performance/
- https://www.microcontrollertips.com/what-is-jesd209-6-and-why-is-it-important-for-edge-ai/
