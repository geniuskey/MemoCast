---
source_url: https://www.unikeyic.com/blog/lpddr-memory.html
title: "메모리 타입별 전력/대역폭 (DDR5/LPDDR5/HBM) 비교"
publisher: Unikeyic / ACEMAGIC / PatSnap / arXiv (HBM3e energy)
published: 2026
ingested: 2026-06-06
type: lecture
tags: [dram, hbm, capacity, demand-forecasting, bit-demand]
confidence: medium
---

# 메모리 타입별 전력/대역폭 비교 — extracted notes

> 전력/bit는 power-limited 데이터센터에서 메모리 타입 선택(=수요 mix)을 좌우.

## 핵심 수치

- **LPDDR**: DDR5 대비 **energy/bit 약 절반**. LPDDR5 core 1.05V/IO 0.5V(DDR5보다 낮음). LPDDR4X 대비 전력 20~30%↓(화면 on), standby 50%+↓.
- **HBM3e**: ~7 pJ/bit급(DDRx ~25 pJ/bit 대비, 별도 power-hbm3e 파일). HBM4 ~40% 전력/bit 개선.
- 절대 전력은 HBM stack이 높으나(stack당 수십 W), 대역폭당 효율은 우수.

## 메모리 수요 예측 관련성

- 데이터센터 전력 제약(power-limited)에서 LPDDR(SOCAMM)·HBM 효율이 타입 선택 → 수요 mix shift.
- AI 서버가 효율 위해 LPDDR(Grace, SOCAMM) 채택 증가 → server LPDDR 수요 신규 축.
- 전력/bit 개선(HBM4 -40%)이 동일 전력예산으로 더 많은 메모리 → 수요 상한 완화.

## 관련 wiki

- [[memory-demand]] · [[hbm]] · [[dram]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처

- ACEMAGIC LPDDR5 vs DDR5: https://acemagic.com/blogs/accessories-peripherals/lpddr5-vs-ddr5-ram
- PatSnap DDR5 vs LPDDR5 효율: https://eureka.patsnap.com/report-ddr5-vs-lpddr5-energy-efficiency-in-portable-devices
- (연계) power-hbm3e-energy-per-bit-power-efficiency.md
