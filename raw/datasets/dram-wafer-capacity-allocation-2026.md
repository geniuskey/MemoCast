---
source_url: https://www.trendforce.com/news/2025/12/26/news-ai-reportedly-to-consume-20-of-global-dram-wafer-capacity-in-2026-hbm-gddr7-lead-demand/
title: "DRAM wafer capacity 배분·환산계수 (2026)"
publisher: TrendForce / Tom's Hardware / KAD
published: 2026
ingested: 2026-06-06
type: dataset
data_file: dram-wafer-capacity-allocation-2026.csv
unit: % (share), x (multiple)
tags: [dram, hbm, capacity, wafer, bit-demand, demand-forecasting]
confidence: medium
---

# DRAM wafer capacity 배분·환산계수 (2026)

> "wafer 환산" 모델의 핵심 계수: HBM/GDDR이 bit당 더 많은 wafer 소비 → 유효 공급 잠식.

## 컬럼 설명

- `segment`, `metric`(output_share/revenue_share/wafer_multiple 등), `value_pct`(% 또는 배수), `note`, `confidence`

## 출처/수집 메모

- HBM: output ~8%(bit 기준)이나 revenue >30%(2026). AI equivalent wafer 소비 ~20%.
- **환산계수**: HBM3E ~3x DDR5(동일 노드), 1GB HBM ~4x standard DRAM, GDDR7 ~1.7x.
- OpenAI-Microsoft 딜이 글로벌 DRAM wafer의 ~35-40%(HBM+LPDDR+ECC) 차지 추정(`low`).

## 메모리 수요 예측 활용

- **유효 공급(bit) = wafer capacity / 환산계수**. HBM 비중↑ → 동일 wafer로 conventional bit 공급 감소.
- 공급 모델에서 제품별 wafer 환산(HBM 3-4x, GDDR7 1.7x)으로 "wafer cannibalization" 정량화.
- output share(8%) vs revenue share(30%) gap은 HBM ASP 프리미엄 = 가격 시나리오 입력.

## 관련 wiki

- [[bit-demand]] · [[memory-demand]] · [[hbm]] · [[dram]] · [[demand-forecasting]] · [[structural-demand-model]]
