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

## 2026-06-06 — Source URL visibility pass

- Re-measured raw coverage: 374 markdown raw files are cited; 36 CSV datasets have markdown companions; only internal `raw/README.md` and `raw/INDEX.md` lack external URLs.
- Added Source URL columns to the five raw integration cluster pages and [[raw-integration-ledger]], keeping raw path traceability while making the web source link directly clickable.

## [2026-06-07] update | Advanced forecast ensemble and nowcast layer

- Promoted the advanced forecast raw intake queue into `wiki/lib/advancedDemandForecast.ts` with stress scenario, uncertainty envelope, hierarchical reconciliation, and nowcast adjustment APIs.
- Updated `wiki/components/AdvancedDemandForecastSimulator.vue` to show nowcast-adjusted base demand, envelope range, hierarchy total, stress scenario table, and reconciliation rows.
- Expanded `tests/advancedDemandForecast.test.ts` with coverage for the new forecast extension APIs.
- Updated `wiki/methods/advanced-demand-forecast-engine.md`, `wiki/simulators/advanced-demand-forecast.md`, `wiki/sources/advanced-forecast-raw-intake-2026-06-07.md`, `wiki/sources/citation-matrix.md`, `wiki/SCHEMA.md`, `wiki/index.md`, and VitePress sidebar navigation.
## [2026-06-07] update | Raw CSV signal interface connected to advanced forecast simulator
- Derived `wiki/data/advanced-forecast-source-signals.json` from immutable raw CSV datasets under `raw/datasets/` without modifying raw files.
- Updated `wiki/lib/advancedDemandForecast.ts` with source-calibrated nowcast context, institution forecast band, and high-frequency SIA signal helpers.
- Updated `wiki/components/AdvancedDemandForecastSimulator.vue` to show source paths, institution forecast band, and SIA high-frequency nowcast tables as separate responsive blocks.
- Updated `wiki/simulators/advanced-demand-forecast.md`, `wiki/methods/advanced-demand-forecast-engine.md`, `wiki/sources/advanced-forecast-raw-intake-2026-06-07.md`, and `wiki/sources/citation-matrix.md` for traceability.
- Verified `npm test`, `npm run build`, citation audit 416/416 raw references, and browser preview at `/simulators/advanced-demand-forecast` with no console errors or horizontal overflow.



## [2026-06-07] update | Advanced forecast CSV-derived presets and SIA chart
- Added `buildCsvDerivedAdvancedForecastPresets` to convert institution low/mid/high bands plus SIA momentum into conservative/base/upside preset candidates.
- Added `buildSiaNowcastTimeSeries` to render SIA sales rows as an indexed time-series chart model.
- Updated `AdvancedDemandForecastSimulator.vue` with a CSV-derived preset strip, SIA indexed time-series chart, explicit preset selection handler, and responsive layout CSS.
- Updated `advanced-demand-forecast`, `advanced-demand-forecast-engine`, `advanced-forecast-raw-intake-2026-06-07`, `citation-matrix`, and tests to preserve raw CSV traceability.
- Verification: `npm test && npm run build` passed; citation audit reported 416/416 cited, 0 uncited, 0 missing references.

## [2026-06-07] update | Advanced forecast polish controls
- Added institution-weighted ensemble tuning to convert WSTS/TrendForce/IDC/Gartner raw CSV revenue rows into weighted revenue, demand multiplier, confidence score, and peak effective demand.
- Added HBM/BOM affordability stress controls for HBM price decline, target BOM share, demand elasticity, and supply-relief pass-through.
- Updated `advancedDemandForecast.ts`, `AdvancedDemandForecastSimulator.vue`, simulator/method/source/citation docs, and tests for the final polish layer.
- Fixed `advanced-forecast-raw-intake-2026-06-07.md` line-number artifact while preserving source traceability.
- Verification: `npm test && npm run build` passed; citation audit reported 416/416 cited, 0 uncited, 0 missing references; preview browser showed 7 interactive sliders, no console errors, and 0 horizontal overflow.

## [2026-06-07] update | Responsive VitePress main width guard
- Updated `wiki/.vitepress/theme/custom.css` so medium desktop widths use a variable main content width instead of fixed document widths that can sit underneath the sidebar.
- Added a 960-1560px guard for `.VPContent.has-sidebar` and `.VPDoc.has-sidebar` that reserves sidebar width plus a fluid gutter, clamps document containers to the available viewport, and hides the right aside in this constrained range.
- Updated `tests/layoutCss.test.ts` to lock the sidebar-safe flexible-width CSS contract.
- Verification: `npm test -- tests/layoutCss.test.ts`, `npm run build`, and full `npm test` passed; preview screenshots at 1400px, 1480px, and 1560px showed the main view separated from the sidebar with no clipping.

## [2026-06-07] update | Existing wiki page synthesis upgrade
- Upgraded existing pages only; no new wiki pages were created.
- Added synthesis/decision sections to `wiki/concepts/ai-infrastructure-memory.md`, `wiki/concepts/channel-pricing-signal.md`, `wiki/concepts/memory-supply-chain-equipment.md`, and `wiki/concepts/forecasting-method-library.md`.
- Converted raw-heavy source clusters into forecast theses, signal interpretation tables, capacity-to-bit conversion rules, and model governance rules with provenance markers.
- Verification: `npm test && npm run build` passed; citation audit reported 416/416 cited, 0 uncited, 0 missing references.

## [2026-06-07] update | Existing market and method page quality pass
- Upgraded existing pages only; no new wiki pages were created.
- Added a forecast thesis, decision axes, and anti-patterns to `wiki/markets/hbm.md` so HBM demand is framed as unit × content × generation mix × realization gate.
- Added tiering and base-vs-scenario decision rules to `wiki/concepts/long-tail-domain-demand.md` for automotive, networking/HPC, surveillance/IoT, robotics/XR, and specialty domains.
- Added an executive model summary, evidence-to-layer map, reader workflow, and model quality gates to `wiki/methods/advanced-demand-forecast-engine.md`.
- Verification: `npm test && npm run build` passed; citation audit reported 416/416 cited, 0 uncited, 0 missing references.

## [2026-06-07] update | Wide desktop sidebar width guard
- Fixed the VitePress sidebar becoming visually narrow above ~1800px by reserving the wide-layout left offset in `--mc-sidebar-reserved-width` instead of keeping `.VPSidebar` at a fixed 272px while VitePress adds large left padding.
- Updated `.VPContent.has-sidebar` to reserve the same computed sidebar width so main content does not overlap the expanded sidebar gutter on very wide screens.
- Updated `tests/layoutCss.test.ts` to lock the wide sidebar offset/reserved-width CSS contract.
- Verification: `npm test -- tests/layoutCss.test.ts` and `npm run build` passed; preview screenshots at 1900px and 2200px showed a readable sidebar and no visible overlap/clipping.

## [2026-06-07] update | Advanced Forecast Cockpit fullscreen control
- Updated `wiki/components/AdvancedDemandForecastSimulator.vue` to add an Advanced Forecast Cockpit fullscreen toggle wired through the shared `useFullscreenElement` composable, with native Fullscreen API support and CSS fallback mode.
- Updated `tests/advancedForecastUi.test.ts` to assert the fullscreen import, root ref/class binding, toggle button class, click handler, and Korean enter/exit button labels.
- Verification: `npm test && npm run build` passed; citation audit remained 416/416 raw references cited with 0 missing references; browser route `http://localhost:5173/simulators/advanced-demand-forecast?verify=fullscreen` showed fixed fullscreen fallback covering the viewport with no page/root horizontal overflow and no console errors.

## [2026-06-07] update | Advanced Forecast fullscreen header flow fix
- Updated `wiki/components/AdvancedDemandForecastSimulator.vue` so the fullscreen cockpit hero/header stays in normal document flow instead of becoming a sticky overlay that can cover cockpit content.
- Updated `tests/advancedForecastUi.test.ts` with a regression contract that rejects sticky/fixed fullscreen hero styling.
- Verification: `npm test -- tests/advancedForecastUi.test.ts`, full `npm test`, and `npm run build` passed; citation audit remained 416/416 raw references cited with 0 missing references; browser route `http://localhost:5173/simulators/advanced-demand-forecast?verify=fullscreen-flow` showed the hero as `position: static`, followed by `Scenario layer` with a 20px gap and no horizontal overflow or console errors.
