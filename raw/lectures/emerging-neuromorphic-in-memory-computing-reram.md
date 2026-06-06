---
source_url: https://www.patsnap.com/resources/blog/articles/in-memory-analog-computing-landscape-2026/
title: "뉴로모픽 / In-Memory Computing / ReRAM (장기 메모리 수요 재편)"
publisher: PatSnap / Yole / Weebit Nano / NCBI
published: 2026
ingested: 2026-06-06
type: lecture
tags: [memory, dram, demand-forecasting, bit-demand, capacity]
confidence: low
---

# 뉴로모픽 / In-Memory Computing / ReRAM — extracted notes

> 연산을 메모리 내부에서 수행하는 패러다임 — 장기적으로 메모리/연산 경계와 수요 구조 재편.

## 핵심 개념

- In-memory computing(IMC): vector-matrix multiplication을 메모리 배열 내부에서 수행(deep learning kernel). 데이터 이동 최소화.
- ReRAM: 유전체 저항 변화 기반, 초저전력·고밀도·multi-level cell → analog 특성으로 뉴로모픽에 적합.
- 응용: NN inference 가속, 뉴로모픽/SNN, NV-TCAM 검색, computational storage(SSD tier).

## 주요 사실/수치

- analog AI 가속기용 NVM에서 단일 승자 미정(RRAM/PCM/MRAM/FeRAM/FeFET 경쟁).
- Yole: analog IMC·emerging memory는 **2027 이후 ramp**, 엣지 AI에 유망.
- SkyWater: 탄소나노튜브 + ReRAM 3D 적층 산업화 시도.

## 메모리 수요 예측 관련성

- 장기(2027+) 패러다임으로 단기 bit 수요 영향은 제한적이나, 채택 시 DRAM/연산 수요 곡선 구조 변화.
- IMC/뉴로모픽은 전력효율로 power-limited 제약 완화 가능 → 간접적으로 메인 메모리 수요에 영향.
- emerging NVM은 DRAM/NAND 대체보다 보완·niche로 모델링(시나리오 long-tail).

## 관련 wiki

- [[memory-demand]] · [[dram]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- Yole/FinancialContent memory revolution: https://www.financialcontent.com/article/tokenring-2025-10-31-the-memory-revolution-how-emerging-chips-are-forging-the-future-of-ai-and-computing
- Weebit neuromorphic edge: https://www.weebit-nano.com/neuromorphic-computinga-practical-path-to-ultra-efficient-edge-artificial-intelligence/
- ReRAM crossbar (NCBI): https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12822454/
