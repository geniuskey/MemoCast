---
title: Domain Comparison Panel
created: 2026-06-06
updated: 2026-06-06
type: comparison
tags: [comparison, simulator, demand-forecasting, scenario-analysis]
sources: []
confidence: medium
---

# Domain Comparison Panel

이 페이지는 MemoCast의 주요 application simulator를 EB 단위로 비교합니다. 목적은 서로 다른 memory family를 하나의 예측값으로 합산하는 것이 아니라, 어떤 수요 축이 규모와 민감도 측면에서 큰 영향을 갖는지 확인하는 것입니다.

<ClientOnly>
  <DomainComparisonPanel />
</ClientOnly>

## 비교 대상

- Smartphone DRAM
- Smartphone NAND
- PC DRAM
- AI Server HBM
- NAND SSD

## 해석 방법

1. `기준 preset 비교`는 각 simulator의 대표 reference preset을 EB 단위로 환산합니다.
2. `Base → upside scenario delta`는 현재 기준 preset에서 더 높은 content/mix preset으로 이동할 때 EB 변화량을 계산합니다.
3. EB 크기가 크다고 수익성이 높다는 뜻은 아닙니다. DRAM/NAND/HBM은 가격, margin, 공급 제약이 다릅니다.

## 제한

- 현재 비교는 public source-backed market forecast가 아니라 simulator preset 기반 structural comparison입니다.
- Revenue/ASP, inventory cycle, wafer capacity, yield, node/layer migration은 반영하지 않습니다.
- 같은 EB라도 HBM과 commodity NAND의 경제적 의미는 크게 다릅니다.

## 관련 문서

- [[simulators/index]]
- [[smartphone-memory-demand]]
- [[pc-dram-demand]]
- [[hbm-demand]]
- [[nand-ssd-demand]]
- [[sensitivity-analysis]]
