---
source_url: https://introl.com/blog/ai-memory-supercycle-hbm-2026
title: "The AI Memory Supercycle"
publisher: Introl Blog
published: 2026-01-03
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, datacenter, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# The AI Memory Supercycle — extracted notes

> 원천 요약 노트. AI 모델 스케일이 HBM/DRAM 수요를 끌어올리는 supercycle 분석. GPU별 HBM 용량/대역폭, 시장 규모, 공급 제약 수치 포함.

## 핵심 수치
- GPU별 HBM 사양: H100 80GB / 3.35 TB/s (HBM3), H200 141GB / 4.8 TB/s (HBM3e), B200 (Blackwell) 192GB / 8.0 TB/s (HBM3e), R100 (Rubin) 288GB / 13-15 TB/s (HBM4), GB300 (Blackwell Ultra) 288GB (HBM3e), Rubin Ultra 512GB (HBM4)
- 메모리 룰: 16-bit 정밀도에서 1B 파라미터당 약 2GB GPU 메모리
- 7B 모델 KV cache: 추론 시 토큰당 약 0.5MB
- HBM TAM: 2025년 $35B → 2028년 $100B 전망, CAGR 약 40%
- Micron Q1 FY2026 매출 $13.64B (YoY +57%), gross margin >50% (FY2024 ~22%에서 2배)
- 데이터센터 메모리: 2024년 +78% → $170B, 2025년 $200B
- HBM 점유율: SK Hynix 62%, Micron 21%, Samsung 17%; NVIDIA의 SK Hynix 공급 약 90%
- HBM 2026년 캘린더 연도까지 전 공급사 sold out
- 2025년 메모리 가격 상승 246%; 게이밍 GPU 생산 H1 2026 30-40% 감축 계획
- HBM4 표준 대역폭 11+ GB/s, 총 2.8 TB/s

## 수요 동인 (모델/소프트웨어)
- Llama 3 70B 모델이 단일 80GB A100 용량 초과 → 멀티 GPU 강제
- 파라미터 증가 → HBM 용량이 binding constraint
- 추론(KV cache) 워크로드 증가가 HBM 대역폭 수요 견인

## 메모리 수요 예측 관련성
- HBM TAM 2025-2028 약 3배 성장 전망은 모델 스케일 + 추론 폭증의 직접 결과
- 공급 sold out + 246% 가격 상승은 모델 수요가 공급을 초과하는 구조 시그널
- GPU 세대별 HBM 용량 점프(80→141→192→288→512GB)가 비트 수요 증가의 핵심 multiplier

## 관련 wiki
- [[hbm]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처
- https://introl.com/blog/ai-memory-supercycle-hbm-2026
