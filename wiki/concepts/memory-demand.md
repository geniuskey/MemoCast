---
title: Memory Demand
created: 2026-06-06
updated: 2026-06-06
type: concept
tags: [memory, demand-forecasting, bit-demand, units]
sources: []
confidence: medium
---

# Memory Demand

메모리 수요는 하나의 숫자가 아니라 목적에 따라 여러 단위로 정의됩니다. MemoCast에서는 [[bit-demand]], capacity demand, unit demand, revenue demand를 구분합니다.

## 핵심 구분

| 구분 | 의미 | 예시 |
|---|---|---|
| Unit demand | 제품/기기 개수 기준 수요 | 스마트폰 10억 대 |
| Capacity demand | GB/TB/PB 등 용량 기준 수요 | 스마트폰 DRAM 80억 GB |
| Bit demand | bit 단위 환산 수요 | DRAM 총 bit demand |
| Revenue demand | 가격을 곱한 매출 기준 수요 | DRAM 매출 달러 |

## 왜 중요한가

메모리 산업에서는 가격 변동이 크기 때문에 물량 수요와 매출 수요를 분리해야 합니다. 예를 들어 bit demand가 증가해도 ASP가 하락하면 revenue는 감소할 수 있습니다.

## 관련 문서

- [[bit-demand]]
- [[demand-forecasting]]
- [[structural-demand-model]]
- [[smartphone-memory]]
