---
source_url: https://nand-research.com/memory-flash-crisisc-update-march-2026/
title: "NAND vs DRAM 사이클 divergence (2026)"
publisher: NAND Research / IDC / Astute / Neumonda / Phison
published: 2026
ingested: 2026-06-06
type: report
tags: [nand, dram, hbm, demand-forecasting, pricing, scenario-analysis, capacity]
confidence: medium
---

# NAND vs DRAM 사이클 divergence (2026) — extracted notes

> NAND와 DRAM은 별도 사이클로 모델링해야 함. driver·공급 행태가 다름.

## NAND 고유 동학

- IDC: 2026 NAND 공급 성장 17%(역사 평균 이하), 수요 초과. Phison "모든 NAND 제조사 2026 sold out".
- 1Tb TLC NAND $4.80(2025-07)→$10.70(2025말).
- NAND 벤더는 수년 부진 후 capacity 추가에 신중 → 신규 라인 2027+ 지연 → 공급 제약 지속.

## DRAM 고유 동학

- AI 최대 수익은 NAND 아닌 **HBM·DRAM** → 고마진 우선.
- DDR5 구조적 전환이 DRAM 장기 oversupply 리스크 감소(legacy와 다른 사이클).

## 공통 + 차이

- 둘 다 capacity 규율(신중)로 전통적 oversupply 사이클 리스크 완화.
- 차이: DRAM은 HBM 잠식 주도, NAND는 enterprise SSD/AI 스토리지 + HDD 부족 주도.

## 메모리 수요 예측 관련성

- DRAM/NAND 분리 모델링 필수([[bit-demand]] 원칙). driver·공급 곡선·turning point 상이.
- NAND는 HDD 대체·eSSD·데이터 생성량(DataSphere) driver, DRAM은 HBM/server.
- NAND 공급 성장 17%는 NAND bit 공급 곡선의 직접 입력.

## 관련 wiki

- [[nand]] · [[dram]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- Astute NAND/DRAM 재배분: https://www.astutegroup.com/news/memory-shortages/ai-memory-boom-tightens-nand-and-dram-supply-forcing-capacity-reallocation-across-semiconductor-production/
- OSCOO NAND 부족 2년: https://www.oscoo.com/news/industry-warns-the-nand-shortage-is-unlikely-to-ease-within-two-years/
- Kingspec 2026 NAND/DRAM: https://www.kingspec.com/news/2026-nand-dram-market-update.html
