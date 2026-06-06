---
source_url: https://wccftech.com/sk-hynix-reportedly-ramps-1c-dram-to-six-euv-layers/
title: "EUV Adoption in DRAM — Layer Counts by Node (SK Hynix / Samsung / Micron) + High-NA"
publisher: Wccftech / TweakTown / TrendForce (compiled)
published: 2026
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, bit-demand, wafer]
confidence: medium
---

# EUV Adoption in DRAM — Layer Counts & Cost Impact — extracted notes

> 학습/설명 자료 요약 노트. DRAM에 EUV가 들어가는 layer 수와 wafer cost 함의.

## 핵심 개념
- EUV는 multi-patterning(다중 노광) 단계를 줄여 미세 critical layer 패터닝 → DRAM density 미세화 enabler.
- 그러나 EUV layer가 늘수록 scanner·mask·throughput cost가 wafer당 cost를 끌어올림 → density 이득 대비 cost 상쇄.
- High-NA EUV(ASML EXE)는 conventional EUV 대비 더 미세한 패턴으로 multi-patterning 추가 축소 목표.

## 주요 사실/수치
- SK Hynix: 2021년 1a(4세대) DRAM에 EUV 최초 적용 → 1b에서 EUV 4 layer → 1c(6세대, 10nm-class)에서 최소 5~6 layer로 확대.
- Samsung·SK Hynix 1c는 보고에 따라 6~8 EUV layer 수준.
- Micron: 1-gamma(1c)에서 처음 EUV 도입, 다만 초기엔 단 1 EUV layer 수준(점진 확대). Taiwan·Japan fab에서 2025부터 1-gamma EUV 양산 ramp.
- High-NA EUV: SK Hynix가 DRAM 업계 최초로 ASML EXE:5200B를 M16(이천) fab에 설치. conventional EUV 대비 ~1.7x 미세 feature, 약 3x density.
- High-NA scanner 단가: 약 $380M/대 수준. (Samsung Foundry: High-NA 2대 $773M 보고.)

## 메모리 수요 예측 관련성 (bit supply 함의)
- EUV layer 증가 = wafer cost 상승 → node migration의 net cost-per-bit 개선폭 축소(공급 가정 중요 변수).
- High-NA 도입 timing/yield가 1c→1d 공급 곡선과 leadership 격차를 결정.
- EUV scanner capex 부담은 신규 wafer capacity 증설 속도를 제약 → 공급 탄력성 저하.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://www.tweaktown.com/news/106957/sk-hynix-ramps-1c-dram-to-6-euv-layers-preps-for-high-na-designs-destroy-samsung-in-hbm/index.html
- https://drrobertcastellano.substack.com/p/sk-hynix-first-to-install-high-na
- https://www.trendforce.com/news/2026/02/16/news-asmls-high-na-euv-for-2027-28-which-giants-are-betting-big-intel-samsung-sk-hynix-or-tsmc/
