---
source_url: https://www.sciencedirect.com/science/article/abs/pii/S036083521930573X
title: "Demand forecasting and financial estimation considering the interactive dynamics of semiconductor supply-chain companies"
authors: (Computers & Industrial Engineering authors — 검증 필요)
publisher: Computers & Industrial Engineering (Elsevier)
published: 2019
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, causal-model, supply-chain]
confidence: medium
---

# Demand Forecasting and Financial Estimation w/ Interactive Dynamics of Semiconductor Supply-Chain Companies — extracted notes

> 칩설계-제조-패키징/테스트 기업 간 상호동학을 VAR로 포착해 수요예측·재무추정을 결합한 연구.

## 문제/목표
- 전통적 기법이 공급망 구성원 간 시차 인과(time-lag causality)와 상호동학을 반영 못함.
- 반도체 공급망(칩설계·제조·패키징/테스트) 전반의 수요예측 + 재무추정 통합 프레임 제안.

## 방법론
- (1) 제품 변동성 수용을 위한 시계열 모델로 수요예측.
- (2) Vector Autoregression(VAR)으로 공급망 구성원 간 상호동학(경쟁/협력) 포착 → 재무추정.
- (3) 회귀(regression) 기반 민감도 분석.

## 핵심 결과
- 소비재 수요예측이 칩설계사 매출 예측에 유효.
- 칩제조·패키징/테스트사 간 상호동학은 경쟁 또는 협력으로 나타남(수직/수평 동학).

## 메모리 수요 예측 적용점
- 메모리 밸류체인(소비재 수요 → 모듈/세트 → DRAM/NAND)의 시차 인과를 VAR로 연결하는 구조적 모델.
- 최종수요(스마트폰·서버·PC) 변수로부터 메모리사 매출을 역산하는 transmission 채널 설계.
- 민감도 분석(회귀)으로 수요 변수 충격의 매출 탄력성 측정.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://www.researchgate.net/publication/336177316
- 관련: 모회사 연구 "Demand planning and sales forecasting for motherboard manufacturers" https://www.sciencedirect.com/science/article/abs/pii/S0360835220304976
