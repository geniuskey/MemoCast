---
title: Smartphone Memory Demand Simulator
created: 2026-06-06
updated: 2026-06-06
type: simulator
tags: [simulator, smartphone, dram, nand, demand-forecasting]
sources: [raw/reports/counterpoint-global-smartphone-market-2024.md, raw/articles/micron-mobile-memory-storage-for-phones.md, raw/articles/gsmarena-samsung-galaxy-s25-specs.md, raw/articles/gsmarena-samsung-galaxy-a56-specs.md, raw/articles/gsmarena-samsung-galaxy-a16-5g-specs.md, raw/articles/on-device-ai-smartphone-dram-content-2026.md, raw/articles/trendforce-smartphone-storage-capacity-2026.md, raw/datasets/memory-content-per-device.md]
confidence: medium
---

# Smartphone Memory Demand Simulator

스마트폰 출하량과 평균 메모리 탑재량 가정으로 DRAM/NAND 수요를 계산합니다. 이 simulator는 “예측값”을 자동 산출하는 모델이 아니라, 사용자가 입력한 가정이 메모리 수요로 어떻게 변환되는지 보여주는 구조적 계산기입니다.

Counterpoint의 2024년 스마트폰 시장 자료는 shipments, revenue, ASP가 동시에 개선되었고 premiumization이 ASP 상승의 중요한 배경이라고 설명합니다.^[[counterpointresearch.com — Global Smartphone Revenues Resume Growth in 2024 After Two Years, ASP Hits Record High](https://www.counterpointresearch.com/insights/global-smartphone-market-2024/)] Micron의 mobile memory/storage 자료는 스마트폰에서 DRAM/LPDRAM과 UFS storage가 OS, 앱, 파일 저장, AI-driven experience에 중요하다고 설명합니다.^[[micron.com — Mobile Memory and Storage for Phones](https://www.micron.com/solutions/mobile)]

## 공식

```text
DRAM 수요(GB) = 스마트폰 출하량 × 평균 DRAM 탑재량(GB)
NAND 수요(GB) = 스마트폰 출하량 × 평균 NAND 탑재량(GB)
```

Entry/mainstream/premium 3개 segment의 비중과 segment별 DRAM/NAND 탑재량을 입력하면 가중 평균 탑재량도 계산합니다. 세 segment 비중 입력값의 합이 100이 아니면, 계산 로직은 상대 비율을 보존한 채 100%로 정규화합니다.

```text
평균 DRAM(GB/대) = Σ(segment 비중 × segment별 DRAM GB/대)
평균 NAND(GB/대) = Σ(segment 비중 × segment별 NAND GB/대)
```

## 기본값의 의미

현재 UI의 기본값과 preset은 “source-backed market forecast”가 아니라 “source-anchored example scenarios”입니다. GSMArena 제품 사양에서 확인되는 Galaxy A16 5G, Galaxy A56, Galaxy S25의 RAM/storage 구성을 각각 entry/mainstream/premium content anchor로 사용했습니다. 이는 시장 평균이 아니라 제품 예시이며, 실제 시장 기본값으로 격상하려면 세그먼트별 출하량, 판매 mix, 그리고 segment별 평균 memory content 자료가 필요합니다.^[[gsmarena.com — Samsung Galaxy A16 5G - Full phone specifications](https://www.gsmarena.com/samsung_galaxy_a16_5g-13346.php)]^[[gsmarena.com — Samsung Galaxy A56 - Full phone specifications](https://www.gsmarena.com/samsung_galaxy_a56-13603.php)]^[[gsmarena.com — Samsung Galaxy S25 - Full phone specifications](https://www.gsmarena.com/samsung_galaxy_s25-13610.php)]

현재 preset의 구조는 다음과 같습니다.

| Preset | Entry share | Mainstream share | Premium share | 목적 |
| --- | ---: | ---: | ---: | --- |
| Entry reference | 70% | 20% | 10% | 보급형 중심 mix에서 content growth 민감도 확인 |
| Mainstream reference | 40% | 35% | 25% | 중립적인 3-segment starter scenario |
| Premium reference | 20% | 35% | 45% | premiumization으로 평균 DRAM/NAND content가 상승하는 경우 확인 |

추가로 필요한 자료는 다음과 같습니다.

- 최근 연도 글로벌 스마트폰 출하량 또는 forecast
- 세그먼트별 출하량: entry/mainstream/premium
- 세그먼트별 평균 DRAM GB/대
- 세그먼트별 평균 NAND GB/대
- AI smartphone 침투율과 memory content uplift

<ClientOnly>
  <SmartphoneMemoryDemandSimulator />
</ClientOnly>

## 해석

- 이 결과는 “사용자가 넣은 가정이 참이라면 필요한 총 메모리 용량”입니다.
- 가격, 재고, 공급 제약은 아직 포함하지 않습니다.
- shipment sensitivity는 출하량 변화만 바꾼 단순 민감도입니다.
- 후속 단계에서 [[scenario-analysis]]와 [[sensitivity-analysis]]를 붙일 수 있습니다.

## 관련 문서

- [[smartphone-memory]]
- [[dram]]
- [[nand]]
- [[bit-demand]]
- [[structural-demand-model]]
- [[scenario-analysis]]
