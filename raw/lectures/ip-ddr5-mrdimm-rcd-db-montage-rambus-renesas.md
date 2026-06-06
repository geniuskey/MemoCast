---
source_url: https://www.rambus.com/memory-interface-chips/ddr5-dimm-chipset/ddr5-mrcd-and-mdb/
title: "DDR5 MRDIMM Interface Chips — RCD / MRCD / DB / MDB (Montage, Rambus, Renesas)"
publisher: Rambus / Montage Technology / Renesas
published: 2025
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, demand-forecasting]
confidence: medium
---

# DDR5 MRDIMM Interface Chips (RCD/DB, MRCD/MDB) — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- RDIMM/MRDIMM 모듈에는 DRAM 외에 interface chip이 탑재됨: RCD(Registering Clock Driver, command/address/clock 버퍼링) + DB(Data Buffer, data line 버퍼링).
- MRDIMM(Multiplexed Rank DIMM): 2개 rank를 interleave/multiplex해 실효 대역폭 2배. 전용 칩 MRCD(Multiplexed RCD) + MDB(Multiplexed Data Buffer) 사용.
- 공급 3강: Montage Technology, Rambus, Renesas (구 IDT). 메모리 모듈 채택의 핵심 enabler.

## 주요 사실/수치
- Montage (2025-01): Gen2 MRCD+MDB 엔지니어링 샘플 출하, DDR5 MRDIMM 최대 12800 MT/s 지원. "1+10" 아키텍처(모듈당 MRCD 1개 + MDB 10개). 2025-10 Gen4 RCD 7200 MT/s 양산.
- Rambus (2024-10): 업계 최초 DDR5 RDIMM 8000(Gen5 RCD) 및 MRDIMM 12800 칩셋. MRDIMM 12800은 MRCD 1 + MDB 10 구성, 2개 rank interleave로 실효 대역폭 2배.
- Renesas: MRCD/MDB/PMIC/SPD hub/온도센서 포함 종합 MRDIMM 포트폴리오. Gen4 RCD(RRG5004), RG5R256(5600 MT/s) 등.

## 메모리 수요 예측 관련성
- MRDIMM은 module당 실효 대역폭을 2배로 끌어올려 AI/HPC server의 DDR5 채택과 module당 DRAM bit 탑재를 견인.
- interface chip 로드맵(7200→8000→12800 MT/s)이 server DRAM의 세대 전환과 고속 bin 수요를 gating.
- RCD/DB 시장은 DRAM 수요의 leading indicator (모듈 BOM에 비례) → 모듈 출하 추세 추정에 활용 가능.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.montage-tech.com/Press_Releases/20250124
- https://www.rambus.com/memory-interface-chips/ddr5-dimm-chipset/
- https://www.renesas.com/en/products/memory-logic/memory-interface-products/ddr5-solutions
- https://medium.com/@kvnagesh/the-quiet-evolution-of-memorys-critical-infrastructure-8b407fb39638
