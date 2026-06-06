---
source_url: https://www.nextplatform.com/2025/12/19/hbm-supply-curve-gets-steeper-but-still-cant-meet-demand/
title: "DRAM/NAND bit 성장률·CAGR (장기, bit vs revenue 구분)"
publisher: The Next Platform / Yole / Fortune BI / SNS Insider
published: 2026
ingested: 2026-06-06
type: dataset
data_file: dram-nand-bit-growth-cagr-longrun.csv
unit: % (bit growth / CAGR)
tags: [dram, nand, hbm, bit-demand, demand-forecasting, capacity]
confidence: low
---

# DRAM/NAND bit 성장률·CAGR (장기)

> bit 성장(물량)과 revenue CAGR($, ASP 포함)을 명확히 구분. 수요 예측의 핵심 baseline.

## 컬럼 설명

- `product`, `period`, `bit_growth_pct`, `type`(annual/cagr/cagr_revenue), `note`, `confidence`
- **type 주의**: bit growth(물량) vs cagr_revenue($, ASP 포함)는 전혀 다른 지표.

## 출처/수집 메모

- 2025 bit shipment: DRAM low-20s%, NAND high-teens%. 2026 둘 다 ~20%.
- conventional DRAM 2025-2030 bit CAGR ~3%(Yole), HBM bit ~12%(또는 더 높음, 출처별 상이).
- 시장 revenue CAGR: DRAM 7.2%(2026-2034), NAND 8.51%(2026-2035) — $ 기준(ASP 포함), bit과 혼동 금지.
- 역사적으로 DRAM bit는 연 ~20% 수준 장기 추세였으나 scaling wall로 공급측 bit/wafer 둔화(process- 파일 연계).

## 메모리 수요 예측 활용

- bit demand 예측의 baseline 성장률(~20% 단기, conventional ~3% 장기 vs HBM ~12%).
- bit vs revenue 분리는 [[bit-demand]] 원칙의 핵심 — ASP는 가격 모델로 별도.
- HBM>conventional 성장률 격차가 mix shift(고부가 전환) 정량화.

## 관련 wiki

- [[bit-demand]] · [[memory-demand]] · [[demand-forecasting]] · [[dram]] · [[nand]] · [[hbm]]
