---
source_url: https://introl.com/blog/long-context-llm-infrastructure-million-token-windows-guide
title: "LLM 컨텍스트 길이·KV cache·trillion-param 메모리 수요"
publisher: Introl / Morph / arXiv / UC Berkeley
published: 2026-01
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, datacenter, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# LLM 컨텍스트·KV cache 메모리 수요 — extracted notes

> 모델/소프트웨어 트렌드가 HBM bit demand의 최상류 driver.

## 핵심 수치

- **1M 토큰 컨텍스트** production-ready(2025-12). KV cache **약 15GB/user**(1M 토큰).
- Llama 3.1-70B에서 **128K 컨텍스트 KV cache만 약 40GB HBM** → 단일 A100 용량 초과.
- **trillion-param 모델 학습**: Adam+FP16 시 **약 16TB 메모리** 필요(다수 GPU 분산 필수).
- 1M 토큰 시 attention pairwise 관계 1조 개 → 메모리·연산 부담 급증.

## 수요 동인 (모델/소프트웨어)

- 컨텍스트 길이 확장 + 멀티유저 동시처리 → KV cache가 HBM capacity의 주요 소비처.
- 모델 weight + optimizer + activation + KV cache가 device 용량 초과 → 메모리 capacity·대역폭 수요 증가.

## 상쇄 요인 (수요 하방)

- 2026 최적화: KV cache **4-bit/NVFP4 양자화**로 메모리 요구 **절반**(정확도 손실 <1%).
- CXL/PNM로 KV cache를 GPU HBM 밖(DRAM/SSD)으로 offload → HBM 압력 일부 완화하되 DRAM 수요로 전이.

## 메모리 수요 예측 관련성

- HBM/DRAM 수요는 (모델 크기 × 동시 사용자 × 컨텍스트 길이)의 함수 → bottom-up bit demand 입력.
- 양자화·offload는 Jevons 역설 변수(효율↑가 수요↓ 또는 사용량↑로 수요↑ 양방향) → 시나리오 분기.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- Morph LLM inference KV cache: https://www.morphllm.com/llm-inference
- CXL PNM 1M-token KV cache (arXiv): https://arxiv.org/pdf/2511.00321
- KVQuant 10M context (Berkeley): https://www.stat.berkeley.edu/~mmahoney/pubs/neurips-2024-kvquant.pdf
- Atlan context window: https://atlan.com/know/working-memory-llms/
