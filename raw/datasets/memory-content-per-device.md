---
source_url: https://www.trendforce.com/presscenter/news/20240205-12021.html
title: "디바이스별 평균 메모리 탑재량 (per-device content)"
publisher: TrendForce
published: 2024-02-05
ingested: 2026-06-06
type: dataset
data_file: memory-content-per-device.csv
unit: GB / % (YoY content growth)
tags: [dram, capacity, smartphone, server, pc]
confidence: medium
---

# 디바이스별 평균 메모리 탑재량 (per-device content)

## 컬럼 설명
- year: 연도
- device: smartphone / server / notebook_pc
- memory_type: DRAM (현재 DRAM 위주)
- avg_capacity_gb: 평균 탑재 용량(GB), 일부는 추정
- content_growth_yoy_percent: 디바이스당 용량 증가율(%)
- notes: 출처/추정 표시

## 출처/수집 메모
- 스마트폰: 2022 +3.9%, 2023 +17.5%(8GB 돌파), 2024 +14.1% (TrendForce). 절대 용량(7/8/9GB)은 추세 기반 추정.
- 서버: 2022 384GB -> 2023 512GB(+12.1%), 2024 content per box +17.3% (TrendForce). 2024 ~600GB는 추정.
- 노트북: 2024 DRAM content +12.4% (TrendForce). 절대값 미기재.
- AI 수요로 서버 content 증가율이 모든 응용처 중 가장 높음(2024 +17.3%).

## 메모리 수요 예측 활용
- per-device content는 출하량 정체 환경에서 비트 수요 성장의 주 동력.
- 비트 수요 = 출하량 × per-device 용량. content 증가율이 출하 증가율을 상회하는 구조가 핵심.

## 관련 wiki
- [[bit-demand]] · [[memory-demand]] · [[demand-forecasting]]
