---
source_url: https://money.usnews.com/investing/news/articles/2026-05-31/south-korea-export-growth-hits-four-decade-high-as-chip-sales-hit-record-on-ai-boom
title: "한국 반도체 수출 월별 (실시간 메모리 수요 프록시)"
publisher: 산업통상자원부 / Reuters / KED Global / US News
published: 2026-05-31
ingested: 2026-06-06
type: dataset
data_file: korea-semiconductor-exports-monthly.csv
unit: USD billion, %
tags: [dram, nand, hbm, revenue, demand-forecasting, units]
confidence: high
---

# 한국 반도체 수출 월별 (실시간 수요 프록시)

> 한국 수출 통계는 메모리 수요·가격의 **고빈도 선행/동행 프록시**(삼성+SK가 글로벌 HBM ~79%).

## 컬럼 설명

- `period`: 연/월(FY=연간)
- `semiconductor_exports_usd_b`: 반도체 수출액(십억 달러)
- `yoy_pct`: 전년 동기 대비(%)
- `dram_exports_usd_b`, `nand_exports_usd_b`: 품목별 수출(가용 시)
- `note`, `confidence`

## 출처/수집 메모

- 2025년 반도체 수출 **$173.4B(+22.2%)** 기록.
- 2026-05 반도체 수출 **$37.2B(+169.4% YoY)**, 3개월 연속 월간 기록. DRAM **+369.8%→$18.6B**, NAND **+206.8%→$1.7B**.
- 한국 전체 수출 2026-05 $87.75B(+53.2%), 1984-01 이후 최대 증가율.
- 월별 데이터는 산업부 발표로 매월 갱신 가능(고빈도). 본 파일은 핵심 분기점만 기록 → 정기 업데이트 권장.

## 메모리 수요 예측 활용

- 월별 수출 YoY는 분기 실적·가격에 선행하는 nowcasting 입력.
- DRAM/NAND 분해 수출은 품목별 수요 동향의 고빈도 신호.
- 단, 수출액은 물량×가격(ASP) 혼합 → bit demand와 분리하려면 가격 데이터와 결합 필요.

## 관련 wiki

- [[memory-demand]] · [[demand-forecasting]] · [[bit-demand]] · [[dram]] · [[nand]]
