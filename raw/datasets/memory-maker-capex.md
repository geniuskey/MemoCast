---
source_url: https://finbox.com/KOSE:A000660/explorer/capex/
title: "메모리 제조사 capex (연도별)"
publisher: Finbox / 기업 IR / Investing.com (종합)
published: 2025-01-01
ingested: 2026-06-06
type: dataset
data_file: memory-maker-capex.csv
unit: KRW billion / USD billion
tags: [capex, dram, nand]
confidence: low
---

# 메모리 제조사 capex (연도별)

## 컬럼 설명
- year: 연도 (Samsung/SK는 회계 FY, Micron은 8월 종료 FY)
- company: SK_hynix / Samsung / Micron
- capex_value: 원자료 값
- currency: 원자료 통화 (KRW_billion 또는 USD_billion)
- capex_usd_billion_est: USD 환산 추정치(환율 근사)
- notes: 출처/맥락

## 출처/수집 메모
- SK hynix: 2021 12,486.6 / 2022 19,010.3 / 2023 8,325.1 / 2024 15,945.5 (KRW 10억, Finbox).
- Samsung: 총 capex FY2022 53.1T / FY2024 56.7T / FY2025 계획 47.4T KRW(-11%, DS 40.9T). **메모리 단독이 아닌 전사 capex**라 분리 주의.
- Micron: FY2023 $7.01B, FY2025 ~$14B(+73%).
- USD 환산은 연도별 환율 근사(약 1,200-1,350 KRW/USD)로 **추정** — confidence: low.

## 메모리 수요 예측 활용
- capex는 향후 1-2년 bit supply 증가의 선행 지표. 2022 고점 -> 2023 급감(감산) -> 2024-25 재확대 패턴이 가격 사이클과 역상관.
- HBM/첨단 노드 capex 집중은 일반 DRAM 공급 제약 요인(웨이퍼 capacity trade-off).

## 관련 wiki
- [[bit-demand]] · [[memory-demand]] · [[demand-forecasting]]
