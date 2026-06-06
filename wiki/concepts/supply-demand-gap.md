---
title: Supply-Demand Gap
type: concept
created: 2026-06-06
updated: 2026-06-06
tags: [bit-demand, supply-chain, pricing, cycle, memory]
sources: [raw/reports/idc-2026-memory-shortage-supply-growth.md, raw/reports/trendforce-2026-memory-price-forecast.md, raw/datasets/bit-demand-supply-growth.md, raw/reports/memory-makers-2026-capex-wafer-capacity.md]
confidence: medium
---

# Supply-Demand Gap

Memory demand forecasting에서 `bit demand`만 계산하면 가격과 매출을 설명할 수 없습니다. 가격은 수요 bit growth와 공급 bit growth의 gap, 그리고 재고/계약 구조에 의해 크게 달라집니다.

## 기본 정의

```text
bit demand growth = application별 출하량 × average content의 성장률
bit supply growth = wafer input × die per wafer × yield × density scaling의 성장률
supply-demand gap = bit demand growth - bit supply growth
```

gap이 양수이고 재고가 낮으면 가격 상승 압력이 커집니다. gap이 음수이면 bit demand가 성장해도 ASP 하락으로 revenue가 줄 수 있습니다.

## 2026 source-backed 관찰

- IDC는 2026년 DRAM supply growth +16%, NAND +17%로 역사적 평균 20~30%보다 낮다고 정리합니다.^[[IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/)]
- TrendForce는 2026년 capex가 capacity 확장보다 공정 업그레이드와 hybrid bonding에 집중되어 bit supply 증가가 제한적이라고 설명합니다.^[[TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html)]
- Memory maker capex 자료도 cleanroom 제약, HBM wafer 잠식, 신규 fab timing 때문에 2026 capex 증가가 단기 bit supply로 바로 이어지지 않는다고 설명합니다.^[[TrendForce / industry reports — Memory CapEx 2026 — SK hynix $20.5B, Samsung $20B, Micron $13.5B; Limited Bit Impact](https://www.trendforce.com/presscenter/news/20251113-12780.html)]
- `bit-demand-supply-growth.csv`는 2022년 DRAM/NAND supply growth가 demand growth를 상회했던 구간과 2024~2025 AI-supported demand growth 추정치를 분리해 기록합니다.^[[TrendForce / TechInsights / Statista — DRAM/NAND 비트 수요·공급 성장률 (연도별)](https://www.statista.com/statistics/1367000/global-dram-supply-demand-bit-growth/)]

## Forecasting implication

MemoCast의 application simulator는 `demand side`를 계산합니다. 하지만 가격/매출 전망으로 확장하려면 다음 supply-side 입력이 필요합니다.

| 변수 | 의미 | raw 후보 |
| --- | --- | --- |
| wafer input | 월별 투입 wafer 규모 | `memory-maker-capex`, fab roadmap 자료 |
| technology migration | 1b/1c DRAM, 3D NAND layer 증가 | technology roadmap lectures/reports |
| HBM wafer allocation | standard DRAM이 HBM으로 전환되는 정도 | `trendforce-hbm-bit-demand-supply-2026.md` |
| advanced packaging | HBM attach 가능한 패키징 capacity | `pkg-cowos-*` 자료 |
| inventory | OEM/channel 재고 상태 | `memory-inventory-leading-indicators-2026.md` |
| LTA/contract | 단기 spot price와 장기 contract의 분리 | `memory-pricing-contract-spot-lta-mechanism.md` |

## Demand destruction loop

메모리 shortage가 지속되면 demand side에도 피드백이 생깁니다.

```text
메모리 가격 상승 → OEM BOM 상승 → 기기 가격 상승/사양 조정 → PC·스마트폰 출하량 둔화 → bit demand 일부 둔화
```

IDC 자료는 2026년 PC 출하량 -11.3%, PC average price 최대 +8% 가능성을 shortage의 demand destruction 시나리오로 제시합니다.^[[IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/)]

## 관련 문서

- [[bit-demand]]
- [[memory-demand]]
- [[demand-forecasting]]
- [[forecasting-evidence-map]]
- [[dram]]
- [[nand]]
- [[hbm]]
