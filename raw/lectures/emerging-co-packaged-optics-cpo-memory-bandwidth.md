---
source_url: https://www.tomshardware.com/networking/nvidia-outlines-plans-for-using-light-for-communication-between-ai-gpus-by-2026-silicon-photonics-and-co-packaged-optics-may-become-mandatory-for-next-gen-ai-data-centers
title: "Co-Packaged Optics (CPO) / 광 I/O 와 메모리 대역폭"
publisher: NVIDIA / Tom's Hardware / Siemens / IDTechEx
published: 2026
ingested: 2026-06-06
type: lecture
tags: [hbm, ai-server, datacenter, demand-forecasting, capacity, bit-demand]
confidence: medium
---

# Co-Packaged Optics (CPO) / 광 I/O — extracted notes

> 인터커넥트 대역폭/전력 혁신이 가속기 scale-up을 풀어 HBM 수요 한계를 확장.

## 핵심 개념

- CPO = optical engine을 switch ASIC·가속기 패키지에 인접/통합 → 전기 거리(inch→mm) 축소, 대역폭 밀도↑·전력/지연↓.
- GPU-GPU·가속기 인터커넥트를 동(copper)에서 광으로 대체(scale-up/scale-out).

## 주요 사실/수치

- NVIDIA Spectrum-X·Quantum-X 실리콘 포토닉스 스위치(GTC 2025), 2026 상용. 최대 **409.6 Tb/s**, 800Gb/s 512포트.
- 전력 절감 최대 **3.5배**, 복원력 10배. 1.6T 네트워크 링크 전력 30W→9W.
- sub-pJ/bit 효율 경로.

## 메모리 수요 예측 관련성

- 인터커넥트 병목 완화 → 더 큰 GPU 도메인(NVL 확장) → 가속기당/도메인당 HBM 집적 증가 가능.
- 전력 효율 개선은 power-limited 시나리오 완화 → AI compute(=HBM 수요) 상한 상향.
- CPO/광 I/O는 메모리 disaggregation(원격 메모리 풀)도 가능케 해 장기 메모리 토폴로지 변화.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- NVIDIA CPO blog: https://developer.nvidia.com/blog/scaling-ai-factories-with-co-packaged-optics-for-better-power-efficiency/
- Siemens 5 trends CPO 2026: https://blogs.sw.siemens.com/semiconductor-packaging/2026/02/05/five-key-trends-of-co-packaged-optics-cpo-in-2026/
- IDTechEx NVIDIA vs Broadcom CPO: https://www.idtechex.com/en/research-article/co-packaged-optics-race-strategic-approaches-from-nvidia-and-broadcom/34467
