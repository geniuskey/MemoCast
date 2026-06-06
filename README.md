# MemoCast

LLM-powered Memory Demand Forecasting Knowledge Base and Scenario Simulator.

MemoCast는 메모리 반도체 수요 예측을 위한 지식베이스와 VitePress 기반 웹 시뮬레이터입니다. 초기 목표는 미래를 자동으로 맞히는 모델이 아니라, “어떤 가정이 메모리 수요를 얼마나 바꾸는가”를 투명하게 보여주는 것입니다.

## Structure

```text
raw/                    # immutable source layer
wiki/                   # VitePress + Obsidian-compatible knowledge wiki
  SCHEMA.md             # wiki conventions and taxonomy
  index.md              # content index
  log.md                # append-only activity log
  concepts/             # demand forecasting concepts
  markets/              # DRAM/NAND/HBM and demand markets
  methods/              # forecasting and scenario methods
  simulators/           # simulator docs pages
  components/           # Vue simulator components
  lib/                  # tested TypeScript calculation logic
  .vitepress/           # VitePress config/theme

tests/                  # Vitest tests for simulator logic
```

## Commands

```bash
npm install
npm test
npm run dev
npm run build
npm run preview
```

## Current Simulator

- Smartphone Memory Demand Simulator
  - Inputs: smartphone shipments, entry/mainstream/premium segment shares, and segment별 DRAM/NAND content
  - Outputs: weighted average content, total DRAM/NAND demand, shipment sensitivity table
- AI Server HBM Demand Simulator
  - Inputs: AI accelerator shipments, HBM attach rate, HBM stacks per accelerator, and GB per stack
  - Outputs: HBM GB per accelerator, total HBM demand, shipment/content sensitivity tables
- PC DRAM Demand Simulator
  - Inputs: PC shipments, AI PC penetration, Non-AI PC DRAM GB, and AI PC DRAM GB
  - Outputs: weighted average DRAM per PC, total PC DRAM demand, shipment/AI-penetration sensitivity tables
- NAND SSD Demand Simulator
  - Inputs: SSD shipments, Client/Enterprise/AI storage segment shares, and average NAND TB/SSD
  - Outputs: weighted average NAND per SSD, total NAND SSD demand, shipment/enterprise-mix sensitivity tables
- Domain Comparison Panel
  - Inputs: current reference presets from smartphone, HBM, PC DRAM, and NAND SSD simulators
  - Outputs: EB-normalized cross-domain scale comparison and base-to-upside delta table

## Operating Principle

- `raw/` stores original sources and should remain immutable.
- `wiki/` stores synthesized knowledge and cross-links.
- Simulators are assumption-based calculators first.
- Statistical/ML forecasting can be added later after enough structured data and assumptions are collected.
