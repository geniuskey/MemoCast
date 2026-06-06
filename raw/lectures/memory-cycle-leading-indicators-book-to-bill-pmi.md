---
source_url: https://pdmacro.com/the-sox-spx-yoy-a-semiconductor-cycle-leading-indicator/
title: "반도체 사이클 선행지표 (book-to-bill, PMI, billings, SOX)"
publisher: PDMacro / REPEC / FasterCapital / ISM
published: 2026
ingested: 2026-06-06
type: lecture
tags: [demand-forecasting, time-series, scenario-analysis, inventory, pricing]
confidence: medium
---

# 반도체 사이클 선행지표 — extracted notes

> 메모리 turning point를 선행하는 외생 지표들. nowcasting·시나리오 트리거.

## 핵심 선행지표

- **de facto 선행지표**(글로벌 전자 사이클): DRAM producer price, ISM 제조업 PMI, 반도체 장비 book-to-bill, Nasdaq.
- **book-to-bill**: >1 강한 수요, <1 다운턴 신호. 월간, 수주/매출.
- **Semiconductor Billings Index YoY ↔ ISM PMI**: 동조하되 billings가 PMI 선행 → 성장 turning point 선행지표.
- **재고(days of inventory)**: 상승이 다운턴 선행(memory-inventory 파일 연계).
- **반도체 장비 수주**: 칩 시장을 3~6개월 선행(equip- 파일 연계).
- SOX/SPX YoY도 사이클 선행 신호.

## 메모리 수요 예측 관련성

- nowcasting 입력: billings YoY, book-to-bill, PMI, 재고, 장비 수주, 한국 수출(별도 dataset).
- 선행 lead time(장비 3~6개월, billings>PMI)으로 turning point 조기 신호.
- 다중 선행지표 결합(ensemble, M5 파일)으로 예측 robust화.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[memory-demand]] · [[sensitivity-analysis]]

## 추가 출처

- REPEC 전자 사이클 선행지표: http://repec.org/esAUSM04/up.12342.1077846183.pdf
- FasterCapital book-to-bill: https://fastercapital.com/content/Understanding-the-Cyclical-Nature-of-Semiconductor-Book-to-Bill-Trends.html
- ISM PMI reports: https://www.ismworld.org/supply-management-news-and-reports/reports/ism-pmi-reports/
