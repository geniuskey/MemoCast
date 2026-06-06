---
source_url: https://newsletter.semianalysis.com/p/the-memory-wall
title: "The Memory Wall — DRAM Cell Architecture 8F2→6F2→4F2 & VCT"
publisher: SemiAnalysis (Dylan Patel et al.)
published: 2024-09-03
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, bit-demand, wafer]
confidence: medium
---

# DRAM Cell 6F2 → 4F2 & Vertical Channel Transistor — extracted notes

> 학습/설명 자료 요약 노트. DRAM 셀 면적(nF2)과 차세대 access transistor 구조.

## 핵심 개념
- 셀 면적 단위 F2(F=최소 line/space width). 작을수록 동일 노드에서 더 조밀 → density 향상.
- 진화: 8F2 → 6F2(2007년경 도입) → 4F2(단일 비트 셀의 이론적 하한).
- 4F2 enabler = Vertical Channel Transistor(VCT): source/channel/drain을 수직 적층해 transistor footprint를 ~1F로 축소, 위 커패시터(~1F)와 정렬.
- 4F2 array 구현은 cell/peripheral 수직 배치 필요: SK Hynix 4F2 PUC(Peri-Under-Cell), Samsung 4F2 COP(Cell-on-Peripheral).

## 주요 사실/수치
- 6F2 → 4F2 전환 시 동일 노드에서 셀 footprint 약 30~33% 축소.
- 커패시터: 높이 ~1,000nm, 직경 수십 nm, aspect ratio ~100:1 접근. capacitance ~6~7 fF, 신규 write 시 ~40,000 electrons 저장.
- bitline 총 capacitance >30fF(약 5x 희석) → sensing margin 압박이 추가 미세화 제약.
- 16Gb DRAM 칩이 8년 전 고용량 진입 후 현재도 가장 흔함 → density 정체 방증.
- Samsung VCT DRAM 초기 개발 2025 완료 목표, ISSCC 2026에서 4F2 VCT 16Gb DRAM 시연(core/peri를 별도 wafer에 분리 후 hybrid copper bonding).

## 메모리 수요 예측 관련성 (bit supply 함의)
- 6F2→4F2(VCT)는 평면 미세화 한계 직전 마지막 2D density 레버(~30% 1회성 이득).
- aspect ratio ~100:1, electron 수 ~4만 → 물리 한계 임박 = 2D 미세화로의 추가 bit growth 한계.
- 4F2 VCT 양산 timing이 3D DRAM 이전 공급 곡선의 핵심 buffer 변수.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.researchgate.net/publication/371517221_Vertical_Channel_Transistor_VCT_as_Access_Transistor_for_Future_4F_2_DRAM_Architecture
- https://semiwiki.com/forum/threads/isscc-2026-samsung-shows-16-gb-hybrid-bonded-cell-on-peripheral-4f-2-dram.24805/
