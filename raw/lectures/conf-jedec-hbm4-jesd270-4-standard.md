---
source_url: https://www.jedec.org/news/pressreleases/jedec%C2%AE-and-industry-leaders-collaborate-release-jesd270-4-hbm4-standard-advancing
title: "JEDEC Releases JESD270-4 HBM4 Standard"
publisher: JEDEC
published: 2025-04-21
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, capacity, bit-demand, demand-forecasting]
confidence: high
---

# JEDEC JESD270-4 HBM4 Standard — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- 2025-04 JEDEC가 차세대 고대역폭 메모리 표준 JESD270-4 (HBM4) 공식 발표.
- AI/HPC 워크로드의 급증하는 대역폭·용량 요구 대응이 목적.
- HBM3 대비 인터페이스 폭을 2배로 확장 (1024-bit → 2048-bit per stack).
- HBM3 컨트롤러와 backward compatible 설계.

## 주요 사실/수치
- 인터페이스 폭: 2048-bit (HBM3 1024-bit 대비 2배).
- 핀당 데이터 속도: up to 8 Gb/s.
- 스택당 총 대역폭: up to 2 TB/s.
- 스택 높이: 4-high ~ 16-high.
- DRAM die density: 24 Gb 또는 32 Gb.
- 최대 용량: up to 64 GB per stack (16-high × 32Gb 기준).
- 채널 수: stack당 독립 채널 16 → 32개로 2배 증가, 각 채널은 2개의 pseudo-channel로 분할.
- 표준 기여사: Samsung, Micron, SK hynix 포함 산업 리더.

## 메모리 수요 예측 관련성
- HBM4 표준 확정은 2026~2027 AI 가속기(NVIDIA Vera Rubin 등)용 HBM 비트 수요의 기준점.
- 인터페이스 2배 확장 + 채널 2배 → die 면적당 I/O 증가 → DRAM wafer 소모량(비트 효율 대비 면적) 추정에 핵심 입력.
- 16-high 스택 지원은 placement당 용량 상한을 64GB로 끌어올려, 가속기당 HBM 탑재 비트 증가 시나리오의 상단을 정의.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.tomshardware.com/pc-components/ram/jedec-finalizes-hbm4-memory-standard-with-major-bandwidth-and-efficiency-upgrades
- https://www.trendforce.com/news/2025/04/21/news-jedec-finalizes-hbm4-standard-potentially-easing-pressure-on-hybrid-bonding-adoption/
- https://en.wikipedia.org/wiki/High_Bandwidth_Memory
