---
source_url: https://www.trendforce.com/news/2025/12/26/news-ai-reportedly-to-consume-20-of-global-dram-wafer-capacity-in-2026-hbm-gddr7-lead-demand/
title: "AI가 2026년 글로벌 DRAM wafer capacity의 약 20% 소비, HBM·GDDR7이 수요 견인"
publisher: TrendForce
published: 2025-12-26
ingested: 2026-06-06
type: article
tags: [dram, hbm, ai-server, datacenter, bit-demand, demand-forecasting, capacity]
confidence: high
---

# AI가 2026년 DRAM wafer capacity 약 20% 소비 — extracted notes

> AI 수요가 표준 DRAM 공급을 잠식하는 구조를 wafer/capacity 환산으로 정량화.

## 핵심 내용
- 2026년 AI가 글로벌 DRAM 공급의 **약 20%(near 20%)**를 실질 소비.
- 메모리 수요 분해 (총 약 3 EB):
  - 핵심 inference workload: ~750PB → redundancy 포함 1.5EB로 2배.
  - Private cloud (Meta, Apple) + 중국: 800PB.
  - 모델 training (checkpoint, parameter): 500PB.
- 공정 효율 환산:
  - **HBM 1GB = 표준 DRAM의 약 4배 capacity 소모**.
  - **GDDR7 = 표준 DRAM의 약 1.7배 소모**.
- 2026년 글로벌 DRAM 총 capacity 약 40 EB, 연간 bit 성장률 **10~15%로 제한**.

## 수요 동인
- 고대역폭 메모리(HBM/GDDR7)는 실제 출하 bit 비중은 작아도 wafer 소모 배수가 커서 표준 DRAM 공급을 압박.
- AI inference의 redundancy(2배) 구조 → bit 수요가 워크로드 대비 증폭.

## 메모리 수요 예측 관련성
- "bit 수요"와 "wafer 소모"를 구분해야 함 — HBM 4x, GDDR7 1.7x 환산 계수는 capacity 모델의 핵심 입력.
- 전체 공급 성장(10~15%) 대비 AI 잠식(20%)이 표준 DRAM(모바일/PC/서버) 가격 상승의 구조적 원인.

## 관련 wiki
- [[memory-demand]] · [[hbm-demand]] · [[dram-supply]] · [[demand-forecasting]]

## 추가 출처
- https://www.trendforce.com/presscenter/news/20251211-12831.html
