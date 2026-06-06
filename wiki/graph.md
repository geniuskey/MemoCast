---
title: Knowledge Graph
type: overview
created: 2026-06-06
updated: 2026-06-06
tags: [knowledge-graph, navigation, demand-forecasting]
sources: [raw/INDEX.md]
confidence: medium
---

# Knowledge Graph

MemoCast wiki는 raw evidence → concept/method → market → simulator → comparison 순서로 추적합니다.

```text
raw evidence
  ├─ reports/articles/earnings → market context, supply/demand signals
  ├─ datasets → quantitative anchors and content assumptions
  ├─ papers/lectures → forecasting methodology and cycle concepts
  ↓
concepts and methods
  ├─ [[memory-demand]] / [[bit-demand]] / [[supply-demand-gap]]
  ├─ [[structural-demand-model]] / [[sensitivity-analysis]]
  └─ [[forecasting-evidence-map]] / [[citation-matrix]]
  ↓
markets
  ├─ [[dram]] → [[pc-dram]] / [[smartphone-memory]] / [[hbm]]
  └─ [[nand]] → smartphone NAND / client SSD / enterprise SSD / AI storage
  ↓
simulators
  ├─ [[pc-dram-demand]]
  ├─ [[smartphone-memory-demand]]
  ├─ [[hbm-demand]]
  └─ [[nand-ssd-demand]]
  ↓
comparison
  └─ [[domain-comparison]]
```

## Core paths

| Path | Use when | Start here |
| --- | --- | --- |
| Evidence audit | 근거 파일과 wiki citation을 추적할 때 | [[citation-matrix]] |
| Forecast method | 수요예측 방법론을 확장할 때 | [[forecasting-evidence-map]] |
| Supply-demand cycle | 가격/매출/shortage를 해석할 때 | [[supply-demand-gap]] |
| Application demand | 제품별 bit demand 구조를 볼 때 | [[dram]], [[nand]], [[hbm]], [[pc-dram]], [[smartphone-memory]] |
| Scenario calculation | 가정을 EB/PB/TB demand로 변환할 때 | [[simulators/index]] |

## Naming conventions

- Market pages use application/domain names: `markets/hbm`, `markets/pc-dram`.
- Simulator pages use `*-demand`: `simulators/hbm-demand`, `simulators/pc-dram-demand`.
- Source pages live under `sources/` and should not duplicate full raw contents; they map raw files to decisions.
- Dataset confidence and forecast confidence must remain visible near the cited assumption.

## Next graph edges to add

- Earnings → supplier capacity/capex assumptions.
- Papers → explicit model extensions, e.g. Bass diffusion for AI PC penetration.
- Dataset CSV → chart components for historical bit growth and price cycles.
