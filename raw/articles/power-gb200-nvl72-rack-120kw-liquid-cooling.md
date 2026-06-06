---
source_url: https://www.theregister.com/2024/03/21/nvidia_dgx_gb200_nvk72/
title: "A closer look at Nvidia's 120kW DGX GB200 NVL72 rack system"
publisher: The Register / NVIDIA
published: 2024-03-21
ingested: 2026-06-06
type: article
tags: [ai-server, datacenter, hbm, capacity]
confidence: medium
---

# NVIDIA GB200 NVL72: 120kW 랙과 강제 액냉 — extracted notes

> GB200 NVL72 랙의 전력·냉각 사양. AI 랙 전력 밀도가 액냉을 필수화하고 메모리 열 제약을 결정.

## 핵심 수치
- NVL72 랙: 36 GB200 노드 = 72 GPU + 36 Grace CPU, 랙당 ~120 kW.
- GB200 Grace Blackwell Superchip 1개당 최대 ~1,200W 방열.
- 직접칩(direct-to-chip) 액냉 필수: 모듈당 냉각수 유량 2~3 L/min 이상, 입수 온도 30~45°C.
- 콜드플레이트 모듈당 최대 1,200W 처리, 운전 압력 최대 6 bar.
- 공냉 가정 시 팬 전력이 랙 컴퓨트 전력의 20~30% 소모 + 90 dB 이상 소음 → 사실상 불가.

## 수요/제약 영향
- 랙당 120 kW는 전통 데이터센터 랙(5~15 kW) 대비 한 자릿수 배 높음 → 전력·냉각 인프라 재구축 필요.
- 액냉 필수화가 신규 buildout의 CAPEX·리드타임을 증가시켜 가속기/HBM 배치 속도 제약.
- 랙 전력 밀도 상승이 단위 전력당 탑재 가능한 GPU·HBM 스택 수를 직접 규정.

## 메모리 수요 예측 관련성
- NVL72 1랙 = HBM 다량 탑재처(72 GPU × GPU당 HBM 스택). 랙 설치 대수가 HBM 비트 수요와 직결.
- 120 kW/랙 제약이 데이터센터 전력 예산(GW) 대비 설치 가능 랙 수, 즉 HBM 수요 상한 산정 기준.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[demand-forecasting]]

## 추가 출처
- https://www.nvidia.com/en-us/data-center/gb200-nvl72/
- https://www.supermicro.com/datasheet/datasheet_SuperCluster_GB200_NVL72.pdf
- https://newsletter.semianalysis.com/p/gb200-hardware-architecture-and-component
