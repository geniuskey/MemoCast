---
source_url: https://www.trendforce.com/presscenter/news/20260120-12887.html
title: "AI 서버 출하 전망 (2023-2027, 구조 모델 입력)"
publisher: TrendForce / EE Times Asia
published: 2026-01-20
ingested: 2026-06-06
type: dataset
data_file: ai-server-shipments-forecast.csv
unit: million units, %
tags: [ai-server, hbm, dram, demand-forecasting, units, bit-demand]
confidence: medium
---

# AI 서버 출하 전망 (2023-2027)

> structural demand model 입력: AI 서버 units × 서버당 HBM/DRAM 콘텐츠 = AI 메모리 bit 수요.

## 컬럼 설명

- `year`, `ai_server_units_m`(백만 대), `yoy_pct`, `ai_share_of_servers_pct`(전체 서버 중 비중), `note`, `confidence`

## 출처/수집 메모

- 2023 1.2M(+38.4%), 전체 서버의 ~9%.
- 2024 전체 서버 13.654M 중 AI ~12.1% → AI 서버 ~1.65M(근사).
- 2025 +24%(TrendForce 전망), 2026 +28% YoY·AI 비중 ~17%.
- 2022-2027 CAGR 27.2%. ASIC 기반 시스템 비중 상승.
- 일부 연도 units 공란(YoY/share만 공개) → 보간 시 note 참조, `confidence` 구분.

## 메모리 수요 예측 활용

- AI 서버 units × (서버당 HBM GB, GPU/서버 수, GPU당 HBM) = HBM bit demand.
- ASIC mix 상승은 가속기당 HBM 콘텐츠 분포 변화 → mix 가정 필요.
- 일반 서버 출하(+12.8% 2026, 별도 파일)와 합산해 server DRAM 총수요 구성.

## 관련 wiki

- [[memory-demand]] · [[bit-demand]] · [[hbm]] · [[structural-demand-model]] · [[demand-forecasting]]
