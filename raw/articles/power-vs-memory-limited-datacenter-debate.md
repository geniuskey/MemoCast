---
source_url: https://www.datacenterknowledge.com/infrastructure/after-the-power-crunch-ai-infrastructure-hits-a-gpu-wall
title: "After the Power Crunch, AI Infrastructure Hits a Silicon/Memory Wall"
publisher: Data Center Knowledge / SemiAnalysis
published: 2026-01-01
ingested: 2026-06-06
type: article
tags: [hbm, dram, ai-server, datacenter, demand-forecasting]
confidence: low
---

# "전력-제약" vs "메모리-제약" 논쟁 — extracted notes

> AI 데이터센터의 binding constraint가 전력에서 실리콘/메모리로 이동하는지에 대한 논쟁. 본 KB의 핵심 가설.

## 핵심 수치
- SemiAnalysis 추정: 메모리가 하이퍼스케일러 AI 지출의 ~30%(2026)로 상승, 2023~2024년 ~8% 대비.
- SemiAnalysis 모델 base case에서 예측 구간 상당 부분 동안 메모리가 binding constraint.
- 단기(short-term) binding은 실리콘/메모리, 장기(long-term) binding은 전력으로 평가.

## 수요/제약 영향
- 단기: HBM 부족 → 메모리가 제약. AI 지출 내 메모리 비중 급등(8%→30%).
- 장기: 전력·그리드·인허가·발전 조달이 buildout 속도 제약.
- 지역별 상이: 일부 시장은 전력이, 일부는 칩/메모리 공급이 배치 속도 결정.

## 메모리 수요 예측 관련성
- 메모리가 "binding constraint"라는 명제는 HBM 수요가 공급에 의해 캡(cap)되는 상황(가격 상승·할당)을 의미.
- 전력 제약이 풀려도 메모리 공급(HBM 캐파)이 따라오지 못하면 AI 서버 출하가 메모리에 의해 제한.
- 두 제약이 동시에 조이는 국면 → 수요 전망은 "전력 GW 상한"과 "HBM 캐파 상한"의 min()으로 모델링.

## 관련 wiki
- [[memory-demand]] · [[hbm]] · [[demand-forecasting]]

## 추가 출처
- https://newsletter.semianalysis.com/p/to-boldly-go-the-case-for-space-datacenters
- https://semianalysis.com/datacenter-industry-model/
- https://www.rand.org/content/dam/rand/pubs/research_reports/RRA3500/RRA3572-1/RAND_RRA3572-1.pdf
