---
source_url: https://arxiv.org/html/2412.19437v1
title: "DeepSeek-V3 Technical Report"
publisher: DeepSeek-AI (arXiv)
published: 2024-12-27
ingested: 2026-06-06
type: article
tags: [hbm, ai-server, datacenter, demand-forecasting, bit-demand]
confidence: high
---

# DeepSeek-V3 Technical Report — extracted notes

> 원천 요약 노트. 671B MoE 모델의 파라미터/활성 파라미터/메모리 풋프린트 및 FP8 학습 효율. MoE가 HBM 용량 수요에 주는 영향 핵심 사례.

## 핵심 수치
- 총 파라미터 671B, 토큰당 활성 파라미터 37B (Mixture-of-Experts)
- 각 MoE 레이어: 1 shared expert + 256 routed experts, expert 중간 hidden dim 2048
- 토큰당 8개 expert 활성, 토큰당 최대 4개 노드로 라우팅
- Hugging Face 총 모델 크기 685GB (671B 본체 + 14B MTP 모듈)
- 전체 학습 비용 2.788M H800 GPU 시간
- FP8 학습 최초 검증 → BF16/FP16 대비 메모리 절감 + throughput 2배
- 효율적 추론을 위해 Multi-head Latent Attention (MLA), DeepSeekMoE 채택
- 학습 클러스터: NVIDIA H800 GPU (HBM3)

## 수요 동인 (모델/소프트웨어)
- MoE 핵심 trade-off: 활성 파라미터(37B)는 작지만 전체 가중치(671B/685GB)는 HBM에 상주해야 함 → 용량 수요는 dense 수준 유지
- FP8 채택으로 모델당 메모리는 절감되나(약 절반), Jevons 효과로 배포 확대 가능
- MLA로 KV cache 압축 → 장문맥 추론 메모리 완화

## 메모리 수요 예측 관련성
- MoE는 "활성 파라미터 작음 → 메모리 절감" 오해가 있으나, 전체 weight를 HBM에 적재해야 하므로 용량 수요는 여전히 거대 (685GB → 다수 GPU 필요)
- 671B급 오픈모델 등장으로 온프레미스/로컬 배포 증가 → DRAM/HBM 수요 저변 확대
- FP8 효율화 + 오픈소스화가 추론 배포 폭증을 유발(Jevons)하는 대표 사례

## 관련 wiki
- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처
- https://arxiv.org/pdf/2412.19437
- https://huggingface.co/deepseek-ai/DeepSeek-V3
- https://www.infoq.com/news/2025/01/deepseek-v3-llm/
- https://apxml.com/models/deepseek-v3
