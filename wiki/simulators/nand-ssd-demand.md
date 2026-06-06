---
title: NAND SSD Demand Simulator
created: 2026-06-06
updated: 2026-06-06
type: simulator
tags: [nand, ssd, simulator, demand-forecasting, scenario-analysis]
sources: [raw/reports/trendforce-qlc-enterprise-ssd-nearline-hdd-2026.md, raw/articles/storage-enterprise-ssd-qlc-nand-demand-2026.md, raw/reports/trendforce-2026-memory-price-forecast.md]
confidence: medium
---

# NAND SSD Demand Simulator

이 페이지는 Client SSD, Enterprise SSD, AI/Data-center SSD의 segment mix와 SSD당 평균 NAND capacity 가정을 바탕으로 총 NAND SSD 수요를 계산합니다.

<ClientOnly>
  <NandSsdDemandSimulator />
</ClientOnly>

## 공식

```text
segment NAND demand = total SSD shipments × normalized segment share × average NAND TB/SSD

total NAND SSD demand = Σ segment NAND demand

weighted average NAND TB/SSD = Σ(normalized segment share × average NAND TB/SSD)
```

사용자가 입력한 segment share 합계가 100%가 아니면 계산 엔진은 상대 비중을 유지하면서 내부적으로 100%로 정규화합니다. 모든 share가 0 또는 invalid이면 segment들을 동일 비중으로 fallback합니다.

## Preset 해석

| Preset | 의미 |
| --- | --- |
| Client-heavy SSD reference | Client SSD 중심 구조에서 평균 NAND capacity가 낮게 유지되는 경우 |
| Enterprise transition SSD reference | Enterprise SSD mix가 커지며 평균 NAND TB/SSD가 상승하는 경우 |
| AI storage-heavy SSD reference | AI/data-center storage가 평균 capacity를 크게 끌어올리는 경우 |
| QLC enterprise breakout reference | QLC enterprise SSD, nearline HDD shortage, 122TB급 고용량 SSD anchor를 반영한 source-backed candidate |

위 preset은 구조 이해용 예시입니다. 실제 시장 전망으로 사용하려면 SSD shipment, capacity shipped, enterprise/client mix, QLC/TLC mix에 대한 raw source를 추가해야 합니다.

## 해석상 주의점

- NAND 전체 수요가 아니라 SSD application만 다룹니다.
- Smartphone UFS, removable storage, embedded NAND, automotive NAND는 제외합니다.
- SSD 단위 출하량과 capacity shipped 자료는 서로 다른 관점이므로 혼용하지 않아야 합니다.
- Revenue demand나 ASP는 bit demand와 별도로 모델링해야 합니다.

## 관련 문서

- [[nand]]
- [[bit-demand]]
- [[structural-demand-model]]
- [[sensitivity-analysis]]
- [[simulators/index]]
