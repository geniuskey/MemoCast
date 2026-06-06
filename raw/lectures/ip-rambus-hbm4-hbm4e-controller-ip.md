---
source_url: https://www.rambus.com/interface-ip/hbm/hbm4-controller/
title: "Rambus HBM4 / HBM4E Controller IP"
publisher: Rambus
published: 2026
ingested: 2026-06-06
type: lecture
tags: [hbm, memory, dram, capacity, demand-forecasting]
confidence: medium
---

# Rambus HBM4 / HBM4E Controller IP — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- Rambus는 HBM 메모리 controller (digital IP) 공급사. 2023년 SerDes/memory PHY IP 사업을 Cadence에 매각한 뒤, controller/security 등 digital IP에 집중.
- HBM controller는 host SoC와 HBM stack 사이에서 command scheduling, refresh, RAS, DFI 인터페이스를 담당. PHY와 짝을 이뤄 완전한 memory subsystem 구성.
- "Industry-first HBM4 Controller IP" 발표 — 차세대 AI workload 가속 목적. 3rd-party 또는 customer PHY와 결합 가능 (PHY agnostic).

## 주요 사실/수치
- HBM4 Controller: JEDEC spec인 6.4 Gbps 지원, 추가로 최대 10 Gbps까지 동작 가능 → memory device당 최대 2.56 TB/s throughput.
- HBM4E Controller (2026 발표): pin당 최대 16 Gbps → memory device당 4.1 TB/s throughput. 업계 최고 수준.
- HBM4E controller는 standard PHY 또는 TSV PHY와 결합하여 2.5D/3D 패키지에서 AI SoC 또는 custom base die 솔루션으로 통합 가능.
- 적용 시점: HBM4E 기반 ASIC은 2027–2028년 등장 예상, custom HBM4E (C-HBM4E) base die는 현재 개발 중.

## 메모리 수요 예측 관련성
- Controller IP의 data rate 상한이 HBM stack의 실효 bandwidth를 결정 → AI accelerator당 필요 HBM 용량/대역폭 수요에 직접 영향.
- C-HBM4E (custom HBM4E) 트렌드는 base die를 고객/파운드리가 customize하는 흐름을 보여줌. controller IP 라이선스 수요가 HBM 채택 속도를 gating.
- Controller가 JEDEC 표준치(6.4 Gbps)를 넘어 10~16 Gbps overclock을 지원 → DRAM 미세 수요(고대역폭 bin) 견인.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.rambus.com/interface-ip/hbm/
- https://www.eetimes.com/rambus-unveils-hbm4e-controller-16-gt-s-2048-bit-interface-enabling-c-hbm4e/
- https://www.rambus.com/rambus-announces-industry-first-hbm4-controller-ip-to-accelerate-next-generation-ai-workloads/
- https://www.rambus.com/rambus-sets-new-benchmark-for-ai-memory-performance-with-industry-leading-hbm4e-controller-ip/
