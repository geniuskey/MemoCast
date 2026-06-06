---
source_url: https://www.trendforce.com/presscenter/news/20260408-13003.html
title: "NVIDIA Blackwell/Rubin & AMD MI350/MI400 HBM capacity & 2026 shipment mix"
publisher: TrendForce / AMD / VideoCardz / Tom's Hardware
published: 2026-04-08
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, datacenter, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# AI 가속기 HBM 용량·출하 로드맵 (2026) — extracted notes

> AI 가속기당 HBM 탑재량 × 출하량 = HBM bit demand의 1차 driver.

## NVIDIA

- **B200**: 192GB HBM3e. **GB300 NVL72 (Blackwell Ultra)**: GPU당 288GB HBM3e (B200 192GB 대비 증가).
- **2026 출하 mix**: Blackwell이 NVIDIA 하이엔드 GPU 출하의 **71%** 차지 전망. Rubin은 29%→22%로 하향(딜레이 리스크). GB200/B200은 기존 수주·가격민감 고객 수요로 2H26까지 지속.
- **Rubin 지연 요인**: CX8→CX9 인터커넥트 전환, 전력 급증, 고급 액침냉각 최적화.

## AMD

- **MI350/MI355X**: GPU당 **288GB HBM3E**, 8TB/s. 플랫폼(8 OAM)당 **2.3TB HBM3E**.
- **MI350P (PCIe)**: 144GB HBM3E.
- **MI400 (2026)**: **432GB HBM4**, 대역폭 최대 19.6TB/s (MI355X의 2배 이상).

## 메모리 수요 예측 관련성

- 세대당 HBM 용량 +50% 추세(B200 192→GB300 288, MI355X 288→MI400 432).
- HBM4 전환으로 stack당 capacity·대역폭 동시 상승 → 가속기 단위당 HBM bit 급증.
- Rubin 지연은 HBM4 ramp 타이밍과 2026 HBM bit demand 곡선에 직접 영향(시나리오 변수).
- 예측 공식: HBM bit demand ≈ Σ(가속기 세대별 출하량 × GPU당 HBM GB).

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- AMD MI400 432GB HBM4: https://videocardz.com/newz/amd-launches-instinct-mi350-series-confirms-mi400-in-2026-with-432gb-hbm4-memory
- AMD MI350X platform brief: https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/product-briefs/amd-instinct-mi350x-platform-brochure.pdf
- Blackwell 71% mix: https://cloudnews.tech/blackwell-will-dominate-2026-and-rubin-faces-delay-risk-according-to-trendforce/
- GB200 supply chain: https://intuitionlabs.ai/articles/nvidia-gb200-supply-chain
