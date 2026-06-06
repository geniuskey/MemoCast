---
source_url: https://www.businesswire.com/news/home/20251118275848/en/CXL-Consortium-Releases-the-Compute-Express-Link-4.0-Specification-Increasing-Speed-and-Bandwidth
title: "CXL Specification Roadmap (CXL 2.0 → 3.x → 4.0)"
publisher: CXL Consortium / Blocks & Files
published: 2025-11-18
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, demand-forecasting]
confidence: medium
---

# CXL Specification Roadmap (2.0 → 4.0) — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- CXL은 PCIe 물리계층 위에서 cache-coherent 메모리 접속을 제공하는 표준. 세대별로 PCIe 세대와 동반 상승.
- 핵심 기능 진화: coherent attach(1.1) → switching·pooling·IDE 암호화(2.0) → fabric·multi-level switch·peer-to-peer·sharing(3.x) → multi-rack pooling·bundled ports(4.0).

## 주요 사실/수치
- CXL 1.1/2.0: PCIe 5.0 기반, 최대 32 GT/s. 2.0이 switching·memory pooling·link 암호화 추가.
- CXL 3.0/3.1: PCIe 6.0, 64 GT/s로 2배. 256-byte FLIT, full fabric, multi-level switching, P2P, memory sharing, fabric-attached memory.
- CXL 4.0 (2025-11-18 발표): PCIe 7.0, 128 GT/s로 다시 2배. Bundled Ports(다수 물리 링크를 단일 논리 연결로 묶어 1.5 TB/s 대역폭), 강화된 memory maintenance, 하위호환.
- pooling 활용률: 클러스터 전반 50~60% → 85%+. CXL 4.0은 multi-rack에서 100+ TB 공유 메모리 접근(cache coherent) 목표.
- CXL 4.0 multi-rack 배포는 2027년 타깃.

## 메모리 수요 예측 관련성
- 세대별 GT/s 2배 증가가 disaggregated/pooled DRAM의 실효 대역폭 한계를 풀어 채택을 가속 → 장기 DDR5/차세대 DRAM 수요의 구조적 성장축.
- multi-rack pooling(100+ TB 공유)은 AI inference의 대용량 메모리 수요를 server 외부로 확장 → DRAM 출하 bit 증대.
- 단, pooling의 활용률 개선은 host당 over-provisioning 감소 효과도 있어 수요 모델에 상쇄 변수로 반영 필요.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://videocardz.com/newz/cxl-4-0-spec-moves-to-pcie-7-0-doubles-bandwidth-over-cxl-3-0
- https://blocksandfiles.com/2025/11/24/cxl-4/
- https://introl.com/blog/cxl-4-0-infrastructure-planning-guide-memory-pooling-2025
- https://en.wikipedia.org/wiki/Compute_Express_Link
