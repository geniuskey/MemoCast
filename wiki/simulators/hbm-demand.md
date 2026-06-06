---
title: AI Server HBM Demand Simulator
created: 2026-06-06
updated: 2026-06-06
type: simulator
tags: [simulator, hbm, ai-server, accelerator, demand-forecasting]
sources: [raw/articles/micron-high-bandwidth-memory-hbm.md, raw/articles/samsung-semiconductor-hbm.md, raw/reports/trendforce-hbm-bit-demand-supply-2026.md, raw/datasets/gpu-hbm-capacity.md, raw/reports/pkg-cowos-allocation-nvidia-amd-2026.md]
confidence: medium
---

# AI Server HBM Demand Simulator

AI server HBM 수요는 AI GPU/accelerator 출하량과 accelerator당 HBM 탑재량에 직접적으로 연결됩니다. 이 simulator는 미래 수요를 자동 예측하는 모델이 아니라, 사용자가 넣은 accelerator 출하량, attach rate, stack 수, stack당 capacity 가정이 총 HBM capacity demand로 어떻게 변환되는지 보여주는 구조적 계산기입니다.

Micron은 HBM portfolio를 next-generation AI system, professional visualization workstation, HPC를 위한 메모리 제품군으로 설명하며 HBM4 36GB 12H, 11Gb/s 이상 pin speed, 2.8TB/s 이상 bandwidth 같은 product-level capacity/bandwidth 지표를 제시합니다.^[[micron.com — High-bandwidth memory (HBM)](https://www.micron.com/products/memory/hbm)] Samsung Semiconductor도 HBM을 DRAM 제품군 안에서 HBM generation, capacity, bandwidth, product configuration 중심으로 제시합니다.^[[semiconductor.samsung.com — HBM | DRAM | Samsung Semiconductor Global](https://semiconductor.samsung.com/dram/hbm/)]

## 공식

```text
HBM GB/accelerator = accelerator당 HBM stack 수 × stack당 HBM capacity(GB)
Attach 적용 accelerator = AI accelerator 출하량 × HBM attach rate
총 HBM 수요(GB) = Attach 적용 accelerator × HBM GB/accelerator
```

더 세분화하면 [[hbm]] 문서의 구조처럼 accelerator generation별 출하량, HBM generation별 capacity, attach rate, package configuration을 나눌 수 있습니다.

## 기본값의 의미

현재 UI의 기본값과 preset은 “source-backed market forecast”가 아니라 “source-anchored example scenarios”입니다. HBM 제품 자료에서 확인되는 stack/package capacity 정보를 HBM content anchor로 사용하지만, accelerator 출하량과 실제 customer mix는 예시 입력값입니다. 실제 시장 기본값으로 격상하려면 AI accelerator 출하량, generation별 attach rate, vendor별 package configuration, HBM3E/HBM4 mix 자료가 필요합니다.

현재 preset의 구조는 다음과 같습니다.

| Preset | Stack count | GB/stack | Attach rate | HBM GB/accelerator | 목적 |
| --- | ---: | ---: | ---: | ---: | --- |
| HBM3E 8Hi reference | 8 | 24GB | 85% | 192GB | 24GB-class stack content anchor의 기본 민감도 확인 |
| HBM3E 12Hi reference | 8 | 36GB | 90% | 288GB | 고용량 stack 전환 시 accelerator당 HBM 상승 효과 확인 |
| HBM4 12Hi reference | 8 | 36GB | 95% | 288GB | Micron HBM4 36GB 12H capacity anchor 기반 전환 시나리오 |
| TrendForce 2026 HBM growth reference | 8 | 36GB | 95% | 288GB | HBM +70% YoY context와 high-content accelerator를 결합한 sanity-check scenario |
| GB200/B200 192GB ramp reference | 8 | 24GB | 95% | 192GB | GB200 NVL72/B200 세대의 192GB GPU content anchor |
| GB300/Rubin 288GB high-content reference | 8 | 36GB | 95% | 288GB | GB300/Rubin 세대의 288GB GPU content anchor |

추가로 필요한 자료는 다음과 같습니다.

- AI GPU/accelerator 연도별 출하량 또는 forecast
- Accelerator 세대별 HBM stack 수
- HBM3E/HBM4 generation mix
- HBM stack당 capacity와 package configuration
- HBM attach rate 또는 HBM 탑재 accelerator 비중
- 공급 제약, 수율, 고객 재고 조정

<ClientOnly>
  <HbmDemandSimulator />
</ClientOnly>

## 해석

- 이 결과는 “사용자가 넣은 가정이 참이라면 필요한 총 HBM capacity”입니다.
- 가격, gross die, yield, supply allocation, inventory correction은 포함하지 않습니다.
- shipment sensitivity는 accelerator 출하량만 바꾼 단순 민감도입니다.
- stack capacity sensitivity는 stack당 GB만 바꾼 content growth 민감도입니다.
- 후속 단계에서 [[scenario-analysis]]와 [[sensitivity-analysis]]를 붙여 base/bull/bear case를 비교할 수 있습니다.

## 관련 문서

- [[hbm]]
- [[dram]]
- [[bit-demand]]
- [[structural-demand-model]]
- [[scenario-analysis]]
- [[sensitivity-analysis]]
## Source-backed preset candidate

| Preset | Sources | Interpretation |
| --- | --- | --- |
| TrendForce 2026 HBM growth reference | [TrendForce — TrendForce — 2026 HBM Demand +70% YoY; SK hynix 50% / Samsung 28% / Micron 22% Bit…](https://www.trendforce.com/presscenter/news/20251113-12780.html), [NVIDIA / wccftech / IntuitionLabs (종합) — NVIDIA GPU 세대별 per-GPU HBM 용량](https://wccftech.com/nvidia-blackwell-gpu-architecture-official-208-billion-transistors-5x-ai-performance-192-gb-hbm3e-memory/), [Astute Group (citing Morgan Stanley) — Advanced Packaging Demand Soars: Nvidia Secures 60% of CoWoS Capacity](https://www.astutegroup.com/news/industrial/advanced-packaging-demand-soars-nvidia-secures-60-of-cowos-capacity/) | Uses high attach and 12Hi-class content while leaving accelerator units illustrative; CoWoS remains a realization constraint. |
| GB200/B200 192GB ramp reference | `raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md`, `raw/datasets/gpu-hbm-capacity.md`, `raw/articles/nvidia-gpu-hbm-capacity-roadmap-2026.md` | Uses 192GB/GPU content and 72-GPU NVL72 rack evidence; good base content anchor before GB300/Rubin transition. |
| GB300/Rubin 288GB high-content reference | `raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md`, `raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md`, `raw/earnings/nvidia-hbm4-supplier-qualification-vera-rubin-2026.md` | Uses 288GB/GPU content; compare against 192GB preset to isolate content uplift from unit growth. |

