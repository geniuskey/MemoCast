---
source_url: https://www.prnewswire.com/news-releases/silicon-motion-announces-sm8388--the-industrys-leading-power-efficient-pcie-gen5-8-channel-enterprise-ssd-controller-delivering-14-4gbs-performance-at-under-5w-power-for-nearline-ssds-302615525.html
title: "NAND SSD Controllers — Phison & Silicon Motion (PCIe Gen5 Enterprise)"
publisher: Silicon Motion / Phison
published: 2025
ingested: 2026-06-06
type: lecture
tags: [nand, memory, capacity, demand-forecasting]
confidence: medium
---

# NAND SSD Controllers (Phison / Silicon Motion) — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- NAND controller는 SSD에서 NAND die와 host(PCIe/NVMe) 사이의 FTL, ECC/LDPC, wear-leveling, 채널 관리를 담당 → NAND 채택의 핵심 enabler.
- 독립 controller 3강: Phison, Silicon Motion(merchant), Marvell. 메모리 3사(Samsung/SK hynix/Micron/Kioxia)는 자체 controller도 보유.
- AI 데이터센터의 high-capacity QLC nearline SSD 수요가 enterprise controller 성장 견인.

## 주요 사실/수치
- Silicon Motion SM8388: PCIe Gen5 8-channel enterprise controller, 14.4 GB/s 성능을 5W 미만에서 달성. 고용량 QLC nearline SSD 타깃.
- Silicon Motion SM8366: PCIe Gen5 x4 NVMe 2.0, OCP 2.5 dual-port. MonTitan RDK는 QLC로 최대 128TB 지원.
- Phison Pascari X201/D201: 차세대 PCIe Gen5 enterprise SSD (AI training/analytics/HPC). Pascari D205V: 세계 최고 용량 122.88TB PCIe Gen5, 순차 read 14,600 MB/s.
- Phison E26: PCIe Gen5 클라이언트 controller, I/O+ 기술 + redriver, CXL 2.0 신호 지원.

## 메모리 수요 예측 관련성
- controller의 채널 수/속도/용량 상한(예: 128TB QLC)이 SSD당 NAND bit 탑재량을 결정 → NAND 수요 단위 산정의 핵심.
- AI nearline(warm data) 저장 수요 증가 → QLC NAND 출하 bit의 구조적 성장. 저전력(5W) controller가 high-capacity 채택을 가속.
- merchant controller 출하량은 SSD 모듈 출하의 leading indicator로 NAND 수요 추정에 활용 가능.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://ir.siliconmotion.com/news-releases/news-release-details/silicon-motion-announces-worlds-first-pcie-gen5-enterprise-ssd
- https://www.phison.com/en/category/article/press-releases
- https://www.businesswire.com/news/home/20251118673771/en/SC25-Phison-Accelerates-AI-Workloads-with-Expanded-Infrastructure-Portfolio
