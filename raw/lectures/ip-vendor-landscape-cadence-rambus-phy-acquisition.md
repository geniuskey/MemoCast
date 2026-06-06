---
source_url: https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr/2023/cadence-to-acquire-rambus-phy-ip-assets.html
title: "Memory IP Vendor Landscape & Cadence–Rambus PHY IP Acquisition"
publisher: Cadence / Rambus
published: 2023
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, demand-forecasting]
confidence: high
---

# Memory IP Vendor Landscape & Cadence–Rambus PHY 거래 — extracted notes

> 학습/설명 자료 요약 노트.

## 핵심 개념
- 메모리 interface IP는 두 계층: PHY(아날로그 물리계층, 신호 무결성) + Controller(디지털, scheduling/RAS/DFI). 보통 둘을 짝지어 subsystem 구성.
- 2023년 Cadence가 Rambus의 SerDes + memory interface PHY IP 사업을 인수 → IP 벤더 구도 재편의 분기점.
- 거래 후 역할 분담: Cadence = PHY+controller 통합 / Synopsys = PHY+controller 통합 / Rambus = controller·security 등 digital IP에 집중(PHY agnostic).

## 주요 사실/수치
- 발표: 2023-07-20, 완료: 2023-09. Cadence가 미국·인도·캐나다의 검증된 PHY 엔지니어링 팀 확보.
- Rambus는 memory/interface controller 및 security IP digital 사업 유지.
- 전략적 의의: Cadence의 enterprise IP 포트폴리오 확장, aerospace/defense 등 vertical 진입, "complete subsystem" 제공.
- 결과 구도(2025~2026): HBM4/DDR5/LPDDR6/GDDR7 PHY 경쟁은 사실상 Synopsys·Cadence 양강 + Rambus(controller) 구도.

## 메모리 수요 예측 관련성
- IP 벤더의 PHY data rate 로드맵이 DRAM 세대 전환·고속 bin 채택을 gating → 메모리 수요의 leading enabler.
- 양강(Synopsys/Cadence) PHY 경쟁이 HBM4 12.8 Gbps, LPDDR6 14.4 Gbps 등 속도 상한을 끌어올려 bandwidth 수요를 견인.
- controller(Rambus)와 PHY(Cadence/Synopsys)의 interoperability가 custom HBM base die·ASIC 설계 속도를 결정.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.cadence.com/en_US/home/company/newsroom/press-releases/pr/2023/cadence-completes-acquisition-of-phy-ip-assets-from-rambus.html
- https://www.rambus.com/cadence-to-acquire-rambus-phy-ip-assets/
- https://www.design-reuse.com/news/54474/cadence-rambus-phy-ip-assets-acquisition.html
