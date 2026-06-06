---
source_url: https://www.softwareseni.com/when-will-dram-prices-normalise-analysing-the-timeline-for-memory-market-recovery/
title: "DRAM 공급사 재고(주) 시계열 (2023-2026)"
publisher: TrendForce / SoftwareSeni / DigiTimes / UncoverAlpha
published: 2026
ingested: 2026-06-06
type: dataset
data_file: dram-supplier-inventory-weeks-history.csv
unit: weeks of inventory
tags: [dram, inventory, demand-forecasting, pricing, scenario-analysis]
confidence: medium
---

# DRAM 공급사 재고(주) 시계열 (2023-2026)

> 재고 주수는 가격 turning point의 핵심 선행지표(leading-indicators 파일 연계).

## 컬럼 설명

- `period`, `dram_inventory_weeks`(공급사 재고 주수), `phase`(oversupply/destocking/normal/tightening/shortage), `note`, `confidence`

## 출처/수집 메모

- 2023 초 ~31주(과잉 정점) → 2023Q4 destocking 종료 → 2024 ~10주(정상) → 2024-10 ~12주.
- **2025Q3 3.3주(SK·Micron ~2주), 2025-10 2~4주(-66% YoY)**. 2026-01 Samsung ~6주, SK 2-3주.
- 사이클 phase 라벨 부여(과잉→정상→타이트→부족).

## 메모리 수요 예측 활용

- 재고 주수는 가격에 선행 — 31주(2023)→2~4주(2025말)의 급감이 가격 급등 선행.
- "정상 10~12주" 대비 현재 2~4주 = 극단적 부족 → 가격 상방 시나리오.
- 재고 정상화(다시 10주+)가 turning point 신호 → 시나리오 상태변수.

## 관련 wiki

- [[memory-demand]] · [[demand-forecasting]] · [[scenario-analysis]] · [[bit-demand]] · [[dram]]
