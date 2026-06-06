---
title: Scenario Analysis
created: 2026-06-06
updated: 2026-06-06
type: concept
tags: [scenario-analysis, demand-forecasting, methodology]
sources: []
confidence: medium
---

# Scenario Analysis

Scenario analysis는 하나의 예측값을 맞히려 하기보다 base, bull, bear 같은 가정 세트를 비교하는 방법입니다.

## MemoCast에서의 역할

메모리 수요는 스마트폰 출하량, 서버 출하량, GPU당 HBM 용량, 평균 NAND 탑재량처럼 외생 가정에 민감합니다. 따라서 초기 단계에서는 자동 예측보다 “가정 변화가 결과를 얼마나 바꾸는지”를 보여주는 것이 더 중요합니다.

## 기본 구조

```text
Base case = 보수적/중립적 기준 가정
Bull case = 출하량 또는 탑재량 증가 가정
Bear case = 수요 둔화 또는 재고 조정 가정
```

## 관련 문서

- [[sensitivity-analysis]]
- [[structural-demand-model]]
- [[smartphone-memory-demand]]
