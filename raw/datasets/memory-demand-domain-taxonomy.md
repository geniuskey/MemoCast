---
title: Memory Demand Domain Taxonomy Dataset
source_url: local-taxonomy
created: 2026-06-06
updated: 2026-06-06
type: dataset
tags: [memory, demand-forecasting, taxonomy, domains]
confidence: medium
---

# Memory Demand Domain Taxonomy Dataset

This CSV defines MemoCast's end-market taxonomy for memory demand forecasting. It intentionally goes beyond the legacy `smartphone / PC / server` split and separates:

- demand domain
- domain group
- relevant memory products
- modeling pattern
- primary forecast drivers
- raw source references
- confidence

## CSV

- `raw/datasets/memory-demand-domain-taxonomy.csv`

## Why this exists

Memory demand is not one market. Smartphone, PC, and server are only the high-volume starting points. AI accelerators, enterprise storage, graphics/gaming, automotive, networking, edge AI, wearables/XR, HPC, surveillance/video, consumer electronics, and specialty medical/aerospace all have different demand equations.

The taxonomy is used by `tools/datasetCharts.mjs` to produce `wiki/public/dataset-charts.json`, and by the `/charts` page to show the broader demand segmentation alongside quantitative charts.
