---
title: Raw Source Map
created: 2026-06-06
updated: 2026-06-06
type: source-map
tags: [raw, source-map, demand-forecasting, memory]
sources: [raw/INDEX.md]
confidence: medium
---

# Raw Source Map

`raw/`에는 초기 7개 제품/시장 anchor 외에 대규모 자료가 추가되었습니다. 현재 확인된 markdown 원천 파일은 374개이며, citation audit 기준 344개가 이번 패스 시작 시 wiki에 직접 연결되지 않은 상태였습니다. 이번 업데이트는 그 344개 미반영 파일을 파일 단위로 열람해 [[raw-integration-ledger]]에 처리 ledger를 만들고, 5개 cluster page로 지식화했습니다.^[MemoCast internal raw source map]

## 폴더별 역할

| Folder | 확인된 파일 수 | Wiki에서의 역할 |
| --- | ---: | --- |
| `raw/articles/` | 105 | application별 수요 driver, OEM/AI/server/storage 뉴스, 기술 변화 신호 |
| `raw/reports/` | 103 | 시장 전망, 가격/수급, capex, supplier ranking, macro scenario |
| `raw/lectures/` | 71 | DRAM/NAND/HBM/CXL/roadmap/사이클 개념 설명 |
| `raw/datasets/` | 36 | CSV와 markdown 설명 파일로 구성된 정량 dataset layer |
| `raw/papers/` | 40 | 수요예측, 산업 cycle, bullwhip, diffusion, capacity planning 방법론 |
| `raw/earnings/` | 17 | 메모리 업체와 수요측 기업의 실적/가이던스 신호 |

## 주요 source cluster

### 0. 이번 미반영 source 처리 cluster

이번 pass에서는 citation audit의 `rawUncited=344` 목록을 우선순위로 읽고, 중복되는 driver를 아래 5개 wiki page로 승격했습니다.

| Cluster page | 읽은 source 수 | Wiki에서의 쓰임 |
| --- | ---: | --- |
| [[ai-infrastructure-memory]] | 185 | AI server/GPU/HBM/custom accelerator/power/capex driver를 HBM realization model로 연결 |
| [[channel-pricing-signal]] | 109 | contract/spot/retail 가격, allocation, DDR4/DDR5 전환, channel 재고를 shortage regime signal로 추적 |
| [[memory-supply-chain-equipment]] | 183 | fab/equipment/test/advanced packaging/material/regional localization을 supply ceiling으로 분해 |
| [[long-tail-domain-demand]] | 27 | automotive, networking, IoT, robotics, XR 등 non-core domain의 content anchor 보관 |
| [[forecasting-method-library]] | 331 | papers/lectures/model 자료를 structural forecasting 방법론 library로 정리 |
| [[raw-integration-ledger]] | 344 | 파일 단위 read ledger와 첫 wiki target 후보 추적 |

## 기존 주제별 source cluster

### 1. 메모리 supercycle / 가격 / 매출 전망

대표 파일:

- [TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html)
- [WSTS (World Semiconductor Trade Statistics) — WSTS Spring 2026 Forecast — Memory Revenue +250% to >$800B, Total Semi $1.5T](https://www.wsts.org/76/Recent-News-Release)
- [IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/)
- [Gartner — Gartner 2026 — Semi Revenue >$1.3T, Memory ~3x to $633B, 'Memflation'](https://www.gartner.com/en/newsroom/press-releases/2026-04-08-gartner-forecasts-worldwide-semiconductor-revenue-to-exceed-us-dollars-one-point-3-trillion-in-2026)
- [Omdia (Informa) — Omdia — 2026 Semi Forecast Raised to +62.7%; DRAM ~2x, NAND ~4x](https://omdia.tech.informa.com/pr/2026/apr/omdia-raises-2026-semiconductor-forecast-to-62point7percent-as-ai-drives-global-memory-crunch)

핵심 해석:

- 2026년 전망은 단순 unit demand보다 가격/ASP와 supply shortage가 매출을 크게 움직이는 구조를 강조합니다.
- WSTS는 2026년 memory revenue를 $803.9B, +249.5% YoY로 제시하는 공격적 상단 시나리오를 제공합니다.^[[WSTS (World Semiconductor Trade Statistics) — WSTS Spring 2026 Forecast — Memory Revenue +250% to >$800B, Total Semi $1.5T](https://www.wsts.org/76/Recent-News-Release)]
- TrendForce는 2026 DRAM $404.3B, NAND $147.3B 및 2027년 추가 성장을 제시하며, bit supply가 capex보다 공정 전환과 hybrid bonding에 묶여 제한적이라고 설명합니다.^[[TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html)]
- IDC는 2026 DRAM bit supply +16%, NAND +17%로 역사 평균을 하회한다고 보며, 의미 있는 공급 완화가 2027년 이후라고 설명합니다.^[[IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/)]

### 2. AI server / HBM / advanced packaging

대표 파일:

- [TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html)
- [Spheron / IntuitionLabs / Introl (집계) — NVIDIA Data Center GPU HBM 용량 로드맵 (B200/B300/Vera Rubin)](https://www.spheron.network/blog/nvidia-b300-blackwell-ultra-guide/)
- [TrendForce / AMD / VideoCardz / Tom's Hardware — NVIDIA Blackwell/Rubin & AMD MI350/MI400 HBM capacity & 2026 shipment mix](https://www.trendforce.com/presscenter/news/20260408-13003.html)
- [Astute Group (citing Morgan Stanley) — Advanced Packaging Demand Soars: Nvidia Secures 60% of CoWoS Capacity](https://www.astutegroup.com/news/industrial/advanced-packaging-demand-soars-nvidia-secures-60-of-cowos-capacity/)
- [FinancialContent (TokenRing) — TSMC to Quadruple Advanced Packaging Capacity: Reaching 130,000 CoWoS Wafers Monthl…](https://markets.financialcontent.com/stocks/article/tokenring-2026-2-5-tsmc-to-quadruple-advanced-packaging-capacity-reaching-130000-cowos-wafers-monthly-by-late-2026)

핵심 해석:

- HBM 수요는 AI accelerator 출하량뿐 아니라 GPU당 HBM stack 수, stack당 capacity, CoWoS/advanced packaging capacity에 의해 제한됩니다.
- TrendForce 자료는 HBM 수요가 2025 +130% YoY에서 2026 +70% YoY로 둔화되지만 여전히 고성장 구간이라고 설명합니다.^[[TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html)]
- CoWoS allocation 자료는 2026년 global CoWoS wafer demand 약 1M units, NVIDIA 60% allocation을 HBM 수요 배분의 proxy로 사용할 수 있음을 시사합니다.^[[Astute Group (citing Morgan Stanley) — Advanced Packaging Demand Soars: Nvidia Secures 60% of CoWoS Capacity](https://www.astutegroup.com/news/industrial/advanced-packaging-demand-soars-nvidia-secures-60-of-cowos-capacity/)]

### 3. NAND / enterprise SSD / QLC

대표 파일:

- [TrendForce — TrendForce — QLC Enterprise SSD Breakout 2026 as Nearline HDD Shortage Bites](https://www.trendforce.com/presscenter/news/20250915-12714.html)
- [Tom's Hardware / Futurum / Solidigm / Avnet — Enterprise SSD / QLC NAND demand 2026 — eSSD>consumer, HDD shortage→flash](https://www.tomshardware.com/pc-components/hdds/ai-triggers-hard-drive-shortage-amidst-dram-squeeze-enterprise-hard-drives-on-backorder-by-2-years-as-hyperscalers-switch-to-qlc-ssds)
- [TrendForce — Inference AI 수요 급증으로 nearline HDD 부족, 2026년 QLC eSSD 출하 본격화](https://www.trendforce.com/presscenter/news/20250915-12714.html)
- [TrendForce — TrendForce — 4Q25 NAND Top-5 Revenue $21.17B (+23.8% QoQ); Enterprise SSD Driver](https://www.trendforce.com/presscenter/news/20260303-12943.html)
- [Blocks & Files / TrendForce / OSCOO (종합) — NAND 플래시 비트당 가격·3D 적층 추이](https://blocksandfiles.com/2024/01/12/nand-in-2023/)

핵심 해석:

- NAND 수요는 mobile/client 중심에서 enterprise SSD와 AI storage 중심으로 재평가해야 합니다.
- nearline HDD lead time이 52주 초과 또는 최대 2년까지 늘어났다는 자료는 HDD shortage가 QLC enterprise SSD 수요로 전이되는 구조적 trigger입니다.^[[TrendForce — TrendForce — QLC Enterprise SSD Breakout 2026 as Nearline HDD Shortage Bites](https://www.trendforce.com/presscenter/news/20250915-12714.html)]^[[Tom's Hardware / Futurum / Solidigm / Avnet — Enterprise SSD / QLC NAND demand 2026 — eSSD>consumer, HDD shortage→flash](https://www.tomshardware.com/pc-components/hdds/ai-triggers-hard-drive-shortage-amidst-dram-squeeze-enterprise-hard-drives-on-backorder-by-2-years-as-hyperscalers-switch-to-qlc-ssds)]
- QLC 122TB/245TB/256TB급 제품은 unit shipment보다 TB/SSD mix가 NAND bit demand를 더 크게 좌우할 수 있음을 보여줍니다.^[[TrendForce — TrendForce — QLC Enterprise SSD Breakout 2026 as Nearline HDD Shortage Bites](https://www.trendforce.com/presscenter/news/20250915-12714.html)]^[[Tom's Hardware / Futurum / Solidigm / Avnet — Enterprise SSD / QLC NAND demand 2026 — eSSD>consumer, HDD shortage→flash](https://www.tomshardware.com/pc-components/hdds/ai-triggers-hard-drive-shortage-amidst-dram-squeeze-enterprise-hard-drives-on-backorder-by-2-years-as-hyperscalers-switch-to-qlc-ssds)]

### 4. PC / smartphone content uplift

대표 파일:

- [Tom's Hardware / TrendForce / Microsoft — Microsoft, AI PC(Copilot+) 최소 RAM 16GB·NPU 40 TOPS 기준 설정](https://www.tomshardware.com/software/windows/microsofts-baseline-ram-for-ai-pcs-set-at-16gb)
- [Android Authority / Memeburn / Samsung (집계) — On-device AI가 스마트폰 DRAM 견인: Gemini 12GB·Apple Intelligence 8GB, S25 전 모델 12GB](https://www.androidauthority.com/samsung-galaxy-s25-ai-features-cloud-on-device-3517555/)
- [TrendForce — 2026년 평균 스마트폰 저장 용량 +4.8% 성장, AI 업그레이드가 NAND 견인](https://www.trendforce.com/presscenter/news/20260323-12983.html)
- [TrendForce — TrendForce — Mobile DRAM/LPDDR5X 2026; Smartphone Output -2% YoY on Memflation](https://www.trendforce.com/presscenter/news/20251117-12784.html)
- [TrendForce — 디바이스별 평균 메모리 탑재량 (per-device content)](https://www.trendforce.com/presscenter/news/20240205-12021.html)

핵심 해석:

- Microsoft Copilot+ PC 최소 사양 16GB DRAM은 PC DRAM simulator의 AI PC content anchor를 출처 기반으로 강화합니다.^[[Tom's Hardware / TrendForce / Microsoft — Microsoft, AI PC(Copilot+) 최소 RAM 16GB·NPU 40 TOPS 기준 설정](https://www.tomshardware.com/software/windows/microsofts-baseline-ram-for-ai-pcs-set-at-16gb)]
- On-device AI 스마트폰 자료는 Google Gemini 12GB, Apple Intelligence 8GB, Galaxy S25 전 모델 12GB RAM을 premium mobile DRAM content uplift의 근거로 제공합니다.^[[Android Authority / Memeburn / Samsung (집계) — On-device AI가 스마트폰 DRAM 견인: Gemini 12GB·Apple Intelligence 8GB, S25 전 모델 12GB](https://www.androidauthority.com/samsung-galaxy-s25-ai-features-cloud-on-device-3517555/)]
- device별 content dataset은 smartphone/server/notebook의 per-device DRAM content growth를 출하량 정체 환경의 bit demand driver로 제시합니다.^[[TrendForce — 디바이스별 평균 메모리 탑재량 (per-device content)](https://www.trendforce.com/presscenter/news/20240205-12021.html)]

### 5. Supply / capex / capacity constraint

대표 파일:

- [TrendForce / industry reports — Memory CapEx 2026 — SK hynix $20.5B, Samsung $20B, Micron $13.5B; Limited Bit Impact](https://www.trendforce.com/presscenter/news/20251113-12780.html)
- [TrendForce — Samsung Reportedly Plans 200K 1c DRAM Wafers/Month by 2026, About One-Third of Its…](https://www.trendforce.com/news/2025/11/19/news-samsung-reportedly-plans-200k-1c-dram-wafersmonth-by-2026-about-one-third-of-its-total-output/)
- [The Elec / NineScrolls / Startup Fortune / Micron 10-Q — SK hynix M15X/Yongin & Micron Idaho/NY fab roadmap (2026-2031)](https://www.thelec.net/news/articleView.html?idxno=11059)
- [Tom's Hardware / The Economy / ChinaBizInsider / DigitalToday — CXMT/YMTC capacity, DDR5/HBM3 진입, 수출통제 영향 (2026)](https://www.tomshardware.com/pc-components/dram/chinas-cxmt-and-ymtc-to-expand-memory-output)
- [Finbox / 기업 IR / Investing.com (종합) — 메모리 제조사 capex (연도별)](https://finbox.com/KOSE:A000660/explorer/capex/)

핵심 해석:

- CapEx 증가가 곧바로 2026 bit supply 증가로 연결되지 않는다는 점이 반복됩니다. cleanroom, 공정 전환, HBM wafer allocation이 병목입니다.^[[TrendForce / industry reports — Memory CapEx 2026 — SK hynix $20.5B, Samsung $20B, Micron $13.5B; Limited Bit Impact](https://www.trendforce.com/presscenter/news/20251113-12780.html)]
- 공급 측 forecast는 demand simulator와 별도로 `bit supply growth`, `wafer input`, `technology conversion`, `yield`, `packaging capacity`로 분리해서 다뤄야 합니다.

### 6. Macro / power / infrastructure constraint

대표 파일:

- [Data Center Frontier / IEA / Sightline Climate — The Gigawatt Bottleneck — Power Constraints Define AI Data Center Growth (2026)](https://www.datacenterfrontier.com/energy/article/55363740/the-gigawatt-bottleneck-power-constraints-define-ai-data-center-growth)
- [Goldman Sachs Research — AI to drive 165% increase in data center power demand by 2030](https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030)
- [IEA (International Energy Agency) — AI is set to drive surging electricity demand from data centres (Energy and AI report)](https://www.iea.org/news/ai-is-set-to-drive-surging-electricity-demand-from-data-centres-while-offering-the-potential-to-transform-how-the-energy-sector-works)
- [Tom's Hardware / CreditSights / MUFG — Big Tech AI Capex to Hit $725 Billion in 2026, Up 77% YoY](https://www.tomshardware.com/tech-industry/big-tech/big-techs-ai-spending-plans-reach-725-billion)
- [IDC / Gartner — IDC — Smartphone -13.9% & PC -11.3% in 2026 as Memory Crisis Lifts ASPs](https://www.idc.com/resource-center/blog/worldwide-smartphone-market-to-decline-13-9-in-2026-as-memory-crisis-and-us-iran-war-constrain-growth/)

핵심 해석:

- AI/HBM 수요는 GPU 구매 의지만으로 결정되지 않고 데이터센터 전력, cooling, grid interconnection에 의해 timing risk를 갖습니다.
- Datacenter power constraint 자료는 2025 80GW → 2028 150GW IT load 전망, 2026 announced 12GW 중 실제 착공 5GW라는 차이를 제시해 announced capex를 그대로 HBM 수요로 환산하면 과대평가될 수 있음을 보여줍니다.^[[Data Center Frontier / IEA / Sightline Climate — The Gigawatt Bottleneck — Power Constraints Define AI Data Center Growth (2026)](https://www.datacenterfrontier.com/energy/article/55363740/the-gigawatt-bottleneck-power-constraints-define-ai-data-center-growth)]

## Wiki 반영 원칙

1. Raw source는 수정하지 않는다.
2. Wiki에서는 출처를 각주로 연결한다.
3. 수치가 단일 2차 aggregator에만 있으면 confidence를 낮추거나 “scenario input candidate”로 둔다.
4. Simulator 기본값을 시장 forecast로 승격하려면 shipments, mix, content, supply constraint를 최소 2개 이상 source cluster로 교차 확인한다.

## 관련 문서

- [[memory-demand]]
- [[bit-demand]]
- [[demand-forecasting]]
- [[forecasting-evidence-map]]
- [[supply-demand-gap]]
