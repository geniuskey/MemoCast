---
source_url: https://v-chandra.github.io/on-device-llms/
title: "On-device SLM 스마트폰 RAM 요구 (2026, Snapdragon/MediaTek)"
publisher: On-Device LLMs survey / Gizmochina / Qualcomm / MediaTek / Samsung
published: 2026
ingested: 2026-06-06
type: article
tags: [dram, smartphone, bit-demand, demand-forecasting, capacity]
confidence: medium
---

# On-device SLM 스마트폰 RAM 요구 (2026) — extracted notes

> 온디바이스 AI가 스마트폰 평균 DRAM 콘텐츠를 12~16GB로 끌어올리는 미시 메커니즘.

## 핵심 수치

- 모바일 SLM 1B~7B 파라미터. **7B 4-bit ≈ 3.5~4.5GB RAM** 로드.
- 2026 플래그십 **12~16GB unified memory**(7B가 OS+앱과 공존 상한).
- **Gemini Intelligence: 12GB+ RAM** 요구(Gemini Nano v3, AICore). 온디바이스 추론에 3~4GB 상주.
- 권장: 8GB+ RAM + Snapdragon 8 Gen2+ → 3B~7B 모델.

## SoC / LPDDR

- **Snapdragon 8 Elite Gen5**: LPDDR5X 5300MHz, 최대 24GB. NPU 100+ tok/s(prefill 11,000 tok/s).
- **MediaTek Dimensity 8500**: LPDDR5X 9600Mbps. Kompanio Ultra 910: LPDDR5X 8533MHz, NPU 50 TOPS.
- LPDDR5X: LPDDR5(6.4Gbps) 대비 ~1.2배(7.5Gbps), 전력 ~20%↓. Snapdragon X Elite 135GB/s.

## 메모리 수요 예측 관련성

- 온디바이스 모델 크기·상주 메모리가 스마트폰 평균 DRAM 콘텐츠(GB/폰) 상향 → 모바일 DRAM bit 수요.
- LPDDR5X→LPDDR6 전환 + 용량 증가가 mobile DRAM 수요 이중 견인.
- 단, 메모리 가격 급등으로 저가폰 4GB 회귀 압력(spec 양극화, oem- 파일 연계).

## 관련 wiki

- [[dram]] · [[smartphone-memory]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처

- Gizmochina 12GB 표준화: https://www.gizmochina.com/2026/05/27/how-much-ram-does-your-phone-actually-need-in-2026/
- Samsung LPDDR5X Snapdragon validation: https://semiconductor.samsung.com/news-events/news/samsungs-lpddr5x-dram-validated-for-use-with-qualcomm-technologies-snapdragon-mobile-platforms/
- TechPowerUp Snapdragon X2 on-package LPDDR5X: https://www.techpowerup.com/341335/qualcomm-snapdragon-x2-elite-extreme-pictured-with-on-package-lpddr5x-memory
