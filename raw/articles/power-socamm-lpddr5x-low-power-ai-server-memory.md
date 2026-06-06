---
source_url: https://www.tomshardware.com/tech-industry/samsung-introduces-socamm2-lpddr5x-memory-module-for-ai-data-centers
title: "SOCAMM2 / LPDDR5X memory module for AI data centers — power and bandwidth"
publisher: Tom's Hardware / Samsung / Micron / NVIDIA
published: 2026-03-01
ingested: 2026-06-06
type: article
tags: [dram, ai-server, datacenter, capacity, demand-forecasting]
confidence: medium
---

# SOCAMM / LPDDR5X 저전력 AI 서버 메모리 — extracted notes

> NVIDIA Grace/GB300 향 SOCAMM(LPDDR5X) 모듈의 전력 절감. 전력 제약 환경에서 저전력 메모리 채택이 효율을 높임.

## 핵심 수치
- LPDDR5X SOCAMM 동작 전압 ~1.05V, DDR5 RDIMM 대비 전력 30~35% 절감.
- 일부 자료: SOCAMM이 표준 DDR5 RDIMM 대비 전력 1/3 수준 소비.
- SOCAMM2(Samsung): DDR5 RDIMM 대비 대역폭 2배, 전력 55%+ 절감 주장.
- 용량: 16-die LPDDR5X 적층으로 모듈당 최대 128GB.
- SOCAMM은 NVIDIA 주도 + Micron/Samsung/SK hynix 협업, JEDEC 승인 폼팩터.
- GB300 Grace Blackwell Ultra Superchip 지원. Micron이 2025 양산 선도.
- 전망: 2027년 AI 인퍼런스 메모리의 25~30%를 SOCAMM이 차지(추정).

## 수요/제약 영향
- 저전력 LPDDR 채택이 서버 메모리 서브시스템 전력을 절감 → 전력 제약 데이터센터에서 단위 GW당 더 많은 메모리/컴퓨트 수용.
- DDR5 RDIMM → SOCAMM(LPDDR5X) 전환이 server DRAM 수요 믹스를 변화시킴.

## 메모리 수요 예측 관련성
- 전력당 메모리 용량/대역폭 개선이 "전력-제약" 케이스에서 메모리 비트 수요 상단을 끌어올림.
- LPDDR이 server DRAM(DDR5)과 일부 경쟁/대체 → 비트 수요 카테고리 배분에 영향.
- HBM(대역폭)과 LPDDR(용량·효율)의 역할 분담이 AI 서버 메모리 BOM 구조를 규정.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[demand-forecasting]]

## 추가 출처
- https://semiconductor.samsung.com/news-events/tech-blog/introducing-samsungs-socamm2-new-lpddr-memory-module-empowering-next-generation-ai-infrastructure/
- https://www.trendforce.com/news/2025/03/26/news-micron-unveils-lpddr5-socamm-for-nvidia-gb300-reportedly-ahead-of-rivals/
- https://www.amd.com/en/blogs/2026/a-look-ahead--extending-server-energy-efficiency-with-lpddr5x-me.html
