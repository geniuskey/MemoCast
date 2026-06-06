---
title: HBM
created: 2026-06-06
updated: 2026-06-06
type: market
tags: [hbm, ai-server, memory, demand-forecasting, advanced-packaging]
sources: [raw/articles/micron-high-bandwidth-memory-hbm.md, raw/articles/samsung-semiconductor-hbm.md, raw/reports/trendforce-hbm-bit-demand-supply-2026.md, raw/reports/pkg-cowos-allocation-nvidia-amd-2026.md, raw/reports/macro-datacenter-power-constraint-2026.md]
confidence: medium
---

# HBM

HBM은 AI GPU와 고성능 가속기에서 중요한 고대역폭 메모리입니다. HBM 수요는 일반 DRAM보다 AI 서버/GPU 출하량과 GPU당 HBM 탑재량에 훨씬 직접적으로 연결됩니다.

Micron은 HBM portfolio를 next-gen AI systems, professional visualization workstations, high-performance computing을 가속하기 위한 제품군으로 설명하며, HBM4 36GB 12H, 11Gb/s 이상 pin speed, 2.8TB/s 이상 bandwidth 같은 product-level capacity/bandwidth 지표를 제시합니다.^[[micron.com — High-bandwidth memory (HBM)](https://www.micron.com/products/memory/hbm)]

Samsung Semiconductor도 HBM을 DRAM 제품군 안에서 다루며, HBM 세대와 capacity/bandwidth/product configuration을 주요 product attribute로 제시합니다.^[[semiconductor.samsung.com — HBM | DRAM | Samsung Semiconductor Global](https://semiconductor.samsung.com/dram/hbm/)]

## 기본 수요 구조

```text
Realized HBM demand EB
= Σ(accelerator units × HBM GB/accelerator × attach rate × realization factor) / 1e9

realization factor = min(power-ready factor, CoWoS/package factor, HBM supply factor, customer timing factor)
```

기존 단순 구조는 `accelerator units × HBM GB/accelerator`였지만, 344개 raw integration pass 이후에는 [[ai-infrastructure-memory]]의 변수표를 기준으로 **unit / content / attach / realization**을 분리해서 다룹니다.

더 세분화하면:

```text
총 HBM 수요 = Σ(가속기 세대별 출하량 × 세대별 HBM 탑재량 × attach rate)
```

[[hbm-demand]] simulator는 이 구조를 첫 단계로 단순화해 다음 입력을 직접 조작하게 합니다.

- AI accelerator 출하량
- HBM attach rate
- Accelerator당 HBM stack 수
- Stack당 HBM capacity

## 2026 source-backed signals

| Signal layer | Raw evidence | Model interpretation |
| --- | --- | --- |
| Growth context | `raw/datasets/hbm-bit-demand-growth-rate.md`, TrendForce HBM forecast | 2024 +200%, 2025 +130%, 2026 +70% YoY는 simulator output sanity check로 사용한다. |
| Content step-up | `raw/datasets/gpu-hbm-capacity.md`, `raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md` | B200/GB200 192GB → GB300/Rubin 288GB로 GPU당 HBM content가 +50% 상승한다. |
| Rack conversion | `raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md`, `raw/articles/oem-server-odm-gb200-nvl72-hbm-shipments-2025.md` | GB200 NVL72는 72 GPU, 약 13.4TB HBM, 약 120kW/rack이다. GB300 NVL72는 약 20.7TB HBM/rack이다. |
| Custom accelerator | `raw/articles/aisilicon-tpu-ironwood-trainium3-hbm-specs-2026.md` | TPU/Trainium/ASIC도 HBM bucket에 포함해야 하며 NVIDIA-only unit count는 하방 편향이다. |
| Realization constraint | `raw/reports/pkg-cowos-allocation-nvidia-amd-2026.md`, `raw/articles/power-us-grid-interconnection-queue-bottleneck.md` | CoWoS/package와 power-ready capacity가 announced GPU demand를 installed HBM demand로 바꾸는 gate다. |

- TrendForce는 HBM 수요가 2025년 +130% YoY에서 2026년 +70% YoY로 둔화되지만, HBM3e mainstream과 HBM4 ramp가 여전히 핵심 소비 driver라고 설명합니다.^[[TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html)]
- 2026 HBM bit output share는 SK hynix 50%, Samsung 28%, Micron 22%로 이동할 수 있으며, 이는 supplier capa allocation과 pricing power를 추적하는 데 중요합니다.^[[TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html)]
- CoWoS allocation 자료는 2026년 global CoWoS wafer demand 약 1M units, NVIDIA 595k wafers(약 60%)를 제시합니다. Advanced packaging capacity는 HBM demand realization의 물리적 병목입니다.^[[Astute Group (citing Morgan Stanley) — Advanced Packaging Demand Soars: Nvidia Secures 60% of CoWoS Capacity](https://www.astutegroup.com/news/industrial/advanced-packaging-demand-soars-nvidia-secures-60-of-cowos-capacity/)]
- Datacenter power 자료는 announced AI data center capacity와 실제 착공 사이의 차이를 강조합니다. 전력/그리드 병목은 GPU/HBM 수요 timing을 지연시키는 top-down discount factor입니다.^[[Data Center Frontier / IEA / Sightline Climate — The Gigawatt Bottleneck — Power Constraints Define AI Data Center Growth (2026)](https://www.datacenterfrontier.com/energy/article/55363740/the-gigawatt-bottleneck-power-constraints-define-ai-data-center-growth)]

## 주요 driver

- AI GPU/accelerator 출하량
- GPU당 HBM stack 수와 stack당 capacity
- HBM3E/HBM4 등 세대별 mix
- CoWoS/advanced packaging capacity
- 패키징/수율/공급 제약
- AI cluster buildout와 hyperscaler capex
- Datacenter power/cooling/grid interconnection

## Simulator implication

Micron HBM4 36GB 12H 같은 product-level capacity 정보는 content anchor로 사용할 수 있지만, accelerator 출하량, HBM generation mix, CoWoS allocation, data center power availability는 별도 market scenario로 분리해야 합니다.^[[micron.com — High-bandwidth memory (HBM)](https://www.micron.com/products/memory/hbm)]

## 관련 문서

- [[hbm-demand]]
- [[dram]]
- [[bit-demand]]
- [[supply-demand-gap]]
- [[scenario-analysis]]
- [[structural-demand-model]]
- [[raw-source-map]]
## Evidence checklist

| Forecast question | Primary raw evidence | How to use it |
| --- | --- | --- |
| HBM bit growth | [TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html) | Use +70% YoY 2026 HBM demand as growth-rate context, not a direct simulator default. |
| Per-GPU HBM content | [NVIDIA / wccftech / IntuitionLabs (종합) — NVIDIA GPU 세대별 per-GPU HBM 용량](https://wccftech.com/nvidia-blackwell-gpu-architecture-official-208-billion-transistors-5x-ai-performance-192-gb-hbm3e-memory/) | Map accelerator generation to GB/GPU before multiplying by shipments. |
| Package bottleneck | [Astute Group (citing Morgan Stanley) — Advanced Packaging Demand Soars: Nvidia Secures 60% of CoWoS Capacity](https://www.astutegroup.com/news/industrial/advanced-packaging-demand-soars-nvidia-secures-60-of-cowos-capacity/) | Use CoWoS allocation as a realization constraint for GPU/HBM demand. |
| Datacenter physical constraint | [Data Center Frontier / IEA / Sightline Climate — The Gigawatt Bottleneck — Power Constraints Define AI Data Center Growth (2026)](https://www.datacenterfrontier.com/energy/article/55363740/the-gigawatt-bottleneck-power-constraints-define-ai-data-center-growth) | Treat power/grid/cooling as a cap on how much accelerator demand can become installed demand. |

## Citation notes

HBM demand pages should cite both product-level sources and bottleneck sources. A GPU shipment assumption without CoWoS/power context can overstate realized HBM bit demand.

