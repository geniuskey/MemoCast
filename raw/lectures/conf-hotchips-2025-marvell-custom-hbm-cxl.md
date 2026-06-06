---
source_url: https://www.servethehome.com/marvell-shows-dense-sram-custom-hbm-and-cxl-with-arm-compute-at-hot-chips-2025/
title: "Marvell Shows Dense SRAM, Custom HBM and CXL with Arm Compute at Hot Chips 2025"
publisher: ServeTheHome / Hot Chips 2025
published: 2025-08-26
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, bit-demand, demand-forecasting]
confidence: high
---

# Hot Chips 2025 — Marvell Custom HBM / CXL / SRAM — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- Hot Chips 2025 (2025-08-26)에서 Marvell이 custom SRAM, custom HBM, CXL+Arm compute 공개.
- ML/AI가 단일 최대 트랙(2개 풀 세션) — 메모리 대역폭이 핵심 주제.
- Custom HBM: 표준 DRAM die를 자체 base die 위에 적층 → on-chip 인터페이스 면적·전력 절감.

## 주요 사실/수치
- Custom SRAM: TSMC 2nm 노드, off-the-shelf IP 대비 대역폭 밀도 17배.
- Custom HBM 인터페이스: 216 lanes × 32 Gbps = 864 GB/s, BER < 1E-30(외삽), die-to-die IP 32Gbps.
- HBM4 스택: 약 2 TB/s per stack.
- Structera A: Arm Neoverse v2 코어 통합 near-memory accelerator(암호화·압축·HW 보안), 고용량 CXL 메모리 확장.
- 메모리 계층: SRAM / HBM / DDR tier 간 latency·bandwidth 최적화.

## 메모리 수요 예측 관련성
- Custom HBM 채택 확대(OpenAI/NVIDIA/AMD 등 가속기)는 가속기당 HBM 스택 수·비트 증가를 의미.
- CXL+Arm near-memory(Structera)는 메모리 확장·풀링으로 데이터센터 DRAM 비트 수요처를 신설.
- 하이퍼스케일러 custom silicon이 메모리 사양을 직접 정의 → HBM/DDR 비트 수요의 새로운 수요 주체로 부상.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm
- https://www.datacenterknowledge.com/data-center-hardware/scaling-the-memory-wall-hbm-cxl-and-the-new-gpu-playbook
