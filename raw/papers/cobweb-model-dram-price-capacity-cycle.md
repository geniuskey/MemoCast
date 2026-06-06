---
source_url: https://en.wikipedia.org/wiki/Cobweb_model
title: "Cobweb model — DRAM 가격·capacity 사이클 (lagged supply)"
authors: Ezekiel(1938) 외; 응용: DRAM cobweb 예측
publisher: Wikipedia / ScienceDirect / RePEc / USPTO
published: 1938-2012
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, pricing, scenario-analysis, causal-model, supply-chain]
confidence: medium
---

# Cobweb model — DRAM 가격·capacity 사이클 — extracted notes

> 메모리 boom-bust의 이론적 골격. 공급이 lagged price 기대에 반응 → 사이클.

## 문제/목표

- 생산자가 과거 가격 기대로 공급 결정 → lag으로 인한 주기적 가격/물량 진동(거미줄 패턴) 설명.

## 방법론

- Cobweb(Ezekiel 1938): 공급 lag + price expectation. 수렴/발산/순환은 공급·수요 탄력성 비율로 결정.
- 확장: multi-frequency cobweb(hog cycle, Fourier), capacity vintage·investment lag이 cyclicality 강화.
- DRAM 응용: cobweb-type 모델로 DRAM 가격 예측(가격사 + capacity utilization 백분위 활용).

## 핵심 결과

- 공급탄력성 > 수요탄력성이면 발산(진폭 확대). 메모리는 긴 fab lag + 비탄력 단기수요 → 강한 사이클.
- capacity utilization이 가격의 선행 신호로 작동.

## 메모리 수요 예측 적용점

- 메모리 사이클의 구조적(인과) 설명 프레임 → [[scenario-analysis]]의 가격 진동 메커니즘.
- capacity utilization·capex lag을 입력으로 가격 turning point 모델링.
- "이번엔 다르다"(LTA/HBM 절제)는 공급탄력성 변화로 cobweb 발산 억제로 해석 가능.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[memory-demand]]

## 추가 출처

- Commodity cycles cobweb (ScienceDirect): https://www.sciencedirect.com/science/article/abs/pii/S0167268112000728
- Multi-frequency cobweb hog cycle (RePEc): https://ideas.repec.org/a/oup/ajagec/v56y1974i1p38-49..html
- 가격예측 capacity utilization 특허(USPTO): https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/7693801
