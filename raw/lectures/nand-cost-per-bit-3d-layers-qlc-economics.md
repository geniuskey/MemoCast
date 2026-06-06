---
source_url: https://thememoryguy.com/nand-flashs-layers-of-layers-of-layers/
title: "NAND Cost-per-Bit — 3D Layers, TLC/QLC Economics"
publisher: The Memory Guy / All About Circuits / Kingston
published: 2024
ingested: 2026-06-06
type: lecture
tags: [nand, memory, capacity, pricing, bit-demand, methodology]
confidence: medium
---

# NAND Cost-per-Bit — 3D Layers & QLC Economics — extracted notes

> 학습/설명 자료 요약 노트. NAND 비트당 비용을 낮추는 두 레버.

## 핵심 개념
- NAND cost-per-bit 하락 레버 2개: (1) 적층 layer 수 증가, (2) cell당 bit 수 증가(TLC→QLC→PLC).
- 적층이 많을수록 단위 면적당 비트 증가 → 칩 크기 축소 → $/bit 하락.
- bit/cell 증가: 칩 제조 비용은 1~4 bit 무관하게 동일하므로, 최대한 많은 bit/cell이 경제적. QLC는 4 bit/cell.
- 단, bit/cell↑ → threshold voltage window 좁아져 신뢰성·속도·P/E endurance 저하 트레이드오프.

## 주요 사실/수치
- 3D QLC NAND = 상용 SSD 중 최저 $/GB. TLC 대비 약 15~25% 저렴, SLC 대비 50%+ 저렴.
- 동일 die에서 TLC 192Gb vs QLC 256Gb 식으로 cell당 bit↑가 die 용량↑.
- 2026 차세대 3D QLC stack 200+ active layer 양산 ramp(Samsung, Micron, SK Hynix, Kioxia).
- 2026~2035 QLC NAND이 가장 높은 CAGR 전망(저가 대용량 수요).

## 메모리 수요 예측 관련성
- NAND 공급 bit growth = layer 증가율 × bit/cell mix 변화 × wafer 투입. (DRAM과 별개 모델)
- $/bit 하락이 enterprise SSD(특히 QLC)의 HDD 대체 가속 → AI 데이터 저장 수요 확대.
- bit/cell 전환은 수율·신뢰성 제약으로 단계적 → 공급 탄력성에 상한.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://www.allaboutcircuits.com/industry-articles/solving-the-qlc-nand-flash-ssd-scaling-challenge/
- https://www.ibm.com/think/insights/qlc-vs-tlc
- https://www.kingston.com/en/blog/pc-performance/difference-between-slc-mlc-tlc-3d-nand
