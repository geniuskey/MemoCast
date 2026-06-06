---
source_url: https://en.wikipedia.org/wiki/High_Bandwidth_Memory
title: "HBM Generations Roadmap — HBM1 to HBM4 Specs"
publisher: Wikipedia (High Bandwidth Memory) / JEDEC
published: 2025
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, bit-demand, capacity]
confidence: medium
---

# HBM Generations Roadmap (HBM1 → HBM4) — extracted notes

> 학습/설명 자료 요약 노트. 세대별 대역폭·버스폭·용량 비교표.

## 핵심 개념
- HBM은 세대마다 per-pin data rate와 stack 높이(layer 수)를 올려 stack당 bandwidth·capacity 증대.
- 버스폭은 HBM1~HBM3E까지 1024-bit 유지, HBM4에서 2048-bit로 doubling.
- 채널 구조 변화: HBM1/2(8ch×128b) → HBM3/3E(16ch×64b) → HBM4(32ch×64b).

## 주요 사실/수치 (per stack)
- HBM1 (2013, JESD235): 1.0 Gb/s/pin, 1024-bit, 128 GB/s, 최대 4GB, 4-Hi.
- HBM2 (2016, JESD235a): 2.0 Gb/s/pin, 1024-bit, 256 GB/s, 최대 8GB, 8-Hi.
- HBM2E (2019): 3.6 Gb/s/pin, 1024-bit, 461 GB/s, 최대 24GB, 12-Hi.
- HBM3 (2022, JESD270): 6.4 Gb/s/pin, 1024-bit, 819 GB/s, 최대 24GB, 8~12-Hi.
- HBM3E (2023): 9.8 Gb/s/pin, 1024-bit, 1,229 GB/s (~1.2 TB/s), 최대 48GB, 16-Hi.
- HBM4 (2025, JESD270-4): 8 Gb/s/pin(표준), 2048-bit, 2,048 GB/s (2 TB/s), 최대 64GB, 4~16-Hi.
- 양산 실측은 표준 초과: Samsung HBM4 11.7 Gbps / 3.3 TB/s 발표.
- SK Hynix 2026년 16-Hi HBM4 48GB 제품 계획.

## 메모리 수요 예측 관련성
- per-GPU HBM 용량 로드맵(예: Nvidia Rubin Ultra GPU당 1TB)이 HBM bit demand의 1차 결정 변수.
- HBM4 2048-bit는 base die를 logic foundry 공정으로 제작 → HBM 공급에 foundry capacity 제약 추가.
- 세대 전환 시 layer 증가·hybrid bonding 채택이 wafer당 HBM bit 산출(공급) 좌우.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://www.tomshardware.com/pc-components/ram/jedec-finalizes-hbm4-memory-standard-with-major-bandwidth-and-efficiency-upgrades
- https://introl.com/blog/hbm-evolution-hbm3-hbm3e-hbm4-memory-ai-gpu-2025
