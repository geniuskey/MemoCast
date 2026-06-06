---
source_url: https://newsletter.semianalysis.com/p/huawei-ascend-production-ramp
title: "Huawei Ascend HBM 수요·중국 HBM 자급 병목 (2026)"
publisher: SemiAnalysis / DigiTimes / Tom's Hardware / TrendForce
published: 2026
ingested: 2026-06-06
type: report
tags: [hbm, dram, ai-server, supply-chain, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# Huawei Ascend HBM 수요·중국 자급 병목 (2026) — extracted notes

> 중국 AI 칩 수요가 도메스틱 HBM/DRAM을 끌어당기나 HBM이 병목.

## 핵심 수치

- Huawei **Ascend 910C 2026년 ~60만 개**(2025 대비 2배), 총 Ascend capacity 160만 개. **950PR ~75만 개** 출하 계획.
- 중국이 **HBM stack 1,300만 개 확보**(910C 160만 패키지분) → 연말 외산 HBM 소진으로 **HBM 병목** 전망.
- **CXMT 도메스틱 HBM 2026년 ~200만 stack**(910C 환산 25만~30만 패키지분) → 자급 부족.
- Ascend **950PR**: 자체 **HiBL 메모리 112GB, 1.4TB/s** 탑재(외부 의존 축소). 950/960/970 3년 로드맵.
- **CloudMatrix 384**: 910C 384개, dense BF16 ~300 PFLOPs(NVL72의 ~2배)이나 560kW(NVL72 145kW의 4.1배).

## 정책/공급 영향

- 중국 AI 수요는 외산 HBM 수출통제로 제약 → 도메스틱 HBM(CXMT) ramp 속도가 중국 AI capacity 상한.
- 외산 HBM 의존 + 자급 부족 = 중국 HBM 수요가 글로벌 공급에 추가 압력(또는 통제로 분리).

## 메모리 수요 예측 관련성

- 중국 가속기 출하 × HBM/chip = 중국 HBM bit demand. 단 수출통제로 글로벌 수급과 부분 분리.
- 전력 비효율(4.1배)은 중국 buildout의 전력 제약 가중 → 수요 실현 상한.

## 관련 wiki

- [[hbm]] · [[memory-demand]] · [[dram]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- DigiTimes Ascend 950 in-house HBM: https://www.digitimes.com/news/a20250919PD201/huawei-ascend-hbm-2026-ai-chip.html
- TrendForce DeepSeek V4/Ascend 950PR: https://www.trendforce.com/news/2026/04/07/news-decoding-deepseek-v4-how-huaweis-ascend-950-pr-is-powering-chinas-push-to-break-cuda-dependence/
- Tom's Hardware Ascend roadmap: https://www.tomshardware.com/tech-industry/artificial-intelligence/huawei-ascend-npu-roadmap-examined-company-targets-4-zettaflops-fp4-performance-by-2028-amid-manufacturing-constraints
