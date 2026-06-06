---
source_url: https://www.mdpi.com/2079-9292/14/13/2682
title: "Thermal Issues in Hybrid Bonding of 3D-Stacked HBM: A Comprehensive Review"
authors: (MDPI Electronics review) + SemiEngineering/Onto Innovation 종합
publisher: MDPI Electronics / Semiconductor Engineering / Onto Innovation
published: 2025
ingested: 2026-06-06
type: paper
tags: [hbm, capacity, demand-forecasting, supply-chain, bit-demand]
confidence: medium
---

# HBM thermal/warpage/TSV 신뢰성 (3D stack) — extracted notes

> HBM yield는 HBM 실효 공급(effective bit supply)을 결정 → 수요 충족 속도 제약.

## 문제/목표

- 12-Hi/16-Hi HBM 적층에서 thermal hotspot·warpage·TSV 신뢰성이 yield·신뢰성 좌우.

## 핵심 사실/수치

- **8-Hi → 12-Hi 전환 시 yield 15~20% 감소**(예비 산업 데이터), 16-Hi는 추가 악화 가능.
- warpage 기준: 패키지 전체 **<50μm** 권고. CTE mismatch가 delamination·copper protrusion 유발(적층 높을수록 심화).
- TSV: 높은 aspect ratio로 void 형성·stress 파손·copper diffusion·crosstalk·timing 이슈.
- hybrid bonding이 적층 밀도↑ 해법이나 thermal 관리 난제 동반.

## 메모리 수요 예측 적용점

- HBM "공급"은 die capacity가 아니라 **yield 반영 effective capacity**로 모델링해야 함.
- 16-Hi yield penalty는 HBM4/HBM4E 공급 ramp 곡선의 하방 리스크 → 시나리오 변수.
- yield 개선 속도가 HBM bit demand 충족 시점(가격 완화 시점)을 좌우.

## 관련 wiki

- [[hbm]] · [[demand-forecasting]] · [[scenario-analysis]] · [[bit-demand]]

## 추가 출처

- SemiEngineering thermal/warpage 2.5D HBM: https://semiengineering.com/deterministic-solver-accurate-thermal-and-warpage-analysis-at-manufacturing-resolution-for-advanced-2-5d-hbm-packages/
- Onto Innovation interconnect/yield: https://ontoinnovation.com/resources/bridging-performance-and-yield-the-evolving-role-of-interconnect-technologies-in-hbm/
- Siemens HBM3e/HBM4 IC design guide: https://blogs.sw.siemens.com/semiconductor-packaging/2026/04/24/hbm3e-hbm4-ic-design-guide/
- PatSnap 12/16-Hi reliability: https://eureka.patsnap.com/report-hbm4-stack-configurations-12-hi-and-16-hi-structures-and-reliability
