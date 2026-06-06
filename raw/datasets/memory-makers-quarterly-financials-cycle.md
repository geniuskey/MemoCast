---
source_url: https://www.koreatimes.co.kr/business/tech-science/20250123/sk-hynix-becomes-most-profitable-korean-company-in-q4-2024
title: "메모리 3사 실적 사이클 (2022-2025, 다운턴→회복)"
publisher: Micron SEC 8-K / SK hynix IR / Samsung IR / Korea Times / Statista
published: 2025
ingested: 2026-06-06
type: dataset
data_file: memory-makers-quarterly-financials-cycle.csv
unit: USD billion / KRW trillion (혼합, unit 컬럼 명시)
tags: [dram, nand, hbm, revenue, demand-forecasting, scenario-analysis]
confidence: medium
---

# 메모리 3사 실적 사이클 (2022-2025)

> 2023 다운턴(적자) → 2024-2025 AI 회복의 정량 기록. 사이클 진폭 캘리브레이션용.

## 컬럼 설명

- `company`: micron / sk_hynix / samsung
- `period`: 회계연도/분기(Micron은 fiscal year)
- `revenue` + `revenue_unit`: 매출(USD십억 또는 KRW조)
- `operating_profit` + `profit_unit`: 영업이익(또는 net, note 참조)
- `note`: 맥락(적자/기록/YoY 등), `confidence`

## 출처/수집 메모

- Micron: SEC 8-K(FY2023 net loss -$5.83B, FY2024 net income +$0.778B) — `high`.
- SK hynix: FY2023 영업손실 -7.73조원 → FY2024 영업이익 23.47조원(매출 66.19조원, ~$46.06B), Q4'24 +2,236% YoY — `high`.
- Samsung: 전사 기준(메모리 단독 아님). FY2023 op 6.57조(메모리 적자해), FY2024 32.7조, FY2025 43.6조 — 일부 `medium`.
- **주의**: 통화·범위 혼재(Micron USD/fiscal, SK·Samsung KRW/calendar; Samsung은 전사). 비교 시 unit·범위 확인.

## 메모리 수요 예측 활용

- 2023 적자 → 2024 흑자전환의 진폭은 가격(ASP) 주도 사이클의 실증 → bear/bull 캘리브레이션.
- SK hynix Q4'24 +2,236% YoY는 사이클 회복의 레버리지(operating leverage) 사례.
- 분기 실적은 수요 turning point의 후행 확인 지표(재고·가격이 선행).

## 관련 wiki

- [[memory-demand]] · [[demand-forecasting]] · [[scenario-analysis]] · [[dram]] · [[nand]] · [[hbm]]
