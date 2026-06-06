---
source_url: https://newsletter.semianalysis.com/p/memory-mania-how-a-once-in-four-decades
title: "The Scaling Wall — Why Process Transitions Now Yield Less Bit Growth"
publisher: SemiAnalysis / Counterpoint / TrendForce (compiled)
published: 2025
ingested: 2026-06-06
type: lecture
tags: [dram, nand, memory, capacity, bit-demand, demand-forecasting, wafer]
confidence: medium
---

# Scaling Wall & Bit Supply Assumption — extracted notes

> 학습/설명 자료 요약 노트. 공정 전환이 과거보다 bit growth를 덜 주는 이유(공급 핵심 가정).

## 핵심 개념
- 과거 공급 성장 = "공짜 미세화"(node migration이 cost 절감하며 bit/wafer 자동 증가)에 의존.
- 현재: DRAM은 커패시터 aspect ratio·electron 수 한계, NAND는 channel hole etch 한계로 미세화/적층의 한계 cost 급증.
- 결과: bit growth가 점점 wafer capacity 증설(capex) 의존으로 이동 → 공급 탄력성 저하·cyclicality 심화.

## 주요 사실/수치
- DRAM density 역사: 18개월마다 2배(≈100x/decade)였으나 최근 10년은 총 ~2x(8년간 2x). 세대당 이득 10~15%.
- DRAM 미세화 역사: 2000~2010 180nm→40nm(~4x). 이후 둔화.
- NAND: layer는 늘지만(286→500→1,000L 로드맵) etch/bonding step 급증으로 layer당 cost 체감.
- 공급측 신호(2025~2026): SK Hynix HBM/DRAM/NAND capacity 2026까지 sold out, Micron 일부 제품 가격 20~30%↑·견적 중단.
- Counterpoint: 2026 메모리 output >20% 성장 전망하나 AI 수요 상쇄엔 부족 가능.

## 메모리 수요 예측 관련성 (bit supply 함의)
- 공급 모델 핵심 가정: "process transition이 과거만큼 bit growth를 주지 못함" → 동일 capex에서 bit 증가폭 축소.
- DRAM bit growth는 ~중후반 한 자릿수~10%대로 구조적 둔화 가정이 합리적(node 이득 10~15% - mix/HBM die penalty).
- HBM은 동일 bit를 위해 더 큰 die·더 많은 wafer 소비(die penalty) → 가용 공급 bit를 추가 잠식 → effective supply growth를 더 낮춤.
- 미세화 둔화 = shortage 빈도·강도 상승, 가격 cyclicality 확대 = 수요예측 시 공급 상단 보수적으로.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://newsletter.semianalysis.com/p/the-memory-wall
- https://www.trendforce.com/insights/memory-wall
- https://www.nomadsemi.com/p/memory-shortage-and-asml
