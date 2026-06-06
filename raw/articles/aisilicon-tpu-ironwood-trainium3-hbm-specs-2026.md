---
source_url: https://www.trendforce.com/news/2025/11/07/news-google-unveils-7th-gen-tpu-ironwood-with-9216-chip-superpod-taking-aim-at-nvidia/
title: "Google TPU v7 Ironwood / AWS Trainium3 HBM 스펙 (2026)"
publisher: Google Cloud / AWS / TrendForce / The Register / SemiAnalysis
published: 2025-12
ingested: 2026-06-06
type: article
tags: [hbm, ai-server, datacenter, demand-forecasting, bit-demand, capacity]
confidence: high
---

# Google TPU Ironwood / AWS Trainium3 HBM 스펙 — extracted notes

> 커스텀 ASIC(비-NVIDIA)도 HBM 대량 소비 → HBM 수요 저변. NVIDIA 외 수요 트랙.

## Google TPU v7 Ironwood

- 칩당 **192GB HBM3e**, 대역폭 **7.4 TB/s**. dual-chiplet(각 chiplet 96GB, HBM3E 8 stack).
- dense FP8 4.6 PFLOPS(B200 4.5 대비 소폭↑). **9,216칩 superpod = 직접접근 HBM 1.77 PB**.
- inference 시대 겨냥(Google "first TPU for the age of inference").

## AWS Trainium3

- 칩당 **144GB HBM3e**(Trainium2 대비 capacity 1.5배·대역폭 1.7배), **4.9 TB/s**. HBM3E **12-high**. FP8 2.52 PFLOPS(2배). 3nm.
- **Trn3 UltraServer: HBM3e 20.7 TB, 대역폭 706 TB/s**, 362 MXFP8 PFLOPs(Trn2 대비 4.4배 성능·4배 효율).

## 메모리 수요 예측 관련성

- 커스텀 ASIC당 HBM(144~192GB)은 NVIDIA GPU급 → ASIC 출하 증가가 HBM bit 수요에 직접 가산.
- TrendForce AI 서버 ASIC 비중 상승(2026 ~28%)과 결합해 HBM 수요 bottom-up 정밀화.
- superpod/UltraServer 단위 HBM(PB·TB)은 시스템 단위 수요 환산 입력.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- Google Cloud Ironwood docs: https://docs.cloud.google.com/tpu/docs/tpu7x
- HPCwire Trainium3 UltraServer: https://www.hpcwire.com/2025/12/02/aws-brings-the-trainium3-chip-to-market-with-new-ec2-ultraservers/
- SemiAnalysis TPUv7: https://newsletter.semianalysis.com/p/tpuv7-google-takes-a-swing-at-the
- SemiAnalysis Trainium3: https://newsletter.semianalysis.com/p/aws-trainium3-deep-dive-a-potential
