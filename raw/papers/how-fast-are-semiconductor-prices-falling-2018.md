---
source_url: https://onlinelibrary.wiley.com/doi/abs/10.1111/roiw.12308
title: "How Fast are Semiconductor Prices Falling?"
authors: David M. Byrne, Stephen D. Oliner, Daniel E. Sichel
publisher: Review of Income and Wealth, Vol. 64(3), pp. 679-702 (working paper: NBER w21074, 2015)
published: 2018
ingested: 2026-06-06
type: paper
tags: [pricing, regression, bit-demand]
confidence: high
---

# How Fast are Semiconductor Prices Falling? — extracted notes

> 반도체(특히 MPU) 가격하락 속도를 hedonic 회귀로 재측정해 PPI의 과소측정을 지적한 논문.

## 문제/목표
- 공식 PPI는 2000년대 중반 이후 반도체 가격이 거의 하락하지 않는다고 보고 → MPU 성능 개선과 모순.
- 진짜 품질조정 가격하락 속도를 측정.

## 방법론
- Intel 데스크톱 MPU에 hedonic regression 적용 → 품질조정 가격지수 구축.
- matched-model(PPI) 방식과 hedonic 방식 비교.

## 핵심 결과
- Intel의 가격책정 행태 변화와 맞물려 PPI의 matched-model 방법이 2000년대 중반부터 편향.
- hedonic 지수는 여전히 빠른 가격하락(품질조정)을 보여줌 → PPI는 가격하락을 과소측정.

## 메모리 수요 예측 적용점
- 메모리 cost-per-bit/ASP 시계열 구축 시 품질조정(hedonic) 필요성의 근거.
- 명목 ASP가 아니라 품질조정 가격으로 수요탄력성을 측정해야 elasticity bias를 피함.
- bit 단가 하락 속도(학습곡선)를 hedonic으로 정량화하는 방법론.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://www.nber.org/papers/w21074
- https://www.nber.org/system/files/working_papers/w21074/w21074.pdf
- https://www.federalreserve.gov/econresdata/feds/2017/files/2017005pap.pdf
