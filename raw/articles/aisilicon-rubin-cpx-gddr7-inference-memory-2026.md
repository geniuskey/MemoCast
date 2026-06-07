---
source_url: https://videocardz.com/newz/nvidia-rubin-cpx-gpu-to-feature-128gb-gddr7-memory-launches-end-of-2026
title: "NVIDIA Rubin CPX (GDDR7 추론칩)·SRAM 대체 (2026)"
publisher: NVIDIA / VideoCardz / SemiAnalysis / Spheron
published: 2026
ingested: 2026-06-07
type: article
tags: [hbm, dram, ai-server, datacenter, demand-forecasting, bit-demand]
confidence: medium
---

# NVIDIA Rubin CPX (GDDR7 추론칩) — extracted notes

> long-context 추론을 GDDR7로(HBM 대신) 처리하는 설계. 메모리 타입 분화(HBM vs GDDR vs SRAM)의 사례.

## 핵심 사실

- Rubin CPX: massive-context 추론 전용. **128GB GDDR7**(HBM4 아님), 30 PFLOPs NVFP4, 3x attention 가속(GB300 대비), 비디오 인코딩/디코딩 HW.
- GDDR7: 512-bit, 30Gbps → **1.8~2.0 TB/s**. 100만 토큰 추론 충족. HBM 대비 저렴·저전력·**advanced packaging 불필요**.
- 용도: 100만 토큰 코딩·생성형 비디오.
- **주의(반전)**: 2025-09 로드맵 등재 → 2026 GTC에서 취소. **Groq 3 LPX(256칩 SRAM 추론)**으로 대체($20B 라이선스).

## 메모리 수요 예측 관련성

- prefill(context)/decode 분리 아키텍처 → context는 GDDR(저비용), decode는 HBM 등 메모리 타입 분화.
- GDDR7 추론칩은 GDDR 수요의 신규 축(crowding out에 추가 압력, gddr7 파일 연계).
- SRAM(Groq) 대체는 메모리 계층 경쟁(HBM↔GDDR↔SRAM) — 타입별 수요 시나리오 변수.

## 관련 wiki

- [[hbm]] · [[dram]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- NVIDIA Rubin CPX 발표: https://nvidianews.nvidia.com/news/nvidia-unveils-rubin-cpx-a-new-class-of-gpu-designed-for-massive-context-inference
- SemiAnalysis Rubin CPX: https://newsletter.semianalysis.com/p/another-giant-leap-the-rubin-cpx-specialized-accelerator-rack
- Spheron Rubin CPX 취소: https://www.spheron.network/blog/nvidia-rubin-cpx-long-context-inference/
