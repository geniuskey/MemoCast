---
source_url: https://www.tomshardware.com/software/windows/microsofts-baseline-ram-for-ai-pcs-set-at-16gb
title: "Microsoft, AI PC(Copilot+) 최소 RAM 16GB·NPU 40 TOPS 기준 설정"
publisher: Tom's Hardware / TrendForce / Microsoft
published: 2024-01-18
ingested: 2026-06-06
type: article
tags: [dram, pc, demand-forecasting, bit-demand]
confidence: high
---

# AI PC 최소 RAM 16GB 기준 — extracted notes

> Copilot+ PC 인증 요건이 PC 평균 DRAM 탑재량을 끌어올리는 정책적 동인.

## 핵심 내용
- Microsoft, **Copilot+ PC 최소 사양 = 16GB DDR5/LPDDR5 + 256GB 저장장치**.
- NPU **40 TOPS 이상** 요구 (AI 연산 가속).
- 업계 권장: RAM **32GB**, 저장장치 1TB SSD 권장.
- 인증 호환 프로세서: AMD Ryzen AI 300 시리즈, Intel Core Ultra 200V 시리즈, Qualcomm Snapdragon X 시리즈.
- 16GB 기준은 기존 Windows PC 베이스라인(8GB)에서 큰 상향. 노트북은 다수 soldered(비탈착) 메모리 → 저용량 옵션이 AI PC 카테고리에서 사실상 퇴출.

## 수요 동인
- OS/플랫폼 차원의 최소 사양 상향 → 신규 PC 평균 DRAM 탑재량 구조적 상승.
- 8GB → 16GB 기준선 이동은 PC당 DRAM bit를 1.5~2배 끌어올림.
- on-device AI(Copilot, Recall 등)가 메모리 상주 요구를 키움.

## 메모리 수요 예측 관련성
- PC DRAM bit 수요 = PC 출하량 × 평균 GB/대 × (AI PC mix). AI PC 침투율 상승이 평균 GB/대를 견인.
- LPDDR5/DDR5 채택 의무화로 DDR4→DDR5 전환 가속, 단가 mix 상승.

## 관련 wiki
- [[memory-demand]] · [[pc-memory]] · [[demand-forecasting]]

## 추가 출처
- https://itdaily.com/news/workplace/windows-copilot-plus-pc-system-requirements/
- https://www.microsoft.com/en-us/windows/learning-center/copilot-plus-pcs-windows-pcs-differences
- https://www.faceofit.com/copilot-pc-memory-guide/
