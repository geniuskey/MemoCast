---
source_url: https://www.synopsys.com/articles/ecc-memory-error-correction.html
title: "On-Die ECC, Link ECC & RAS Features (DDR5 / LPDDR5 / HBM3E)"
publisher: Synopsys / ATP / Synopsys Glossary
published: 2025
ingested: 2026-06-06
type: lecture
tags: [dram, hbm, memory, demand-forecasting]
confidence: medium
---

# On-Die ECC / Link ECC / RAS (DDR5·LPDDR5·HBM3E) — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- 미세화로 DRAM cell 단위 오류율 상승 → on-die ECC가 DDR5/LPDDR5/HBM부터 표준 기능으로 내장됨.
- On-die ECC: DRAM chip 내부 단일 비트 오류 정정 (channel 오류는 보호 못함). End-to-end RAS를 위해 side-band ECC와 병행.
- Link ECC: LPDDR5 기능으로 link/channel 상의 단일 비트 오류 보호. controller가 ECC를 데이터와 함께 전송, DRAM이 검증·정정.
- RAS = Reliability, Availability, Serviceability. controller/IP가 구현하는 핵심 신뢰성 계층.

## 주요 사실/수치
- DDR5 on-die ECC: 128 bit 데이터당 8 bit ECC 추가 저장. write 시 내부 계산·저장, read 시 single-bit error 정정.
- HBM3/HBM3E: on-die ECC + SECDED(Single Error Correction, Double Error Detection). ECS(Error Check and Scrub) — self-refresh 또는 refresh-all bank 시 누적 오류 사전 정정.
- HBM3 RAS: RFM(Refresh Management) / ARFM(Adaptive Refresh Management) — row hammer 등 대응.

## 메모리 수요 예측 관련성
- ECC/RAS는 DRAM die에 추가 비트(8/128 등)를 요구 → 실효 가용 capacity 대비 die 면적 오버헤드 증가 (bit/wafer 산출에 영향).
- mission-critical/data center에서 RAS 요구가 강해질수록 server DRAM mix가 ECC 지원 부품으로 이동 → ASP·수요 mix 상승.
- Controller IP의 RAS feature 성숙도가 HBM/DDR5 채택의 enterprise gating 요인.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.atpinc.com/blog/ddr5-what-is-on-die-ecc-how-is-it-different-to-traditional-ecc
- https://www.synopsys.com/glossary/what-is-high-bandwitdth-memory-3.html
- https://www.wevolver.com/article/what-is-high-bandwidth-memory-3-hbm3-complete-engineering-guide-2025
