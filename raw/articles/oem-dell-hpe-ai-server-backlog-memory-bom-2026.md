---
source_url: https://newsletter.semianalysis.com/p/gb200-hardware-architecture-and-component
title: "Dell/HPE AI Server Backlog + GB200 NVL72 Memory BOM"
publisher: SemiAnalysis / Dell / HPE / Futurum
published: 2026-XX-XX
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, server, demand-forecasting, bit-demand]
confidence: medium
---

# Dell/HPE AI 서버 백로그 & GB200 메모리 BOM 2026 — extracted notes

> 서버 OEM(Dell/HPE)의 AI 서버 매출/백로그와 GB200 NVL72 랙당 메모리 콘텐츠 원천 노트.

## 핵심 수치
- Dell: FY26에 AI 최적화 서버 $25B+ 출하, FY27 진입 백로그 $43B(기록적), FY27 AI 서버 매출 전망 $60B로 상향
- HPE: AI 시스템 백로그 $6.3B, AI 인프라 매출 YoY +52%; 분기 매출 $10.7B(+40%)
- GB200 NVL72 랙 메모리 구성:
  - 72 x B200 GPU + 36 x Grace CPU
  - 통합 GPU 메모리(HBM3e) 13.4TB
  - 시스템 DDR5(LPDDR5X via Grace) 약 17TB
  - Bianca(Grace+2 Blackwell) 보드당 약 480GB
- 일반 AI 서버(멀티 가속기): DDR5 시스템 RAM 2-4TB; 기본 128-256GB 시작
- GB200 랙 시스템 가격 약 $2-3M, NVIDIA 칩당 $30-40k; BOM은 메모리·패키징 비중 큼
- Micron 256GB DDR5 RDIMM 9200 MT/s (현 모듈 대비 +40%) → AI 서버용

## 수요 동인 (OEM별)
- Dell/HPE 백로그(Dell $43B, HPE $6.3B)는 AI 서버 = 메모리 수요의 선행 파이프라인
- 랙당 HBM 13.4TB + DDR5 17TB → AI 서버 1랙이 일반 서버 수백 대분 메모리 소비
- 256GB RDIMM 등 고용량 모듈 채택 = 서버당 DDR5 콘텐츠 상향

## 메모리 수요 예측 관련성
- Dell FY27 $60B / HPE 백로그 → AI 서버 출하 모델링 시 랙당 HBM 13.4TB·DDR5 17TB로 비트 수요 환산 가능
- HBM(가속기) + DDR5(시스템) 이중 콘텐츠 → 두 비트 수요 풀 동시 견인
- 고용량 RDIMM 전환은 서버 DRAM 비트 수요의 콘텐츠 측 상방

## 관련 wiki
- [[memory-demand]] · [[demand-forecasting]]

## 추가 출처
- https://infotechlead.com/networking/hpe-revenue-jumps-40-to-10-7-bn-as-ai-backlog-hits-6-3-bn-and-networking-soars-148-96225
- https://www.spheron.network/blog/nvidia-gb200-nvl72-guide/
- https://wccftech.com/micron-doubles-down-on-ai-memory-256-gb-ddr5-rdimms-hitting-9200-mtps/
- https://www.sec.gov/Archives/edgar/data/0001571996/000157199626000003/exhibit991earnings8kq4fy26.htm
