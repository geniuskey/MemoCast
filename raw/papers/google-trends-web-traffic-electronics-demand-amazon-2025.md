---
source_url: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5915562
title: "Forecasting Consumer Demand for Electronics on Amazon Using Google Trends and Web Traffic Data"
authors: Md Rokonuzzaman Rifat, Jannatul Ferdous Mim, Tawhidul Hoque Ekon
publisher: SSRN working paper
published: 2025
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, time-series, machine-learning, regression]
confidence: low
---

# Forecasting Consumer Demand for Electronics on Amazon Using Google Trends and Web Traffic Data — extracted notes

> Google Trends + 웹 트래픽(대체 데이터)을 결합해 전자제품 수요를 예측하는 통합 프레임워크.

## 문제/목표
- Amazon 상의 전자제품 수요 예측 정확도를 검색 관심도와 웹 트래픽 engagement 지표를 결합해 향상.
- 전통적 통계·ML·딥러닝·하이브리드 모델 간 성능 비교.

## 방법론
- 데이터: 주간(weekly) 단위, 약 3년, 북미·유럽·동아시아 지역.
- 입력: Google Trends 검색 관심도 + SimilarWeb 트래픽 engagement 지표.
- 모델 비교: ARIMA(통계), XGBoost·Random Forest(ML), LSTM(딥러닝), ARIMA-XGBoost(하이브리드).
- Granger causality 분석으로 선행성(lead) 검정.

## 핵심 결과
- 검색 강도(search intensity)가 판매 변동을 약 2주 선행(lead time)함을 Granger causality로 확인.
- 대체 데이터를 결합한 하이브리드 모델이 단일 통계 모델 대비 예측 정확도 개선.

## 메모리 수요 예측 적용점
- 전자제품 최종 수요의 2주 선행 신호는 메모리 단기 bit 수요·spot 가격 nowcasting의 입력 feature로 활용 가능.
- 검색·트래픽 등 alternative data를 ARIMA·ML 하이브리드에 통합하는 구체적 파이프라인 참고.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5915562
- https://ssrn.com/abstract=5915562
