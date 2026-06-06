---
title: Bit Demand
created: 2026-06-06
updated: 2026-06-06
type: concept
tags: [bit-demand, memory, units]
sources: [raw/datasets/bit-demand-supply-growth.md, raw/datasets/memory-content-per-device.md]
confidence: medium
---

# Bit Demand

Bit demand는 메모리 수요를 bit 단위로 표현한 값입니다. DRAM, NAND, HBM 모두 제품 단위가 다르더라도 bit 단위로 환산하면 총 물량 수요를 비교할 수 있습니다.

## 기본 공식

```text
총 용량 수요(GB) = 기기 출하량 × 기기당 평균 메모리 탑재량(GB)
총 bit 수요 = 총 용량 수요(GB) × 8 × 10^9
```

MemoCast의 초기 simulator는 사람이 이해하기 쉬운 GB/TB/PB/EB 단위까지 함께 표시합니다.

## 주의점

- GB를 decimal로 볼지 GiB로 볼지 명시해야 합니다.
- 산업 리포트의 bit growth와 기업 실적의 revenue growth는 다를 수 있습니다.
- [[dram]], [[nand]], [[hbm]]은 같은 bit demand라도 공급 구조와 가격 구조가 다릅니다.


## Demand vs supply bit growth

Bit demand는 application별 출하량과 평균 content의 함수이고, bit supply는 wafer input, density scaling, yield, technology migration의 함수입니다. [TrendForce / TechInsights / Statista — DRAM/NAND 비트 수요·공급 성장률 (연도별)](https://www.statista.com/statistics/1367000/global-dram-supply-demand-bit-growth/)는 DRAM/NAND bit demand와 supply growth를 연도별로 분리해 기록하며, 가격 방향성을 설명하려면 두 성장률의 gap을 봐야 한다고 정리합니다.^[[TrendForce / TechInsights / Statista — DRAM/NAND 비트 수요·공급 성장률 (연도별)](https://www.statista.com/statistics/1367000/global-dram-supply-demand-bit-growth/)]

[TrendForce — 디바이스별 평균 메모리 탑재량 (per-device content)](https://www.trendforce.com/presscenter/news/20240205-12021.html)는 smartphone/server/notebook의 per-device DRAM content growth를 기록합니다. 출하량이 정체되어도 GB/device가 올라가면 bit demand는 성장할 수 있습니다.^[[TrendForce — 디바이스별 평균 메모리 탑재량 (per-device content)](https://www.trendforce.com/presscenter/news/20240205-12021.html)]

관련 확장: [[supply-demand-gap]]

## 관련 문서

- [[memory-demand]]
- [[structural-demand-model]]
- [[sensitivity-analysis]]
