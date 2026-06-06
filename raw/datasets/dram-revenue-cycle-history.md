---
source_url: https://www.statista.com/statistics/271728/global-dram-revenue-since-2nd-quarter-2010/
title: "DRAM 연간 매출 사이클 역사 (2016-2026)"
publisher: Statista / Fortune Business Insights / TrendForce (종합)
published: 2026
ingested: 2026-06-06
type: dataset
data_file: dram-revenue-cycle-history.csv
unit: USD billion (revenue), % (yoy)
tags: [dram, pricing, revenue, demand-forecasting, scenario-analysis]
confidence: low
---

# DRAM 연간 매출 사이클 역사 (2016-2026)

> boom-bust 진폭을 시나리오 캘리브레이션에 사용하기 위한 시계열. 출처 간 정의/시점 차이로 절대값은 근사.

## 컬럼 설명

- `year`: 연도(2026은 low/high 두 행으로 분기)
- `dram_revenue_usd_b`: 연간 DRAM 매출(십억 달러)
- `yoy_pct`: 전년 대비 증감률(%)
- `cycle_phase`: 사이클 국면(supercycle/peak/crash/trough/recovery 등)
- `confidence`: 행별 신뢰도
- `source_note`: 출처·근거·주의사항

## 출처/수집 메모

- **2016-2022 값은 industry-cited 근사치**(TrendForce/Statista 역사 데이터 통념) → `confidence: low`. 정밀 인용 전 1차 데이터 확인 필요.
- 2023은 "2016년 이후 최저 DRAM 매출"(공급과잉)로 trough 확정 — 이번 검색에서 확인.
- 2024 $103.17B, 2025 $121.83B는 Fortune Business Insights 시장조사 기준(일부 소스 ~$92B; 정의 gap).
- **2026은 출처 간 극심한 분산**: 시장조사 보수치 $128.36B vs TrendForce $404.3B(+144%, ASP 주도). 두 행으로 분리해 시나리오 band로 제시.
- 주의: 시장조사사(Fortune BI 등) "DRAM market size"와 TrendForce/WSTS "DRAM revenue/billings"는 산정 방식이 달라 직접 비교 불가.

## 메모리 수요 예측 활용

- peak-to-trough 진폭(2018 $99B → 2023 $48B, 약 -50%)은 bear-case 하방 캘리브레이션.
- 2026 low/high band($128B vs $404B)는 시나리오 불확실성의 정량 표현.
- yoy 진폭이 ASP 변동에 지배됨 → bit demand와 분리해 가격 시나리오로 모델링.

## 관련 wiki

- [[bit-demand]] · [[memory-demand]] · [[demand-forecasting]] · [[scenario-analysis]] · [[dram]]
