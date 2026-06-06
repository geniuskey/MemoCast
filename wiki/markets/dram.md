---
title: DRAM
created: 2026-06-06
updated: 2026-06-06
type: market
tags: [dram, memory, demand-forecasting, supply-demand-gap]
sources: [raw/reports/trendforce-2026-memory-price-forecast.md, raw/reports/idc-2026-memory-shortage-supply-growth.md, raw/reports/wsts-spring-2026-semiconductor-memory-forecast.md, raw/reports/memory-makers-2026-capex-wafer-capacity.md, raw/articles/cxl-memory-expansion-datacenter-2026.md]
confidence: medium
---

# DRAM

DRAM 수요는 PC, 스마트폰, 서버, 그래픽/AI 가속기 등에서 발생합니다. MemoCast에서는 DRAM을 [[nand]]와 분리해 bit demand 중심으로 추적하되, 신규 raw 자료 이후에는 [[supply-demand-gap]]도 함께 봅니다.

## 2026 source-backed market context

새로 추가된 raw 자료들은 2026년 DRAM 시장을 단순 unit growth가 아니라 AI/HBM 수요, 공급 제약, 가격 급등이 결합된 supercycle로 설명합니다.

- TrendForce는 2026년 DRAM 시장 매출을 약 US$404.3B, YoY +144%로 전망하고, capex가 capacity 확장보다 공정 업그레이드·hybrid bonding에 집중되어 bit supply 증가가 제한적이라고 설명합니다.^[[TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html)]
- IDC는 2026년 DRAM supply growth를 +16% YoY로 제시하며, 역사적 평균 20~30%를 하회하고 의미 있는 공급 완화는 2027년 이후라고 봅니다.^[[IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/)]
- WSTS는 memory revenue를 2025년 $230.0B에서 2026년 $803.9B(+249.5%)로 보는 공격적 상단 시나리오를 제시합니다. 이는 bit growth보다 ASP/가격 상승이 revenue forecast에 큰 영향을 줄 수 있음을 보여줍니다.^[[WSTS (World Semiconductor Trade Statistics) — WSTS Spring 2026 Forecast — Memory Revenue +250% to >$800B, Total Semi $1.5T](https://www.wsts.org/76/Recent-News-Release)]

## 주요 driver

- 스마트폰 평균 DRAM 탑재량
- PC/노트북 평균 DRAM 탑재량
- AI PC penetration과 PC당 DRAM content uplift
- 서버 CPU 플랫폼 전환과 채널 수
- CXL memory expansion과 pooling
- AI 서버 확산과 HBM wafer allocation
- DDR4에서 DDR5로의 전환
- DRAM bit supply growth와 inventory/contract price cycle

## Supply-side constraint

DRAM demand forecast는 application별 bit demand만으로 끝나지 않습니다. Memory maker capex 자료는 2026년 SK hynix, Samsung, Micron capex가 증가하더라도 cleanroom 제약, 신규 fab timing, HBM wafer 잠식 때문에 단기 bit supply impact는 제한적이라고 설명합니다.^[[TrendForce / industry reports — Memory CapEx 2026 — SK hynix $20.5B, Samsung $20B, Micron $13.5B; Limited Bit Impact](https://www.trendforce.com/presscenter/news/20251113-12780.html)]

CXL memory expansion 자료는 서버 socket당 채널 한계를 넘어 추가 DDR5 수요를 만들 수 있는 신규 벡터입니다. SK hynix CMM-DDR5 96GB, 서버 CXL attach rate 2028년 약 30% 전망은 기존 RDIMM 외 DRAM TAM 확장 가능성을 보여줍니다.^[[ServeTheHome / SK hynix / TradingKey (집계) — CXL 메모리 확장 2026: SK hynix CMM-DDR5 96GB, 서버 attach rate 30% 전망(2028)](https://www.servethehome.com/sk-hynix-cxl-2-0-memory-expansion-modules-launched-with-96gb-of-ddr5/)]

## Forecasting implication

```text
DRAM bit demand = Σ(application shipments × average DRAM content)
DRAM revenue = DRAM bit demand × blended ASP
blended ASP = supply-demand gap + inventory + product mix + contract/spot price regime
```

따라서 DRAM page는 다음 두 축을 함께 추적합니다.

1. Application demand: smartphone, PC, server, AI accelerator/HBM.
2. Supply and pricing: wafer input, HBM allocation, DDR generation mix, inventory, contract price.

## 관련 문서

- [[memory-demand]]
- [[supply-demand-gap]]
- [[pc-dram]]
- [[pc-dram-demand]]
- [[smartphone-memory]]
- [[hbm]]
- [[forecasting-evidence-map]]
- [[structural-demand-model]]
## Evidence checklist

| Forecast question | Primary raw evidence | How to use it |
| --- | --- | --- |
| DRAM bit supply ceiling | [IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/) | Use +16% YoY DRAM supply growth as a shortage-side scenario anchor, not as application demand. |
| Revenue / ASP upside | [TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html), [WSTS (World Semiconductor Trade Statistics) — WSTS Spring 2026 Forecast — Memory Revenue +250% to >$800B, Total Semi $1.5T](https://www.wsts.org/76/Recent-News-Release) | Separate bit demand from revenue uplift because ASP and contract/spot regime can dominate revenue. |
| HBM wafer displacement | [TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html) | Treat HBM growth as both an AI demand driver and a traditional DRAM supply constraint. |
| PC / smartphone demand destruction | [IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/) | Model shortage feedback as ASP increase → device shipment pressure. |

## Citation notes

- `TrendForce 2026 memory price forecast` is the strongest source for revenue/capex/AI storage linkage. It should not be used alone to infer unit demand.
- `IDC 2026 memory shortage` is the strongest source for DRAM/NAND supply growth and PC shortage feedback. It is a supply-side anchor.
- `bit-demand-supply-growth` dataset has low confidence and should be used only for historical/cycle intuition until cross-checked.

