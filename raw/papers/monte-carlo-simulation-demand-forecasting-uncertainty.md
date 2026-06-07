---
source_url: https://www.sciencedirect.com/science/article/pii/S2949863526000191
title: "Monte Carlo simulation — 수요예측 불확실성·확률적 최적화"
authors: (ScienceDirect 2026 MC-RIO) 외; MC 수요예측 문헌
publisher: ScienceDirect / ERSJ / Wiley / IJISSET
published: 2024-2026
ingested: 2026-06-07
type: paper
tags: [demand-forecasting, scenario-analysis, probabilistic-forecasting, supply-chain]
confidence: medium
---

# Monte Carlo simulation — 수요 불확실성 — extracted notes

> 점추정 대신 수천 시나리오 시뮬레이션으로 수요/가격 분포·리스크 정량. MemoCast 시나리오 엔진.

## 문제/목표

- 불확실/랜덤 수요에서 분포 기반 예측 + 공급충격·수요변동 시나리오 평가.

## 방법론 / 핵심 결과

- 과거 데이터에 분포 적합 → 수천 회 sampling → 수요 분포·신뢰구간(95%) 산출. 단순 평균법 능가(불확실성 환경).
- 시나리오 모델링: 수요변동·공급disruption을 파라미터로 → 결과 분포.
- 2026 MC-RIO: 점예측 포기, 확률적 simulation-augmented 최적화.

## 메모리 수요 예측 적용점

- MemoCast 시나리오: 가정(bit growth, AI capex, ASP 탄력성)을 분포로 두고 **MC로 수요/가격 분포** 산출 → bull/base/bear 대신 연속 분포.
- 입력 불확실성(wafer 환산, 콘텐츠, 채택률 dataset)을 MC로 전파 → 출력 신뢰구간.
- CQR/확률예측(별도 논문)과 상보 — MC는 구조모델 기반, CQR은 데이터 기반.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[sensitivity-analysis]] · [[structural-demand-model]]

## 추가 출처

- MC as demand forecasting tool (ERSJ): https://ersj.eu/journal/3391/download/Monte+Carlo+Simulation+as+a+Demand+Forecasting+Tool.pdf
- MC demand risk (IJISSET): https://ijisset.org/storage/Volume6/Issue2/IJISSET-060209.pdf
- Wiley 재고 MC 교육: https://onlinelibrary.wiley.com/doi/10.1111/dsji.12328
