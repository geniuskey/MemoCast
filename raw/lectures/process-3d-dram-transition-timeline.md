---
source_url: https://www.tomshardware.com/pc-components/ram/samsung-reveals-16-layer-3d-dram-plans-with-vct-dram-as-a-stepping-stone-imw-2024-details-the-future-of-compact-higher-density-ram
title: "3D DRAM Transition — Samsung 16-Layer Plans, VCT as Stepping Stone (IMW 2024)"
publisher: Tom's Hardware / Yole Group / Lam Research (compiled)
published: 2024
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, bit-demand, demand-forecasting]
confidence: medium
---

# 3D DRAM Transition Timeline — extracted notes

> 학습/설명 자료 요약 노트. 평면 한계 이후 DRAM의 수직 적층 전환과 timing.

## 핵심 개념
- 3D DRAM = NAND처럼 셀(1T1C)을 Z축으로 적층해 평면 면적 한계 우회 → 칩당 bit density 대폭 증가.
- 단계적 경로: 2D 6F2 → 4F2 VCT(평면) → 3D 수직 적층(VS-CAT / "VS-DRAM").
- 핵심 난제: 커패시터 capacitance 유지 + 적층마다 transistor/커패시터 동시 적층 난이도 → NAND식 단순 적층보다 훨씬 어려움.
- 신소재 필요: oxide channel(IGZO/InGaZnO 등), ferroelectric 등이 선행돼야 4F2 VCT·3D 전환 가능.

## 주요 사실/수치
- Samsung 로드맵: 4F2 VCT(2D) DRAM 약 2027~2028 등장, 3D DRAM 상용화 ~2030 목표. 초기 16-layer 3D DRAM 구상(IMW 2024).
- 4F2 vertical 설계로 현행 6F2 대비 셀 ~30% 축소.
- 수직 적층 시 layer 수백 단까지 확대 시 평면 DRAM 대비 칩당 bit density 8~16x 잠재.
- Samsung: 2019 12-layer 3D-TSV 발표, 2021 3D DRAM 개발 프로젝트 공식화, 단일 칩 >100Gb 비전.
- 산업 추정: 약 10.4E-4 µm²/bit 면적 도달(~5년 내) 후 공간 부족으로 vertical 전환 불가피.

## 메모리 수요 예측 관련성 (bit supply 함의)
- 3D DRAM은 둔화된 DRAM bit growth를 재가속할 핵심 차세대 레버 → 상용화 timing(2027~2030)이 장기 공급 곡선의 최대 변수.
- 상용화 지연·yield 부진 시 density ~2x/decade 둔화 지속 → 구조적 가격 상방·shortage.
- 3D DRAM 초기엔 고비용·저yield → 공급 ramp가 점진적 = 단기 공급 탄력성 제한.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.yolegroup.com/industry-news/samsung-reveals-16-layer-3d-dram-plans-with-vct-dram-as-a-stepping-stone/
- https://newsroom.lamresearch.com/3D-DRAM-architecture-proposal
- https://www.allpcb.com/allelectrohub/3d-dram-roadmap-and-production-timeline
