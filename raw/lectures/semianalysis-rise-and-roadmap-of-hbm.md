---
source_url: https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm
title: "Scaling the Memory Wall: The Rise and Roadmap of HBM"
publisher: SemiAnalysis
published: 2025
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, bit-demand, capacity, demand-forecasting]
confidence: medium
---

# SemiAnalysis: Rise and Roadmap of HBM — extracted notes

> 학습/설명 자료 요약 노트. HBM 적층 한계와 수요 전망 deep dive.

## 핵심 개념
- HBM stack = 8/12 DRAM layer + 최하단 logic base die (총 9~13 layer).
- HBM은 co-packaged logic die와 동일 높이여야 함. 775μm 초과 stack 위해선 logic wafer도 더 두꺼워야 하나 현 장비가 두꺼운 wafer 미지원 → 물리적 제약.
- HBM3/3E는 12-hi에서 bump 기반 720μm cube 한계 접근. 더 높이려면 (1) bump-less(hybrid bonding), (2) cube 두께 증가 중 택일.
- 따라서 hybrid bonding이 16-hi+ 고적층의 핵심 enabler.

## 주요 사실/수치
- HBM bit demand가 AI accelerator 수요와 함께 급성장.
- 2027 HBM 수요는 Nvidia가 최대 점유 전망(aggressive roadmap, Rubin Ultra GPU당 1TB 용량).
- Broadcom(TPU·MTIA 물량 급증)이 뒤따름. Amazon도 top HBM 고객으로 부상, design partner 거치지 않고 HBM 직접 조달(비용 절감 전략).

## 메모리 수요 예측 관련성
- per-GPU HBM 용량(예: Rubin Ultra 1TB)과 accelerator 출하량의 곱이 HBM bit demand의 직접 추정식.
- 적층 한계(720~775μm)와 hybrid bonding 채택 timing이 wafer당 HBM 산출(공급)을 좌우.
- 하이퍼스케일러(Amazon 등) 직접 조달 추세는 HBM 수요 채널·가격 구조 변화 신호.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://news.ycombinator.com/item?id=44876695
- https://introl.com/blog/hbm-evolution-hbm3-hbm3e-hbm4-memory-ai-gpu-2025
