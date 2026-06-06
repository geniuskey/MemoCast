---
source_url: https://semiengineering.com/optimizing-data-center-tco-with-cxl-and-compression/
title: "CXL pooling·stranded memory·TCO (메모리 수요 순효과)"
publisher: SemiEngineering / arXiv / Stanford / Microsoft Azure·Google traces
published: 2026
ingested: 2026-06-06
type: lecture
tags: [dram, datacenter, server, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# CXL pooling·stranded memory·TCO — extracted notes

> CXL이 메모리 수요에 미치는 net effect는 양면(효율↑로 수요↓ vs 신규 계층 수요↑). 핵심 시나리오 변수.

## Stranded memory 문제

- hyperscale(Azure·Google)에서 집계 메모리의 **~40%가 대부분 미사용**(stranded + untouched).
- 메모리는 서버 원가의 ~절반인데 평균 **DRAM의 ~25%가 미사용**.
- 가격 급등기엔 미활용 비용이 과도 → TCO 부담.

## CXL pooling 효과

- CXL pooling이 stranded capacity를 **54% → 19%(8 hosts)**로 축소(queueing 추정).
- TCO 단계적 절감 + local DRAM 경쟁력 성능.

## 회의론

- Stanford/Google: 현대 배포(서버·VM shape)에서 pooling이 거의 도움 안 됨 — workload 의존.

## 메모리 수요 예측 관련성 (net effect 양면)

- **수요 감소 압력**: pooling으로 활용률↑ → 동일 작업에 필요한 총 DRAM 감소(과잉 구매 억제).
- **수요 증가 압력**: CXL이 메모리 capacity 확장(신규 계층)·대용량 in-memory DB 가능케 함.
- 시나리오에서 CXL attach rate(별도 cxl- 파일)와 결합해 net 효과를 별도 변수로 모델링.
- 가격 급등기엔 효율화(pooling) 인센티브 강화 → 수요 탄력성 요인.

## 관련 wiki

- [[memory-demand]] · [[dram]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- A Case Against CXL Memory Pooling (Stanford/Google, HotNets23): https://sing.stanford.edu/site/assets/publications/cxl-hotnets23.pdf
- CXL memory sharing (arXiv): https://arxiv.org/pdf/2404.03245
- Rambus CXL Memory Initiative: https://www.rambus.com/cxl-memory-initiative/
