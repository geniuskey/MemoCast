---
source_url: https://arxiv.org/abs/2509.07218
title: "Electricity Demand and Grid Impacts of AI Data Centers: Challenges and Prospects"
authors: Xin Chen, Xiaoyang Wang, Ana Colacelli, Matt Lee, Le Xie
publisher: arXiv preprint
published: 2024
ingested: 2026-06-06
type: paper
tags: [demand-forecasting, scenario-analysis, supply-chain, bit-demand]
confidence: medium
---

# Electricity Demand and Grid Impacts of AI Data Centers: Challenges and Prospects — extracted notes

> AI 데이터센터의 전력 수요와 전력망 영향(주파수·전압 안정성)을 종합 검토한 논문.

## 문제/목표
- AI 데이터센터의 급증하는 전력 소비와 그것이 전력망 안정성·운영에 미치는 함의를 정리.
- AI 인프라 급팽창에서 발생하는 도전과 grid 통합을 위한 해법·기회 탐색.

## 방법론
- 포괄적 리뷰: GPU 아키텍처(NVIDIA, Google TPU)별 전력 수요 정량화, 설비 수준 고려.
- grid 영향 평가(주파수 조정, 전압 안정성, 고조파 왜곡), 냉각·전력분배·발열 관리 인프라 분석.
- 지역 grid 사례연구(PJM, ERCOT, NYISO), 단기·장기 전력 수요 예측 접근법 비교.

## 핵심 결과
- AI 데이터센터 전력 수요는 빠르게 증가, 지역 grid에 집중 리스크와 스트레스 유발.
- 냉각 인프라가 compute 하드웨어 외 상당한 보조 전력을 차지.
- AI workload 패턴과 모델 스케일링 추세의 불확실성으로 수요 예측이 어려움.
- demand response, 재생에너지 정렬, 첨단 grid 기술을 통한 기회 제시.

## 메모리 수요 예측 적용점
- 데이터센터 전력 수요는 AI accelerator(=HBM 동반) 출하의 대리 지표(proxy)로 활용 가능 — 전력 TWh 전망에서 역산하여 GPU/HBM bit 수요 추정 가능.
- 전력·grid 제약이 AI compute 확장의 상한(ceiling)이 될 수 있어 HBM 수요 시나리오의 하방 리스크 변수로 반영.

## 관련 wiki
- [[demand-forecasting]] · [[structural-demand-model]] · [[sensitivity-analysis]]

## 추가 출처
- https://arxiv.org/abs/2509.07218
- https://arxiv.org/html/2509.07218v3
- https://eta-publications.lbl.gov/sites/default/files/2024-12/lbnl-2024-united-states-data-center-energy-usage-report_1.pdf
