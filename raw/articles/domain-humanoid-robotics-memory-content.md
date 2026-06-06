---
source_url: https://www.trendforce.com/news/2025/06/27/news-tsmc-reportedly-eyes-10-year-boom-from-humanoids-backed-by-nvidia-jetson-and-teslas-ai-chips/
title: "휴머노이드 로봇 / 피지컬 AI 메모리 탑재량 (Tesla Optimus, Figure, NVIDIA Jetson Thor)"
publisher: TrendForce / NVIDIA / The Register
published: 2025-08-25
ingested: 2026-06-06
type: article
tags: [dram, nand, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# 휴머노이드 로봇 메모리 탑재량 — extracted notes

> 휴머노이드/피지컬 AI는 온디바이스 추론 컴퓨트(LPDDR + NAND)를 요구하는 신규 메모리 end-market. 대당 컴퓨트 모듈 기준 메모리 함량 파악.

## 핵심 수치
- **NVIDIA Jetson Thor (Blackwell, TSMC 4nm)**: Jetson Orin 대비 AI 컴퓨트 7.5배, CPU 3.1배, **메모리 2배**. 130W 전력 envelope. 2070 FP4 TFLOPS GPU.
  - Developer Kit $3,499 / T5000 모듈 $2,999~ (1,000개 MOQ).
  - 일반적으로 Jetson Thor T5000은 **128GB LPDDR5X** 급(Orin AGX 64GB의 2배)으로 보도됨.
- **Tesla Optimus HW5급 보드**: CPU+GPU+NPU에 수백억 트랜지스터. HW5 칩 TSMC N3P/Samsung 2nm, 2026년 양산 전망.
- 시장 전망(TSMC 인용): 2030년까지 **AI 로봇 13억 대 배치, 시장 $35B**; 2050년 40억 대(휴머노이드 6.5억 대 포함).
- 주요 플랫폼: Tesla Optimus, Figure 03, Unitree G1, 1X Neo.

## 수요 동인
- 휴머노이드는 실시간 VLA(Vision-Language-Action) 모델을 온디바이스에서 구동 → 고대역폭 LPDDR5X 다량 + 모델 weight/로그 저장용 NAND.
- 로봇 1대 = 사실상 모바일 AP + 데이터센터급 추론 칩 결합 → 스마트폰 대비 대당 메모리 함량 10~20배 추정.

## 메모리 수요 예측 관련성
- 대당 LPDDR 64~128GB+ 가정 시, 연 수백만~수천만 대 출하 시점에 의미 있는 신규 bit pool 형성(2028년 이후).
- 현재는 절대 수량 작으나 대당 함량이 높고 고성장(physical AI) → 장기 incremental DRAM/NAND 수요원.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처
- https://www.theregister.com/2025/08/25/nvidia_touts_jetson_thor_kit/
- https://www.nvidia.com/en-in/use-cases/humanoid-robots/
- https://semiconductorx.com/spotlight-humanoid.html
