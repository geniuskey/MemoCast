---
source_url: https://en.wikipedia.org/wiki/El_Capitan_(supercomputer)
title: "Exascale 슈퍼컴퓨터 HBM 용량 (El Capitan/Frontier/Aurora)"
publisher: Wikipedia / AMD / The Register / arXiv
published: 2025
ingested: 2026-06-06
type: article
tags: [hbm, dram, datacenter, demand-forecasting, bit-demand, capacity]
confidence: high
---

# Exascale 슈퍼컴 HBM 용량 — extracted notes

> HPC는 가속기당 대용량 HBM의 실증 사례. 시스템 단위 HBM 규모 벤치마크.

## 핵심 수치

- **El Capitan (LLNL, 2024-11 세계 1위)**: HBM3 총 **5.4 PB**. MI300A 가속기당 128GB HBM3.
- **Frontier (ORNL)**: 총 메모리 9.2PB(절반 HBM/절반 DDR4) → HBM 약 **4.6 PB**.
- **Aurora (ANL)**: GPU HBM **8.16 PB** + CPU 메모리 12.2PB(DDR5 10.9PB + HBM 1.36PB) → 총 HBM ~9.52 PB.

## 메모리 수요 예측 관련성

- 시스템당 PB급 HBM은 AI 데이터센터 대비 소규모이나, 가속기당 HBM 용량 추세의 검증 사례.
- HPC는 정부 조달로 cyclical 수요와 별개의 안정적 baseline 수요원.
- CPU HBM(Xeon Max, Aurora) 사례는 HBM이 GPU 외 CPU로도 확산하는 신호 → DRAM/HBM 경계 변화.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처

- AMD El Capitan: https://www.amd.com/en/blogs/2025/el-capitan-takes-exascale-computing-to-new-heights.html
- Aurora HBM Xeon Max (arXiv): https://arxiv.org/html/2504.03632v1
- The Register El Capitan: https://www.theregister.com/2024/11/18/top500_el_capitan/
- Frontier Wikipedia: https://en.wikipedia.org/wiki/Frontier_(supercomputer)
