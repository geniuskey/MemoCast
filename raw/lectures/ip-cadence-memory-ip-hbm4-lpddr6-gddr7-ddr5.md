---
source_url: https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr/2025/cadence-enables-next-gen-ai-and-hpc-systems-with-industrys.html
title: "Cadence Memory IP — HBM4 12.8G, LPDDR6/5X 14.4G, GDDR7 36G, DDR5"
publisher: Cadence
published: 2025
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, capacity, demand-forecasting]
confidence: medium
---

# Cadence Memory IP (HBM4 / LPDDR6 / GDDR7 / DDR5) — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- Cadence는 2023년 Rambus의 SerDes·memory PHY IP 사업을 인수하여 PHY 역량을 강화 → 현재 hardened PHY + controller 통합 솔루션 제공.
- 전 메모리 표준에 걸친 PHY+controller "complete memory system" 전략. AI infrastructure/data center 타깃.

## 주요 사실/수치
- HBM4: 업계 최고 12.8 Gbps PHY+controller IP. 이전 세대 대비 bit당 전력효율 20% 개선, area 효율 50% 개선, I/O 수 2배 → bandwidth 대폭 증가.
- LPDDR6/5X: 업계 최초 14.4 Gbps memory IP system tapeout. 이전 세대 LPDDR 대비 최대 50% 빠름.
- GDDR7: 32G / 36G PHY. PAM3 인코딩 사용. AI/ML, graphics, ADAS용. TSMC N5P 등 advanced node.
- DDR5: 검증된 12.8 Gbps product line 기반.

## 메모리 수요 예측 관련성
- HBM4 PHY의 I/O 2배(2048-bit 인터페이스 대응)는 stack당 bandwidth를 약 2배로 끌어올려 AI accelerator의 HBM 채택을 가속.
- LPDDR6 14.4 Gbps는 LPDDR을 data center AI(저전력 고용량 대안)로 끌어올림 → server DRAM 수요 mix 변화.
- GDDR7 36G PAM3는 GPU/inference 카드의 메모리 대역폭을 견인, HBM 대비 저비용 대안으로 inference 시장 DRAM 수요를 분산.

## 메모리 수요 예측 관련성 (보충)
- PHY data rate 상한이 양산 DRAM의 실효 속도 bin을 결정 → 고속 bin 프리미엄 수요와 직접 연동.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr/2025/cadence-introduces-industry-first-lpddr65x-144gbps-memory-ip-to.html
- https://www.cadence.com/en_US/home/tools/silicon-solutions/protocol-ip/memory-interface-and-storage-ip/gddr-phy-and-controller/gddr7-phy.html
- https://www.cadence.com/en_US/home/tools/silicon-solutions/protocol-ip/memory-interface-and-storage-ip/hbm-phy/hbm4e.html
