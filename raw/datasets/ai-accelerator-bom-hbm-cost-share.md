---
source_url: https://siliconanalysts.com/data/ai-chip-costs
title: "AI 가속기 BOM·HBM 원가 비중 (2026)"
publisher: Silicon Analysts / Epoch AI / SemiAnalysis
published: 2026
ingested: 2026-06-07
type: dataset
data_file: ai-accelerator-bom-hbm-cost-share.csv
unit: USD, %, GB
tags: [hbm, ai-server, demand-forecasting, bit-demand, pricing]
confidence: medium
---

# AI 가속기 BOM·HBM 원가 비중 (2026)

> HBM이 가속기 제조원가의 35~50% — 메모리가 AI 칩 가치의 핵심. 가속기 출하→HBM 수요·매출.

## 컬럼 설명

- `accelerator`(H100/B200/GB200), `total_mfg_cost_usd`, `hbm_cost_usd`, `hbm_share_pct`, `hbm_gb`, `hbm_price_per_gb_usd`, `note`, `confidence`

## 출처/수집 메모

- 제조원가: H100 ~$3,320 → GB200 ~$13,500. **HBM이 칩별 제조원가의 35~47%**.
- B200: ~$6,400 제조, **HBM ~절반**(192GB HBM3E, $14-17/GB 중앙 $15). GB200 HBM $4,800(>H100 전체 원가).
- **HBM + advanced packaging = BOM의 60~70%**. CoWoS 패키징 $1,000~2,000/unit(3번째 큰 비용).

## 메모리 수요 예측 활용

- HBM 매출 = 가속기 출하 × HBM/가속기($/unit) — 원가 비중(35~50%)이 HBM의 AI 칩 가치 점유.
- $/GB(hbm-price 파일) × GB/가속기 = HBM revenue per accelerator.
- HBM+패키징 60~70%는 메모리·패키징이 AI 가속기 가치사슬 지배 → 공급 게이트(OSAT/CoWoS 파일 연계).

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[structural-demand-model]]
