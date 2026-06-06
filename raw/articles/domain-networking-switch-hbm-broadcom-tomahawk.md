---
source_url: https://www.broadcom.com/company/news/product-releases/63146
title: "네트워킹 스위치/DPU의 HBM·고대역폭 메모리 (Broadcom Tomahawk 6 / Ultra)"
publisher: Broadcom / The Next Platform
published: 2025-06-03
ingested: 2026-06-06
type: article
tags: [hbm, dram, demand-forecasting, capacity, bit-demand]
confidence: medium
---

# 네트워킹 스위치/DPU HBM 메모리 — extracted notes

> AI 데이터센터 스케일업/스케일아웃 네트워킹이 스위치 ASIC·DPU에 고대역폭 메모리를 통합. HBM의 네트워킹 칩 채택 사례.

## 핵심 수치
- **Broadcom Tomahawk 6**: 단일 칩 **102.4 Tbps** 스위칭 — 업계 최초, 기존 최고 대비 2배.
  - TH6-200G(512×200G SerDes), TH6-100G(1,024×100G SerDes), CPO 버전 TH6-Davisson 후속.
- **Tomahawk Ultra**: 랙당 Intel Gaudi 3 가속기 최대 64개 all-to-all 연결, 총 **HBM 대역폭 76.8 TB/s**; SUE 적용 시 XPU 간 <400ns 지연.
- Tomahawk 5(BCM78900): 51.2 Tbps.
- 차세대 102.4 Tbps급 이더넷 스위치 ASIC에 대한 AI 데이터센터 수요 급증(The Next Platform).
- 경쟁: NVIDIA(Spectrum/Quantum), Cisco가 fat AI interconnect 진입.

## 수요 동인
- AI 스케일업 패브릭(NVLink/SUE/UALink)·co-packaged optics(CPO)가 스위치/DPU 패키지에 HBM 또는 고대역폭 DRAM 통합 유도.
- 가속기 클러스터 규모 확대 → 스위치 처리량·버퍼 메모리 동반 증가.

## 메모리 수요 예측 관련성
- 네트워킹 칩의 HBM/고대역폭 메모리 채택은 GPU 외 신규 HBM 수요 채널. 절대량은 가속기 대비 작으나 스케일업 패브릭 확산 시 incremental.
- 스위치 ASIC 출하·포트 밀도가 동인. HBM bit 수요 예측의 보조 변수.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처
- https://www.broadcom.com/company/news/product-releases/63341
- https://www.nextplatform.com/2025/06/03/the-ai-datacenter-is-ravenous-for-102-4-tb-sec-ethernet/
- https://www.broadcom.com/products/ethernet-connectivity/switching/strataxgs/bcm78900-series
