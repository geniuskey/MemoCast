---
source_url: https://www.asteralabs.com/products/leo-cxl-smart-memory-controllers/
title: "CXL Memory Controllers — Astera Labs Leo, Marvell Structera, Microchip SMC, Montage"
publisher: Astera Labs / Marvell / Microchip / SemiAnalysis
published: 2025
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, demand-forecasting]
confidence: medium
---

# CXL Memory Controllers (Astera / Marvell / Microchip / Montage) — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- CXL(Compute Express Link) controller는 CPU/GPU의 CXL/PCIe 인터페이스에 DDR4/DDR5를 연결 → memory expansion(용량 확장) 및 pooling(다수 host 공유) 구현.
- "Memory wall" 해소: core당 bandwidth/capacity 증대, 미사용 메모리 활용률을 50~60% → 85%+로 개선.
- 주요 ASIC 공급사: Astera Labs(Leo), Marvell(Structera), Microchip(SMC 2000), Montage, Rambus. Montage는 아시아 hyperscaler에서 주 경쟁자.

## 주요 사실/수치
- Astera Labs Leo: 업계 최초 expansion+pooling 동시 지원. CXL 2.0, controller당 최대 2TB. Microsoft Azure M-series VM에 채택.
- Marvell Structera (2025-09 발표): Structera A(near-memory accelerator, Arm Neoverse V2 16코어) + Structera X(expansion, CPU당 최대 12TB). CXL 2.0, DDR4/DDR5, Micron·Samsung·SK hynix 3사 + 양대 CPU 아키텍처 interop 완료.
- Microchip SMC 2000: CPU/GPU/SoC가 CXL로 DDR4/DDR5 연결, core당 bandwidth·capacity 증대로 TCO 절감.
- 시장: SemiAnalysis 추정 CXL expansion+pooling 하드웨어 시장 2025년 10억 달러 초과.
- Microsoft가 2025년 11월 업계 최초 CXL 탑재 클라우드 인스턴스 출시.

## 메모리 수요 예측 관련성
- CXL은 server당 부착 가능 DRAM 총량을 끌어올림(CPU당 +12TB 등) → DDR5 capacity 수요의 새 성장축.
- Pooling은 활용률 개선으로 일부 over-provisioning 수요를 흡수할 수도 있어 수요에 양방향 영향 (확장 vs 효율화).
- CXL controller ASIC 채택 속도가 disaggregated memory 수요 timing을 gating.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.marvell.com/company/newsroom/marvell-extends-cxl-ecosystem-leadership-with-structera-interoperability-across-platforms.html
- https://www.microchip.com/en-us/about/news-releases/products/cxl-smart-memory-controllers
- https://newsletter.semianalysis.com/p/astera-labs-is-first-to-cxl-memory
- https://www.servethehome.com/cxl-is-finally-coming-in-2025-amd-intel-marvell-xconn-inventec-lenovo-asus-kioxia-montage-arm/
