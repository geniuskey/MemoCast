---
source_url: https://newsletter.semianalysis.com/p/the-memory-wall
title: "The Memory Wall: Past, Present, and Future of DRAM"
publisher: SemiAnalysis
published: 2024
ingested: 2026-06-06
type: lecture
tags: [dram, hbm, memory, bit-demand, capacity, methodology]
confidence: medium
---

# SemiAnalysis: The Memory Wall — extracted notes

> 학습/설명 자료 요약 노트. DRAM scaling 둔화와 "memory wall" 해법.

## 핵심 개념
- "Memory wall": compute 성능 향상이 메모리(대역폭·용량) 향상을 크게 앞질러 발생하는 병목.
- DRAM scaling 둔화: 최근 10년 density 증가 ~2x(과거 peak scaling 시대 ~100x/decade 대비 급감).
- 단기 해법: HBM 로드맵 연장(적층·대역폭 확대).
- 장기 해법: compute-in-memory(CIM), 신메모리(FeRAM, MRAM), 4F2 DRAM, 3D DRAM.
- DRAM 셀의 1T1C 커패시터 capacitance 유지 난이도가 미세화 한계의 물리적 근원.

## 주요 사실/수치
- DRAM density ~2x/지난 10년 → bit cost 하락률 둔화 → 구조적 가격 상방 압력.
- 4F2 DRAM: 2025 VLSI에서 SK Hynix가 4F2 PUC(Peri-Under-Cell), ISSCC에서 Samsung이 4F2 COP(Cell-on-Peripheral) 공개.
- 3D DRAM: NAND처럼 수직 적층으로 셀 면적 한계 우회하는 차세대 방향(Samsung 2021 개발 공식화).

## 메모리 수요 예측 관련성
- scaling 둔화 = supply bit growth 둔화 → 동일 capex로 얻는 bit 감소 → 가격·shortage 구조 변화.
- HBM이 memory wall 단기 해법이자 standard DRAM capacity 잠식 동인 → 수급 전이 모델의 핵심.
- 4F2/3D DRAM 상용화 timing이 2027+ 장기 공급 곡선의 주요 변수.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://newsletter.semianalysis.com/p/memory-mania-how-a-once-in-four-decades
- https://www.allpcb.com/allelectrohub/3d-dram-roadmap-and-production-timeline
