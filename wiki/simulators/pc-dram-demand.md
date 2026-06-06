---
title: PC DRAM Demand Simulator
created: 2026-06-06
updated: 2026-06-06
type: simulator
tags: [simulator, pc, dram, ai-pc, demand-forecasting]
sources: [raw/articles/microsoft-ai-pc-16gb-ram-baseline.md, raw/reports/idc-2026-memory-shortage-supply-growth.md, raw/datasets/memory-content-per-device.md]
confidence: low
---

# PC DRAM Demand Simulator

PC DRAM demand는 PC 출하량과 PC당 평균 DRAM 탑재량으로 1차 계산할 수 있습니다. 이 simulator는 미래 수요를 자동 예측하는 모델이 아니라, 사용자가 넣은 PC 출하량, AI PC penetration, Non-AI/AI PC별 DRAM content 가정이 총 PC DRAM capacity demand로 어떻게 변환되는지 보여주는 구조적 계산기입니다.

현재 버전은 공개 출처 기반 market forecast가 아니라 illustrative starter model입니다. 실제 기본값으로 격상하려면 PC 출하량 forecast, AI PC penetration forecast, PC segment별 평균 DRAM 탑재량 자료를 raw에 추가해야 합니다.

## 공식

```text
Non-AI PC 출하량 = PC 출하량 × (1 - AI PC 비중)
AI PC 출하량 = PC 출하량 × AI PC 비중
평균 DRAM(GB/PC) = Non-AI PC 비중 × Non-AI PC DRAM + AI PC 비중 × AI PC DRAM
총 PC DRAM 수요(GB) = PC 출하량 × 평균 DRAM(GB/PC)
```

## 기본값의 의미

현재 preset은 “source-backed market forecast”가 아니라 “illustrative example scenario”입니다.

| Preset | PC shipments | AI PC share | Non-AI DRAM | AI PC DRAM | 목적 |
| --- | ---: | ---: | ---: | ---: | --- |
| Baseline PC reference | 250M | 5% | 8GB | 16GB | AI PC 비중이 낮은 기준선 |
| AI PC transition reference | 250M | 20% | 8GB | 16GB | AI PC 전환이 평균 DRAM을 끌어올리는 경우 |
| AI-heavy PC reference | 250M | 50% | 8GB | 24GB | AI PC 확산과 content uplift가 동시에 발생하는 경우 |

추가로 필요한 자료는 다음과 같습니다.

- 글로벌 PC 출하량 및 forecast
- Notebook/desktop/workstation segment mix
- AI PC penetration 또는 AI-capable PC shipment share
- PC segment별 평균 DRAM GB/PC
- DDR4/DDR5 mix
- Enterprise refresh cycle과 consumer replacement cycle

<ClientOnly>
  <PcDramDemandSimulator />
</ClientOnly>

## 해석

- 이 결과는 “사용자가 넣은 가정이 참이라면 필요한 총 PC DRAM capacity”입니다.
- 가격, ASP, 재고 조정, DDR 세대 mix, 채널 수, notebook/desktop/workstation 차이는 아직 포함하지 않습니다.
- PC shipment sensitivity는 전체 PC 출하량만 바꾼 단순 민감도입니다.
- AI PC penetration sensitivity는 전체 PC 출하량과 segment별 DRAM content는 고정하고 AI PC 비중만 바꿉니다.

## 관련 문서

- [[pc-dram]]
- [[dram]]
- [[bit-demand]]
- [[structural-demand-model]]
- [[scenario-analysis]]
- [[sensitivity-analysis]]
