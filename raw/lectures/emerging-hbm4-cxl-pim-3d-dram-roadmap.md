---
source_url: https://en.wikipedia.org/wiki/High_Bandwidth_Memory
title: "HBM4 spec / CXL pooling / PIM / HBM5 roadmap"
publisher: JEDEC / Micron / Samsung / Rambus / Cadence (multi-source)
published: 2025-04
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, capacity, demand-forecasting, bit-demand]
confidence: medium
---

# HBM4 / CXL / PIM / 차세대 메모리 로드맵 — extracted notes

> 아키텍처 변화가 장기 메모리 bit 수요 구조를 바꾸는 지점.

## HBM4 (JEDEC 2025-04 표준)

- **2048-bit 인터페이스**, 최대 **8Gb/s/pin**, stack당 최대 **2TB/s**, 스택 높이 4~16-Hi, DRAM die 밀도로 최대 **64GB/stack**.
- Samsung·Micron·SK hynix 공동 표준화.
- 벤더 고성능판: **Micron HBM4** 2048-pin, >11Gbps, stack당 >2.8TB/s.

## HBM5 (2029 전망)

- I/O 폭 2배 **4096-bit**, on-stack L3 cache, CXL/LPDDR-style 인터페이스로 memory pooling 통합 전망.

## CXL memory pooling

- CXL로 memory expander/pooling/sharing → 서버 메모리 capacity 유연 확장.
- 수요 net effect 양면: pooling이 stranded memory를 줄여 효율↑(수요 감소 압력) vs 신규 메모리 계층 창출(수요 증가).

## PIM (Processing-in-Memory)

- HBM-PIM: 기존 가속기 대비 시스템 성능 2배+, 에너지 70%+ 절감(CPU-GPU-메모리 간 데이터 이동 감소).

## 3D DRAM / 스택

- HBM은 3D-stacked DRAM으로 수직 적층해 memory bottleneck 완화. 3D DRAM 셀 자체 전환은 conventional DRAM scaling 한계 대응책.

## 메모리 수요 예측 관련성

- HBM stack당 capacity·대역폭 상승 = 가속기당 HBM GB 증가 → bit demand 상방.
- CXL은 수요에 양방향 영향 → 시나리오에서 별도 변수로 분리.
- PIM/아키텍처 전환은 bit/연산 효율을 바꿔 장기 수요 탄력성에 영향.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[dram]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처

- Micron HBM4: https://www.micron.com/products/memory/hbm/hbm4
- Samsung HBM4: https://semiconductor.samsung.com/dram/hbm/hbm4/
- Rambus HBM guide: https://www.rambus.com/blogs/hbm3-everything-you-need-to-know/
- Cadence HBM4E: https://www.cadence.com/en_US/home/tools/silicon-solutions/protocol-ip/memory-interface-and-storage-ip/hbm-phy/hbm4e.html
