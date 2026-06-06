---
source_url: https://www.trendforce.com/presscenter/news/20260331-12995.html
title: "DRAM/NAND contract price 분기별 QoQ 변동 (2025Q4-2026Q2)"
publisher: TrendForce / Counterpoint / BACloud
published: 2026
ingested: 2026-06-06
type: dataset
data_file: dram-contract-price-qoq-2025-2026.csv
unit: % (QoQ change)
tags: [dram, nand, pricing, demand-forecasting, server]
confidence: medium
---

# DRAM/NAND contract price 분기별 QoQ (2025Q4-2026Q2)

> contract price QoQ는 가격 시나리오의 핵심 시계열(spot에 후행, 매출에 선행).

## 컬럼 설명

- `period`(분기), `segment`(server/conventional/mobile/overall, dram/nand), `qoq_change_pct`(QoQ 변동률 %, 범위는 중앙값), `note`(원문 범위), `confidence`

## 출처/수집 메모

- 2025Q4 server DRAM contract +18~23% QoQ(예상 초과).
- 2026Q1: server DRAM >60%, conventional DRAM 55~60%, DRAM overall ~90~95%(기록적).
- 2026Q2: DRAM 58~63%, NAND 70~75%, mobile LPDDR5X 78~83%(TrendForce).
- 값은 범위의 중앙값으로 단순화 — 원문 범위는 note 참조. 모두 `confidence: medium`(2차/예측 포함).
- 참고: 2025Q4 DRAM spot이 1년 전의 ~3배, 9월 YoY +187%(가속).

## 메모리 수요 예측 활용

- ASP 시나리오: QoQ 누적으로 가격 경로 재구성(bit demand와 분리).
- server vs conventional vs mobile segment QoQ 차이는 capacity 재배분(crowding out) 강도 지표.
- spot(별도 파일)과 결합해 spot-contract lead/lag 분석.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[memory-demand]] · [[dram]] · [[nand]]
