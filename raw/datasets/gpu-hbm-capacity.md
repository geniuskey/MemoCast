---
source_url: https://wccftech.com/nvidia-blackwell-gpu-architecture-official-208-billion-transistors-5x-ai-performance-192-gb-hbm3e-memory/
title: "NVIDIA GPU 세대별 per-GPU HBM 용량"
publisher: NVIDIA / wccftech / IntuitionLabs (종합)
published: 2025-01-01
ingested: 2026-06-06
type: dataset
data_file: gpu-hbm-capacity.csv
unit: GB (per GPU)
tags: [hbm, capacity]
confidence: medium
---

# NVIDIA GPU 세대별 per-GPU HBM 용량

## 컬럼 설명
- gpu_model: GPU 모델명
- vendor: 제조사
- architecture: 아키텍처 세대
- launch_year: 출시 연도
- hbm_type: HBM 세대 (HBM2e/HBM3/HBM3e)
- hbm_capacity_gb: GPU당 HBM 용량(GB)
- notes: 변형/출처 메모

## 출처/수집 메모
- A100 80GB HBM2e, H100 80GB HBM3, H200 141GB HBM3e는 NVIDIA 공식 스펙.
- B200은 출처에 따라 180~192GB로 표기 — 192GB 채택.
- GB300(Blackwell Ultra) 288GB HBM3e는 H100(80GB) 대비 3.6배.
- 모델별 변형(A100 40GB 등)은 대표값만 기재.

## 메모리 수요 예측 활용
- HBM 비트 수요 = (GPU 출하량) × (per-GPU HBM 용량). 세대 전환마다 용량이 ~1.5-2배 증가.
- HBM 용량 증가 속도가 GPU 출하 증가와 곱해져 HBM bit demand의 가파른 성장을 설명.

## 관련 wiki
- [[bit-demand]] · [[memory-demand]] · [[demand-forecasting]]
