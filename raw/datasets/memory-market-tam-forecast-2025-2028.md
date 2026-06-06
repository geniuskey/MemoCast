---
source_url: https://www.trendforce.com/presscenter/news/20260122-12893.html
title: "메모리 시장 장기 TAM 전망 (2025-2028/2030)"
publisher: TrendForce / Micron / Creative Strategies
published: 2026
ingested: 2026-06-06
type: dataset
data_file: memory-market-tam-forecast-2025-2028.csv
unit: USD billion, %
tags: [dram, nand, hbm, revenue, demand-forecasting, scenario-analysis]
confidence: medium
---

# 메모리 시장 장기 TAM 전망 (2025-2028)

> 장기 수요 시나리오의 상단 앵커. 출처별 정의(메모리 total vs DRAM-only) 구분 필요.

## 컬럼 설명

- `year`, `segment`(dram/nand/hbm/memory_total/datacenter_silicon_total)
- `revenue_usd_b`: 매출(십억 달러)
- `yoy_pct`: 전년 대비(%)
- `source`, `confidence`

## 출처/수집 메모

- **TrendForce**: 메모리 total 2026 **$551.6B** → 2027 peak **$842.7B(+53%)**. 내역: DRAM 2025 $165.7B(+73%), 2026 $404.3B(+144%); NAND 2026 $147.3B(+112%). 2026 DRAM+NAND = $551.6B로 total과 정합.
- **Micron HBM TAM**: 2025 ~$35B → 2028 ~$100B.
- **Creative Strategies**: 가속기+CPU+네트워킹+HBM 합산 datacenter silicon이 2030년경 $900B~$1T → 근사 $950B(`low`).
- 주의: HBM은 DRAM 매출의 부분집합(중복 합산 금지). 시장조사사 "DRAM market size"(예 $128B)와 TrendForce "DRAM revenue"($404B)는 산정방식 상이.

## 메모리 수요 예측 활용

- 2027 peak($842.7B) 가정은 supercycle 정점 시나리오의 정량 기준.
- HBM TAM 2025→2028 약 3배는 HBM bit demand 곡선의 매출 측 검증.
- 출처 간 분산(Gartner $633B, WSTS $804B, TrendForce $551.6B for 2026 memory)은 시나리오 band로 사용 → [[scenario-analysis]].

## 관련 wiki

- [[memory-demand]] · [[demand-forecasting]] · [[scenario-analysis]] · [[hbm]] · [[dram]] · [[nand]]
