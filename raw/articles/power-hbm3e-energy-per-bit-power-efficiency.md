---
source_url: https://www.micron.com/about/blog/applications/ai/microns-hbm3e-powering-the-future-of-ai-with-high-bandwidth-memory
title: "Micron's HBM3E: Powering the future of AI with high-bandwidth memory"
publisher: Micron Technology
published: 2024-02-26
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, capacity]
confidence: medium
---

# Micron HBM3E: 전력 효율과 energy/bit — extracted notes

> HBM3E의 전력 효율 수치와 DDRx 대비 energy/bit 비교. 메모리가 AI 서버 열·전력 예산에서 차지하는 비중의 근거.

## 핵심 수치
- Micron HBM3E: 경쟁사 대비 전력 소비 ~30% 낮음 주장.
- HBM3E 세대 전력 효율 직전 세대 대비 약 12% 개선.
- 대역폭: 스택당 최대 9.8 Gbps 핀속도, 1.2 TB/s 이상(스택당).
- energy/bit(역사적 비교): HBM ~7 pJ/bit vs DDRx DRAM ~25 pJ/bit (초기 HBM 세대 기준 인용).

## 수요/제약 영향
- HBM의 낮은 energy/bit(7 vs 25 pJ/bit)가 동일 열 예산 내 더 많은 대역폭/컴퓨트 패킹 가능케 함.
- 그러나 GPU당 HBM 스택 수 증가(예: 8 스택)는 스택당 수 W~수십 W를 누적 → 패키지 열밀도 상승.
- HBM 전력·발열이 GPU 패키지 냉각 한계를 통해 스택 수·용량 확장의 물리적 제약으로 작용.

## 메모리 수요 예측 관련성
- energy/bit 개선이 전력 제약 데이터센터에서 단위 전력당 메모리 대역폭/용량을 늘려 비트 수요를 끌어올림.
- 세대별 전력 효율 개선율(약 12%)이 동일 GW 예산 대비 HBM 탑재 가능량 증가 추정의 입력값.

## 메모리 수요 예측 관련성 (보충)
- "전력-제약" 시나리오에서 메모리 효율 개선이 HBM 수요 상단을 부분적으로 완화.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[demand-forecasting]]

## 추가 출처
- https://www.micron.com/products/memory/hbm/hbm3e
- https://semiconductor.samsung.com/dram/hbm/hbm3e/
- https://arxiv.org/pdf/2101.00969
