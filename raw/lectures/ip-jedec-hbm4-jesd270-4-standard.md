---
source_url: https://www.jedec.org/news/pressreleases/jedec%C2%AE-and-industry-leaders-collaborate-release-jesd270-4-hbm4-standard-advancing
title: "JEDEC HBM4 Standard (JESD270-4) — 2048-bit, 32 Channels, up to 64GB/Stack"
publisher: JEDEC
published: 2025-04-17
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, capacity, demand-forecasting]
confidence: high
---

# JEDEC HBM4 Standard (JESD270-4) — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- HBM4 = JEDEC JESD270-4, 2025-04-17 공식 발표. 차세대 generative AI / HPC / advanced graphics / data center용 표준.
- 가장 큰 구조 변화: 인터페이스 폭 2배(1024→2048-bit), stack당 독립 channel 16→32개(각 channel은 2 pseudo-channel 포함).
- Command bus와 data bus 분리 → latency 감소, concurrency 증가 (AI/HPC에 유리). 이 분리가 custom logic base die 필요성을 키움.

## 주요 사실/수치
- 인터페이스: 2048-bit, 핀당 최대 8 Gb/s → stack당 총 bandwidth 최대 2 TB/s.
- Stack 구성: 4/8/12/16 DRAM layer 지원. die density 24Gb 또는 32Gb.
- 최대 용량: 16-high × 32Gb die → single stack 최대 64GB.
- 전압: vendor-specific VDDQ (0.7/0.75/0.8/0.9V), VDDC (1.0/1.05V) → 저전력·고효율.

## 메모리 수요 예측 관련성
- 2 TB/s/stack, 64GB/stack 스펙은 GPU/accelerator당 탑재 HBM bit 수요를 직접 결정 (예: 8-stack 시스템 → 최대 512GB, 16 TB/s).
- 32Gb die 채택은 DRAM wafer당 bit 산출과 capacity 계획의 핵심 변수.
- 표준 핀 속도(8 Gb/s)는 controller/PHY IP가 overclock(10~16 Gbps)으로 초과 달성 → 표준 대비 실제 출하 속도 bin의 상향 여지.
- 16-high 스택은 TSV/본딩 난이도 상승 → 수율이 HBM 공급 capacity의 제약.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.hpcwire.com/off-the-wire/jedec-releases-hbm4-standard-to-advance-ai-and-hpc-memory/
- https://www.tomshardware.com/pc-components/ram/jedec-finalizes-hbm4-memory-standard-with-major-bandwidth-and-efficiency-upgrades
- https://www.electronicsweekly.com/news/products/memory/jedec-hbm4-high-bandwidth-memory-standard-addresses-next-gen-ai-hpc-2025-04/
