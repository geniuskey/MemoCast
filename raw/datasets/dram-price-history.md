---
source_url: https://www.trendforce.com/price/dram/dram_spot
title: "DRAM 가격 추이 (스팟/계약, 연도별)"
publisher: TrendForce / DRAMeXchange / Jukan (X)
published: 2025-12-01
ingested: 2026-06-06
type: dataset
data_file: dram-price-history.csv
unit: USD (per chip; 8Gb/16Gb density 명시)
tags: [dram, pricing]
confidence: low
---

# DRAM 가격 추이 (스팟/계약, 연도별)

## 컬럼 설명
- year: 연도
- product: 제품/밀도 (8Gb DDR4, 16Gb DDR5 등). 세대 전환으로 기준 밀도가 바뀜에 유의
- metric: 가격 종류 (spot/contract, 특정 시점)
- value_usd: 칩당 USD 가격
- notes: 출처 및 추정/보간 여부

## 출처/수집 메모
- 2025년 후반 스팟 가격(16Gb DDR5 6.84 -> 24.83 -> 27.20 USD)은 TrendForce 스팟 데이터와 Jukan(X) 정리 트윗에서 인용한 실측치.
- 2017~2024 계약 가격은 과거 DRAMeXchange/TrendForce 사이클 데이터에 기반한 **근사치(approximate)**이며 정확한 월별 계약가가 아님. confidence: low.
- 세대(8Gb DDR4 vs 16Gb DDR5)와 가격 종류(spot vs contract)가 섞여 있으므로 시계열 직접 비교 시 단위/밀도 정규화 필요.
- 2025년 AI발 급등으로 DDR5/DDR4 모두 사상 최고 수준 도달.

## 메모리 수요 예측 활용
- 가격 사이클(2017-18 고점, 2019-20 저점, 2021 반등, 2023 저점, 2025 급등)은 공급/수요 불균형의 후행 지표.
- 가격 급등 구간은 capex 증가와 bit supply 확대의 선행 신호로 활용 가능.

## 관련 wiki
- [[bit-demand]] · [[memory-demand]] · [[demand-forecasting]]
