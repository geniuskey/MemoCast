---
source_url: https://perspectives.nvidia.com/energy-efficient-accelerator-inference-electricity-tco/
title: "NVIDIA Blackwell: 10x more tokens per watt — perf/watt vs Hopper"
publisher: NVIDIA / SemiAnalysis (InferenceMAX)
published: 2025-10-01
ingested: 2026-06-06
type: article
tags: [ai-server, datacenter, hbm, demand-forecasting]
confidence: medium
---

# 가속기 perf/watt 추세 (Blackwell vs Hopper) — extracted notes

> 세대별 perf/watt(tokens/joule) 급개선. 전력 제약 데이터센터에서 효율 향상이 메모리 비트 수요 상단을 결정.

## 핵심 수치
- Blackwell: MoE 모델 기준 MW당 처리량 Hopper 대비 ~10배.
- Blackwell Ultra: Hopper 대비 MW당 성능 최대 ~50배, 토큰당 비용 ~35배 저감(SemiAnalysis).
- LLM 인퍼런스: H100 대비 처리량 ~30배 + 에너지 ~25배 저감 → perf/watt 한 자릿수~order-of-magnitude 개선.
- 절대 전력: Blackwell ~1,000~1,400W vs H100 ~700W(GPU 단). 절대 전력은 증가하나 효율은 크게 개선.
- 토큰/달러: Hopper 대비 9.7배(40 tok/s/user)~65배(116 tok/s/user) 개선.

## 수요/제약 영향
- perf/watt 개선이 동일 GW 전력 예산에서 더 많은 유효 컴퓨트(토큰) 생산 → 전력 제약의 실질 완화.
- 그러나 절대 전력(700W→1,400W) 상승으로 랙 전력 밀도·냉각 부담 동시 증가.
- 효율 개선이 신규 수요(Jevons paradox)를 유발해 총 전력·총 메모리 수요를 더 키울 수 있음.

## 메모리 수요 예측 관련성
- perf/watt 향상은 GPU당 더 높은 메모리 대역폭(HBM)을 요구 → GPU당 HBM 용량·스택 수 증가 압력.
- 전력 제약 하에서 효율이 좋아질수록 동일 GW에서 더 많은 가속기·HBM 배치 가능 → 비트 수요 상단 상향.
- "전력→유효 컴퓨트→메모리 대역폭 수요" 전환 계수(perf/watt)가 수요 모델의 핵심 파라미터.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[demand-forecasting]]

## 추가 출처
- https://newsletter.semianalysis.com/p/inferencex-v2-nvidia-blackwell-vs
- https://developer.nvidia.com/blog/nvidia-blackwell-leads-on-new-semianalysis-inferencemax-benchmarks/
- https://newsletter.semianalysis.com/p/h100-vs-gb200-nvl72-training-benchmarks
