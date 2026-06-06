# Wiki Log

> Chronological record of all wiki actions.  
> Format: `## [YYYY-MM-DD] action | subject`

## [2026-06-06] create | Wiki initialized

- Created MemoCast raw/wiki structure under `D:/git/geniuskey/MemoCast`.
- Initialized schema, index, and starter pages for memory demand forecasting.
- Adopted the principle: simulator first as transparent scenario calculator, forecast model later.

## [2026-06-06] ingest | Smartphone and HBM demand source bootstrap

- Captured 4 public web sources into raw with source_url/sha256 frontmatter:
  - [counterpointresearch.com — Global Smartphone Revenues Resume Growth in 2024 After Two Years, ASP Hits Record High](https://www.counterpointresearch.com/insights/global-smartphone-market-2024/)
  - [micron.com — Mobile Memory and Storage for Phones](https://www.micron.com/solutions/mobile)
  - [micron.com — High-bandwidth memory (HBM)](https://www.micron.com/products/memory/hbm)
  - [semiconductor.samsung.com — HBM | DRAM | Samsung Semiconductor Global](https://semiconductor.samsung.com/dram/hbm/)
- Updated source-backed wiki pages:
  - `wiki/markets/smartphone-memory.md`
  - `wiki/simulators/smartphone-memory-demand.md`
  - `wiki/markets/hbm.md`
- Clarified that the current smartphone simulator defaults are illustrative starter assumptions, not sourced market forecasts.

## [2026-06-06] ingest | Smartphone content anchor presets

- Captured 3 public smartphone specification sources into raw:
  - [gsmarena.com — Samsung Galaxy S25 - Full phone specifications](https://www.gsmarena.com/samsung_galaxy_s25-13610.php)
  - [gsmarena.com — Samsung Galaxy A56 - Full phone specifications](https://www.gsmarena.com/samsung_galaxy_a56-13603.php)
  - [gsmarena.com — Samsung Galaxy A16 5G - Full phone specifications](https://www.gsmarena.com/samsung_galaxy_a16_5g-13346.php)
- Added tested scenario preset logic to `wiki/lib/smartphoneDemand.ts`:
  - `entry-reference`
  - `mainstream-reference`
  - `premium-reference`
- Updated `wiki/components/SmartphoneMemoryDemandSimulator.vue` with preset buttons.
- Updated `wiki/markets/smartphone-memory.md` and `wiki/simulators/smartphone-memory-demand.md` to explain that presets are source-anchored product examples, not market-weighted forecasts.

## [2026-06-06] refactor | Smartphone simulator 3-segment model

- Replaced the older premium/mainstream 2-segment smartphone calculation model with an entry/mainstream/premium 3-segment model.
- Added tests for segment-share normalization, invalid-share fallback, preset shape, and shipment sensitivity behavior.
- Updated `wiki/components/SmartphoneMemoryDemandSimulator.vue` so users can edit share, DRAM GB/device, and NAND GB/device separately for each segment.
- Updated `wiki/markets/smartphone-memory.md` and `wiki/simulators/smartphone-memory-demand.md` to document the 3-segment formula and the source-anchored product examples.

## [2026-06-06] create | AI server HBM demand simulator

- Added TDD-covered HBM demand calculation logic in `wiki/lib/hbmDemand.ts`.
- Added `tests/hbmDemand.test.ts` for attach-rate clamping, HBM GB/accelerator, total GB/PB/EB conversion, source-anchored presets, and shipment/content sensitivity rows.
- Added `wiki/components/HbmDemandSimulator.vue` and registered it in the VitePress theme.
- Added `wiki/simulators/hbm-demand.md` as the AI server HBM simulator page.
- Updated simulator index, wiki index, HBM market page, VitePress sidebar, and README.

## [2026-06-06] create | PC DRAM demand simulator

- Added TDD-covered PC DRAM demand calculation logic in `wiki/lib/pcDramDemand.ts`.
- Added `tests/pcDramDemand.test.ts` for AI PC penetration clamping, weighted average DRAM/PC, GB/PB/EB conversion, illustrative presets, shipment sensitivity, and AI PC penetration sensitivity.
- Added `wiki/components/PcDramDemandSimulator.vue` and registered it in the VitePress theme.
- Added `wiki/markets/pc-dram.md` and `wiki/simulators/pc-dram-demand.md`.
- Updated simulator index, wiki index, DRAM market page, VitePress sidebar, and README.

## [2026-06-06] create | NAND SSD demand simulator

- Added TDD-covered NAND SSD demand calculation logic in `wiki/lib/nandSsdDemand.ts`.
- Added `tests/nandSsdDemand.test.ts` for segment-share normalization, invalid input fallback, TB/PB/EB conversion, illustrative presets, shipment sensitivity, and enterprise mix sensitivity.
- Added `wiki/components/NandSsdDemandSimulator.vue` and registered it in the VitePress theme.
- Expanded `wiki/markets/nand.md` and added `wiki/simulators/nand-ssd-demand.md`.
- Updated simulator index, wiki index, VitePress sidebar, and README.

## [2026-06-06] create | Cross-domain comparison panel

- Added TDD-covered cross-domain EB comparison logic in `wiki/lib/domainComparison.ts`.
- Added `tests/domainComparison.test.ts` for preset-derived EB rows, demand ranking, base-to-upside deltas, and EB formatting.
- Added `wiki/components/DomainComparisonPanel.vue` and registered it in the VitePress theme.
- Added `wiki/comparisons/domain-comparison.md` and VitePress sidebar navigation.
- Updated wiki index and README.

## [2026-06-06] ingest | Raw source expansion synthesized into wiki

- Detected 196 non-gitkeep raw files; 189 are new relative to the initial 7 source anchors.
- Added `wiki/sources/raw-source-map.md` to summarize raw clusters across articles, reports, lectures, datasets, papers, and earnings.
- Added `wiki/methods/forecasting-evidence-map.md` to map papers/datasets/lectures into forecasting methodology layers.
- Added `wiki/concepts/supply-demand-gap.md` to separate bit demand, bit supply, and pricing/revenue interpretation.
- Updated DRAM, HBM, NAND SSD, PC DRAM, smartphone memory, bit demand, and demand forecasting pages with source-backed 2026 signals.
- Updated VitePress sidebar and wiki index to expose the new source/method/concept pages.
## 2026-06-06 — Citation and navigation refinement

- Added per-market evidence checklists for DRAM, HBM, NAND, PC DRAM, and Smartphone Memory.
- Added [[citation-matrix]] to trace raw sources to wiki pages and simulator assumptions.
- Added [[graph]] to document the raw → concept/method → market → simulator → comparison navigation flow.
- Added source-backed preset candidates to HBM, NAND SSD, PC DRAM, and Smartphone Memory simulators.

## 2026-06-06 — Unread raw integration pass

- Re-ran citation audit and found 374 raw markdown files, 30 cited, 344 uncited.
- Read the 344 uncited raw files from the audit queue and created `wiki/sources/raw-integration-ledger.md` as the file-by-file processing ledger.
- Added 5 cluster knowledge pages: `ai-infrastructure-memory`, `channel-pricing-signal`, `memory-supply-chain-equipment`, `long-tail-domain-demand`, and `forecasting-method-library`.
- Updated `raw-source-map`, `citation-matrix`, and VitePress sidebar navigation to expose the new raw integration layer.

## 2026-06-06 — AI infrastructure HBM variable extraction

- Promoted [[ai-infrastructure-memory]] from source cluster summary into an HBM model-variable page with unit/content/attach/realization factors.
- Added source-backed HBM simulator presets for GB200/B200 192GB and GB300/Rubin 288GB accelerator content anchors.
- Updated [[hbm]] and [[hbm-demand]] to separate accelerator units, HBM GB/GPU, custom accelerator buckets, CoWoS/package, and power readiness constraints.
