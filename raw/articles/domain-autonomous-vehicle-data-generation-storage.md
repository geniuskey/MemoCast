---
source_url: https://www.tuxera.com/blog/autonomous-and-adas-test-cars-produce-over-11-tb-of-data-per-day/
title: "자율주행 데이터 생성·저장 (TB/day) — NAND 수요"
publisher: Tuxera / NVIDIA / Continental / IDTechEx
published: 2026
ingested: 2026-06-06
type: article
tags: [nand, automotive, bit-demand, demand-forecasting, capacity]
confidence: medium
---

# 자율주행 데이터 생성·저장 — extracted notes

> 차량 내 메모리 콘텐츠(별도 파일)와 구분되는 "데이터 생성→저장" NAND 수요 축.

## 핵심 수치

- 자율주행 테스트카 1대 **하루 11~152TB**(센서 시간당 1.4~19TB). 최신은 하루 수백 TB 추정.
- Continental ADAS팀: 전세계 차량 수집 **150TB+** 이미지·센서 데이터 중앙 저장.
- robotaxi 2026 확산: Wayve-Nissan(NVIDIA DRIVE Hyperion, Tokyo Uber 파일럿), Zoox(Las Vegas).

## 수요 동인

- 테스트/운영 차량의 센서 데이터가 데이터센터 스토리지(NAND/HDD)로 유입.
- 차량 내 기록(블랙박스/edge buffer) + 데이터센터 학습/재현용 저장의 이중 수요.

## 메모리 수요 예측 관련성

- 차량당 메모리 콘텐츠(DRAM/NAND, 별도 micron-automotive 파일)와 별개로, **데이터 생성량→데이터센터 NAND 수요** 경로.
- robotaxi 플릿 규모 × 차량당 TB/day = 자율주행 유발 스토리지 수요(시나리오 입력).
- 대부분 cold 데이터 → QLC eSSD/HDD 티어 수요.

## 관련 wiki

- [[nand]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처

- NVIDIA DRIVE Hyperion: https://channelpostmea.com/2026/06/03/nvidia-expands-autonomous-vehicle-ecosystem-with-drive-hyperion/
- IDTechEx autonomous driving 2026-2046: https://www.idtechex.com/en/research-report/autonomous-driving-software-and-ai-in-automotive/1111
