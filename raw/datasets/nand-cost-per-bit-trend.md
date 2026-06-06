---
source_url: https://blocksandfiles.com/2024/01/12/nand-in-2023/
title: "NAND 플래시 비트당 가격·3D 적층 추이"
publisher: Blocks & Files / TrendForce / OSCOO (종합)
published: 2024-01-12
ingested: 2026-06-06
type: dataset
data_file: nand-cost-per-bit-trend.csv
unit: USD/GB / layers / %
tags: [nand, pricing]
confidence: low
---

# NAND 플래시 비트당 가격·3D 적층 추이

## 컬럼 설명
- year: 연도
- metric: nand_price / 3d_nand_layers / contract_price_decline / asp_change_q4
- value: 값
- unit: usd_per_gb / layers / percent
- notes: 출처/추정 표시

## 출처/수집 메모
- nand_price($/GB)는 **추정치(estimate)** — NAND는 제품(client/enterprise SSD, eMMC 등)별 편차가 커서 단일 $/GB가 어려움. 장기 하락 추세를 보여주는 근사값.
- "mid-2022 이후 계약가 70%+ 하락", "Q4 ASP +5-10% QoQ(2022 이후 첫 상승)"는 OSCOO/TrendForce 보도 실측.
- 3D NAND 적층: 2022 176L -> 2023 218-238L -> 2024 SK hynix 321L/Samsung 286L -> 2025 Kioxia 332L (Blocks & Files).

## 메모리 수요 예측 활용
- $/GB 장기 하락(적층 수 증가, TLC->QLC)은 비트 수요 탄력성을 높여 NAND 채용 용량 증가를 유발.
- 적층 수 증가율은 NAND bit supply 성장의 기술적 상한 결정 -> 공급 측 예측 입력.

## 관련 wiki
- [[bit-demand]] · [[memory-demand]] · [[demand-forecasting]]
