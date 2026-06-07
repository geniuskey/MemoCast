---
source_url: https://introl.com/blog/inference-time-scaling-research-reasoning-models-december-2025
title: "Test-time compute(추론 스케일링) 메모리 수요 (2026)"
publisher: Introl / Medium / Spheron / ScienceDirect / arXiv
published: 2026
ingested: 2026-06-07
type: article
tags: [hbm, dram, ai-server, datacenter, demand-forecasting, bit-demand]
confidence: medium
---

# Test-time compute(추론 스케일링) 메모리 수요 — extracted notes

> reasoning 모델의 thinking token 폭증 → KV cache(HBM) 수요 비선형. inference 지배 가속.

## 핵심 수치

- **inference 수요가 2026까지 training의 118배** 전망 → GPU 조달이 inference-optimized로 이동.
- reasoning(o1/o3/DeepSeek-R1)이 일반 chat 대비 **inference compute 30~100배**. OpenAI 2024 inference $2.3B(GPT-4 training의 15배).
- **thinking token이 요청 내내 KV cache 점유**: DeepSeek-R1-70B 12,000토큰 reasoning chain = **~3.9GB KV cache(FP16)**.
- KV cache는 생성 토큰수에 선형 증가, VRAM(HBM) 저장 → scalability 제약.
- thinking token = output token과 동일 compute·메모리.

## 메모리 수요 예측 관련성

- reasoning 확산은 토큰/요청 30~100배 → HBM capacity/대역폭 수요 비선형 증가(model-agentic/inference 파일 정합).
- KV cache(요청당 ~GB)가 HBM의 주요 소비처 → HBM bit 수요의 미시 기초.
- KV cache 압축(arXiv)·offload는 효율화(Jevons 분기) 변수.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- Medium test-time compute 경제: https://medium.com/@Elongated_musk/test-time-compute-quietly-changed-the-economics-of-inference-9d0b8d77641c
- Inference-Time Hyper-Scaling KV cache 압축 (arXiv): https://arxiv.org/pdf/2506.05345
- ScienceDirect inference 에너지/test-time scaling: https://www.sciencedirect.com/science/article/pii/S2542435126001145
