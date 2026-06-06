---
source_url: https://www.nomadsemi.com/p/deep-dive-on-memory-primer
title: "Deep Dive on Memory (Primer) — DRAM Node Migration 1a/1b/1c/1d"
publisher: Nomad Semi (Moore Morris)
published: 2025-09-30
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, bit-demand, demand-forecasting, wafer]
confidence: medium
---

# DRAM Node Migration 1a / 1b / 1c / 1d — extracted notes

> 학습/설명 자료 요약 노트. DRAM 노드 미세화 세대와 density 이득 둔화.

## 핵심 개념
- 현행 leading-edge DRAM 노드 명명: 1a(1alpha), 1b(1beta), 1c(1gamma), 향후 1d(1delta) nm. 모두 10nm-class("1x.x nm") 영역.
- 노드 숫자는 실제 물리 nm가 아니라 세대 명칭에 가깝게 운용됨(공식 nm 비공개 관행).
- node migration = 평면 셀 미세화 → 동일 wafer당 bit 수 증가 = supply bit growth의 핵심 레버.

## 주요 사실/수치
- 최근 세대당 density 이득은 10~15%에 불과("node migration only delivers 10 to 15% in density gain per generation").
- 역사적 대비: 2000~2010 DRAM 노드 180nm→40nm, density ~4x 증가. 현재는 세대당 10~15%로 둔화.
- Samsung·SK Hynix는 1a nm에서 EUV 도입, 1b/1c로 가며 EUV layer 수 증가.
- Micron은 1-gamma(1c)에서 처음 EUV 도입(Hiroshima fab 기반).
- 세대 cadence: Hynix는 2024년 1a/1b로 마이그레이션 우선(1a/1b crossover 2024 말), 이후 1c. Samsung은 1a에서 뒤처진 뒤 2024년 1c로 가속.

## 메모리 수요 예측 관련성 (bit supply 함의)
- node migration이 세대당 10~15% bit/wafer만 더해줌 → wafer capacity(capex) 증설 없이는 공급 bit 성장 한계.
- 둔화한 density 이득 = 구조적으로 cost-per-bit 하락 속도 저하 → 가격 상방·shortage 빈도 상승.
- 1c→1d로 갈수록 EUV layer 증가로 wafer cost 상승, 순(net) cost-per-bit 개선폭 축소가 공급 모델 핵심 가정.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://semiengineering.com/dram-scaling-challenges-grow/
- https://www.micron.com/products/memory/1gamma-dram-technology
