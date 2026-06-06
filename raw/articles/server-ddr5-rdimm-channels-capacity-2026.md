---
source_url: https://www.amd.com/content/dam/amd/en/documents/epyc-business-docs/datasheets/amd-epyc-9005-series-processor-datasheet.pdf
title: "서버 DDR5 RDIMM 구성: socket당 12채널, 최대 6TB, 단일 모듈 256GB"
publisher: AMD / Kingston / Lenovo Press (집계)
published: 2025-01-01
ingested: 2026-06-06
type: article
tags: [dram, server, datacenter, demand-forecasting, capacity, bit-demand]
confidence: high
---

# 서버 DDR5 RDIMM 채널·용량 — extracted notes

> 서버 1대당 DRAM 탑재 용량 결정 구조(채널 수 × 모듈 밀도). server DRAM bit 수요의 단위 콘텐츠.

## 핵심 내용
- **AMD EPYC 9005 (Turin)**: socket당 **DDR5 12채널**, 최대 **6TB/socket**, 속도 6000~6400 MT/s.
  - socket당 12 또는 24 모듈 구성(최대 대역폭), RDIMM, ECC(x72/x80).
  - 단일 모듈 용량 **최대 256GB**.
- **Intel Xeon 6th Gen (Granite Rapids)**: socket당 **12채널**, DDR5-6400 RDIMM, MR-DIMM은 DDR5-8800 지원.
- 2P 서버 예시: 24×64GB DDR5-6400 RDIMM = **총 1.5TB**. 256GB 모듈 24개 시 socket당 6TB → 2P 최대 12TB급.
- 저가 SP5 보드는 8채널만 제공(풀 12채널 대비 용량/대역폭 감소).
- (참고) SK hynix: 64GB RDIMM, 256GB 3DS RDIMM, 96GB MRDIMM 등 고밀도 라인업.

## 수요 동인
- DDR4(8채널) → DDR5(12채널) 전환으로 socket당 채널 +50% → 서버당 DRAM 용량 구조적 증가.
- AI inference용 고용량 RDIMM(128/256GB) 채택 확대 → 서버당 GB 급증.

## 메모리 수요 예측 관련성
- 서버 DRAM bit = 서버 출하량 × (socket 수 × 채널 수 × 모듈 밀도). 채널 8→12 전환은 출하 증가 없이도 +50% 용량.
- 모듈 밀도(64→128→256GB) 상향이 서버당 GB의 핵심 레버.
- MRDIMM/3DS RDIMM은 단가 mix 상향 + capacity 소모 가중.

## 관련 wiki
- [[memory-demand]] · [[server-dram]] · [[ai-server-memory]] · [[demand-forecasting]]

## 추가 출처
- https://www.kingston.com/en/memory/server-memory/turin
- https://lenovopress.lenovo.com/lp2283-balanced-memory-configurations-with-5th-generation-amd-epyc-processors
- https://www.phoronix.com/review/8-12-channel-epyc-9005
- https://news.skhynix.com/mwc-2026/
