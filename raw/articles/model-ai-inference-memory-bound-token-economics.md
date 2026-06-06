---
source_url: https://www.spheron.network/blog/ai-memory-wall-inference-latency-guide-2026/
title: "AI inference 메모리 바운드·토큰 경제 (HBM 비중)"
publisher: Spheron / SDxCentral / TrendForce / Winbuzzer
published: 2026
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, datacenter, demand-forecasting, bit-demand, pricing]
confidence: medium
---

# AI inference 메모리 바운드·토큰 경제 — extracted notes

> inference가 memory-bound인 점이 HBM 용량·대역폭 수요를 직접 견인.

## 핵심 수치/사실

- inference의 **decode 단계는 본질적으로 sequential**(autoregressive, 토큰 1개씩) → **memory-bandwidth bound**(compute bound 아님).
- 2023→2025 HBM 비용 용량·대역폭 각 +35% 상승(같은 기간 DDR ~절반 하락). HBM3e 프리미엄 server DDR5 대비 4~5배 → 2026말 1~2배로 축소.
- **AI 학습+추론이 2026 HBM 수요의 55%+**. HBM bit 수요 2025 +130%, 2026 +70%.
- 대역폭 스펙: MI300X 5.3TB/s(192GB), H200 4.8TB/s(141GB), B200 ~8TB/s(192GB).

## 수요 동인 (모델/경제)

- "GPU 늘려도 inference latency 안 풀림" — 병목은 메모리 대역폭·용량(Google 엔지니어).
- agent economy(다단계 추론)로 토큰당 메모리 접근 증가 → HBM 수요 비선형 확대.

## 메모리 수요 예측 관련성

- inference 메모리 바운드 특성 → HBM 대역폭/용량이 가속기 수요의 결정 변수.
- 토큰 경제(토큰당 HBM 접근)는 inference 물량 → HBM bit 수요 환산의 미시 기초.
- HBM-DDR5 프리미엄 축소는 capacity 배분(DDR5 vs HBM) 인센티브 변화 → 공급 mix 시나리오.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- SDxCentral inference crisis: https://www.sdxcentral.com/news/ai-inference-crisis-google-engineers-on-why-network-latency-and-memory-trump-compute/
- TrendForce memory wall: https://www.trendforce.com/insights/memory-wall
- Winbuzzer memory bottleneck: https://winbuzzer.com/2026/01/26/memory-bottleneck-llm-inference-hardware-challenge-xcxwbn/
