---
source_url: https://www.gartner.com/en/newsroom/press-releases/2026-1-20-gartner-says-worldwide-pc-shipments-increased-9-point-3-percent-in-fourth-quarter-of-2025-and-9-point-1-percent-for-the-full-year
title: "PC 및 서버 출하량 (연도별)"
publisher: Gartner / IDC / TrendForce
published: 2026-01-20
ingested: 2026-06-06
type: dataset
data_file: pc-server-shipments.csv
unit: million units / %
tags: [pc, server, units]
confidence: medium
---

# PC 및 서버 출하량 (연도별)

## 컬럼 설명
- year: 연도
- category: PC 또는 server
- shipments_million_units: 출하량(백만 대)
- yoy_percent: 전년 대비 증감률(%)
- source: 출처 기관
- notes: 추정/맥락 메모

## 출처/수집 메모
- PC: 2021 341M(팬데믹 피크), 2022 284M, 2023 241.8M(-14.8%), 2024 262.7M(IDC, +1%), 2025 ~270M(Gartner +9.1%). 2020 302M은 근사치.
- 서버: 2023 12.0M(-19.4%), 2024 13.654M(+2.05%, AI서버 ~12.1%)는 TrendForce/IDC. 2021/2022는 근사치.
- 서버는 대수 감소에도 ASP 급등(2023 +37.1%)으로 금액 성장 -> 대수와 금액 분리 해석 필요.

## 메모리 수요 예측 활용
- PC/서버 DRAM·NAND 수요 = 출하량 × per-box 용량. 특히 서버는 per-box 용량 증가율이 가장 높음(server-content 데이터셋 참조).
- AI 서버 비중 상승은 HBM 및 고용량 DDR5 수요 가속의 핵심.

## 관련 wiki
- [[bit-demand]] · [[memory-demand]] · [[demand-forecasting]]
