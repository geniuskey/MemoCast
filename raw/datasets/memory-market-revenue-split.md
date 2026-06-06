---
source_url: https://www.trendforce.com/presscenter/news/20240722-12228.html
title: "메모리 시장 매출 분할 (DRAM/NAND/HBM, 연도별)"
publisher: TrendForce / Blocks & Files (종합)
published: 2025-11-26
ingested: 2026-06-06
type: dataset
data_file: memory-market-revenue-split.csv
unit: billion USD
tags: [dram, nand, hbm, revenue]
confidence: medium
---

# 메모리 시장 매출 분할 (DRAM/NAND/HBM, 연도별)

## 컬럼 설명
- year: 연도
- segment: DRAM / NAND / HBM
- revenue_billion_usd: 매출(10억 USD)
- notes: 출처/추정 표시

## 출처/수집 메모
- DRAM: 2024 $90.7B(+75%), 2025 $136.5B(+51%)는 TrendForce 확정 보도. 2021-2023은 사이클 기반 **근사치**.
- NAND: 2023 2016년 이후 최저, 2024 $68B(사상 최고)는 Blocks & Files. 2021/2022는 근사치.
- HBM: DRAM 매출에 일부 포함되는 하위 카테고리로, 별도 표기 값은 hbm-market-size 데이터셋과 교차검증 필요(기관별 정의 차이로 편차 큼) — 일부 추정.
- HBM은 DRAM 매출에 포함되므로 DRAM + HBM 단순 합산 시 이중계상 주의.

## 메모리 수요 예측 활용
- 세그먼트별 매출 비중 변화(NAND 대비 DRAM, DRAM 내 HBM 비중)는 수요 구조 전환(AI 중심)을 보여줌.
- HBM 비중 급증은 일반 DRAM capacity 잠식 -> 범용 DRAM 가격 상승 압력의 정량 근거.

## 관련 wiki
- [[bit-demand]] · [[memory-demand]] · [[demand-forecasting]]
