---
source_url: https://cloud.google.com/blog/products/compute/ai-infrastructure-at-next26
title: "AI 학습데이터·합성데이터 → 스토리지(NAND) 수요 (2026)"
publisher: Google Cloud / Gartner / Dataversity / Nutanix
published: 2026
ingested: 2026-06-06
type: article
tags: [nand, ai-server, datacenter, demand-forecasting, bit-demand, capacity]
confidence: medium
---

# AI 학습데이터·합성데이터 → NAND 수요 — extracted notes

> AI 학습/추론 파이프라인이 스토리지(NAND) 수요의 새 driver. checkpoint·합성데이터·KV cache.

## 핵심 수치/사실

- **Gartner: 2026년까지 기업 75%가 합성데이터 생성**(2023 <5%). 2026 AI 프로젝트 데이터의 75% 합성, 2030 합성>실데이터.
- LLM 1회 학습 사이클이 **petabyte급 intermediate 데이터** 생성 → 고throughput 스토리지 필요.
- Elevance Health-Google: petabyte급 합성 의료 클레임 데이터 생성.
- Google Cloud Managed Lustre: 10TB/s 대역폭, capacity 80PB.
- NVMe-oF + RDMA로 flash→GPU 메모리 sub-ms. hot 데이터셋 NVMe, cold는 object storage 이동.

## 수요 동인

- 학습 checkpoint·intermediate·합성데이터·로그·벡터DB가 enterprise/datacenter NAND 수요 견인.
- hot/cold 티어링으로 고성능 NVMe(eSSD)와 저비용 QLC 수요 동시 증가.

## 메모리 수요 예측 관련성

- AI 데이터 파이프라인은 IDC StorageSphere 외 추가 NAND 수요원 → enterprise SSD 수요 상방.
- 합성데이터 폭증은 저장률(retention) 재상승 요인 → DataSphere→NAND 환산 계수 변화.
- hot(NVMe)/cold(QLC) 티어 비중이 NAND 제품 mix 시나리오.

## 관련 wiki

- [[nand]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처

- Gartner 합성데이터(Dataversity): https://www.dataversity.net/articles/when-real-data-runs-dry-synthetic-data-for-ai-models/
- AI storage 2026 (StarWind): https://www.starwindsoftware.com/blog/ai-storage/
- Nutanix AI 스토리지: https://www.nutanix.com/theforecastbynutanix/technology/how-ai-will-shape-the-future-of-data-storage
