---
source_url: https://www.techtarget.com/searchstorage/definition/floating-gate
title: "How NAND Flash Works — Floating Gate vs Charge Trap, 3D NAND"
publisher: TechTarget / EDN / Semiconductor Engineering
published: 2023
ingested: 2026-06-06
type: lecture
tags: [nand, memory, capacity, bit-demand]
confidence: medium
---

# How NAND Flash Works — Floating Gate & Charge Trap — extracted notes

> 학습/설명 자료 요약 노트. NAND 셀 동작 원리와 3D NAND 전환.

## 핵심 개념
- Floating-gate transistor = control gate + floating gate(절연된 polysilicon). floating gate에 전자 유무로 비트 저장.
- 전자 존재 → 전류 흐름 차단 = '0'; 전자 제거 → 전류 흐름 = '1'.
- write/erase는 control gate에 펄스를 가해 tunneling(Fowler-Nordheim)으로 전자 주입/방출. 전하 변화가 threshold voltage 이동(memory window)을 만듦.
- NAND = non-volatile. 전원 없이도 데이터 유지.
- 3D NAND: 셀을 수직 string으로 쌓아 단위 면적당 밀도 증가. 박막을 다층 적층 후 한 번에 hole을 뚫고(channel hole) 동심원 막으로 채워 transistor 형성.
- Charge-trap cell이 floating gate를 대체(3D NAND 주류). trap layer = insulator(주로 silicon nitride) → 셀 간 간섭 감소, 공정 단순화.

## 주요 사실/수치
- bits/cell: SLC(1), MLC(2), TLC(3), QLC(4), PLC(5 실험). bit/cell 증가할수록 cost-per-bit 하락하지만 신뢰성·속도·수명(P/E cycle) 저하.
- 2D scaling 한계 도달 후 3D NAND 전환 → litho 미세화 대신 적층(layer)으로 밀도 증가.
- 주요 업체 2026 차세대 3D QLC stack 200+ active layer 양산 ramp 예정.
- QLC는 TLC 대비 약 15~25% 낮은 $/GB, SLC 대비 50%+ 낮음.

## 메모리 수요 예측 관련성
- NAND bit growth는 layer 적층 + bit/cell 증가 두 축으로 추정 → 공급 bit 모델의 핵심.
- 3D NAND는 비싼 ASML litho 대신 etch/deposition 의존 → capex 구조가 DRAM과 다름(수요 예측 시 NAND/DRAM capex 분리 필요).
- enterprise SSD(QLC)가 AI 시대 NAND 수요의 core growth engine.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://www.edn.com/how-3d-nand-flash-works-what-lies-ahead-in-its-density-roadmap/
- https://semiengineering.com/knowledge_centers/memory/non-volatile-memory-nvm/flash-memory/3d-nand/
- https://www.kingston.com/en/blog/pc-performance/difference-between-slc-mlc-tlc-3d-nand
