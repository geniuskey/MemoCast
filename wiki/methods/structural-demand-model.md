---
title: Structural Demand Model
created: 2026-06-06
updated: 2026-06-06
type: method
tags: [demand-forecasting, causal-model, scenario-analysis, methodology]
sources: []
confidence: medium
---

# Structural Demand Model

Structural demand model은 과거 수요량만 보는 대신, 수요를 만들어내는 구성요소를 분해합니다.

## 기본 형태

```text
수요 = 대상 수량 × 침투율 × 단위당 탑재량 × 조정 계수
```

예를 들어 스마트폰 DRAM 수요는 스마트폰 출하량과 평균 DRAM 탑재량으로 계산합니다.

## 장점

- 가정이 투명합니다.
- 변수별 민감도를 볼 수 있습니다.
- 산업 지식과 연결하기 쉽습니다.

## 한계

- 입력 가정이 틀리면 결과도 틀립니다.
- 단기 재고 조정과 가격 변화를 직접 설명하지 못할 수 있습니다.
- 실제 forecast에는 데이터 검증과 보정이 필요합니다.

## 고도화 계층

단순 structural model을 실제 예측 cockpit으로 쓰려면 다음 계층을 추가해야 합니다.

```text
end_demand = base × unit_growth × content_growth × S-curve adoption
cycle_adjusted = end_demand × price-inventory-cycle
supply_realized = min(cycle_adjusted, available_supply × yield × allocation)
unmet_demand = cycle_adjusted - supply_realized
```

이 확장 모델은 [[advanced-demand-forecast-engine]]와 [[advanced-demand-forecast]]에서 구현한다.

## 관련 문서

- [[demand-forecasting]]
- [[scenario-analysis]]
- [[sensitivity-analysis]]
