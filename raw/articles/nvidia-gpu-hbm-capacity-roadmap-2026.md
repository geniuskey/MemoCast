---
source_url: https://www.spheron.network/blog/nvidia-b300-blackwell-ultra-guide/
title: "NVIDIA Data Center GPU HBM 용량 로드맵 (B200/B300/Vera Rubin)"
publisher: Spheron / IntuitionLabs / Introl (집계)
published: 2026-01-01
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, datacenter, bit-demand, demand-forecasting]
confidence: medium
---

# NVIDIA Data Center GPU HBM 용량 로드맵 — extracted notes

> NVIDIA AI 가속기 세대별 GPU 1개당 HBM 탑재 용량/대역폭 추이. HBM bit 수요의 핵심 동인.

## 핵심 내용
- **B200 (Blackwell)**: 192GB HBM3E, 대역폭 8 TB/s. 스택 구성 8-Hi 기반.
- **B300 / Blackwell Ultra**: 288GB HBM3E (12-Hi 스택), 대역폭 8 TB/s. B200 대비 GPU당 용량 +50% (192GB→288GB).
- **Vera Rubin (2026 H2, TSMC 3nm)**: 288GB HBM4, 대역폭 13 TB/s. HBM3E → HBM4 세대 전환.
- **Rubin Ultra (2027)**, **Feynman (2028)**: 차세대 HBM 적용 예정 (용량 추가 상승 전망).
- GB200/GB300 NVL 시스템은 GPU 다수 + Grace CPU(LPDDR) 통합 → 랙당 HBM 탑재량 급증.

## 수요 동인
- 가속기 1개당 HBM 용량이 세대마다 50% 안팎 증가 (192→288GB) → 가속기 출하 증가와 곱해져 HBM bit 수요가 비선형 증가.
- HBM4 전환으로 단위 용량당 die 수/공정 부담 증가 → wafer 소모 가속.
- TrendForce: HBM 1GB는 표준 DRAM 대비 약 4배의 wafer capacity 소모 → HBM 비중 증가가 전체 DRAM 공급을 잠식.

## 메모리 수요 예측 관련성
- HBM bit 수요 = (가속기 출하량) × (가속기당 HBM 용량) × (세대 mix). 세대당 용량 +50%는 출하 증가 없이도 수요를 끌어올림.
- HBM4 채택 시 동일 용량이라도 표준 DRAM 환산 capacity 소모가 더 커 capacity 모델에 가중치 필요.
- 2026 H2 Vera Rubin 양산 시점이 HBM4 수요 변곡점.

## 관련 wiki
- [[memory-demand]] · [[hbm-demand]] · [[ai-server-memory]] · [[demand-forecasting]]

## 추가 출처
- https://intuitionlabs.ai/articles/nvidia-data-center-gpu-specs
- https://introl.com/blog/nvidia-blackwell-ultra-b300-infrastructure-requirements-2025
- https://slyd.com/hardware/nvidia-blackwell
