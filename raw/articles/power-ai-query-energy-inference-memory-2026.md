---
source_url: https://epoch.ai/gradient-updates/how-much-energy-does-chatgpt-use
title: "AI 쿼리당 에너지·inference 에너지·메모리 (2026)"
publisher: Epoch AI / IEEE Spectrum / Brookings / OpenAI
published: 2026
ingested: 2026-06-06
type: article
tags: [ai-server, datacenter, hbm, dram, demand-forecasting, bit-demand]
confidence: medium
---

# AI 쿼리당 에너지·inference·메모리 — extracted notes

> 쿼리당 에너지 × 쿼리량 = 데이터센터 전력 → 메모리 수요·power-limited 제약과 연결.

## 핵심 수치

- 표준 ChatGPT 쿼리 **~0.34 Wh**(Altman), GPT-4o ~0.42 Wh(학술), 최신 중앙값 0.24~0.3 Wh(reasoning/멀티모달은 훨씬 높음).
- AI compute의 **80~90%가 inference** → inference가 규모에서 지배적 에너지 소비.
- agentic AI는 병목을 compute→memory bandwidth로 이동, memory-intensive 연산이 hardware 단에서 power-hungry.
- 2026 데이터센터 전력 2배(일본 전체 수준), Goldman 2030 +160%.

## 메모리 수요 예측 관련성

- 쿼리당 에너지·메모리 대역폭 연산이 전력 제약(power-limited 시나리오)과 직결 → AI 사용량 상한.
- inference 지배(80~90%)는 inference 메모리(HBM capacity/대역폭) 수요가 학습보다 큰 축임을 시사.
- 메모리 연산의 전력 집약성은 에너지 효율 압박 → 저전력 메모리(LPDDR/SOCAMM, power- 파일) 수요.

## 관련 wiki

- [[memory-demand]] · [[hbm]] · [[bit-demand]] · [[demand-forecasting]] · [[scenario-analysis]]

## 추가 출처

- IEEE Spectrum AI energy: https://spectrum.ieee.org/ai-energy-use
- Brookings AI energy/regulation: https://www.brookings.edu/articles/global-energy-demands-within-the-ai-regulatory-landscape/
- arXiv ICT/AI 환경영향 2026: https://arxiv.org/pdf/2601.06174
