---
source_url: https://my.idc.com/getdoc.jsp?containerId=US53363625
title: "IDC Global DataSphere (제타바이트, 2018-2029)"
publisher: IDC / Seagate / Network World
published: 2026
ingested: 2026-06-06
type: dataset
data_file: idc-global-datasphere-zettabytes.csv
unit: zettabytes (ZB)
tags: [nand, demand-forecasting, bit-demand, datacenter, capacity]
confidence: medium
---

# IDC Global DataSphere (2018-2029)

> 데이터 생성량은 NAND/스토리지 수요의 거시 상류 driver(단, 저장률<생성률).

## 컬럼 설명

- `year`, `datasphere_zb`(연간 생성/캡처/복제/소비 데이터, ZB), `note`, `confidence`

## 출처/수집 메모

- 2018 33ZB → 2025 ~173.4ZB(≈175). 2026 230~240ZB. 2029 527.5ZB(2025의 ~3배).
- **중요**: Global StorageSphere(실제 저장량)는 DataSphere보다 느리게 성장 → 생성 데이터 중 저장 비율 하락. NAND 수요는 DataSphere가 아닌 StorageSphere에 더 직접 연동.
- 저장 데이터는 4년마다 2배(IDC).

## 메모리 수요 예측 활용

- NAND bit 수요의 거시 상한 신호(생성량). 단 저장률(retention rate) 보정 필요.
- AI 시대 KV cache·체크포인트·벡터DB가 저장률을 재상승시킬 수 있음(storage- 파일 연계).
- DataSphere↔StorageSphere↔NAND bit 수요의 환산 체인 모델링.

## 관련 wiki

- [[nand]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]
