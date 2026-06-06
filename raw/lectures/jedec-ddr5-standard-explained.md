---
source_url: https://www.jedec.org/news/pressreleases/jedec-publishes-new-ddr5-standard-advancing-next-generation-high-performance
title: "JEDEC DDR5 Standard (JESD79-5) Explained"
publisher: JEDEC / Kingston / Wikipedia (DDR5 SDRAM)
published: 2020-07-14
ingested: 2026-06-06
type: lecture
tags: [dram, memory, methodology, bit-demand]
confidence: medium
---

# JEDEC DDR5 Standard Explained — extracted notes

> 학습/설명 자료 요약 노트. DDR5 주요 변경점과 표준 사양.

## 핵심 개념
- DDR5 SDRAM 표준 JESD79-5, 2020-07-14 공개. DDR4 대비 대역폭 2배·전력 효율 개선 목표.
- DIMM당 2개의 독립 채널(dual sub-channel): 각 32-bit data(non-ECC), ECC 시 40-bit. 자체 command/address bus 보유.
- On-die ECC(ODECC): 칩 내부 비트 오류 정정. write 시 ECC 계산·저장, read 시 단일비트 오류 정정. 단, 칩-컨트롤러 간 버스 오류는 정정 불가.
- DFE(Decision Feedback Equalization): 고속 I/O signal integrity 확보.

## 주요 사실/수치
- 출시 속도 4.8 Gbps(DDR4 EOL 3.2 Gbps 대비 +50%), 사양상 최대 6.4 Gbps.
- ODECC 오버헤드: 128-bit data당 8-bit ECC 추가 저장.
- Vdd 1.2V → 1.1V 강하로 전력 효율 개선.
- 추가 기능: error transparency mode, post-package repair, read/write CRC → 고용량 DRAM·advanced node 양산 지원.

## 메모리 수요 예측 관련성
- DDR5는 서버/AI server 표준 → server DRAM bit demand 주력. (2026 서버向 우선 배정으로 가격 상승)
- on-die ECC·고용량 모듈은 비트당 면적 증가 요인 → effective bit growth 추정 시 고려.
- DDR4→DDR5 전환 속도가 bit demand mix와 ASP에 직접 영향.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://en.wikipedia.org/wiki/DDR5_SDRAM
- https://www.kingston.com/en/blog/pc-performance/ddr5-overview
- https://www.atpinc.com/blog/ddr5-what-is-on-die-ecc-how-is-it-different-to-traditional-ecc
