---
source_url: https://www.servethehome.com/sk-hynix-cxl-2-0-memory-expansion-modules-launched-with-96gb-of-ddr5/
title: "CXL 메모리 확장 2026: SK hynix CMM-DDR5 96GB, 서버 attach rate 30% 전망(2028)"
publisher: ServeTheHome / SK hynix / TradingKey (집계)
published: 2026-03-01
ingested: 2026-06-06
type: article
tags: [dram, server, datacenter, ai-server, demand-forecasting, capacity]
confidence: medium
---

# CXL 메모리 확장 (datacenter) — extracted notes

> CXL이 서버 DRAM capacity를 socket 한계 너머로 확장 → 추가 DDR5 수요 동인.

## 핵심 내용
- **SK hynix CMM-DDR5**: 96GB 모듈, 24Gb DDR5 칩(1anm 공정), EDSFF E3.S 폼팩터, PCIe 5.0 x8.
  - 서버 적용 시 capacity +50%, 기존 DDR5 모듈 대비 대역폭 +30%, 36GB/s 처리.
  - CXL 2.0 기반 96GB CMM-DDR5 고객 validation 완료.
- **Samsung**: CXL 3.2 기반 "Pangea v3"를 2026년 내 출시 계획 (광통신 지원, 단일 포트 대역폭 향상).
- 서버 CXL attach rate: 확장+풀링 포함 **2028년 약 30%** 전망.
- 상용 CXL memory pool 2025년 100TiB 도달, 2026년 더 큰 배치 예정.
- CXMT(중국)도 CXL 메모리 진입 → 경쟁 심화.

## 수요 동인
- CPU socket당 채널 한계로 막힌 메모리 용량을 CXL로 확장 → 서버당 추가 DDR5 탑재.
- AI inference의 대용량 메모리 풀링 수요 → 기존 RDIMM 외 신규 DRAM 수요 창출.
- 데이터센터 아키텍처가 CPU-centric → memory-pooling-centric으로 전환 전망.

## 메모리 수요 예측 관련성
- CXL attach rate(2028년 ~30%)는 서버 DRAM TAM을 socket 한계 이상으로 확장하는 신규 수요 벡터.
- CMM-DDR5는 표준 DDR5 die를 사용 → HBM과 달리 표준 DRAM bit 수요에 직접 가산.

## 관련 wiki
- [[memory-demand]] · [[server-dram]] · [[cxl-memory]] · [[demand-forecasting]]

## 추가 출처
- https://news.skhynix.com/sk-hynix-completes-customer-validation-of-cxl-based-ddr5/
- https://introl.com/blog/cxl-memory-expansion-pooling-disaggregated-memory-ai-data-center-2025
- https://www.tradingkey.com/analysis/stocks/us-stocks/261834990-samsung-sk-hynix-micron-hbm-cxl-pangea-v2-ai-data-center-tradingkey
