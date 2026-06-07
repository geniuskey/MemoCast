---
title: Simulators
created: 2026-06-06
updated: 2026-06-07
type: simulator
tags: [simulator, demand-forecasting, scenario-analysis, decision-workbench]
sources: []
confidence: medium
---

# MemoCast Simulators

MemoCast simulator는 자동으로 미래를 맞히는 예측기가 아닙니다. **Units × Mix × Content × Realization** 가정을 직접 움직이며 메모리 수요가 어떻게 달라지는지 확인하는 **Assumption Workbench**입니다.

<div class="simulator-hub">
  <a class="tool-card tool-card-primary" href="/simulators/advanced-demand-forecast">
    <span class="tool-kicker">Integrated Forecast</span>
    <strong>Advanced Forecast Cockpit</strong>
    <em>End demand × adoption × cycle × supply realization</em>
  </a>
  <a class="tool-card" href="/simulators/hbm-demand">
    <span class="tool-kicker">AI Server</span>
    <strong>HBM Demand Workbench</strong>
    <em>Accelerator units × attach × stacks × GB/stack</em>
  </a>
  <a class="tool-card" href="/simulators/nand-ssd-demand">
    <span class="tool-kicker">Storage</span>
    <strong>NAND SSD Workbench</strong>
    <em>SSD units × client/enterprise/AI mix × TB/SSD</em>
  </a>
  <a class="tool-card" href="/simulators/pc-dram-demand">
    <span class="tool-kicker">Client Compute</span>
    <strong>PC DRAM Workbench</strong>
    <em>PC units × AI PC penetration × DRAM content</em>
  </a>
  <a class="tool-card" href="/simulators/smartphone-memory-demand">
    <span class="tool-kicker">Mobile</span>
    <strong>Smartphone Memory Workbench</strong>
    <em>Shipments × segment mix × DRAM/NAND content</em>
  </a>
</div>

## 사용 방식

1. 먼저 가장 가까운 preset을 선택합니다.
2. slider와 quick chip으로 units, mix, content 가정을 바꿉니다.
3. 오른쪽 sticky result panel에서 primary result와 weighted content를 즉시 확인합니다.
4. Visual sensitivity를 본 뒤, 필요한 경우 **Exact values** 테이블을 펼쳐 숫자를 검산합니다.

## 관련 문서

- [[scenario-analysis]]
- [[sensitivity-analysis]]
- [[structural-demand-model]]

<style>
.simulator-hub {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin: 24px 0 32px;
}
.tool-card {
  display: grid;
  gap: 8px;
  min-height: 150px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(99, 102, 241, .10), rgba(14, 165, 233, .08));
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  transition: transform .16s ease, border-color .16s ease, box-shadow .16s ease;
}
.tool-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 18px 44px rgba(0, 0, 0, .10);
}
.tool-kicker {
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.tool-card strong {
  font-size: 22px;
}
.tool-card em {
  color: var(--vp-c-text-2);
  font-style: normal;
}
</style>
