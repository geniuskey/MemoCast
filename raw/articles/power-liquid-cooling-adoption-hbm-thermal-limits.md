---
source_url: https://www.tomshardware.com/pc-components/cooling/the-data-center-cooling-state-of-play-2025-liquid-cooling-is-on-the-rise-thermal-density-demands-skyrocket-in-ai-data-centers-and-tsmc-leads-with-direct-to-silicon-solutions
title: "Data center cooling state of play (2025): liquid cooling on the rise, thermal density skyrockets"
publisher: Tom's Hardware
published: 2025-09-01
ingested: 2026-06-06
type: article
tags: [ai-server, datacenter, hbm, capacity]
confidence: medium
---

# 액냉 채택과 HBM 열 제약 (2025) — extracted notes

> AI 랙 전력 밀도 상승과 HBM 적층 열 한계. 냉각 기술이 메모리 적층·스택 수 확장의 물리적 제약을 결정.

## 핵심 수치
- 직접칩(direct-to-chip) 냉각이 칩 단에서 열부하의 70~80% 제거.
- NVIDIA Blackwell Ultra: HBM3E 8스택 탑재, 최대 1,400W 방열, 약 49.1 W/cm² 열밀도.
- 단상 액냉은 ~100 W/cm² 열유속 대응 가능(고부하 시 성능 저하).
- 차세대 GPU 전력 4.4 kW 이상으로 상승 시 더 고급 냉각 필요.
- GPU 서버 전력 1~5 kW/서버, HBM·고급 가속기로 더 상승.
- AI 데이터센터 액냉 시장 2036년 $17.8B 전망.

## 수요/제약 영향
- 적층 HBM(8~12-Hi)의 열 추출이 스택 내부 다이 온도 제약으로 작용 → 적층 높이·용량 확장의 물리적 한계.
- 액냉 미도입 시 120 kW급 랙 운용 불가 → 냉각 인프라가 buildout 병목.
- 냉각 효율이 PUE를 낮춰 동일 GW에서 더 많은 컴퓨트/메모리 수용 가능.

## 메모리 수요 예측 관련성
- HBM 적층 한계가 GPU당 메모리 용량(GB)·스택 수의 상한을 규정 → 메모리 비트 수요의 단위 강도 결정.
- 액냉 채택 속도가 고밀도 AI 랙 설치 속도와 연동 → HBM 수요 가속 곡선의 인에이블러.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[demand-forecasting]]

## 추가 출처
- https://www.morningstar.com/news/accesswire/1163831msn/ai-datacenter-liquid-cooling-market-to-reach-usd-178-billion-by-2036-as-hyperscale-ai-infrastructure-drives-thermal-management-transformation
- https://airsysnorthamerica.com/data-center-trends-cooling-strategies-to-watch-in-2026/
- https://www.datacenterdynamics.com/en/opinions/liquid-cooling-the-next-evolution-in-data-center-thermal-management/
