---
source_url: https://semianalysis.com/memory-model/
title: "Memory Demand Forecasting Methodology — Bottoms-Up Bit Model"
publisher: SemiAnalysis (Memory Model) / TrendForce
published: 2025
ingested: 2026-06-06
type: lecture
tags: [demand-forecasting, methodology, memory, dram, nand, hbm, bit-demand, pricing, capacity]
confidence: medium
---

# Memory Demand Forecasting Methodology — extracted notes

> 학습/설명 자료 요약 노트. 메모리 수급·가격 예측의 실무 방법론.

## 핵심 개념
- Bottoms-up 모델: fab별 생산·증설 vs end-market별 상세 수요를 대조하여 revenue/pricing/margin 예측.
- 공급측: fab-by-fab capacity, wafer 투입, node mix, layer/적층, yield ramp → bit supply growth 산출.
- 수요측: end market(서버, 모바일, PC, 그래픽, HBM/AI)별 bit demand → 합산.
- 가격: 수급 갭 → spot/contract ASP. contract price는 spot을 1~2분기 후행.
- bit shipment 분석 + ASP 모델링 → 글로벌 시장 가치 추정.

## 주요 사실/수치
- HBM/GDDR의 capacity 가중치: 1GB HBM ≈ 표준 DRAM 4x wafer capacity 소모, GDDR7 ≈ 1.7x. → "AI-equivalent consumption"으로 환산해 공급 잠식 계량.
- 2026 글로벌 DRAM capacity ~40EB 추정, AI-equivalent 소비가 총 산출의 ~20% 전망.
- 2026 DRAM capex ~$61.3B(+14% YoY), NAND capex $21.1B→$22.2B(~+5%). 초점은 capacity 확장보다 process 업그레이드·고적층·hybrid bonding·HBM.
- primary research로 기술 채택 cycle·증설 timeline·계약가 협상·공급망 리스크 검증.

## 메모리 수요 예측 관련성
- 이 노트 자체가 forecasting 방법론의 골격: supply bit = f(capex, node, layer, yield), demand bit = Σ(end-market).
- HBM wafer 가중 환산이 standard DRAM 공급 타이트닝을 정량화하는 핵심 트릭.
- contract-spot lag을 알면 가격 변곡 timing 추정 가능.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://www.trendforce.com/presscenter/news/20251113-12780.html
- https://www.trendforce.com/news/2025/12/26/news-ai-reportedly-to-consume-20-of-global-dram-wafer-capacity-in-2026-hbm-gddr7-lead-demand/
- https://newsletter.semianalysis.com/p/memory-mania-how-a-once-in-four-decades
