---
source_url: https://www.sciencedirect.com/science/article/pii/S0957417424025867
title: "WSTS 예측 정확도·track record (Human vs Machines)"
authors: Steinmeister & Pauly (Expert Systems with Applications / arXiv 2404.09334)
publisher: ScienceDirect / arXiv / WSTS
published: 2024
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, machine-learning, scenario-analysis]
confidence: high
---

# WSTS 예측 정확도·track record — extracted notes

> "예측이 얼마나 맞는가"의 메타 근거. MemoCast가 자체 예측의 한계를 인식하는 데 필수.

## 문제/목표

- WSTS 전문가 컨센서스 예측 vs 통계/ML 모델의 정확도 비교.

## 핵심 결과

- WSTS 격분기 전문가 예측이 **분기 horizon에서 MSE/MAPE/MAE 우수**.
- 모델별 우위 상이: 짧은 시계열은 exponential smoothing, 중간은 SARIMA, 긴 시계열은 GPR.
- **추가 정보 결합 시 데이터기반 방법이 WSTS를 능가**(데이터 길이 무관).
- 예측은 5월·11월 forecast meeting에서 회원사 전문가가 작성. 강한 분기 후 큰 폭 상향(예: 2025 +$45B/+7%p).

## 메모리 수요 예측 적용점

- 전문가 컨센서스(WSTS)를 baseline benchmark로, 추가 정보(데이터기반)로 개선 → ensemble(별도 M5 논문) 정합.
- 예측 horizon별 최적 모델 다름 → MemoCast는 단기(ES)·중기(SARIMA)·장기(GPR/구조) 분리.
- 큰 폭 forecast revision은 사이클 turning point의 예측 한계 → 시나리오·확률예측 필요성 근거.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- arXiv 2404.09334 Human vs Machines: https://arxiv.org/html/2404.09334v1
- WSTS forecasts: https://www.wsts.org/61/Forecasts
- (연계) human-vs-machines-semiconductor-market-forecasting-2024.md
