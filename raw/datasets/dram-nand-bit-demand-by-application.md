---
source_url: https://www.trendforce.com/news/2025/12/26/news-ai-reportedly-to-consume-20-of-global-dram-wafer-capacity-in-2026-hbm-gddr7-lead-demand/
title: "DRAM/NAND 응용처별 bit 수요 비중 (2025-2026)"
publisher: TrendForce / Mordor Intelligence / SNS Insider
published: 2026
ingested: 2026-06-06
type: dataset
data_file: dram-nand-bit-demand-by-application.csv
unit: % (bit share, 근사)
tags: [dram, nand, bit-demand, server, smartphone, pc, demand-forecasting]
confidence: low
---

# DRAM/NAND 응용처별 bit 수요 비중 (2025-2026)

> structural demand model의 응용처 weight 입력용. 정확한 % 공개치가 제한적이라 방향성+근사 비중.

## 컬럼 설명

- `product`: dram / nand
- `application`: 응용처(server_ai, mobile, pc, graphics, enterprise_ssd, client_ssd 등)
- `bit_share_pct_approx`: 해당 제품 내 응용처별 bit 비중 추정(%)
- `trend`: 수요 방향(rising-fast/constrained/declining 등)
- `year`, `confidence`, `source_note`

## 출처/수집 메모

- **비중(%)은 근사·추정치**: TrendForce 등은 방향성("server 우선, mobile/PC 제약")은 명확히 하나 정밀 % 분해는 유료 리포트. `confidence: low`.
- 확인된 정량: AI가 2026 DRAM wafer ~20% 소비, 2026 글로벌 DRAM capacity ~40EB; NAND 스마트폰 2025 점유 41.05%(Mordor), enterprise SSD CAGR 7.42%(최고).
- DRAM 합 100%, NAND 합 100% 되도록 근사 정규화(엄밀 측정 아님).

## 메모리 수요 예측 활용

- structural demand model: 응용처별 (출하량 × 디바이스당 콘텐츠)로 bottom-up 재구성 시 sanity check weight.
- 추세 컬럼은 capacity 재배분(server/AI 우선) 방향 반영 → 시나리오에서 응용처 mix shift 모델링.
- 정밀 % 필요 시 TrendForce/Yole 유료 모니터로 갱신(출처 링크 참조).

## 관련 wiki

- [[bit-demand]] · [[memory-demand]] · [[structural-demand-model]] · [[demand-forecasting]] · [[dram]] · [[nand]]
