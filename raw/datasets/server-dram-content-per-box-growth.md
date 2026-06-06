---
source_url: https://www.trendforce.com/presscenter/news/20240205-12021.html
title: "서버 DRAM 콘텐츠(per box) 성장 (구조 모델 입력)"
publisher: TrendForce / RandTech / Network World
published: 2026
ingested: 2026-06-06
type: dataset
data_file: server-dram-content-per-box-growth.csv
unit: GB, % YoY
tags: [dram, server, ai-server, bit-demand, demand-forecasting, capacity]
confidence: medium
---

# 서버 DRAM 콘텐츠(per box) 성장

> server DRAM bit 수요 = 서버 출하 × 서버당 DRAM GB. 콘텐츠 성장이 핵심 driver.

## 컬럼 설명

- `year`/`metric`, `value`, `unit`, `note`, `confidence`

## 출처/수집 메모

- 2024 서버 DRAM 콘텐츠/box **+17.3% YoY**(타 앱 추월, TrendForce).
- 전통 엔터프라이즈 서버 128~256GB → **AI 서버 512GB/1TB/multi-TB/node** 구조적 점프.
- AI 서버 units ~30% CAGR(2025-2030), 콘텐츠 병행 상승. 2026 AI 서버 build +65~80% YoY.

## 메모리 수요 예측 활용

- server DRAM bit 수요 = (일반서버 units × 128~256GB) + (AI서버 units × 512GB~multi-TB).
- 콘텐츠 성장률(+17.3%/box)은 unit 성장과 별도의 bit 수요 driver(content × units).
- AI 서버 콘텐츠 점프(256→1TB+)가 server DRAM 수요 비선형 증가의 핵심.
- ai-server-shipments-forecast / ai-rack-gpu-hbm-coupling 데이터셋과 결합.

## 관련 wiki

- [[dram]] · [[server]] 관련 · [[bit-demand]] · [[memory-demand]] · [[structural-demand-model]] · [[demand-forecasting]]
