---
source_url: https://intuitionlabs.ai/articles/nvidia-data-center-gpu-specs
title: "AI 랙 GPU-HBM-전력 결합 파라미터 (구조 모델 입력)"
publisher: IntuitionLabs / ArcCompute / Introl / TrendForce
published: 2026
ingested: 2026-06-06
type: dataset
data_file: ai-rack-gpu-hbm-coupling-parameters.csv
unit: count, GB, TB, kW
tags: [hbm, dram, ai-server, datacenter, bit-demand, demand-forecasting, capacity]
confidence: medium
---

# AI 랙 GPU-HBM-전력 결합 파라미터

> 데이터센터 GW → 랙 수 → GPU 수 → HBM bit 수요의 결합 체인 입력값.

## 컬럼 설명

- `system`(GB200/GB300/Rubin), `gpu_per_rack`, `hbm_per_gpu_gb`, `hbm_per_rack_tb`, `total_ram_per_rack_tb`, `power_kw`, `note`, `confidence`

## 출처/수집 메모

- GB200 NVL72: 72 GPU, ~13.4TB RAM, ~120kW.
- GB300(B300): GPU당 288GB HBM3e(12-high), 8TB/s, 1400W TDP. NVL72 ~20.7TB HBM.
- Vera Rubin: GPU당 288GB HBM4, 13TB/s. NVL144 = 3.6 ExaFLOPS FP4.
- 데이터센터가 2026 고급 메모리 칩의 ~70% 소비.

## 메모리 수요 예측 활용 (결합 체인)

- **HBM bit 수요 ≈ (데이터센터 GW / 랙당 kW) × 랙당 GPU × GPU당 HBM GB**.
- power_kw 컬럼으로 power-limited 제약(별도 power- 파일)과 직접 연결: GW 제약 → 랙 수 상한 → HBM 상한.
- 세대전환(GB200→GB300→Rubin)의 GPU당 HBM 증가(192→288GB)가 bit 수요 비선형 상승.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[structural-demand-model]] · [[demand-forecasting]] · [[scenario-analysis]]
