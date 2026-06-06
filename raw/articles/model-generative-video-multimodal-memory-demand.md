---
source_url: https://www.leoniscap.com/research/sora-and-the-future-of-ai-video-generation
title: "생성형 비디오/멀티모달 AI 메모리·compute 수요 (Sora)"
publisher: Leonis Capital / Introl / MindStudio / arXiv (Open-Sora)
published: 2026
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, datacenter, demand-forecasting, bit-demand]
confidence: medium
---

# 생성형 비디오/멀티모달 메모리 수요 — extracted notes

> 비디오 생성은 토큰·attention 폭증으로 메모리 집약 극단 사례. inference 경제의 한계.

## 핵심 수치

- 비디오 생성 compute 비용 **$0.50~2.00/generation**(텍스트·이미지 대비 orders of magnitude↑). 10초 Sora ~$1.30(GPU 40분/4-GPU 8~10분).
- **요청당 수십 GB 메모리**, attention이 수천 프레임. 5초 720p에 **80,000+ 토큰**, attention이 추론시간 85%+.
- 프로덕션: 1-8x H200(141GB) + 1-2TB 시스템 RAM + NVMe.
- OpenAI Sora 일 $1M 손실로 2026-04-26 중단(inference cost wall). Open-Sora 2.0는 학습 $200K로 효율화.

## 메모리 수요 예측 관련성

- 멀티모달(비디오)은 토큰/요청이 텍스트의 수십~수백 배 → HBM capacity/대역폭 수요 극대화.
- inference cost wall(Sora 중단)은 수요 지속성의 경제적 한계 사례(bear 신호).
- 효율화(Open-Sora)는 Jevons 분기 — 비용↓가 사용량↑로 메모리 수요 재증가 가능.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- Introl video gen infra: https://introl.com/blog/video-generation-ai-infrastructure-sora-scale-models-guide-2025
- MindStudio inference cost wall: https://www.mindstudio.ai/blog/inference-costs-ai-wall-sora-shutdown
- Open-Sora 2.0 (arXiv): https://arxiv.org/html/2503.09642v1
