---
source_url: https://semiengineering.com/dram-scaling-challenges-grow/
title: "DRAM Scaling Challenges — Capacitor Aspect Ratio & Electron Count Limits"
publisher: Semiconductor Engineering / SemiAnalysis (compiled)
published: 2024
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, bit-demand, wafer]
confidence: medium
---

# DRAM Capacitor Scaling & Aspect Ratio — extracted notes

> 학습/설명 자료 요약 노트. DRAM 1T1C 셀의 커패시터가 미세화 병목인 이유.

## 핵심 개념
- DRAM 셀 = 1 transistor + 1 capacitor(1T1C). 노드 미세화 시 셀 면적은 줄지만 커패시터는 충분한 charge 저장 위해 capacitance 유지 필요.
- 면적이 줄면 커패시터는 더 좁고 더 높게(pillar형) 만들 수밖에 없음 → aspect ratio 급증.
- High-k dielectric(예: ZrO2/Al2O3 기반)로 동일 면적당 capacitance 보강하지만 한계 접근.

## 주요 사실/수치
- 커패시터 aspect ratio가 ~100:1에 접근(높이 ~1µm vs 직경 수십 nm).
- 셀 capacitance ~6~7 fF, 저장 전자 수 ~40,000개(write 직후) 수준으로 감소.
- 추가 미세화 시 capacitance·electron 수 부족 → retention/sensing 실패 위험 → 미세화 사실상 한계.
- 이 물리 제약이 "memory wall"의 공급측 근본 원인.

## 메모리 수요 예측 관련성 (bit supply 함의)
- 커패시터 aspect ratio 한계 = 2D DRAM density 한계 → node migration만으로 supply bit 늘리기 어려움.
- High-k 재료·VCT·4F2로 buffer 가능하나 1회성 이득 후 3D DRAM 전환 불가피.
- 공급 모델: DRAM bit growth는 점점 wafer capacity(증설) 의존도 ↑, 미세화 의존도 ↓.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://newsletter.semianalysis.com/p/the-memory-wall
- https://semiengineering.com/baby-steps-towards-3d-dram/
