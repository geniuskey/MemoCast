---
source_url: https://www.tomshardware.com/tech-industry/sandisk-and-sk-hynix-join-forces-to-standardize-high-bandwidth-flash-memory-a-nand-based-alternative-to-hbm-for-ai-gpus-move-could-enable-8-16x-higher-capacity-compared-to-dram
title: "HBF (High Bandwidth Flash) — NAND 기반 HBM 대안 (AI inference)"
publisher: Tom's Hardware / SanDisk / SK hynix / SemiWiki / Kioxia
published: 2026
ingested: 2026-06-06
type: lecture
tags: [nand, hbm, memory, ai-server, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# HBF (High Bandwidth Flash) — extracted notes

> NAND 기반 고대역폭 메모리. inference용 HBM 보완재로 NAND 수요의 새 상방 카테고리.

## 핵심 개념

- HBF = NAND 기반 HBM 대안. 모델 weight(추론 중 정적)를 GPU 패키지 옆에 상주 → DRAM 대비 **8~16배 용량**.
- inference 타겟(training 아님). weight가 패키지를 떠나지 않게 설계.

## 주요 사실/수치

- 모듈 **5TB 용량, 64GB/s 대역폭**(flash bead daisy-chain). 트랜시버 **128Gbps**.
- SanDisk 첫 샘플 **2H2026**(BiCS9 추정), HBF 탑재 AI inference 디바이스 샘플 **2027 초**.
- SanDisk·SK hynix 표준화 협력. Samsung도 참전 보도(SK·Kioxia에 도전).
- Kioxia: SanDisk와 20년+ R&D/팹 공유, AI-NAND(AIN) 로드맵 2H2026 샘플링.

## 메모리 수요 예측 관련성

- HBF는 inference 메모리 계층(HBM↔HBF↔SSD)을 재편 → NAND bit 수요의 신규 driver.
- HBM capacity 병목의 부분 우회 → HBM 수요 일부를 NAND로 전이(시나리오 분기).
- 채택 시 AI 서버당 NAND 콘텐츠 급증 → structural model에 새 항목 추가 필요.

## 관련 wiki

- [[nand]] · [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- SanDisk/SK hynix HBF (eeNews): https://www.eenewseurope.com/en/sandisk-sk-hynix-team-for-hbf-high-bandwidth-flash/
- HBF battle Samsung joins (SemiWiki): https://semiwiki.com/forum/threads/the-hbf-battle-is-underway-with-samsung-reportedly-joining-the-challenge-against-sk-hynix-and-kioxia.23750/
- Chip Stock Investor HBF: https://chipstockinvestor.com/what-is-sandisks-hbf-high-bandwidth-flash-should-investors-care-about-it/
