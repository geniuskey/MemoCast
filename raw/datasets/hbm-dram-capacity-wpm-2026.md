---
source_url: https://www.trendforce.com/news/2025/12/30/news-samsung-reportedly-plans-50-hbm-capacity-surge-in-2026-spotlight-on-hbm4/
title: "HBM/DRAM capacity (wpm)·점유율 (2026)"
publisher: TrendForce / TweakTown / DCD / Introl
published: 2026
ingested: 2026-06-06
type: dataset
data_file: hbm-dram-capacity-wpm-2026.csv
unit: wafers per month (wpm), %
tags: [hbm, dram, capacity, wafer, demand-forecasting, bit-demand]
confidence: medium
---

# HBM/DRAM capacity (wpm)·점유율 (2026)

> wpm 단위 capacity는 wafer 환산계수(별도 dataset)와 결합해 bit 공급으로 변환.

## 컬럼 설명

- `company`/`metric`, `value`, `unit`(wpm/pct), `period`, `note`, `confidence`

## 출처/수집 메모

- SK hynix M15X HBM 2H26 40k wpm→2027 80k(출처별 10k→55-60k). 총 DRAM wafer input 600k wpm(2H26). 용인 +360k(2030).
- Samsung HBM 170k(2025)→**250k wpm(2026말, +47%)**.
- HBM 점유율 2026Q1: **SK 58%, Samsung 21%, Micron 21%**.
- Micron 구체 wpm 미공개(capex $25B+/HBM sold out으로 갈음).

## 메모리 수요 예측 활용

- bit 공급 = wpm × bit/wafer(노드별) / 환산계수(HBM 3-4x, dram-wafer-allocation 파일).
- HBM wpm 증분(SK M15X, Samsung +47%)이 HBM 공급 ramp 곡선.
- DRAM total wafer input(SK 600k) - HBM wpm = conventional DRAM 가용 wafer(crowding out 정량).

## 관련 wiki

- [[hbm]] · [[dram]] · [[bit-demand]] · [[memory-demand]] · [[structural-demand-model]] · [[demand-forecasting]]
