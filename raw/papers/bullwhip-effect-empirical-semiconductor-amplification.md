---
source_url: https://arxiv.org/html/2604.13478
title: "Bullwhip effect 실증 측정·증폭 (반도체)"
authors: deepbullwhip (arXiv 2604.13478) / 반도체 CFB·BWE 실증 / Lee et al.
publisher: arXiv / Springer / Management Science
published: 2021-2026
ingested: 2026-06-07
type: paper
tags: [demand-forecasting, supply-chain, scenario-analysis, inventory]
confidence: high
---

# Bullwhip effect 실증·증폭 (반도체) — extracted notes

> 반도체 공급망의 수요 증폭(가수요)을 정량 측정. 메모리 가수요/재고 사이클의 핵심 메커니즘.

## 핵심 측정/수치

- **Bullwhip Ratio = σ²(공급사 주문) / σ²(고객 수요)**. 1.0=무증폭, 4.0=주문분산 4배.
- 반도체 238사(2010-2020) 실증: 평균 **CFB(cash-flow bullwhip) 3.95, BWE(전통) 2.77**.
- 2020-2022 반도체 부족: 자동차·전자가 실수요의 배수 주문 → 2022-2023 대량 취소로 재고 과잉.
- 4-echelon 반도체 시뮬: 누적 증폭 **427×**, 상류 variance ratio filtering, foundry lead time에 super-exponential 민감.

## 메모리 수요 예측 적용점

- 메모리 가수요(over-ordering, OEM 헤지 파일 연계)를 bullwhip ratio로 정량 → 실수요 vs 주문 분리.
- 긴 fab lead time(427× 증폭)이 메모리 사이클 진폭의 구조적 원인(cobweb 파일 정합).
- 재고 사이클(별도 dataset)·allocation 행태가 bullwhip 입력 → turning point 후 반락 리스크.

## 관련 wiki

- [[demand-forecasting]] · [[scenario-analysis]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처

- Lee et al. Information Transmission bullwhip (Management Science): https://pubsonline.informs.org/doi/10.1287/mnsc.1110.1467
- Cash-flow bullwhip 반도체 (Springer): https://link.springer.com/chapter/10.1007/978-3-030-85902-2_8
- Infineon bullwhip 사례: https://www.researchgate.net/publication/265646900_The_Bullwhip_Effect_in_the_Semiconductor_Industry_on_the_Example_of_Infineon_Technologies
