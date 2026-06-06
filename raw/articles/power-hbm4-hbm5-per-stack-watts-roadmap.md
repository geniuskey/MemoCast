---
source_url: https://www.tomshardware.com/tech-industry/semiconductors/samsung-shows-first-hbm5-mockup-at-computex-with-heat-path-block-cooling
title: "HBM4/HBM5 per-stack power and thermal roadmap (KAIST projection)"
publisher: Tom's Hardware / KAIST / SK hynix / Samsung
published: 2026-01-26
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, capacity, demand-forecasting]
confidence: low
---

# HBM4/HBM5 스택당 전력·열 로드맵 — extracted notes

> HBM 세대별 전력 효율 개선과 스택당 절대 전력 상승. 메모리 발열이 적층·용량 확장의 차세대 제약.

## 핵심 수치
- HBM4: HBM3E 대비 bit당 전력 약 40% 감소, 열성능 약 4% 개선.
- HBM4 인터페이스 폭 1024-bit → 2048-bit로 2배(전력 효율·열 대응 목적).
- HBM5(KAIST 로드맵 전망): 4,096-bit 인터페이스, 스택당 약 4 TB/s, 스택당 약 100 W 전력.
- Samsung HBM5 목업: Heat Path Block 냉각 적용(열 관리 경쟁 본격화).
- HBM4 양산: Samsung/SK hynix 2026년 본격화, NVIDIA Rubin 향.

## 수요/제약 영향
- bit당 전력은 세대마다 감소하나, 대역폭·용량 증가로 스택당 절대 전력은 상승(HBM5 ~100W/스택).
- GPU당 HBM 스택 수(8→다수) × 스택당 전력 누적 → 패키지 열밀도가 냉각 한계 압박.
- 메모리 발열이 스택 높이(12-Hi, 16-Hi)·동작속도 확장의 물리적 제약.

## 메모리 수요 예측 관련성
- 스택당 전력 상승이 전력-제약 데이터센터에서 GPU당 탑재 가능 HBM 스택/용량의 상한을 규정.
- bit당 전력 40% 개선(HBM4)이 동일 전력 예산 대비 메모리 비트 수요 상단을 끌어올림.
- HBM5 ~100W/스택은 향후 패키지·랙 전력 예산 산정의 핵심 입력.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[demand-forecasting]]

## 추가 출처
- https://tecknexus.com/sk-hynix-hbm4-worlds-first-hbm4-chip/
- https://www.eetimes.com/sk-hynix-maintains-memory-leadership-with-first-hbm4/
- https://en.wikipedia.org/wiki/High_Bandwidth_Memory
