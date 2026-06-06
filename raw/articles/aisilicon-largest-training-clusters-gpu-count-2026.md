---
source_url: https://introl.com/blog/xai-colossus-2-gigawatt-expansion-555k-gpus-january-2026
title: "최대 AI 학습 클러스터 GPU 규모 (xAI/Stargate, 2026)"
publisher: Introl / xAI / Wikipedia / NVIDIA / FinancialContent
published: 2026
ingested: 2026-06-06
type: article
tags: [hbm, ai-server, datacenter, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# 최대 AI 학습 클러스터 GPU 규모 (2026) — extracted notes

> 단일 클러스터 GPU 수 × GPU당 HBM = 클러스터 HBM 수요. bottom-up 최대 수요처.

## 핵심 수치

- **xAI Colossus(Memphis)**: **555,000 GPU**, $18B, 세계 최대. 2026-01-17 Colossus 2 가동(첫 GW급 coherent 학습 클러스터). ~1GW → 2026-04 1.5GW → 총 2GW 계획. GB200/GB300 중심. 목표 **100만 GPU**.
- **Microsoft/OpenAI Stargate Abilene**: 첫 **450,000 GPU** Blackwell 캠퍼스 2026 초 가동.
- Colossus가 차순위 전용 학습 사이트의 4배 전력.

## 메모리 수요 예측 관련성

- 클러스터 HBM 수요 = GPU 수 × GPU당 HBM(192~288GB). 예: 555K GPU × ~250GB ≈ 139,000 TB HBM(단일 사이트).
- GW 규모(ai-rack-coupling 파일)와 결합: 2GW / 랙kW × GPU/랙 × HBM/GPU.
- 단일 메가클러스터가 글로벌 HBM 수요의 유의미한 비중 → 집중 수요 리스크/신호.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- xAI Colossus: https://x.ai/colossus
- Wikipedia Colossus: https://en.wikipedia.org/wiki/Colossus_(supercomputer)
- NVIDIA Spectrum-X xAI: https://nvidianews.nvidia.com/news/spectrum-x-ethernet-networking-xai-colossus
- Grokipedia largest superclusters: https://grokipedia.com/page/List_of_the_largest_AI_superclusters
