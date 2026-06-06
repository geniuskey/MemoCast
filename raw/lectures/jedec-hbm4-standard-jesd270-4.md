---
source_url: https://www.jedec.org/news/pressreleases/jedec%C2%AE-and-industry-leaders-collaborate-release-jesd270-4-hbm4-standard-advancing
title: "JEDEC HBM4 Standard (JESD270-4) — Bandwidth, Efficiency, Capacity"
publisher: JEDEC / Tom's Hardware / EDN
published: 2025-04
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, bit-demand, capacity]
confidence: medium
---

# JEDEC HBM4 Standard (JESD270-4) — extracted notes

> 학습/설명 자료 요약 노트. HBM4 표준 핵심 사양과 의의.

## 핵심 개념
- HBM4 = 6세대 HBM, JEDEC JESD270-4로 2025년 4월 공식 발표.
- 가장 큰 변화: stack당 data interface 1024-bit → 2048-bit doubling. 채널 32개×64-bit.
- 채널 수 2배로 늘려 memory clock은 낮추면서 총 대역폭 증가(전력 효율 개선).
- base/logic die를 logic foundry 공정으로 제작(이전 세대보다 고기능 base die).

## 주요 사실/수치
- 표준 사양: 최대 8 Gb/s × 2048-bit = stack당 최대 2 TB/s.
- 양산 실측 초과: Samsung HBM4 11.7 Gbps / 3.3 TB/s 발표(2026 초 고객 출하 시작).
- SK Hynix 2026 16-Hi HBM4 48GB(2048-bit) 계획. Samsung·SK Hynix·Micron 2026 양산 예상.
- 후속 표준 SPHBM4(Reduced Pin Count로 HBM4급 throughput) JEDEC 준비 중.

## 메모리 수요 예측 관련성
- HBM4 채택은 2026~2027 AI accelerator 세대(Nvidia Rubin 등)와 동기화 → HBM bit demand 급증 동력.
- 2048-bit interface는 interposer/패키징 복잡도 증가 → 패키징(CoWoS) capacity가 HBM 공급 병목.
- base die foundry화로 DRAM 업체-foundry 협업 구조 변화 → 공급 모델에 foundry 변수 추가.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://www.tomshardware.com/pc-components/ram/jedec-finalizes-hbm4-memory-standard-with-major-bandwidth-and-efficiency-upgrades
- https://www.edn.com/jedec-finalizes-hbm4-standard/
- https://www.jedec.org/news/pressreleases/jedec%C2%AE-prepares-sphbm4-standard-deliver-hbm4-level-throughput-reduced-pin-count
