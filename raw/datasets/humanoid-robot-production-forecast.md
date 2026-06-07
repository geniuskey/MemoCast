---
source_url: https://omdia.tech.informa.com/pr/2024/jul/omdia-global-humanoid-robot-shipments-to-exceed-10000-units-by-2027-and-reach-38000-units-in-2030
title: "휴머노이드 로봇 생산 전망·메모리 콘텐츠 (2027-2035)"
publisher: Omdia / Tesla / Figure / Micron / RoboZaps
published: 2026
ingested: 2026-06-07
type: dataset
data_file: humanoid-robot-production-forecast.csv
unit: units, USD billion
tags: [dram, nand, automotive, bit-demand, demand-forecasting, consumer-electronics]
confidence: low
---

# 휴머노이드 로봇 생산 전망·메모리 콘텐츠 (2027-2035)

> 휴머노이드는 디바이스당 메모리 큼(LPDDR5/6+SSD)이나 출하량 불확실. 2027+ long-tail 변곡.

## 컬럼 설명

- `source`(omdia/tesla/figure), `year`, `metric`, `value`, `unit`, `note`, `confidence`

## 출처/수집 메모

- **Omdia(보수)**: 2027 >10,000대, 2030 38,000대(CAGR 83%).
- **Tesla(공격)**: 2027 ~500,000대/년 목표(10M/년 시설은 aspirational). Figure BotQ 12,000대/년(시간당 1대).
- → 출하 전망 출처 간 1~2 orders of magnitude 분산(`confidence: low`).
- 메모리 콘텐츠: 휴머노이드는 실시간 perception·multi-sensor fusion으로 **LPDDR5/6 + 고성능 SSD** 대량 필요(Micron). domain-humanoid 파일 연계.

## 메모리 수요 예측 활용

- 휴머노이드 메모리 수요 = 출하량 × 로봇당 메모리(LPDDR/SSD). 출하 전망 분산이 커 시나리오 band.
- 2027+ 변곡(Omdia 보수 vs Tesla 공격)이 long-tail 수요의 분기.
- 디바이스당 메모리는 크나 절대 출하(만~수십만)로 단기 bit 기여는 제한적, 2030+ 비선형.

## 관련 wiki

- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[demand-forecasting]] · [[scenario-analysis]]
