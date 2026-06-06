---
source_url: https://www.iea.org/news/ai-is-set-to-drive-surging-electricity-demand-from-data-centres-while-offering-the-potential-to-transform-how-the-energy-sector-works
title: "AI is set to drive surging electricity demand from data centres (Energy and AI report)"
publisher: IEA (International Energy Agency)
published: 2025-04-10
ingested: 2026-06-06
type: article
tags: [datacenter, demand-forecasting, capacity]
confidence: medium
---

# IEA: Data centre electricity to more than double by 2030 (~945 TWh) — extracted notes

> IEA "Energy and AI" 특별 보고서. 글로벌 데이터센터 전력 소비 전망과 장비별 전력 분해(server/storage/cooling)를 제공.

## 핵심 수치
- 글로벌 데이터센터 전력 소비: 2024년 약 415 TWh(전 세계 전력의 ~1.5%) → 2030년 약 945 TWh(2배 이상). 일본 전체 전력 소비 수준.
- AI 최적화 데이터센터 전력 수요는 2030년까지 4배 이상 증가 전망.
- 장비별 전력 분해(현대 데이터센터): 서버 ~60%, 스토리지 ~5%, 네트워킹 최대 ~5%, 냉각/환경제어 효율적 하이퍼스케일 ~7%(비효율 엔터프라이즈는 30%+).
- AI의 데이터센터 전력 점유: 최근 ~5~15% → 2030년 35~50%까지 가능.

## 수요/제약 영향
- 서버가 전력의 ~60%를 차지 → 서버 내 GPU+HBM+DRAM이 전력 수요의 핵심.
- 냉각 전력 비중(7% vs 30%+)이 효율 격차를 좌우 → 액침/직접칩 냉각 채택이 buildout 경제성 결정.
- 945 TWh 수요가 전 세계 전력망에 가하는 부하가 AI 확장의 거시 제약.

## 메모리 수요 예측 관련성
- 서버 전력 비중 60% 중 메모리 부분(HBM/DRAM)이 전력당 메모리 탑재량 산정의 출발점.
- 데이터센터 전력 2배 증가 경로가 AI 서버 설치 대수, 즉 메모리 비트 수요의 거시 상한.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[demand-forecasting]]

## 추가 출처
- https://www.iea.org/reports/energy-and-ai/executive-summary
- https://www.datacenterdynamics.com/en/news/iea-data-center-energy-consumption-set-to-double-by-2030-to-945twh/
- https://www.spglobal.com/energy/en/news-research/latest-news/electric-power/041025-global-data-center-power-demand-to-double-by-2030-on-ai-surge-iea
