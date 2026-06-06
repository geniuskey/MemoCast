---
source_url: https://newsroom.lamresearch.com/high-bandwidth-memory-explained-semi-101
title: "High Bandwidth Memory (HBM) Explained — SEMI 101"
publisher: Lam Research Newsroom / Rambus / Wevolver
published: 2024
ingested: 2026-06-06
type: lecture
tags: [hbm, dram, memory, bit-demand]
confidence: medium
---

# How HBM & TSV 3D Stacking Works — extracted notes

> 학습/설명 자료 요약 노트. HBM 수직 적층과 TSV 패키징 원리.

## 핵심 개념
- HBM = 2.5D/3D 메모리 아키텍처. DRAM die를 수직 적층(stack/cube)하고 TSV(Through-Silicon Via)로 수직 연결.
- 한 stack = 4/8/12/16 layer DRAM + 최하단 logic(base) die(refresh, training, data scheduling 담당).
- TSV = silicon die를 관통하는 copper pillar(~5~10μm), 수백 개 신호를 병렬 전송 → 넓은 data interface 구현.
- 프로세서 연결: silicon interposer 위에 GPU die와 HBM stack을 나란히 배치(2.5D). interposer가 1024-bit(HBM4는 2048-bit) bus를 메모리 컨트롤러로 라우팅.
- 광폭+짧은 경로 → 고대역폭·저전력. "skyscraper vs single-story building" 비유.

## 주요 사실/수치
- HBM3 stacked architecture는 전통 메모리 대비 ~16x 높은 bandwidth, HBM3 최대 6.4 Gb/s.
- 칩당 수백만 TSV 연결, 각각 copper fill·정밀 정렬 필요. 전용 etch/deposition 장비 의존.
- HBM3/3E는 12-hi에서 720μm cube 두께 한계 접근. 더 높이려면 bump-less(hybrid bonding) 또는 cube 두께 증가 필요.
- Hybrid bonding이 향후 HBM workflow에서 microbump를 대체할 핵심 기술로 부상(고적층 가능).
- HBM 수요: 123M GB(2022) → 972M GB(2027), 약 8배 성장, AI가 주 동인.

## 메모리 수요 예측 관련성
- 1GB HBM 생산은 표준 DRAM 대비 wafer capacity 약 4x 소모 → HBM 비중 증가 시 standard DRAM 공급 잠식(supply 모델 핵심).
- HBM bit demand는 AI accelerator(GPU/TPU) 수량·per-GPU 용량 로드맵과 직결.
- logic base die가 logic foundry(TSMC 등) capacity 필요 → 병목 요인.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://www.rambus.com/blogs/hbm3-everything-you-need-to-know/
- https://www.wevolver.com/article/what-is-high-bandwidth-memory-deep-dive-into-architecture-packaging-and-applications
- https://en.wikipedia.org/wiki/High_Bandwidth_Memory
