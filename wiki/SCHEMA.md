# Wiki Schema

## Domain

MemoCast는 메모리 반도체 수요 예측을 위한 지식베이스입니다. 범위는 DRAM, NAND, HBM의 수요 결정 요인, 통계/인과/시나리오 기반 예측 방법론, 산업별 메모리 소비 구조, 그리고 가정 기반 수요 시뮬레이터를 포함합니다.

## Core Principle

이 wiki는 “정답 예측기”가 아니라 “가정과 수요 구조를 투명하게 만드는 분석 시스템”입니다. 수요 예측은 raw 자료에서 수집한 산업 지식과 수학적/통계적 모델을 점진적으로 결합합니다.

## Directory Structure

- `concepts/`: 핵심 개념과 이론
- `markets/`: DRAM, NAND, HBM, 스마트폰, PC, 서버 등 시장/응용처
- `methods/`: 통계, ML, 인과, 시나리오 예측 방법론
- `comparisons/`: 방법/시장/가정 간 비교
- `queries/`: 보존할 가치가 있는 질의 결과
- `simulators/`: 웹 시뮬레이터 설명 페이지
- `components/`: VitePress/Vue 시뮬레이터 컴포넌트
- `.vitepress/`: VitePress 설정

## Naming Conventions

- 파일명은 lowercase-kebab-case를 사용합니다.
- 문서 제목은 사람이 읽기 쉬운 한국어/영어 혼합을 허용합니다.
- Obsidian/VitePress 호환성을 위해 내부 링크는 `[[wikilink]]`를 기본으로 사용합니다.
- VitePress 렌더링이 중요한 문서에는 일반 Markdown 링크도 병행할 수 있습니다.

## Frontmatter

Wiki 페이지는 가능하면 다음 frontmatter를 사용합니다.

```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: concept | market | method | comparison | query | simulator | summary
tags: [tag1, tag2]
sources: []
confidence: medium
---
```

## Raw Frontmatter

Raw 자료는 가능하면 다음 frontmatter를 사용합니다.

```yaml
---
source_url: https://example.com/source
ingested: YYYY-MM-DD
sha256: <body-sha256>
domain: smartphone-mobile | pc-client | server-cloud | ai-accelerator | enterprise-storage | graphics-gaming | automotive | networking | edge-ai-iot | wearables-arvr | hpc-supercomputer | surveillance-video | consumer-electronics | specialty-medical-aerospace
memory_types: [dram, nand, hbm]
forecast_role: demand-driver | supply-constraint | pricing-signal | method | evidence
forecast_driver: unit-shipment-content | accelerator-shipment-content | workload-storage-intensity | installed-base-content | project-pipeline-content
confidence: low | medium | high
---
```

## Tag Taxonomy

### Products
- dram
- nand
- hbm
- memory

### Demand Drivers
- smartphone
- pc
- server
- ai-server
- ai-accelerator
- datacenter
- enterprise-storage
- graphics-gaming
- automotive
- networking
- edge-ai
- iot
- industrial
- wearables
- ar-vr
- hpc
- surveillance-video
- consumer-electronics
- medical
- aerospace
- specialty
- regional-demand

### Forecasting
- demand-forecasting
- time-series
- causal-model
- scenario-analysis
- sensitivity-analysis
- probabilistic-forecasting
- regression
- machine-learning

### Metrics and Units
- bit-demand
- capacity
- revenue
- units
- pricing

### Operations
- inventory
- supply-chain
- capex
- wafer

### Meta
- simulator
- comparison
- methodology
- source-review

새 tag가 필요하면 먼저 이 taxonomy에 추가한 뒤 문서에 사용합니다.

## Page Thresholds

- 한 source에서 중심 주제인 개념/시장/방법은 페이지를 생성합니다.
- 여러 source에 반복 등장하는 개념은 독립 페이지로 승격합니다.
- 단순 언급은 기존 관련 페이지에만 기록합니다.
- 200줄을 넘는 페이지는 하위 주제로 분리합니다.

## Demand Modeling Conventions

- `bit demand`, `capacity demand`, `unit demand`, `revenue demand`를 혼동하지 않습니다.
- DRAM, NAND, HBM은 가능한 한 분리해서 모델링합니다.
- 가격이 포함된 revenue forecast와 물량 중심 bit demand forecast는 분리합니다.
- simulator는 기본적으로 가정 기반 계산기이며, 자동 예측 모델이 아닙니다.
- 모든 공식은 입력, 단위, 출력 단위를 명시합니다.

## Simulator Conventions

- 각 simulator 문서는 다음을 포함합니다.
  - 목적
  - 입력 가정
  - 계산 공식
  - 출력 해석
  - 한계
  - 관련 wiki 문서 링크
- Vue 컴포넌트는 `wiki/components/`에 둡니다.
- 핵심 계산 로직은 TypeScript 함수로 분리하고 테스트합니다.

## Update Policy

새 자료가 기존 내용과 충돌하면:

1. source 날짜와 맥락을 확인합니다.
2. 최신 자료가 반드시 정답이라고 가정하지 않습니다.
3. 양쪽 주장을 출처와 함께 기록합니다.
4. 필요하면 `confidence: low` 또는 `contested: true`를 사용합니다.
5. `index.md`와 `log.md`를 갱신합니다.
