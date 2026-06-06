---
source_url: https://arxiv.org/abs/2507.02654
title: "Breaking the HBM Bit Cost Barrier: Domain-Specific ECC for AI Inference Infrastructure"
authors: Rui Xie, Asad Ul Haq, Yunhua Fang, Linsen Ma, Sanchari Sen, Swagath Venkataramani, Liu Liu, Tong Zhang
publisher: arXiv (cs.AR) preprint
published: 2025
ingested: 2026-06-06
type: paper
tags: [pricing, bit-demand, supply-chain, scenario-analysis]
confidence: medium
---

# Breaking the HBM Bit Cost Barrier: Domain-Specific ECC for AI Inference Infrastructure — extracted notes

> HBM의 높은 bit당 원가(cost-per-bit) 문제를 시스템 수준 신뢰성 재설계로 완화하는 접근.

## 문제/목표
- HBM은 on-chip ECC, TSV 적층, 낮은 수율로 인해 일반 DRAM 대비 bit당 원가가 매우 높음(통상 5~10배).
- on-chip ECC를 제거하고 결함 처리를 메모리 컨트롤러로 위임하여 bit 원가를 낮추는 것이 목표.

## 방법론
- large-codeword Reed-Solomon 오류 정정 + 경량 fine-grained CRC 검출 결합.
- differential parity update로 write amplification 최소화, 데이터 중요도에 따라 보호 수준 조정(tunable protection).
- 신뢰성을 고정 하드웨어 요건이 아닌 조정 가능한 시스템 파라미터로 재정의.

## 핵심 결과
- bit error rate 10^-3의 가혹한 조건에서도 오류 없는 HBM 대비 78% 이상 처리량(throughput) 유지.
- LLM 추론 workload에서 97% 모델 정확도 보존.
- HBM의 경제적 배치(economical deployment) 가능성 확대.

## 메모리 수요 예측 적용점
- HBM 원가 구조(수율·ECC·TSV)는 가격 → 수요 탄력성 분석의 핵심 입력. 원가 하락(공정/설계 개선)은 HBM 채택 확대 시나리오의 상방 변수.
- bit당 원가 변화가 AI accelerator당 HBM 탑재량·교체주기에 미치는 영향을 가격 민감도 모델에 반영 가능.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://arxiv.org/abs/2507.02654
- https://arxiv.org/pdf/2507.02654
