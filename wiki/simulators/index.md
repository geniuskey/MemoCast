---
title: Simulators
created: 2026-06-06
updated: 2026-06-06
type: simulator
tags: [simulator, demand-forecasting, scenario-analysis]
sources: []
confidence: medium
---

# MemoCast Simulators

MemoCast simulator는 자동으로 미래를 맞히는 예측기가 아닙니다. 사용자가 입력한 가정을 바탕으로 메모리 수요가 어떻게 결정되는지 보여주는 계산 도구입니다.

## Available simulators

- [[smartphone-memory-demand]]: 스마트폰 출하량과 entry/mainstream/premium 3-segment 평균 DRAM/NAND 탑재량 기반 수요 계산
- [[hbm-demand]]: AI accelerator 출하량, attach rate, stack 수, stack당 capacity 기반 HBM 수요 계산
- [[pc-dram-demand]]: PC 출하량, AI PC penetration, Non-AI/AI PC별 DRAM content 기반 PC DRAM 수요 계산
- [[nand-ssd-demand]]: Client/Enterprise/AI storage SSD mix와 평균 NAND TB/SSD 기반 NAND SSD 수요 계산

## 확장 예정

- Base/Bull/Bear 시나리오 비교
- 과거 시계열 데이터셋 차트
- 통합 도메인 비교 패널

## 관련 문서

- [[scenario-analysis]]
- [[sensitivity-analysis]]
- [[structural-demand-model]]
