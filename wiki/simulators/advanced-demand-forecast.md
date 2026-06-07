---
title: Advanced Demand Forecast Simulator
created: 2026-06-07
updated: 2026-06-07
type: simulator
tags: [simulator, advanced-forecasting, demand-forecasting, scenario-analysis, supply-realization]
sources: [raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md, raw/reports/trendforce-hbm-bit-demand-supply-2026.md, raw/reports/hbm-longterm-tam-by-application-2030.md, raw/reports/idc-2026-memory-shortage-supply-growth.md, raw/articles/on-device-ai-smartphone-dram-content-2026.md, raw/reports/trendforce-qlc-enterprise-ssd-nearline-hdd-2026.md]
confidence: medium
---

# Advanced Demand Forecast Simulator

이 simulator는 단순 계산기가 아니라 **고차원 forecast cockpit**입니다. 기존 domain별 계산기는 특정 시점의 `units × mix × content`를 투명하게 보여주는 데 강하지만, 실제 메모리 수요 예측에는 adoption transition, content CAGR, 가격 탄력성, 채널 재고, bullwhip, supply allocation이 동시에 작동합니다.

<ClientOnly>
  <AdvancedDemandForecastSimulator />
</ClientOnly>

## 모델 계층

```text
End demand path
= base demand
× unit growth index
× content growth index
× S-curve adoption/content uplift index

Cycle-adjusted demand
= end demand path × price-inventory-cycle factor

Supply-realized demand
= min(cycle-adjusted demand, available supply × yield × allocation)

Unmet demand
= max(0, cycle-adjusted demand - supply-realized demand)
```

## 사용 규칙

- **Unconstrained demand**는 최종 소비/설치 수요가 만드는 이론적 경로입니다.
- **Supply-realized demand**는 실제 공급·수율·allocation gate를 통과한 실행 가능 수요입니다.
- **Unmet demand**는 수요가 사라졌다는 뜻이 아니라 backorder, price rationing, spec downgrade, delayed refresh로 전이될 수 있는 압력입니다.
- `price-inventory-cycle`이 dominant constraint이면 주문량을 end demand로 그대로 읽으면 안 됩니다.
- `supply-realization`이 dominant constraint이면 시장 TAM보다 CoWoS/HBM/NAND wafer/DDR allocation이 near-term cap입니다.

## 구현 파일

- `wiki/lib/advancedDemandForecast.ts`
- `wiki/data/advanced-forecast-presets.json`
- `wiki/components/AdvancedDemandForecastSimulator.vue`
- `tests/advancedDemandForecast.test.ts`
- `tests/advancedForecastUi.test.ts`

## Source traceability

| Forecast preset | Source-backed axes | Raw source anchors |
| --- | --- | --- |
| HBM AI infrastructure constraint | GPU content uplift, HBM growth, package/supply realization, datacenter constraints, long-term TAM band | `raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md`, `raw/articles/nvidia-gpu-hbm-capacity-roadmap-2026.md`, `raw/reports/trendforce-hbm-bit-demand-supply-2026.md`, `raw/reports/pkg-cowos-allocation-nvidia-amd-2026.md`, `raw/reports/hbm-longterm-tam-by-application-2030.md` |
| PC DRAM shortage elasticity | AI PC content, PC shipment drag, memory shortage price pass-through, refresh cycle | `raw/reports/idc-2026-memory-shortage-supply-growth.md`, `raw/articles/oem-pc-dell-hp-lenovo-price-hike-memory-2026.md`, `raw/articles/oem-windows10-eol-pc-refresh-memory-demand-2026.md`, `raw/articles/microsoft-ai-pc-16gb-ram-baseline.md` |
| Smartphone on-device AI premiumization | on-device AI DRAM uplift, premium mix, storage capacity, spec downgrade risk | `raw/articles/on-device-ai-smartphone-dram-content-2026.md`, `raw/articles/trendforce-smartphone-storage-capacity-2026.md`, `raw/articles/oem-smartphone-dram-content-spec-downgrade-2026.md`, `raw/articles/on-device-slm-smartphone-ram-2026.md` |
| NAND AI storage QLC breakout | QLC enterprise SSD, AI/data-center storage mix, capacity-per-drive uplift | `raw/reports/trendforce-qlc-enterprise-ssd-nearline-hdd-2026.md`, `raw/articles/storage-enterprise-ssd-qlc-nand-demand-2026.md`, `raw/datasets/idc-global-datasphere-zettabytes.md` |

## 관련 문서

- [[forecasting-method-library]]
- [[ai-infrastructure-memory]]
- [[channel-pricing-signal]]
- [[memory-supply-chain-equipment]]
- [[scenario-analysis]]
- [[sensitivity-analysis]]
