---
source_url: https://www.synopsys.com/articles/ecc-memory-error-correction.html
title: "메모리 RAS / ECC 신뢰성 (DDR5 on-die ECC, scrubbing)"
publisher: Synopsys / ServerMall / arXiv / ACM MEMSYS
published: 2026
ingested: 2026-06-06
type: lecture
tags: [dram, server, datacenter, capacity, demand-forecasting, bit-demand]
confidence: medium
---

# 메모리 RAS / ECC 신뢰성 — extracted notes

> RAS(신뢰성·가용성·서비스성)는 데이터센터 메모리에 capacity 오버헤드를 부과 → 유효 수요에 가산.

## 핵심 개념

- **DDR5 on-die ECC**: DRAM 내부에 ECC 전용 저장 추가(scaling 미세화로 셀 오류 증가 대응).
- 시스템 ECC: DDR4 64b 데이터 + 8b ECC(72b). DDR5는 채널 구조 변화.
- scrubbing: 주기적 오류 검출·정정.

## 주요 사실/수치

- DDR5 on-die ECC 지연 오버헤드 ~2~3%(정상 동작).
- 시스템 ECC + on-die ECC로 UBER 1/3 감소. 셋 다(시스템+on-die+scrubbing) 결합 시 UBER 10^-5.
- RAS는 미세화(1c/1d) 신뢰성 저하 상쇄에 필수.

## 메모리 수요 예측 관련성

- ECC는 추가 DRAM 비트(오버헤드) 요구 → 데이터센터 DRAM 유효 수요를 ~12.5%(8/64) 또는 그 이상 가산.
- 미세화로 오류율↑ → on-die ECC 보편화 → 비트 오버헤드 증가(수요 상방 미세 요인).
- HBM의 ECC/RAS(별도 ip-on-die-ecc 파일)도 stack 신뢰성 비용.

## 관련 wiki

- [[dram]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처

- Review of Memory RAS for Data Centers (ResearchGate): https://www.researchgate.net/publication/375302294_Review_of_Memory_RAS_for_Data_Centers
- On-die ECC mitigation (arXiv): https://arxiv.org/pdf/2204.10387
- ServerMall ECC 2026: https://servermall.com/blog/ecc-memory-why-is-it-needed-in-servers/
