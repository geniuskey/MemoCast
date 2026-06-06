---
source_url: https://www.trendforce.com/news/2026/05/06/news-jedec-nears-2nd-gen-mrdimm-as-cpus-demand-more-bandwidth-samsung-sk-hynix-reportedly-accelerate-push/
title: "MRDIMM / MCRDIMM / SOCAMM 모듈 (AI 서버 고대역폭)"
publisher: JEDEC / Micron / Samsung / TrendForce / TweakTown
published: 2026
ingested: 2026-06-06
type: lecture
tags: [dram, server, ai-server, capacity, demand-forecasting, bit-demand]
confidence: medium
---

# MRDIMM / MCRDIMM / SOCAMM 모듈 — extracted notes

> 서버 DRAM 모듈 형태(MRDIMM 등)가 서버당 메모리 대역폭/용량을 결정 → server DRAM 수요 mix.

## 핵심 개념

- **MRDIMM(Multiplexed Rank DIMM)**: on-DIMM multiplexer로 2개 DDR5 rank를 결합, 표준 DDR5 초과 속도. RDIMM 대비 effective 대역폭 +39%, bus 효율 +15%, latency 최대 -40%.
- **MCRDIMM(Samsung)**: 2개 DDR5 컴포넌트 결합, 최대 8.8Gb/s, 슬롯 증설 없이 용량·대역폭 2배.
- **SOCAMM/LPCAMM**: LPDDR 기반 저전력 모듈(AI 서버 inference, NVIDIA GB300).

## 주요 사실/수치

- **JEDEC MRDIMM Gen2 12,800 MT/s**(Gen1 대비 +45%), Gen3 17,600 MT/s 목표. multiplexed rank 데이터버퍼/클록드라이버 표준.
- 지원 CPU 제한적(Intel Xeon 6 등). Samsung·SK hynix push 가속.

## 메모리 수요 예측 관련성

- MRDIMM/MCRDIMM 채택은 서버당 DRAM capacity·고부가 모듈 비중 상승 → server DRAM 매출·bit 수요 mix shift.
- SOCAMM(LPDDR) 확산은 server에 LPDDR 수요 신규 유입 → DRAM 유형별(LPDDR vs DDR5) 수요 재배분.
- 모듈 buffer/RCD/DB 수요(별도 ip- 파일)와 연결.

## 관련 wiki

- [[dram]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처

- Micron MRDIMM: https://www.micron.com/products/memory/dram-modules/mrdimm
- Samsung MCRDIMM: https://semiconductor.samsung.com/news-events/tech-blog/innovative-memory-solution-samsungs-mcrdimm-targets-high-performance-computing/
- TweakTown MRDIMM Gen2: https://www.tweaktown.com/news/111452/jedec-pushes-ddr5-server-memory-to-12800-mt-s-with-new-mrdimm-gen2-standard-for-ai-and-data-center-workloads/index.html
