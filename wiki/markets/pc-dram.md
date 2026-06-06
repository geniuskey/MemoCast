---
title: PC DRAM
created: 2026-06-06
updated: 2026-06-06
type: market
tags: [pc, dram, ai-pc, memory, demand-forecasting]
sources: [raw/articles/microsoft-ai-pc-16gb-ram-baseline.md, raw/reports/idc-2026-memory-shortage-supply-growth.md, raw/articles/oem-pc-ai-pc-mix-commercial-refresh-2026.md, raw/datasets/memory-content-per-device.md]
confidence: medium
---

# PC DRAM

PC DRAM 수요는 PC 출하량과 PC당 평균 DRAM 탑재량의 곱으로 1차 계산할 수 있습니다. MemoCast에서는 PC DRAM을 [[smartphone-memory]], [[hbm]], 일반 [[dram]] 수요와 분리해 추적합니다.

## 기본 공식

```text
PC DRAM 수요(GB) = PC 출하량 × 평균 DRAM 탑재량(GB/PC)
평균 DRAM(GB/PC) = Non-AI PC 비중 × Non-AI PC DRAM + AI PC 비중 × AI PC DRAM
```

## Source-backed content anchor

Microsoft Copilot+ PC 기준은 AI PC의 minimum content anchor를 제공합니다. raw 자료는 Copilot+ PC 최소 사양을 16GB DDR5/LPDDR5, 256GB storage, NPU 40 TOPS 이상으로 정리합니다.^[[Tom's Hardware / TrendForce / Microsoft — Microsoft, AI PC(Copilot+) 최소 RAM 16GB·NPU 40 TOPS 기준 설정](https://www.tomshardware.com/software/windows/microsofts-baseline-ram-for-ai-pcs-set-at-16gb)]

이 기준은 [[pc-dram-demand]] simulator의 AI PC DRAM 기본값 16GB를 단순 illustrative assumption에서 source-backed content anchor로 강화합니다. 다만 AI PC penetration, 전체 PC 출하량, notebook/desktop/workstation mix는 여전히 별도 market source가 필요합니다.

## 2026 shortage feedback

IDC 자료는 2026년 메모리 shortage 환경에서 PC 출하량 -11.3%, PC average price 최대 +8% 가능성을 제시합니다.^[[IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/)] 이는 PC DRAM demand가 content uplift만으로 결정되지 않고, memory price 상승이 PC unit demand를 둔화시키는 feedback loop를 만들 수 있음을 의미합니다.

```text
AI PC content uplift → 평균 DRAM/PC 상승
memory shortage/price 상승 → PC ASP 상승 → unit shipment 둔화 가능
net bit demand = content uplift 효과 - unit demand destruction 효과
```

## 주요 driver

- PC 출하량: replacement cycle, enterprise refresh, consumer demand의 영향을 받습니다.
- AI PC penetration: on-device AI 기능이 기본 DRAM 탑재량을 끌어올릴 수 있습니다.
- DRAM content per PC: 8GB, 16GB, 24GB, 32GB 등 configuration mix가 평균 수요를 바꿉니다.
- Notebook/desktop/workstation mix: form factor별 평균 DRAM 탑재량이 다릅니다.
- DDR4/DDR5 transition: bit demand뿐 아니라 ASP/revenue 해석에도 영향을 줍니다.
- Memory shortage feedback: DRAM 가격 상승은 PC 가격과 출하량에 반작용을 만들 수 있습니다.

## simulator implication

[[pc-dram-demand]] simulator는 첫 단계에서 PC 시장을 Non-AI PC와 AI PC의 2-segment 구조로 단순화합니다.

- Non-AI PC: 일반 PC 기준 DRAM content anchor
- AI PC: Copilot+ PC 최소 RAM 16GB를 content anchor로 사용 가능

이 2-segment 구조는 AI PC penetration이 평균 DRAM GB/PC와 총 DRAM capacity demand를 얼마나 바꾸는지 보는 데 집중합니다. 아직 가격, 재고, 채널 수, DDR 세대 mix, CPU 플랫폼별 차이는 포함하지 않습니다.

## 관련 문서

- [[pc-dram-demand]]
- [[dram]]
- [[bit-demand]]
- [[supply-demand-gap]]
- [[structural-demand-model]]
- [[scenario-analysis]]
- [[sensitivity-analysis]]
## Evidence checklist

| Forecast question | Primary raw evidence | How to use it |
| --- | --- | --- |
| AI PC DRAM floor | [Tom's Hardware / TrendForce / Microsoft — Microsoft, AI PC(Copilot+) 최소 RAM 16GB·NPU 40 TOPS 기준 설정](https://www.tomshardware.com/software/windows/microsofts-baseline-ram-for-ai-pcs-set-at-16gb) | Use 16GB as a source-backed minimum AI PC content anchor. |
| Non-AI PC baseline | [TrendForce — 디바이스별 평균 메모리 탑재량 (per-device content)](https://www.trendforce.com/presscenter/news/20240205-12021.html) | Use notebook/PC content trend as a baseline context; verify absolute GB values separately. |
| Shortage feedback | [IDC — IDC 2026 — DRAM/NAND Supply Growth Below Norms (16%/17%), DRAM Rev ~$419B](https://www.idc.com/resource-center/blog/global-memory-shortage-crisis-market-analysis-and-the-potential-impact-on-the-smartphone-and-pc-markets-in-2026/) | Model unit shipment downside separately from content uplift. |
| OEM mix | [Windows News / Counterpoint / Gartner / IDC — PC Shipments Up in Q1 2026 — Windows 10 Rush, AI PC Mix, Memory Costs](https://windowsnews.ai/article/pc-shipments-up-in-q1-2026windows-10-rush-and-ai-memory-costs-signal-trouble.415140) | Use as a qualitative source for AI PC penetration and commercial refresh assumptions. |

## Citation notes

PC DRAM presets should distinguish a content anchor from a market forecast. `16GB AI PC` is source-backed, while PC shipments and AI PC penetration remain scenario assumptions unless separately sourced.

