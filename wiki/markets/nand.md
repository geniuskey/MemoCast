---
title: NAND SSD
created: 2026-06-06
updated: 2026-06-06
type: market
tags: [nand, ssd, storage, demand-forecasting]
sources: [raw/reports/trendforce-qlc-enterprise-ssd-nearline-hdd-2026.md, raw/articles/storage-enterprise-ssd-qlc-nand-demand-2026.md, raw/reports/trendforce-2026-memory-price-forecast.md, raw/datasets/nand-cost-per-bit-trend.md]
confidence: medium
---

# NAND SSD

NAND SSD 수요는 SSD 출하량과 SSD당 평균 NAND capacity가 결합되어 만들어지는 capacity/bit demand입니다. MemoCast에서는 먼저 Client SSD, Enterprise SSD, AI/Data-center SSD를 분리해 segment mix가 총 NAND 수요를 어떻게 바꾸는지 추적합니다.

## 핵심 공식

```text
segment NAND demand = SSD shipments × segment share × average NAND TB/SSD

total NAND SSD demand = Σ segment NAND demand

weighted average NAND TB/SSD = Σ(normalized segment share × average NAND TB/SSD)
```

## 2026 source-backed market context

새로 추가된 raw 자료는 NAND 수요의 무게중심이 mobile/client에서 datacenter/enterprise SSD로 이동하고 있음을 강하게 시사합니다.

- TrendForce QLC enterprise SSD 자료는 nearline HDD lead time이 수 주에서 52주 초과로 늘었고, 2Tb QLC chip 양산과 122TB/245TB급 enterprise SSD product focus가 2026년 breakout을 만들 수 있다고 설명합니다.^[[TrendForce — TrendForce — QLC Enterprise SSD Breakout 2026 as Nearline HDD Shortage Bites](https://www.trendforce.com/presscenter/news/20250915-12714.html)]
- Enterprise SSD/QLC NAND 자료는 2026년 데이터센터가 NAND 최대 시장으로 부상하고, enterprise SSD 수요 +41%, enterprise SSD 매출이 consumer 매출을 추월하는 원년이 될 수 있다고 정리합니다.^[[Tom's Hardware / Futurum / Solidigm / Avnet — Enterprise SSD / QLC NAND demand 2026 — eSSD>consumer, HDD shortage→flash](https://www.tomshardware.com/pc-components/hdds/ai-triggers-hard-drive-shortage-amidst-dram-squeeze-enterprise-hard-drives-on-backorder-by-2-years-as-hyperscalers-switch-to-qlc-ssds)]
- TrendForce memory forecast는 NAND Flash 2026 revenue를 약 US$147.3B, YoY +112%로 전망하고, AI storage 수요와 HDD 공급 부족으로 CSP가 enterprise SSD 주문을 재배치한다고 설명합니다.^[[TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html)]

## Segment 구조

| Segment | 의미 | 주요 수요 driver |
| --- | --- | --- |
| Client SSD | 노트북/데스크톱/consumer SSD | PC 출하량, SSD attach rate, 평균 용량 |
| Enterprise SSD | 서버/스토리지 어레이용 SSD | 데이터센터 CAPEX, HDD 대체, enterprise workload |
| AI/Data-center SSD | AI 학습/추론 파이프라인 주변 고용량 SSD | GPU cluster scale, checkpoint/cache/dataset staging, KV cache offload |

## 주요 driver

- SSD 출하량 또는 installed base 증가
- HDD에서 SSD로의 전환
- Client PC 평균 저장 용량 상승
- Enterprise SSD와 data-center SSD mix 확대
- TLC/QLC 채택률 변화에 따른 cost-per-bit와 평균 용량 변화
- 122TB/245TB/256TB급 ultra-high-capacity QLC SSD mix
- Inventory correction과 NAND 가격 사이클

## Simulator implication

현재 `[[nand-ssd-demand]]` 시뮬레이터의 preset은 source-backed market forecast가 아니라, segment mix와 평균 capacity 가정이 총 NAND bit demand를 어떻게 바꾸는지 보여주는 illustrative scenario입니다. 다만 새 raw 자료는 enterprise/AI-storage mix를 상방 시나리오의 핵심 변수로 격상합니다.

출처 기반 기준값으로 격상하려면 다음 raw 자료가 더 필요합니다.

- Client/enterprise SSD shipment 또는 capacity shipped 시계열
- Enterprise SSD 평균 용량 또는 capacity mix 자료
- QLC/TLC 채택률 자료
- 데이터센터 storage CAPEX 또는 nearline HDD/SSD 전환 자료

## 관련 문서

- [[memory-demand]]
- [[bit-demand]]
- [[structural-demand-model]]
- [[sensitivity-analysis]]
- [[nand-ssd-demand]]
- [[supply-demand-gap]]
## Evidence checklist

| Forecast question | Primary raw evidence | How to use it |
| --- | --- | --- |
| Enterprise SSD breakout | [Tom's Hardware / Futurum / Solidigm / Avnet — Enterprise SSD / QLC NAND demand 2026 — eSSD>consumer, HDD shortage→flash](https://www.tomshardware.com/pc-components/hdds/ai-triggers-hard-drive-shortage-amidst-dram-squeeze-enterprise-hard-drives-on-backorder-by-2-years-as-hyperscalers-switch-to-qlc-ssds) | Use +41% enterprise SSD demand and eSSD > consumer revenue as directional anchors. |
| HDD → QLC SSD substitution | [TrendForce — TrendForce — QLC Enterprise SSD Breakout 2026 as Nearline HDD Shortage Bites](https://www.trendforce.com/presscenter/news/20250915-12714.html) | Treat nearline HDD lead-time shock as a NAND TAM-expansion trigger. |
| NAND revenue / ASP | [TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html) | Separate NAND bit demand from revenue because shortage/pricing can dominate. |
| Mobile NAND content | [TrendForce — 2026년 평균 스마트폰 저장 용량 +4.8% 성장, AI 업그레이드가 NAND 견인](https://www.trendforce.com/presscenter/news/20260323-12983.html) | Use smartphone storage +4.8% YoY as mobile NAND content context, not SSD demand. |

## Citation notes

NAND wiki pages should keep client SSD, enterprise SSD, AI/datacenter SSD, and smartphone NAND as separate demand pools. Mixing them hides the QLC enterprise inflection.

