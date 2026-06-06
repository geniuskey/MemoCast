---
source_url: https://www.allaboutcircuits.com/technical-articles/introduction-to-dram-dynamic-random-access-memory/
title: "Introduction to DRAM (Dynamic Random-Access Memory)"
publisher: All About Circuits / Wikipedia (DRAM)
published: 2023
ingested: 2026-06-06
type: lecture
tags: [dram, memory, methodology, bit-demand]
confidence: medium
---

# How DRAM Works — 1T1C Cell Primer — extracted notes

> 학습/설명 자료 요약 노트. DRAM 기본 셀 구조와 동작 원리.

## 핵심 개념
- DRAM 셀 = 1-transistor, 1-capacitor (1T1C). 1비트 = 커패시터의 전하 유무.
- 충전된 커패시터 = logic '1', 방전 = logic '0'.
- transistor(access transistor)는 voltage-controlled switch. write 시 커패시터에 전류 주입, read 시 커패시터 방전.
- 배열(array): rectangular array. Wordline(WL)이 한 row의 모든 셀(access transistor)을 제어, Bitline(BL)이 한 column 연결(transistor source).
- read/write 시 WL high → transistor가 커패시터를 BL에 연결. sense amplifier가 미세 전하를 증폭하여 값 판독.

## 주요 사실/수치
- 커패시터는 전하 누설(leak) → 주기적 refresh 필수. 표준 retention/refresh window = 64 ms.
- SRAM(4~6 transistor/bit) 대비 1T1C는 셀당 소자 수가 최소 → 고밀도, 낮은 cost-per-bit 달성.
- DRAM은 volatile memory: 전원 차단 시 데이터 소실.
- read는 destructive(파괴적) → 읽은 후 다시 써주는 restore 동작 포함.

## 메모리 수요 예측 관련성
- cost-per-bit이 낮은 이유(1T1C 단순 구조) = 메모리의 대량 생산·가격 경쟁의 물리적 기반.
- DRAM scaling은 커패시터 capacitance 유지 난이도 증가로 둔화 → bit growth 둔화 요인. (수요 예측에서 supply bit growth 추정 시 핵심 변수)
- refresh 전력/오버헤드는 용량 증가 시 시스템 부담 → DDR5의 on-die ECC, 고용량 칩 설계 동기.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://en.wikipedia.org/wiki/Dynamic_random-access_memory
- https://semiengineering.com/knowledge_centers/memory/volatile-memory/dynamic-random-access-memory/
- https://www.techtarget.com/searchstorage/definition/DRAM
