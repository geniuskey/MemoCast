---
source_url: https://www.techpowerup.com/333155/samsung-aims-for-1-000-layer-nand-by-2030-begins-wafer-bonding-at-400-layers
title: "Samsung 1,000-Layer NAND by 2030 — Wafer Bonding at 400L, CMB Doubling"
publisher: TechPowerUp / TrendForce / Tech Times (compiled)
published: 2025-02-26
ingested: 2026-06-06
type: lecture
tags: [nand, memory, capacity, bit-demand, demand-forecasting, wafer]
confidence: medium
---

# Samsung 1,000-Layer NAND Roadmap & CMB Bonding — extracted notes

> 학습/설명 자료 요약 노트. 장기 NAND layer 로드맵과 cell-stack bonding.

## 핵심 개념
- Samsung 차세대 적층: double-stack(한 wafer에 deck 형성 후 위에 추가 deck) → 400L+에서 wafer bonding 본격 도입.
- CMB(Samsung) = 두 개의 full cell stack을 통째로 bonding(셀-peri 분리형 CBA/Xtacking과 달리 셀 stack끼리 접합) → peri 재설계 없이 유효 layer 2배.
- 1,000 layer는 단일 etch 불가 → 다단 deck + cell-stack bonding의 누적으로만 도달 가능.

## 주요 사실/수치
- Samsung: 2030년 1,000-layer NAND 목표, 400-layer부터 wafer bonding 적용 보고(2025-02).
- Samsung 900-layer NAND 프로토타입: CMB 기법으로 stack 높이 2배 달성(세계 기록 보고, 2026-05).
- 산업 궤적: 양산 286L(현재) → 430L급(V10 ramp) → 900L 프로토타입 → 2030 ~1,000L.
- 단일 wafer는 셀 구조만일 때 ~500 layer 수용 가능 추정 → 이상은 bonding 필수.

## 메모리 수요 예측 관련성 (bit supply 함의)
- cell-stack bonding(CMB)은 etch 한계를 우회해 유효 layer를 곱셈적으로 늘리는 supply 장기 레버.
- 다만 stack을 2배로 접합 = wafer 2장 처리 + bonding = wafer당 cost↑, throughput↓ → cost-per-bit 하락 둔화.
- 1,000L까지의 경로는 장비 capex·yield 의존도가 커 공급 ramp가 점진적 → 단기 공급 탄력성 제한.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.trendforce.com/news/2025/02/26/news-samsung-reportedly-targets-1000-layer-nand-by-2030-rolls-out-wafer-bonding-at-400-layers/
- https://www.techtimes.com/articles/317152/20260525/samsung-900-layer-nand-prototype-sets-world-record-cmb-technique-doubles-stack-height.htm
- https://blocksandfiles.com/2024/12/04/samsung-developing-400-layers-3d-nand/
