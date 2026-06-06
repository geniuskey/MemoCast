---
title: Citation Matrix
created: 2026-06-06
updated: 2026-06-06
type: source-map
tags: [raw, citation, evidence-map, demand-forecasting]
sources: [raw/INDEX.md]
confidence: medium
---

# Citation Matrix

이 페이지는 `raw/` 자료를 wiki 페이지와 simulator 가정에 연결하는 citation 추적표입니다. 목표는 “숫자를 어디서 가져왔는가?”와 “그 숫자가 수요·공급·가격 중 무엇을 의미하는가?”를 분리하는 것입니다.

<CitationWorkQueue />

## Market pages

| Wiki page | Primary citations | Citation role |
| --- | --- | --- |
| [[dram]] | [TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html), [IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/), [TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html) | DRAM revenue/ASP, supply growth, HBM wafer displacement |
| [[hbm]] | [TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html), [NVIDIA / wccftech / IntuitionLabs (종합) — NVIDIA GPU 세대별 per-GPU HBM 용량](https://wccftech.com/nvidia-blackwell-gpu-architecture-official-208-billion-transistors-5x-ai-performance-192-gb-hbm3e-memory/), [Astute Group (citing Morgan Stanley) — Advanced Packaging Demand Soars: Nvidia Secures 60% of CoWoS Capacity](https://www.astutegroup.com/news/industrial/advanced-packaging-demand-soars-nvidia-secures-60-of-cowos-capacity/) | HBM bit growth, per-GPU content, CoWoS realization bottleneck |
| [[nand]] | [TrendForce — TrendForce — QLC Enterprise SSD Breakout 2026 as Nearline HDD Shortage Bites](https://www.trendforce.com/presscenter/news/20250915-12714.html), [Tom's Hardware / Futurum / Solidigm / Avnet — Enterprise SSD / QLC NAND demand 2026 — eSSD>consumer, HDD shortage→flash](https://www.tomshardware.com/pc-components/hdds/ai-triggers-hard-drive-shortage-amidst-dram-squeeze-enterprise-hard-drives-on-backorder-by-2-years-as-hyperscalers-switch-to-qlc-ssds), [TrendForce — AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027](https://www.trendforce.com/presscenter/news/20260122-12893.html) | QLC enterprise SSD, HDD substitution, NAND revenue/price context |
| [[pc-dram]] | [Tom's Hardware / TrendForce / Microsoft — Microsoft, AI PC(Copilot+) 최소 RAM 16GB·NPU 40 TOPS 기준 설정](https://www.tomshardware.com/software/windows/microsofts-baseline-ram-for-ai-pcs-set-at-16gb), [IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/), [TrendForce — 디바이스별 평균 메모리 탑재량 (per-device content)](https://www.trendforce.com/presscenter/news/20240205-12021.html) | AI PC 16GB floor, shortage feedback, PC content trend |
| [[smartphone-memory]] | [Android Authority / Memeburn / Samsung (집계) — On-device AI가 스마트폰 DRAM 견인: Gemini 12GB·Apple Intelligence 8GB, S25 전 모델 12GB](https://www.androidauthority.com/samsung-galaxy-s25-ai-features-cloud-on-device-3517555/), [TrendForce — 2026년 평균 스마트폰 저장 용량 +4.8% 성장, AI 업그레이드가 NAND 견인](https://www.trendforce.com/presscenter/news/20260323-12983.html), [counterpointresearch.com — Global Smartphone Revenues Resume Growth in 2024 After Two Years, ASP Hits Record High](https://www.counterpointresearch.com/insights/global-smartphone-market-2024/) | On-device AI DRAM content, mobile NAND content growth, shipment/ASP context |

## Simulator presets

| Simulator | Source-backed preset candidates | Caveat |
| --- | --- | --- |
| [[hbm-demand]] | TrendForce HBM +70% growth, GPU HBM capacity dataset, CoWoS allocation | Accelerator shipments are still scenario inputs. |
| [[nand-ssd-demand]] | Enterprise SSD +41%, 122/245/256TB QLC anchors, HDD shortage | Total SSD shipments and segment mix require market-source validation. |
| [[pc-dram-demand]] | Copilot+ 16GB minimum, IDC PC shipment downside | AI PC penetration remains a scenario assumption. |
| [[smartphone-memory-demand]] | Galaxy S25 12GB, Apple AI 8GB, mobile storage +4.8% | Segment mix and shipment volume remain scenario assumptions. |

## Confidence rules

- **High confidence**: product requirement or spec anchor, e.g. Copilot+ 16GB, Galaxy S25 12GB.
- **Medium confidence**: named research-house forecast or extracted article note requiring cross-check.
- **Low confidence**: aggregated dataset with broad source disagreement, e.g. HBM market size range or historical bit-growth estimates.

## Related pages

- [[raw-source-map]]
- [[forecasting-evidence-map]]
- [[supply-demand-gap]]
- [[scenario-analysis]]
