---
source_url: https://www.gartner.com/en/newsroom/press-releases/2025-08-28-gartner-says-artificial-intelligence-pcs-will-represent-31-percent-of-worldwide-pc-market-by-the-end-of-2025
title: "AI PC 침투율 전망 (2023-2028)"
publisher: Gartner / Canalys / IDC
published: 2026
ingested: 2026-06-06
type: dataset
data_file: ai-pc-penetration-forecast.csv
unit: % (share), million units
tags: [pc, dram, demand-forecasting, units, bit-demand]
confidence: medium
---

# AI PC 침투율 전망 (2023-2028)

> AI PC는 메모리 콘텐츠 baseline을 16GB+로 끌어올림 → PC DRAM bit 수요의 구조적 상방.

## 컬럼 설명

- `year`, `ai_pc_share_pct`(출하/사용 중 비중 %), `ai_pc_units_m`(백만 대), `source`, `note`, `confidence`
- 주의: Gartner/Canalys는 출하 비중, IDC 94%는 설치기반(in-use) 기준 → 직접 비교 불가.

## 출처/수집 메모

- Gartner: 2025 31%(77.8M) → 2026 55%(143M). Canalys: 2027 60%, 2028 70%(200M+). IDC: 2028 설치기반 94%.
- AI PC는 NPU + 최소 16GB DRAM(Copilot+ 기준, microsoft-ai-pc 파일 연계).

## 메모리 수요 예측 활용

- PC DRAM bit 수요 = PC 출하 × AI PC 비중 × AI PC 평균 DRAM 콘텐츠(16GB+) + 일반 PC분.
- AI PC 침투율 상승은 메모리 가격 급등(consumer 위축)과 상쇄 작용 → 시나리오 분기.
- 출하 vs 설치기반 구분해 신규 수요(출하)와 교체 수요 모델링.

## 관련 wiki

- [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[dram]]
