---
source_url: https://www.nomadsemi.com/p/deep-dive-on-memory-primer
title: "Deep Dive on Memory (Primer) — Industry Structure"
publisher: Nomad Semi (Moore Morris)
published: 2024
ingested: 2026-06-06
type: lecture
tags: [memory, dram, nand, hbm, capacity, pricing, demand-forecasting]
confidence: medium
---

# Nomad Semi Memory Primer — Industry Structure — extracted notes

> 학습/설명 자료 요약 노트. 메모리 산업 구조와 메모리 계층.

## 핵심 개념
- DRAM 시장 3사 과점: Samsung(한국), SK Hynix(한국), Micron(미국). 1980년대 거의 모든 반도체사가 메모리를 만들던 것과 대조.
- 신규 경쟁자: CXMT(DRAM), YMTC(NAND)가 경쟁 제품 출하 시작. 기술은 선도사보다 뒤지나 빠르게 추격.
- 메모리 계층: SRAM(L1/L2/L3 cache) → DRAM(main working memory) → SSD/HDD(대용량·저속·저가 저장).
- AI/HPC가 HBM 같은 특수 메모리 수요 견인.
- 3D NAND 전환: 셀 미세화 없이 적층으로 용량 증대 → wafer당 bit↑, 비싼 ASML litho 대신 저렴한 etch 장비 활용.

## 주요 사실/수치
- 메모리 = 고cyclical. 2017~18 supercycle → 2019 bust → 2022 급락.
- DRAM/NAND/HBM 3개 제품군의 capex·공정 구조가 상이(특히 NAND는 etch 의존, DRAM은 litho 의존).

## 메모리 수요 예측 관련성
- 과점 구조 → 공급 규율(supply discipline) 가능성이 사이클 진폭을 좌우하는 핵심 변수.
- 중국(CXMT/YMTC) capacity ramp이 commodity DRAM/NAND 공급 곡선의 신규 wildcard.
- 제품군별(DRAM/NAND/HBM) capex·공정 분리가 forecasting 모델의 기본 구조.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://www.nomadsemi.com/p/memory-shortage-and-asml
- https://macro-ops.com/dram-nand-betting-on-the-semiconductor-supercycle/
