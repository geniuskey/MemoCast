---
source_url: https://www.marvell.com/products/ssd-controllers/mv-ss1331-1333.html
title: "Marvell Bravera SC5 SSD Controllers (PCIe 5.0, 16 NAND Channels)"
publisher: Marvell
published: 2024
ingested: 2026-06-06
type: lecture
tags: [nand, memory, capacity, demand-forecasting]
confidence: medium
---

# Marvell Bravera SC5 SSD Controllers — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- Marvell Bravera는 data center 향 enterprise NAND SSD controller 제품군 (MV-SS1331/SS1333). merchant NAND controller 3강(Phison/Silicon Motion/Marvell) 중 하이엔드 클라우드 포지션.
- 업계 최초 PCIe 5.0 + NVMe 1.4b 지원 SSD controller → PCIe 4.0 대비 성능 2배.
- 모든 NAND 벤더·타입과 interwork → 메모리 공급사 종속성을 낮추는 "open" 전략.

## 주요 사실/수치
- 성능: 최대 14 GB/s sequential read, 2M+ random read IOPS, deterministic latency <6µs, power-performance 효율 40% 개선.
- NAND 채널: 최대 16 channel. EDSFF E1.S 폼팩터 최초 지원, unthrottled performance.
- NAND 호환: Kioxia, Micron, Samsung, SK hynix, Western Digital, YMTC. SLC/MLC/TLC/QLC 모두 지원. 폼팩터 E1.S/E1.L/U.2/E3.
- 보안/QoS: FIPS RoT, AES-256, multi-key revocation, 하드웨어 Elastic SLA Enforcer(고객별 QoS·metering).
- Microsoft Azure 등 hyperscaler와 fleet 호환성 협업.

## 메모리 수요 예측 관련성
- 16 NAND channel·PCIe 5.0 대역폭이 SSD당 NAND die 탑재량과 성능 bin을 결정 → enterprise NAND bit 수요 단위 산정.
- 모든 NAND 벤더 interop은 메모리 공급사 간 spec-in 경쟁을 가속, NAND 출하 mix에 영향.
- hyperscaler 표준화(E1.S/E3) 채택 속도가 data center NAND 수요 전환 timing을 gating.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.marvell.com/company/newsroom/marvell-introduces-bravera-ssd-controllers-to-enable-the-highest-performing-data-center-flash-storage-solutions.html
- https://www.marvell.com/products/ssd-controllers.html
- https://www.tomshardware.com/news/marvell-announced-pcie-gen5-ssd-controllers
