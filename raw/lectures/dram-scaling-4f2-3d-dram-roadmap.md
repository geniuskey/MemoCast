---
source_url: https://www.allpcb.com/allelectrohub/3d-dram-roadmap-and-production-timeline
title: "DRAM Scaling Roadmap — 4F2 Cell & 3D DRAM (ISSCC/VLSI)"
publisher: AllPCB ElectroHub / ISSCC / VLSI Symposium reporting
published: 2025
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, bit-demand, methodology]
confidence: low
---

# DRAM Scaling Roadmap — 4F2 & 3D DRAM — extracted notes

> 학습/설명 자료 요약 노트. DRAM 미세화 한계와 차세대 셀 구조(컨퍼런스 보고).

## 핵심 개념
- 전통 DRAM 셀은 6F2(F=최소 feature). 4F2 셀로 전환 시 동일 노드에서 셀 면적 ~33% 축소 → density 향상.
- 4F2 구현 방식: cell array와 peripheral 회로의 수직 배치.
  - SK Hynix 4F2 PUC(Peri-Under-Cell): peripheral을 cell 아래 배치.
  - Samsung 4F2 COP(Cell-on-Peripheral): cell을 peripheral 위에 배치.
- 3D DRAM: NAND처럼 셀을 수직 적층해 2D 평면 면적 한계 우회하는 차세대 방향.
- DRAM은 커패시터 capacitance 유지 때문에 NAND식 단순 적층이 어려워 3D DRAM 상용화 난이도 높음.

## 주요 사실/수치
- 4F2: 2025 VLSI에서 SK Hynix PUC, ISSCC에서 Samsung COP 발표.
- ISSCC 보고 capacity 추세: 1995~2014 약 8x(20년), 2014~2023 2x(8년) → scaling 둔화 명확.
- AMD ISSCC 2023: 서버/HPC accelerator용 multi-layer stacked DRAM 비전 제시.
- Samsung 2019 12-layer 3D-TSV 발표, 2021 3D DRAM 개발 프로젝트 공식화.

## 메모리 수요 예측 관련성
- 4F2/3D DRAM은 supply bit growth를 되살릴 수 있는 차세대 레버 → 상용화 timing이 2027+ 공급 곡선 핵심 변수.
- 상용화 지연 시 density ~2x/decade 둔화 지속 → 구조적 가격 상방·shortage 빈도 증가.
- confidence low: 컨퍼런스 발표 기반, 양산 timeline·yield는 불확실.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://www.servethehome.com/amd-talks-stacking-compute-and-dram-at-isscc-2023/
- https://newsletter.semianalysis.com/p/the-memory-wall
- https://www.allpcb.com/allelectrohub/debunking-myths-about-dram-market-trends
