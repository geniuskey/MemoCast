---
source_url: https://www.micron.com/about/blog/applications/automotive/new-research-shows-cars-need-more-memory-than-a-rocket
title: "차량 1대당 메모리 탑재량 추이 (Micron): 90GB → 278GB → 최대 4TB"
publisher: Micron Technology
published: 2023-12-01
ingested: 2026-06-06
type: article
tags: [dram, nand, automotive, bit-demand, demand-forecasting]
confidence: medium
---

# 차량 1대당 메모리 탑재량 (Micron) — extracted notes

> 자동차 SDV/ADAS 고도화에 따른 차량당 메모리(GB) 증가 곡선. 자동차 메모리 bit 수요 동인.

## 핵심 내용
- 차량 1대당 평균 메모리(RAM+NAND):
  - **2022년 약 90GB**.
  - **2026년 약 278GB** (고급 차량은 최대 2TB).
  - **2030년 최대 4TB** 전망.
- 코드 복잡도: 고급차 현재 1억 라인 → 자율주행차 2.5~3억 라인 → 향후 10억 라인 전망.
- ADAS/ECU 메모리 capacity: 2022년 말 385,000 TB → 2026년 2,100,000 TB(약 +445%).
- 인포테인먼트(IVI): 신차 head unit 탑재 2023년 약 7,300만 대 → 2026년 8,200만 대 초과; IVI 메모리 60억 GB(2022) → 72억 GB(2026).
- 자동차 메모리/스토리지 매출 전망: 2026년 **$11.6B**, CAGR 20~24%.
- 자율주행 타임라인: 2030년까지 완전자율주행 약 300만 대, Level 2+/3 지원 1,500만+ 대.

## 수요 동인
- SDV(소프트웨어 정의 차량)·중앙집중형 E/E 아키텍처 → 고대역폭 LPDDR5/6, 고용량 UFS/NAND 수요.
- ADAS 레벨 상승(센서·AI inference)이 working memory(DRAM)와 로그 저장(NAND) 동시 견인.

## 메모리 수요 예측 관련성
- 자동차 bit 수요 = 신차 출하량(~9천만 대급) × 차량당 GB. 차량당 GB가 3년에 ~3배(90→278GB) 증가.
- 자동차는 long-tail·고신뢰 grade로 단가 mix 우수, 다만 전체 bit 비중은 모바일/서버 대비 작음.

## 관련 wiki
- [[memory-demand]] · [[automotive-memory]] · [[demand-forecasting]]

## 추가 출처
- https://www.indexbox.io/blog/automotive-memory-and-storage-demands-surge-with-autonomous-driving/
- https://www.ftcelectronics.com/news/automotive-memory-applications-selection-guide-i
