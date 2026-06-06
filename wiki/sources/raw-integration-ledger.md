---
title: Raw Integration Ledger
created: 2026-06-06
updated: 2026-06-06
type: source-map
tags: [raw, citation, integration-ledger, demand-forecasting]
sources: [raw/INDEX.md]
confidence: medium
---

# Raw Integration Ledger

이번 패스에서 citation audit 기준 미반영 raw 파일 **344개**를 파일 단위로 열람해 제목·frontmatter·본문 heading/bullet/수치 anchor를 확인했다. 이 문서는 ‘안 읽은 것부터’ 처리하기 위한 ledger이며, 상세 지식은 아래 cluster page와 기존 market/method page로 승격한다.

- Audit 기준: rawTotal 374, rawCited 30, rawUncited 344
- 처리 원칙: raw 원문은 수정하지 않고 wiki에서 raw path를 citation으로 남긴다.

## Cluster pages created from this read pass

- [[ai-infrastructure-memory]]: AI server/GPU/HBM/power/capex 수요 driver
- [[channel-pricing-signal]]: 가격·재고·유통 channel signal
- [[memory-supply-chain-equipment]]: fab/equipment/material/지역 공급 제약
- [[long-tail-domain-demand]]: automotive, networking, IoT, robotics 등 long-tail demand
- [[forecasting-method-library]]: papers/lectures 기반 예측 방법론 library

## File-by-file ledger

| # | Raw file | Title | Type | Confidence | First target candidates |
| ---: | --- | --- | --- | --- | --- |
| 1 | `raw/README.md` | Raw Sources | README.md | - | sources/raw-integration-ledger |
| 2 | `raw/articles/aisilicon-datacenter-buildout-gigawatts-2026-2028.md` | AI 데이터센터 buildout (GW·capex) 2026-2028 — Stargate/xAI/hyperscaler | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 3 | `raw/articles/aisilicon-largest-training-clusters-gpu-count-2026.md` | 최대 AI 학습 클러스터 GPU 규모 (xAI/Stargate, 2026) | article | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 4 | `raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md` | NVIDIA Blackwell/Rubin & AMD MI350/MI400 HBM capacity & 2026 shipment mix | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 5 | `raw/articles/aisilicon-onprem-edge-inference-memory-2026.md` | 온프레미스/엣지 AI 추론 메모리 수요 (2026) | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 6 | `raw/articles/aisilicon-tpu-ironwood-trainium3-hbm-specs-2026.md` | Google TPU v7 Ironwood / AWS Trainium3 HBM 스펙 (2026) | article | high | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 7 | `raw/articles/channel-counterfeit-gskill-vcolor-ddr5-2026.md` | Counterfeit G.Skill and V-Color DDR5 modules hit Chinese marketplaces, impacting company sales | article | high | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 8 | `raw/articles/channel-register-dram-price-hikes-supplier-inventory-2026.md` | Expect more of those DRAM price hikes as memory shortage continues to bite | article | high | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 9 | `raw/articles/channel-retail-ddr5-32gb-375-minimum-2026.md` | 32GB of DDR5 now costs $375 minimum — AI shortage continues to squeeze PC building | article | high | markets/pc-dram, simulators/pc-dram-demand, markets/dram |
| 10 | `raw/articles/channel-shi-datacenter-buyer-allocation-leadtimes-2026.md` | The impact of the 2026 memory shortage on data center buyers | article | medium | concepts/supply-demand-gap, markets/dram, markets/nand |
| 11 | `raw/articles/channel-sourceability-qoq-price-allocation-2026.md` | Tracking memory price increases across the last several quarters | article | medium | concepts/supply-demand-gap, markets/dram, markets/nand |
| 12 | `raw/articles/channel-teamgroup-gm-ram-pricing-crisis-2026.md` | The RAM pricing crisis has only just started, Team Group GM warns — says problem will get worse in 2026 as DRAM and NAND prices double in one month | article | high | concepts/supply-demand-gap, markets/dram, markets/nand |
| 13 | `raw/articles/channel-used-refurbished-server-memory-secondary-2026.md` | 중고/리퍼 서버 메모리 secondary 시장 (2026) | article | medium | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 14 | `raw/articles/consol-dram-price-fixing-scandal.md` | DRAM price fixing scandal | article | high | concepts/supply-demand-gap, markets/dram, concepts/demand-forecasting |
| 15 | `raw/articles/consol-elpida-bankruptcy-micron.md` | Elpida Memory bankruptcy & Micron acquisition (2012-2014) | article | high | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 16 | `raw/articles/consol-intel-nand-skhynix-solidigm.md` | SK hynix acquisition of Intel NAND business (Solidigm), 2020-2025 | article | high | simulators/nand-ssd-demand, concepts/supply-demand-gap, markets/nand |
| 17 | `raw/articles/consol-qimonda-bankruptcy.md` | Qimonda — DRAM maker bankruptcy (2009) | article | high | concepts/supply-demand-gap, markets/dram, concepts/demand-forecasting |
| 18 | `raw/articles/consol-toshiba-kioxia-bain.md` | Toshiba Memory sale to Bain-led consortium ($18B) & Kioxia rebrand | article | high | concepts/supply-demand-gap, simulators/nand-ssd-demand, markets/nand |
| 19 | `raw/articles/consol-wd-sandisk-nand.md` | Western Digital acquires SanDisk ($19B, 2016) and later spin-off | article | high | simulators/nand-ssd-demand, concepts/supply-demand-gap, markets/nand |
| 20 | `raw/articles/ddr4-ddr5-transition-2026.md` | DDR4→DDR5 전환 2026: DDR4 EOL, 16Gb DDR5 wafer 65%+ 서버/AI 배분 | article | medium | markets/pc-dram, simulators/pc-dram-demand, markets/dram |
| 21 | `raw/articles/ddr4-eol-last-time-buy-legacy-2026.md` | DDR4 EOL·last-time-buy·레거시 역전 (2026) | article | medium | concepts/demand-forecasting, concepts/supply-demand-gap, markets/dram |
| 22 | `raw/articles/domain-arvr-xr-headset-memory-content.md` | AR/VR/XR 헤드셋 메모리 탑재량 (Apple Vision Pro M5, Meta Quest 3, Pico) | article | medium | markets/smartphone-memory, simulators/smartphone-memory-demand, markets/dram |
| 23 | `raw/articles/domain-automotive-l4-300gb-ram-micron.md` | Micron: L4 자율주행차 1대당 300GB+ RAM 필요 전망 | article | medium | markets/nand, simulators/nand-ssd-demand, markets/dram |
| 24 | `raw/articles/domain-autonomous-vehicle-data-generation-storage.md` | 자율주행 데이터 생성·저장 (TB/day) — NAND 수요 | article | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 25 | `raw/articles/domain-crypto-gpu-mining-legacy-gddr.md` | 크립토/블록체인 GPU 마이닝 레거시 GDDR 수요 (niche) | article | low | markets/hbm, simulators/hbm-demand, concepts/demand-forecasting |
| 26 | `raw/articles/domain-gaming-handheld-lpddr-content.md` | 게이밍 핸드헬드 메모리 탑재량 (Steam Deck, ROG Ally X, Legion Go, Switch 2) | article | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 27 | `raw/articles/domain-hpc-supercomputer-hbm-memory-capacity.md` | Exascale 슈퍼컴퓨터 HBM 용량 (El Capitan/Frontier/Aurora) | article | high | markets/hbm, markets/dram, markets/pc-dram |
| 28 | `raw/articles/domain-humanoid-robotics-memory-content.md` | 휴머노이드 로봇 / 피지컬 AI 메모리 탑재량 (Tesla Optimus, Figure, NVIDIA Jetson Thor) | article | medium | markets/pc-dram, markets/dram, markets/nand |
| 29 | `raw/articles/domain-industrial-automation-edge-ai-memory.md` | 산업 자동화/엣지 AI 메모리 수요 (팩토리 로봇·산업 IoT) | article | low | markets/pc-dram, markets/dram, markets/nand |
| 30 | `raw/articles/domain-iot-smart-home-edge-ai-memory-2026.md` | IoT/스마트홈/엣지 AI 메모리 수요 (2026) | article | low | markets/pc-dram, markets/dram, markets/nand |
| 31 | `raw/articles/domain-medical-device-ai-imaging-memory.md` | 의료기기/AI 진단·영상 메모리 수요 (헬스케어 최고 CAGR) | article | low | markets/pc-dram, markets/dram, markets/nand |
| 32 | `raw/articles/domain-networking-switch-hbm-broadcom-tomahawk.md` | 네트워킹 스위치/DPU의 HBM·고대역폭 메모리 (Broadcom Tomahawk 6 / Ultra) | article | medium | markets/hbm, simulators/hbm-demand, markets/dram |
| 33 | `raw/articles/domain-networking-switch-router-ddr-memory-2026.md` | 네트워킹(스위치/라우터) DDR 메모리 수요 (2026) | article | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 34 | `raw/articles/domain-smart-glasses-ar-wearable-memory-2026.md` | 스마트글래스/AR 웨어러블 메모리 (Meta Ray-Ban, 2026) | article | medium | markets/dram, markets/nand, markets/pc-dram |
| 35 | `raw/articles/domain-sovereign-ai-national-datacenter-memory-2026.md` | Sovereign AI 국가 데이터센터 메모리 수요 (Gulf/India, 2026) | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 36 | `raw/articles/domain-space-aerospace-radhard-memory.md` | 위성/우주/항공 rad-hard 메모리 시장 (SRAM/DRAM/Flash) | article | low | markets/dram, markets/nand, markets/pc-dram |
| 37 | `raw/articles/domain-surveillance-cctv-nand-demand.md` | 감시/CCTV 영상저장 NAND 수요 (AI 비디오 분석·SSD) | article | low | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 38 | `raw/articles/domain-telecom-5g-6g-edge-memory-demand.md` | 통신 인프라(5G/6G·엣지 서버·기지국) 메모리 수요 | article | low | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 39 | `raw/articles/edge-ai-iot-memory-demand-2026.md` | Edge AI / IoT 메모리 수요 2026: LPDDR5X 부족, edge AI 시장 CAGR 21.7% | article | medium | markets/pc-dram, markets/dram, markets/nand |
| 40 | `raw/articles/esg-memory-fab-energy-water-carbon-re100.md` | 메모리 fab 에너지·물·탄소·RE100 (Samsung/SK/Micron) | article | medium | markets/dram, markets/hbm, concepts/supply-demand-gap |
| 41 | `raw/articles/gddr-gaming-console-memory-2026.md` | 게이밍 GDDR 메모리 2026: PS5 16GB GDDR6, PS6 30GB GDDR7 루머, AI가 GDDR 잠식 | article | low | markets/pc-dram, markets/dram, simulators/pc-dram-demand |
| 42 | `raw/articles/gddr7-graphics-memory-demand-crowding-out-2026.md` | GDDR7 그래픽 메모리 수요·crowding out (2026) | article | medium | markets/hbm, concepts/supply-demand-gap, markets/dram |
| 43 | `raw/articles/history-dram-memory-cycles-2016-2026.md` | 메모리 사이클 역사 2016-2026 (supercycle/crash/downturn) | article | medium | simulators/nand-ssd-demand, markets/hbm, markets/dram |
| 44 | `raw/articles/history-memory-fab-disruptions-supply-shocks.md` | 메모리 fab disruption·공급 충격 역사 (가격 영향) | article | medium | simulators/nand-ssd-demand, concepts/supply-demand-gap, markets/dram |
| 45 | `raw/articles/history-memory-trade-disputes-antidumping-cartel.md` | 메모리 무역분쟁·반덤핑·카르텔 역사 (1986-2010) | article | high | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 46 | `raw/articles/idc-memory-shortage-smartphone-pc-impact-2026.md` | IDC: 2026 메모리 부족이 스마트폰·PC 출하/ASP에 미치는 영향 | article | high | markets/pc-dram, simulators/pc-dram-demand, markets/smartphone-memory |
| 47 | `raw/articles/korea-legacy-dram-ddr4-crowding-out-2026.md` | 레거시 D램(DDR4/DDR3) 가격 급등·crowding out (국내 매체, 2026) | article | medium | markets/hbm, simulators/hbm-demand, markets/nand |
| 48 | `raw/articles/micron-automotive-memory-per-vehicle.md` | 차량 1대당 메모리 탑재량 추이 (Micron): 90GB → 278GB → 최대 4TB | article | medium | markets/dram, markets/nand, markets/pc-dram |
| 49 | `raw/articles/model-agentic-ai-memory-demand-2026.md` | Agentic AI(에이전트) 메모리 수요 (2026) | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 50 | `raw/articles/model-ai-coding-enterprise-software-inference-demand-2026.md` | AI 코딩/엔터프라이즈 SW inference 수요 (2026) | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 51 | `raw/articles/model-ai-inference-memory-bound-token-economics.md` | AI inference 메모리 바운드·토큰 경제 (HBM 비중) | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 52 | `raw/articles/model-context-length-kv-cache-memory-demand.md` | LLM 컨텍스트 길이·KV cache·trillion-param 메모리 수요 | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 53 | `raw/articles/model-deepseek-v3-671b-moe-technical-report.md` | DeepSeek-V3 Technical Report | article | high | markets/hbm, simulators/hbm-demand, methods/forecasting-evidence-map |
| 54 | `raw/articles/model-epoch-ai-compute-growth-trends.md` | Epoch AI — AI compute 성장 추세 (메모리 수요 최상류 동인) | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 55 | `raw/articles/model-generative-video-multimodal-memory-demand.md` | 생성형 비디오/멀티모달 AI 메모리·compute 수요 (Sora) | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 56 | `raw/articles/model-introl-ai-memory-supercycle-hbm-2026.md` | The AI Memory Supercycle | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 57 | `raw/articles/nvidia-gpu-hbm-capacity-roadmap-2026.md` | NVIDIA Data Center GPU HBM 용량 로드맵 (B200/B300/Vera Rubin) | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 58 | `raw/articles/oem-apple-dram-lta-expiry-2026-price-hike.md` | Apple Reportedly Only Secured Long-Term Agreements For DRAM Supply Covering H1 2026, iPhone 18 To See Price Hike | article | medium | markets/smartphone-memory, simulators/smartphone-memory-demand, markets/dram |
| 59 | `raw/articles/oem-apple-iphone17-12gb-dram-samsung-share.md` | Apple to Upgrade iPhone 17 Pro to 12GB DRAM, with Samsung Rumored to Capture 70% Share | article | medium | markets/smartphone-memory, simulators/smartphone-memory-demand, markets/dram |
| 60 | `raw/articles/oem-automotive-memory-per-vehicle-bosch-continental-2025.md` | DRAM for Vehicle Market + ADAS Memory Requirements by Autonomy Level | article | low | markets/dram, markets/nand, markets/pc-dram |
| 61 | `raw/articles/oem-dell-hpe-ai-server-backlog-memory-bom-2026.md` | Dell/HPE AI Server Backlog + GB200 NVL72 Memory BOM | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 62 | `raw/articles/oem-hyperscaler-custom-silicon-memory-buyers-2026.md` | Custom Silicon Inflection 2026: Hyperscaler ASICs vs NVIDIA GPU | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 63 | `raw/articles/oem-memory-price-cloud-instance-passthrough-2026.md` | 메모리 가격 → 클라우드 인스턴스 가격 전가 (2026) | article | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 64 | `raw/articles/oem-module-makers-kingston-adata-crucial-channel-2025.md` | Kingston Extends 22-Year Reign as World's Top DRAM Module Supplier | article | high | markets/pc-dram, simulators/pc-dram-demand, markets/dram |
| 65 | `raw/articles/oem-pc-dell-hp-lenovo-price-hike-memory-2026.md` | Memory Crunch Hits PCs: Dell Hikes Prices 15-20% Mid-December, Lenovo from January 2026 | article | high | markets/pc-dram, simulators/pc-dram-demand, markets/dram |
| 66 | `raw/articles/oem-samsung-mx-smartphone-shipments-2025.md` | Counterpoint: Apple #1 in 2025 smartphone shipments, Samsung #2 | article | high | markets/smartphone-memory, simulators/smartphone-memory-demand, markets/nand |
| 67 | `raw/articles/oem-server-odm-gb200-nvl72-hbm-shipments-2025.md` | NVIDIA GB200 NVL72 AI server shipments: 1500 units in April vs 1000 units in Q1 2025 | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 68 | `raw/articles/oem-smartphone-dram-content-spec-downgrade-2026.md` | Memory Price Surge to Persist in 1Q26; Smartphone and Notebook Brands Raising Prices and Downgrading Specs | article | high | markets/pc-dram, simulators/pc-dram-demand, markets/smartphone-memory |
| 69 | `raw/articles/oem-windows10-eol-pc-refresh-memory-demand-2026.md` | Windows 10 EOL → PC 교체 사이클·메모리 수요 (2026) | article | medium | markets/pc-dram, simulators/pc-dram-demand, markets/dram |
| 70 | `raw/articles/oem-xiaomi-oppo-vivo-transsion-shipments-2025.md` | IDC: Smartphone shipments up 2.3% in Q4 2025, Apple the clear winner | article | high | markets/smartphone-memory, simulators/smartphone-memory-demand, markets/nand |
| 71 | `raw/articles/on-device-slm-smartphone-ram-2026.md` | On-device SLM 스마트폰 RAM 요구 (2026, Snapdragon/MediaTek) | article | medium | markets/smartphone-memory, simulators/smartphone-memory-demand, markets/dram |
| 72 | `raw/articles/power-ai-query-energy-inference-memory-2026.md` | AI 쿼리당 에너지·inference 에너지·메모리 (2026) | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 73 | `raw/articles/power-datacenter-vacancy-leasing-market-2026.md` | 데이터센터 공실/임대 시장 (2026) — capacity 흡수율 | article | medium | markets/hbm, simulators/hbm-demand, concepts/demand-forecasting |
| 74 | `raw/articles/power-deloitte-ai-datacenter-123gw-2035.md` | Deloitte: AI Data Center Power Demand Could Surge 30x by 2035, Amid Power and Grid Capacity Constraints | article | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 75 | `raw/articles/power-gb200-nvl72-rack-120kw-liquid-cooling.md` | A closer look at Nvidia's 120kW DGX GB200 NVL72 rack system | article | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 76 | `raw/articles/power-goldman-datacenter-power-demand-165pct-2030.md` | AI to drive 165% increase in data center power demand by 2030 | article | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 77 | `raw/articles/power-hbm3e-energy-per-bit-power-efficiency.md` | Micron's HBM3E: Powering the future of AI with high-bandwidth memory | article | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 78 | `raw/articles/power-hbm4-hbm5-per-stack-watts-roadmap.md` | HBM4/HBM5 per-stack power and thermal roadmap (KAIST projection) | article | low | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 79 | `raw/articles/power-iea-datacenter-electricity-945twh-2030.md` | AI is set to drive surging electricity demand from data centres (Energy and AI report) | article | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 80 | `raw/articles/power-liquid-cooling-adoption-hbm-thermal-limits.md` | Data center cooling state of play (2025): liquid cooling on the rise, thermal density skyrockets | article | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 81 | `raw/articles/power-nuclear-smr-ppa-ai-datacenter-deals-2025.md` | Nuclear power for AI: inside the data center energy deals (2025) | article | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 82 | `raw/articles/power-perf-per-watt-blackwell-vs-hopper.md` | NVIDIA Blackwell: 10x more tokens per watt — perf/watt vs Hopper | article | medium | markets/hbm, simulators/hbm-demand, concepts/demand-forecasting |
| 83 | `raw/articles/power-schmidt-congress-ai-power-29gw-2027.md` | US lawmakers probe AI's role in energy — Schmidt testimony (29 GW by 2027, 67 GW by 2030) | article | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 84 | `raw/articles/power-socamm-lpddr5x-low-power-ai-server-memory.md` | SOCAMM2 / LPDDR5X memory module for AI data centers — power and bandwidth | article | medium | markets/pc-dram, markets/dram, simulators/pc-dram-demand |
| 85 | `raw/articles/power-us-grid-interconnection-queue-bottleneck.md` | Data center grid-power demand to rise 22% in 2025, nearly triple by 2030 | article | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 86 | `raw/articles/power-vs-memory-limited-datacenter-debate.md` | After the Power Crunch, AI Infrastructure Hits a Silicon/Memory Wall | article | low | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 87 | `raw/articles/region-emerging-market-smartphone-memory-2026.md` | 신흥국(동남아/인도/아프리카) 스마트폰 메모리 수요 (2026) | article | medium | markets/smartphone-memory, simulators/smartphone-memory-demand, markets/dram |
| 88 | `raw/articles/server-ddr5-rdimm-channels-capacity-2026.md` | 서버 DDR5 RDIMM 구성: socket당 12채널, 최대 6TB, 단일 모듈 256GB | article | high | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 89 | `raw/articles/storage-ai-training-data-synthetic-data-nand-demand.md` | AI 학습데이터·합성데이터 → 스토리지(NAND) 수요 (2026) | article | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 90 | `raw/articles/trendforce-ai-20pct-dram-wafer-2026.md` | AI가 2026년 글로벌 DRAM wafer capacity의 약 20% 소비, HBM·GDDR7이 수요 견인 | article | high | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 91 | `raw/articles/trendforce-ai-server-memory-contract-price-2q26.md` | AI 서버 수요, 2Q26 메모리 contract 가격 인상 견인 — CSP LTA로 공급 확보 | article | high | markets/pc-dram, markets/dram, markets/nand |
| 92 | `raw/articles/trendforce-ai-server-shipments-28pct-2026.md` | 글로벌 AI 서버 출하 2026년 +28% YoY, ASIC 기반 비중 상승 | article | high | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 93 | `raw/articles/trendforce-hbm-market-forecast-2026.md` | 2026 HBM 시장: bit 수요 +70% YoY, 출하 30Gb 초과, HBM4 2Q26 ramp | article | high | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 94 | `raw/articles/trendforce-nearline-hdd-shortage-qlc-ssd-2026.md` | Inference AI 수요 급증으로 nearline HDD 부족, 2026년 QLC eSSD 출하 본격화 | article | high | markets/nand, simulators/nand-ssd-demand, concepts/demand-forecasting |
| 95 | `raw/datasets/ai-pc-penetration-forecast.md` | AI PC 침투율 전망 (2023-2028) | dataset | medium | markets/pc-dram, simulators/pc-dram-demand, markets/dram |
| 96 | `raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md` | AI 랙 GPU-HBM-전력 결합 파라미터 (구조 모델 입력) | dataset | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 97 | `raw/datasets/ai-server-shipments-forecast.md` | AI 서버 출하 전망 (2023-2027, 구조 모델 입력) | dataset | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 98 | `raw/datasets/ddr5-16gb-price-monthly-2025-2026.md` | DDR5 16GB 가격 월별 인덱스 (2025-2026) | dataset | medium | concepts/demand-forecasting, markets/dram, markets/pc-dram |
| 99 | `raw/datasets/dram-contract-price-qoq-2025-2026.md` | DRAM/NAND contract price 분기별 QoQ 변동 (2025Q4-2026Q2) | dataset | medium | markets/nand, simulators/nand-ssd-demand, markets/dram |
| 100 | `raw/datasets/dram-market-share-by-supplier-history.md` | DRAM 공급사 점유율 역사 (2022-2025) | dataset | medium | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 101 | `raw/datasets/dram-nand-bit-demand-by-application.md` | DRAM/NAND 응용처별 bit 수요 비중 (2025-2026) | dataset | low | markets/pc-dram, simulators/pc-dram-demand, markets/smartphone-memory |
| 102 | `raw/datasets/dram-nand-bit-growth-cagr-longrun.md` | DRAM/NAND bit 성장률·CAGR (장기, bit vs revenue 구분) | dataset | low | markets/hbm, markets/nand, simulators/hbm-demand |
| 103 | `raw/datasets/dram-nand-revenue-bit-quarterly-2024-2025.md` | DRAM/NAND 매출·bit 출하 분기 실적 (2024-2025) | dataset | high | markets/nand, simulators/nand-ssd-demand, markets/dram |
| 104 | `raw/datasets/dram-price-history.md` | DRAM 가격 추이 (스팟/계약, 연도별) | dataset | low | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 105 | `raw/datasets/dram-revenue-cycle-history.md` | DRAM 연간 매출 사이클 역사 (2016-2026) | dataset | low | concepts/demand-forecasting, markets/dram, markets/pc-dram |
| 106 | `raw/datasets/dram-revenue-quarterly.md` | DRAM 산업 매출 및 공급사 점유율 (연/분기) | dataset | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 107 | `raw/datasets/dram-supplier-inventory-weeks-history.md` | DRAM 공급사 재고(주) 시계열 (2023-2026) | dataset | medium | concepts/demand-forecasting, markets/dram, markets/pc-dram |
| 108 | `raw/datasets/dram-wafer-capacity-allocation-2026.md` | DRAM wafer capacity 배분·환산계수 (2026) | dataset | medium | markets/hbm, simulators/hbm-demand, markets/dram |
| 109 | `raw/datasets/hbm-bit-demand-growth-rate.md` | HBM bit 수요 성장률 (2024-2026) | dataset | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 110 | `raw/datasets/hbm-dram-capacity-wpm-2026.md` | HBM/DRAM capacity (wpm)·점유율 (2026) | dataset | medium | markets/hbm, simulators/hbm-demand, markets/dram |
| 111 | `raw/datasets/hbm-market-size.md` | HBM 시장 규모 (연도별) | dataset | low | markets/hbm, simulators/hbm-demand, charts |
| 112 | `raw/datasets/idc-global-datasphere-zettabytes.md` | IDC Global DataSphere (제타바이트, 2018-2029) | dataset | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 113 | `raw/datasets/korea-semiconductor-exports-monthly.md` | 한국 반도체 수출 월별 (실시간 메모리 수요 프록시) | dataset | high | markets/hbm, markets/nand, simulators/hbm-demand |
| 114 | `raw/datasets/memory-demand-domain-taxonomy.md` | Memory Demand Domain Taxonomy Dataset | dataset | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, charts |
| 115 | `raw/datasets/memory-maker-capex.md` | 메모리 제조사 capex (연도별) | dataset | low | markets/dram, markets/nand, markets/pc-dram |
| 116 | `raw/datasets/memory-makers-2025-quarterly-timeseries.md` | 메모리 3사 분기 실적 시계열 (2025-2026) | dataset | medium | simulators/nand-ssd-demand, markets/hbm, markets/dram |
| 117 | `raw/datasets/memory-makers-quarterly-financials-cycle.md` | 메모리 3사 실적 사이클 (2022-2025, 다운턴→회복) | dataset | medium | simulators/nand-ssd-demand, markets/hbm, markets/dram |
| 118 | `raw/datasets/memory-market-revenue-split.md` | 메모리 시장 매출 분할 (DRAM/NAND/HBM, 연도별) | dataset | medium | markets/hbm, markets/dram, markets/nand |
| 119 | `raw/datasets/memory-market-tam-forecast-2025-2028.md` | 메모리 시장 장기 TAM 전망 (2025-2028/2030) | dataset | medium | markets/hbm, simulators/nand-ssd-demand, markets/dram |
| 120 | `raw/datasets/nand-flash-revenue-share.md` | NAND 플래시 산업 매출 및 공급사 점유율 | dataset | medium | markets/nand, simulators/nand-ssd-demand, charts |
| 121 | `raw/datasets/pc-server-shipments.md` | PC 및 서버 출하량 (연도별) | dataset | medium | markets/pc-dram, simulators/pc-dram-demand, charts |
| 122 | `raw/datasets/semiconductor-capex-to-revenue-ratio.md` | 반도체 capex-to-revenue 비율·투자 규율 (사이클 지표) | dataset | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 123 | `raw/datasets/server-dram-content-per-box-growth.md` | 서버 DRAM 콘텐츠(per box) 성장 (구조 모델 입력) | dataset | medium | markets/pc-dram, simulators/pc-dram-demand, markets/dram |
| 124 | `raw/datasets/smartphone-shipments.md` | 전세계 스마트폰 출하량 (연도별) | dataset | medium | markets/smartphone-memory, simulators/smartphone-memory-demand, charts |
| 125 | `raw/datasets/steam-pc-gaming-ram-share-2026.md` | Steam PC 게이밍 RAM 점유 (2026, 가격탄력성 실증) | dataset | medium | markets/pc-dram, simulators/pc-dram-demand, markets/dram |
| 126 | `raw/datasets/wsts-semiconductor-billings.md` | WSTS 반도체 및 메모리 빌링 (연도별) | dataset | medium | markets/nand, simulators/nand-ssd-demand, markets/dram |
| 127 | `raw/earnings/hbm4-three-supplier-competition-samsung-comeback-2026.md` | HBM4 3사 경쟁·Samsung comeback (Vera Rubin, 2026) | earnings | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 128 | `raw/earnings/hyperscaler-capex-2026-guidance.md` | Hyperscaler 2026 Capex — Big 4 합산 $725B (+77% YoY), AI 인프라 ~75% | earnings | medium | markets/hbm, simulators/hbm-demand, markets/nand |
| 129 | `raw/earnings/kioxia-fq4-2025-earnings.md` | Kioxia FY2025 Q4 (3월 종료) — 매출 ¥1,002.9B, NAND ASP 2배, FQ1 가이던스 ¥1.75T | earnings | medium | markets/nand, simulators/nand-ssd-demand, concepts/demand-forecasting |
| 130 | `raw/earnings/kioxia-fy25-nand-outlook-ipo.md` | Kioxia FY25 실적·NAND 수요 전망·IPO (일본 NAND) | earnings | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 131 | `raw/earnings/macronix-1q26-earnings.md` | Macronix 1Q26 — 매출 NT$10.5B, 10분기 적자 탈출, NOR +47% YoY, NAND eMMC +382% YoY | earnings | medium | markets/nand, simulators/nand-ssd-demand, concepts/demand-forecasting |
| 132 | `raw/earnings/micron-fq2-2026-earnings.md` | Micron Fiscal Q2 2026 Earnings — Revenue $23.9B, DRAM $18.8B, FQ3 가이던스 $33.5B | earnings | medium | markets/hbm, simulators/hbm-demand, markets/nand |
| 133 | `raw/earnings/nanya-technology-1q26-earnings.md` | Nanya Technology 1Q26 — 매출 NT$49.09B (+582.9% YoY), DRAM ASP +70% QoQ | earnings | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 134 | `raw/earnings/nvidia-fq1-2027-datacenter.md` | NVIDIA Fiscal Q1 2027 — Data Center 매출 $75.2B (+92% YoY), FQ2 가이던스 ~$91B | earnings | medium | markets/hbm, simulators/hbm-demand, concepts/demand-forecasting |
| 135 | `raw/earnings/nvidia-hbm4-supplier-qualification-vera-rubin-2026.md` | NVIDIA HBM4 3사 인증 (Vera Rubin, 2026-06) | earnings | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 136 | `raw/earnings/samsung-electronics-1q26-earnings.md` | Samsung Electronics 1Q26 Results — DS 영업이익 53.7조원, 메모리 ASP +146% | earnings | medium | markets/hbm, simulators/hbm-demand, markets/nand |
| 137 | `raw/earnings/sandisk-fq3-2026-earnings.md` | Sandisk Fiscal Q3 2026 — Revenue $5.95B (+251% YoY), Datacenter +233%, NBM $42B 계약 | earnings | medium | markets/nand, simulators/nand-ssd-demand, concepts/demand-forecasting |
| 138 | `raw/earnings/sandisk-wd-fy2026-nand-datacenter-results.md` | Sandisk / Western Digital FY2026 NAND·datacenter 실적 | earnings | high | markets/nand, simulators/nand-ssd-demand, concepts/demand-forecasting |
| 139 | `raw/earnings/sk-hynix-1q26-earnings.md` | SK hynix 1Q26 Earnings — Record 52.6조원 Revenue, 72% Operating Margin | earnings | medium | markets/hbm, simulators/hbm-demand, markets/nand |
| 140 | `raw/earnings/sk-hynix-fy2025-record-results.md` | SK hynix FY2025 record 실적 (Samsung 영업이익 추월) | earnings | high | markets/hbm, simulators/hbm-demand, markets/dram |
| 141 | `raw/earnings/taiwan-module-makers-adata-teamgroup-transcend-2026.md` | 대만 모듈메이커(ADATA/TeamGroup/Transcend) 실적·차입 (2026) | earnings | medium | concepts/supply-demand-gap, markets/dram, markets/nand |
| 142 | `raw/earnings/trendforce-1q26-memory-pricing.md` | TrendForce 1Q26 Memory Pricing — Samsung ASP +146%, SK hynix DRAM mid-60%, NAND mid-70% | earnings | medium | markets/hbm, markets/dram, markets/nand |
| 143 | `raw/earnings/winbond-1q26-earnings.md` | Winbond 1Q26 — 매출 NT$38.25B, GM 53.4%, DRAM 매출비중 47%, NAND bit +20% 전망 | earnings | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 144 | `raw/lectures/conf-fms-2025-3d-nand-500-layer-roadmap.md` | Inside the Future of 3D NAND: The Roadmap to 500 Layers (FMS 2025 context) | lecture | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 145 | `raw/lectures/conf-hotchips-2025-marvell-custom-hbm-cxl.md` | Marvell Shows Dense SRAM, Custom HBM and CXL with Arm Compute at Hot Chips 2025 | lecture | high | markets/hbm, markets/dram, markets/pc-dram |
| 146 | `raw/lectures/conf-iedm-2025-3d-dram-oxide-vct.md` | IEDM 2025 Session 29: Oxide-Semiconductor Channel & Vertical Channel DRAM Transistors | lecture | high | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 147 | `raw/lectures/conf-imw-2025-memory-workshop.md` | 2025 IEEE International Memory Workshop (IMW) — Scope & Topics | lecture | low | markets/hbm, markets/dram, markets/nand |
| 148 | `raw/lectures/conf-isscc-2026-memory-sessions.md` | Memory Sightings at ISSCC 2026 (HBM4, LPDDR6, GDDR7, NAND, 4F² COP DRAM) | lecture | medium | markets/hbm, markets/dram, markets/nand |
| 149 | `raw/lectures/conf-jedec-ddr6-roadmap-2027.md` | DDR6 Roadmap: 8,800–17,600 MT/s, 2027 Mainstream | lecture | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 150 | `raw/lectures/conf-jedec-gddr7-jesd239-standard.md` | JEDEC Publishes GDDR7 Graphics Memory Standard (JESD239) | lecture | high | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 151 | `raw/lectures/conf-jedec-hbm4-jesd270-4-standard.md` | JEDEC Releases JESD270-4 HBM4 Standard | lecture | high | markets/hbm, markets/dram, markets/pc-dram |
| 152 | `raw/lectures/conf-jedec-lpddr6-jesd209-6-standard.md` | JEDEC Releases New LPDDR6 Standard (JESD209-6) | lecture | high | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 153 | `raw/lectures/conf-jedec-ufs5-mobile-storage-roadmap.md` | UFS 5.0 / 4.1 모바일 스토리지 로드맵 | lecture | medium | markets/nand, markets/smartphone-memory, simulators/smartphone-memory-demand |
| 154 | `raw/lectures/conf-micron-hbm4-g9-nand-vera-rubin.md` | Micron in High-Volume Production of HBM4 for NVIDIA Vera Rubin, PCIe Gen6 SSD and SOCAMM2 | lecture | high | markets/hbm, markets/nand, simulators/nand-ssd-demand |
| 155 | `raw/lectures/conf-samsung-hbm4e-samples-3-6tbs.md` | Samsung Electronics Begins Shipment of Industry-First HBM4E Samples | lecture | high | markets/hbm, markets/dram, markets/pc-dram |
| 156 | `raw/lectures/conf-skhynix-hbm4-12high-16high-samples.md` | SK hynix Ships World's First 12-Layer HBM4 Samples | lecture | high | markets/hbm, markets/dram, markets/pc-dram |
| 157 | `raw/lectures/conf-skhynix-hbm4e-hbm5-roadmap-2027-2031.md` | SK hynix HBM4E/HBM5 로드맵 (2027-2031) | lecture | medium | markets/hbm, markets/nand, simulators/hbm-demand |
| 158 | `raw/lectures/conf-skhynix-vlsi-2025-dram-roadmap.md` | SK hynix Presents Future DRAM Technology Roadmap at IEEE VLSI 2025 | lecture | high | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 159 | `raw/lectures/cxl-memory-pooling-explained.md` | CXL Memory Pooling & Sharing Explained | lecture | medium | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 160 | `raw/lectures/dram-scaling-4f2-3d-dram-roadmap.md` | DRAM Scaling Roadmap — 4F2 Cell & 3D DRAM (ISSCC/VLSI) | lecture | low | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 161 | `raw/lectures/emerging-co-packaged-optics-cpo-memory-bandwidth.md` | Co-Packaged Optics (CPO) / 광 I/O 와 메모리 대역폭 | lecture | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 162 | `raw/lectures/emerging-cxl-pooling-stranded-memory-tco-net-demand.md` | CXL pooling·stranded memory·TCO (메모리 수요 순효과) | lecture | medium | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 163 | `raw/lectures/emerging-dna-molecular-archival-storage-vs-nand.md` | DNA/분자 아카이벌 스토리지 vs NAND (장기 대체재) | lecture | low | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 164 | `raw/lectures/emerging-hbf-high-bandwidth-flash-ai-inference.md` | HBF (High Bandwidth Flash) — NAND 기반 HBM 대안 (AI inference) | lecture | medium | markets/hbm, simulators/hbm-demand, markets/nand |
| 165 | `raw/lectures/emerging-hbm4-cxl-pim-3d-dram-roadmap.md` | HBM4 spec / CXL pooling / PIM / HBM5 roadmap | lecture | medium | markets/hbm, markets/dram, markets/pc-dram |
| 166 | `raw/lectures/emerging-neuromorphic-in-memory-computing-reram.md` | 뉴로모픽 / In-Memory Computing / ReRAM (장기 메모리 수요 재편) | lecture | low | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 167 | `raw/lectures/emerging-quantum-cryogenic-memory-cryo-cmos.md` | 양자컴퓨팅 / 극저온(Cryo-CMOS) 메모리 (장기 niche) | lecture | low | concepts/supply-demand-gap, concepts/demand-forecasting, methods/forecasting-evidence-map |
| 168 | `raw/lectures/hbm-generations-roadmap-hbm1-to-hbm4.md` | HBM Generations Roadmap — HBM1 to HBM4 Specs | lecture | medium | markets/hbm, concepts/supply-demand-gap, markets/dram |
| 169 | `raw/lectures/how-dram-works-1t1c-cell-primer.md` | Introduction to DRAM (Dynamic Random-Access Memory) | lecture | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 170 | `raw/lectures/how-hbm-tsv-3d-stacking-works.md` | High Bandwidth Memory (HBM) Explained — SEMI 101 | lecture | medium | markets/hbm, markets/dram, markets/pc-dram |
| 171 | `raw/lectures/how-nand-flash-works-floating-gate-charge-trap.md` | How NAND Flash Works — Floating Gate vs Charge Trap, 3D NAND | lecture | medium | concepts/supply-demand-gap, markets/nand, simulators/nand-ssd-demand |
| 172 | `raw/lectures/ip-cadence-memory-ip-hbm4-lpddr6-gddr7-ddr5.md` | Cadence Memory IP — HBM4 12.8G, LPDDR6/5X 14.4G, GDDR7 36G, DDR5 | lecture | medium | markets/hbm, markets/dram, markets/pc-dram |
| 173 | `raw/lectures/ip-cxl-controllers-astera-marvell-microchip.md` | CXL Memory Controllers — Astera Labs Leo, Marvell Structera, Microchip SMC, Montage | lecture | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 174 | `raw/lectures/ip-cxl-specification-roadmap-2-0-to-4-0.md` | CXL Specification Roadmap (CXL 2.0 → 3.x → 4.0) | lecture | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 175 | `raw/lectures/ip-ddr5-mrdimm-rcd-db-montage-rambus-renesas.md` | DDR5 MRDIMM Interface Chips — RCD / MRCD / DB / MDB (Montage, Rambus, Renesas) | lecture | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 176 | `raw/lectures/ip-hbm4-custom-base-die-tsmc-foundry.md` | HBM4 Custom Base Die / Logic Die — TSMC Foundry & Memory Makers | lecture | medium | markets/hbm, markets/dram, markets/pc-dram |
| 177 | `raw/lectures/ip-interface-roadmaps-gate-bandwidth-capacity-adoption.md` | How Interface / Controller Roadmaps Gate Memory Bandwidth & Capacity Adoption | lecture | medium | markets/hbm, markets/dram, markets/nand |
| 178 | `raw/lectures/ip-jedec-hbm4-jesd270-4-standard.md` | JEDEC HBM4 Standard (JESD270-4) — 2048-bit, 32 Channels, up to 64GB/Stack | lecture | high | markets/hbm, markets/dram, markets/pc-dram |
| 179 | `raw/lectures/ip-jedec-lpddr6-jesd209-6-standard.md` | JEDEC LPDDR6 Standard (JESD209-6) — up to 14,400 MT/s | lecture | high | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 180 | `raw/lectures/ip-jedec-standardization-governance.md` | JEDEC 표준화 조직·거버넌스 (메모리 표준 생태계) | lecture | high | markets/hbm, markets/dram, markets/nand |
| 181 | `raw/lectures/ip-marvell-bravera-ssd-controller-nand.md` | Marvell Bravera SC5 SSD Controllers (PCIe 5.0, 16 NAND Channels) | lecture | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 182 | `raw/lectures/ip-memory-ras-ecc-reliability-datacenter.md` | 메모리 RAS / ECC 신뢰성 (DDR5 on-die ECC, scrubbing) | lecture | medium | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 183 | `raw/lectures/ip-mrdimm-mcrdimm-socamm-module-ai-server.md` | MRDIMM / MCRDIMM / SOCAMM 모듈 (AI 서버 고대역폭) | lecture | medium | markets/pc-dram, simulators/pc-dram-demand, markets/dram |
| 184 | `raw/lectures/ip-nand-ssd-controllers-phison-silicon-motion.md` | NAND SSD Controllers — Phison & Silicon Motion (PCIe Gen5 Enterprise) | lecture | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 185 | `raw/lectures/ip-on-die-ecc-link-ecc-ras-features.md` | On-Die ECC, Link ECC & RAS Features (DDR5 / LPDDR5 / HBM3E) | lecture | medium | markets/hbm, markets/dram, markets/pc-dram |
| 186 | `raw/lectures/ip-rambus-hbm4-hbm4e-controller-ip.md` | Rambus HBM4 / HBM4E Controller IP | lecture | medium | markets/hbm, markets/dram, markets/pc-dram |
| 187 | `raw/lectures/ip-rowhammer-dram-security-mitigation-prac.md` | Rowhammer DRAM 보안·PRAC 완화 (DDR5/LPDDR6) | lecture | medium | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 188 | `raw/lectures/ip-synopsys-memory-interface-ip-hbm4-ddr5-lpddr6.md` | Synopsys Memory Interface IP — HBM4 / DDR5 / LPDDR6 Controller & PHY | lecture | medium | markets/hbm, markets/dram, markets/pc-dram |
| 189 | `raw/lectures/ip-vendor-landscape-cadence-rambus-phy-acquisition.md` | Memory IP Vendor Landscape & Cadence–Rambus PHY IP Acquisition | lecture | high | markets/hbm, markets/dram, markets/pc-dram |
| 190 | `raw/lectures/jedec-ddr5-standard-explained.md` | JEDEC DDR5 Standard (JESD79-5) Explained | lecture | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 191 | `raw/lectures/jedec-hbm4-standard-jesd270-4.md` | JEDEC HBM4 Standard (JESD270-4) — Bandwidth, Efficiency, Capacity | lecture | medium | markets/hbm, concepts/supply-demand-gap, markets/dram |
| 192 | `raw/lectures/memory-cycle-leading-indicators-book-to-bill-pmi.md` | 반도체 사이클 선행지표 (book-to-bill, PMI, billings, SOX) | lecture | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, comparisons/domain-comparison |
| 193 | `raw/lectures/memory-demand-forecasting-methodology-bottoms-up.md` | Memory Demand Forecasting Methodology — Bottoms-Up Bit Model | lecture | medium | methods/forecasting-evidence-map, markets/hbm, concepts/supply-demand-gap |
| 194 | `raw/lectures/memory-demand-seasonality-quarterly-pattern.md` | 메모리 수요 계절성·분기 패턴 (forecasting 보정) | lecture | medium | markets/pc-dram, simulators/pc-dram-demand, markets/smartphone-memory |
| 195 | `raw/lectures/memory-lta-prepayment-accounting-financial-model.md` | 메모리 LTA 선지급·이연수익 회계 (재무 모델) | lecture | medium | concepts/supply-demand-gap, markets/dram, methods/forecasting-evidence-map |
| 196 | `raw/lectures/memory-power-per-bit-by-type-comparison.md` | 메모리 타입별 전력/대역폭 (DDR5/LPDDR5/HBM) 비교 | lecture | medium | markets/hbm, markets/dram, markets/pc-dram |
| 197 | `raw/lectures/memory-pricing-contract-spot-lta-mechanism.md` | 메모리 가격 메커니즘: contract vs spot vs LTA | lecture | medium | concepts/supply-demand-gap, markets/dram, markets/nand |
| 198 | `raw/lectures/nand-cost-per-bit-3d-layers-qlc-economics.md` | NAND Cost-per-Bit — 3D Layers, TLC/QLC Economics | lecture | medium | concepts/supply-demand-gap, markets/nand, simulators/nand-ssd-demand |
| 199 | `raw/lectures/nomad-semi-memory-primer-industry-structure.md` | Deep Dive on Memory (Primer) — Industry Structure | lecture | medium | markets/hbm, markets/dram, markets/nand |
| 200 | `raw/lectures/process-3d-dram-transition-timeline.md` | 3D DRAM Transition — Samsung 16-Layer Plans, VCT as Stepping Stone (IMW 2024) | lecture | medium | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 201 | `raw/lectures/process-3d-nand-layer-roadmap-300-500.md` | Inside the Future of 3D NAND — Roadmap to 500 Layers (FMS 2025) | lecture | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 202 | `raw/lectures/process-dram-capacitor-scaling-aspect-ratio.md` | DRAM Scaling Challenges — Capacitor Aspect Ratio & Electron Count Limits | lecture | medium | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 203 | `raw/lectures/process-dram-cell-6f2-4f2-vct.md` | The Memory Wall — DRAM Cell Architecture 8F2→6F2→4F2 & VCT | lecture | medium | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 204 | `raw/lectures/process-dram-node-migration-1a-1b-1c-1d.md` | Deep Dive on Memory (Primer) — DRAM Node Migration 1a/1b/1c/1d | lecture | medium | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 205 | `raw/lectures/process-euv-adoption-dram-layers-cost.md` | EUV Adoption in DRAM — Layer Counts by Node (SK Hynix / Samsung / Micron) + High-NA | lecture | medium | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 206 | `raw/lectures/process-micron-1gamma-dram-euv.md` | Micron 1γ (1-gamma) DRAM — EUV Debut, >30% Bit Density per Wafer | lecture | high | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 207 | `raw/lectures/process-nand-wafer-bonding-cba-xtacking-cua.md` | NAND Wafer Bonding — CBA / Xtacking vs CMOS-Under-Array (CuA) | lecture | medium | concepts/supply-demand-gap, markets/nand, simulators/nand-ssd-demand |
| 208 | `raw/lectures/process-samsung-1000-layer-nand-cmb-bonding.md` | Samsung 1,000-Layer NAND by 2030 — Wafer Bonding at 400L, CMB Doubling | lecture | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 209 | `raw/lectures/process-scaling-wall-bit-growth-supply-assumption.md` | The Scaling Wall — Why Process Transitions Now Yield Less Bit Growth | lecture | medium | markets/dram, concepts/supply-demand-gap, markets/nand |
| 210 | `raw/lectures/process-skhynix-321-layer-nand-string-stacking.md` | SK hynix 321-Layer NAND — Triple-Stack (Three-Plug) String Stacking | lecture | high | concepts/supply-demand-gap, markets/nand, simulators/nand-ssd-demand |
| 211 | `raw/lectures/semianalysis-memory-wall-dram-scaling.md` | The Memory Wall: Past, Present, and Future of DRAM | lecture | medium | markets/hbm, concepts/supply-demand-gap, markets/dram |
| 212 | `raw/lectures/semianalysis-rise-and-roadmap-of-hbm.md` | Scaling the Memory Wall: The Rise and Roadmap of HBM | lecture | medium | markets/hbm, markets/dram, markets/pc-dram |
| 213 | `raw/lectures/semiconductor-learning-curve-yield-economics.md` | Moore's Law and the Economics of Semiconductor Price Trends / Learning Curve | lecture | medium | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 214 | `raw/lectures/why-memory-is-cyclical-capacity-cycle.md` | Why Memory Is Cyclical — Capacity Cycle & Boom-Bust | lecture | medium | concepts/supply-demand-gap, markets/dram, markets/nand |
| 215 | `raw/papers/arima-lstm-order-demand-short-lead-time-2021.md` | On the Application of ARIMA and LSTM to Predict Order Demand Based on Short Lead Time and On-Time Delivery Requirements | paper | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 216 | `raw/papers/bayesian-model-averaging-semiconductor-cycle-2018.md` | On predicting the semiconductor industry cycle: a Bayesian model averaging approach | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, methods/structural-demand-model |
| 217 | `raw/papers/chip-architecture-supply-demand-uncertainty-2023.md` | Understanding Interactions Between Chip Architecture and Uncertainties in Semiconductor Supply and Demand | paper | medium | concepts/supply-demand-gap, concepts/demand-forecasting, methods/forecasting-evidence-map |
| 218 | `raw/papers/cobweb-model-dram-price-capacity-cycle.md` | Cobweb model — DRAM 가격·capacity 사이클 (lagged supply) | paper | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 219 | `raw/papers/collusion-along-learning-curve-dram-cartel-2021.md` | Collusion Along the Learning Curve: Theory and Evidence From the Semiconductor Industry | paper | high | markets/dram, markets/pc-dram, methods/structural-demand-model |
| 220 | `raw/papers/demand-forecasting-financial-estimation-semiconductor-supply-chain-2019.md` | Demand forecasting and financial estimation considering the interactive dynamics of semiconductor supply-chain companies | paper | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, concepts/supply-demand-gap |
| 221 | `raw/papers/demand-forecasting-lstm-neural-networks-2020.md` | Demand Forecasting using Long Short-Term Memory Neural Networks | paper | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, concepts/memory-demand |
| 222 | `raw/papers/dram-oligopoly-cournot-capacity-competition.md` | DRAM 과점·capacity 경쟁 (Cournot/Stackelberg) 게임이론 | paper | medium | concepts/demand-forecasting, methods/structural-demand-model, methods/forecasting-evidence-map |
| 223 | `raw/papers/dram-price-determinants-arimax-pmi-dsi.md` | DRAM 가격 결정요인 (ARIMAX: PMI + DSI 등 외생변수) | paper | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, markets/dram |
| 224 | `raw/papers/dram-spot-price-arima-elasticity-demand-2024.md` | ARIMA-driven DRAM spot price forecasting + 수요 탄력성 맥락 (2024) | paper | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, markets/dram |
| 225 | `raw/papers/dynamic-analysis-semiconductor-supply-chain-bullwhip-2018.md` | Dynamic analysis and design of a semiconductor supply chain: a control engineering approach | paper | medium | concepts/supply-demand-gap, methods/structural-demand-model, concepts/demand-forecasting |
| 226 | `raw/papers/electricity-demand-grid-impacts-ai-data-centers-2024.md` | Electricity Demand and Grid Impacts of AI Data Centers: Challenges and Prospects | paper | medium | concepts/supply-demand-gap, concepts/demand-forecasting, methods/forecasting-evidence-map |
| 227 | `raw/papers/forecast-combination-ensemble-m5-competition.md` | Forecast combination / ensemble (M5 Accuracy competition findings) | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, comparisons/domain-comparison |
| 228 | `raw/papers/google-trends-web-traffic-electronics-demand-amazon-2025.md` | Forecasting Consumer Demand for Electronics on Amazon Using Google Trends and Web Traffic Data | paper | low | concepts/demand-forecasting, methods/forecasting-evidence-map, comparisons/domain-comparison |
| 229 | `raw/papers/grey-markov-taiwan-ic-assembly-forecasting-2013.md` | Analyzing Taiwan IC Assembly Industry by Grey-Markov Forecasting Model | paper | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, methods/structural-demand-model |
| 230 | `raw/papers/grey-model-gm11-semiconductor-ic-forecasting.md` | Grey model GM(1,1) — 반도체/IC 산업 수요 예측 (소표본) | paper | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, methods/structural-demand-model |
| 231 | `raw/papers/hbm-bit-cost-domain-specific-ecc-ai-inference-2025.md` | Breaking the HBM Bit Cost Barrier: Domain-Specific ECC for AI Inference Infrastructure | paper | medium | concepts/supply-demand-gap, markets/hbm, simulators/hbm-demand |
| 232 | `raw/papers/hbm-thermal-warpage-tsv-reliability-3d-stack.md` | Thermal Issues in Hybrid Bonding of 3D-Stacked HBM: A Comprehensive Review | paper | medium | concepts/supply-demand-gap, markets/hbm, simulators/hbm-demand |
| 233 | `raw/papers/how-fast-are-semiconductor-prices-falling-2018.md` | How Fast are Semiconductor Prices Falling? | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, concepts/supply-demand-gap |
| 234 | `raw/papers/hybrid-lstm-arma-ic-tray-demand-forecasting-2022.md` | Hybrid LSTM-ARMA Demand-Forecasting Model Based on Error Compensation for Integrated Circuit Tray Manufacturing | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, concepts/supply-demand-gap |
| 235 | `raw/papers/investigating-semiconductor-industry-cycles-2013.md` | Investigating the semiconductor industry cycles | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, methods/structural-demand-model |
| 236 | `raw/papers/manufacturing-intelligence-semiconductor-demand-technology-diffusion-2010.md` | Manufacturing intelligence for semiconductor demand forecast based on technology diffusion and product life cycle | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, methods/structural-demand-model |
| 237 | `raw/papers/measuring-moores-law-price-cost-quality-indexes-2019.md` | Measuring Moore's Law: Evidence from Price, Cost, and Quality Indexes | paper | high | methods/forecasting-evidence-map, concepts/demand-forecasting, methods/structural-demand-model |
| 238 | `raw/papers/newsvendor-base-stock-inventory-uncertain-demand.md` | Inventory management under highly uncertain demand (newsvendor/base-stock) | paper | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 239 | `raw/papers/predicting-the-present-with-google-trends-2012.md` | Predicting the Present with Google Trends | paper | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, comparisons/domain-comparison |
| 240 | `raw/papers/probabilistic-forecasting-conformal-quantile-regression.md` | 확률예측: Conformalized Quantile Regression (CQR) + conformal prediction | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, comparisons/domain-comparison |
| 241 | `raw/papers/race-to-efficiency-ai-scaling-laws-2025.md` | The Race to Efficiency: A New Perspective on AI Scaling Laws | paper | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, comparisons/domain-comparison |
| 242 | `raw/papers/real-options-capacity-investment-semiconductor-2007.md` | Real option analysis for capacity investment planning for semiconductor manufacturing | paper | low | concepts/demand-forecasting, methods/forecasting-evidence-map, methods/structural-demand-model |
| 243 | `raw/papers/semiconductor-cycles-bootstrap-prediction-intervals-2007.md` | Forecasting the semiconductor industry cycles by bootstrap prediction intervals | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, comparisons/domain-comparison |
| 244 | `raw/papers/semiconductor-fab-product-mix-optimization-lp.md` | Semiconductor fab product mix optimization (LP/decomposition) | paper | medium | concepts/demand-forecasting, methods/structural-demand-model, methods/forecasting-evidence-map |
| 245 | `raw/papers/semiconductor-industry-cycles-explanatory-factors-forecasting-2014.md` | Semiconductor industry cycles: Explanatory factors and forecasting | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, methods/structural-demand-model |
| 246 | `raw/papers/structural-var-svar-demand-shock-identification.md` | Structural VAR (SVAR) — 수요/공급 충격 식별·impulse response | paper | medium | concepts/demand-forecasting, methods/structural-demand-model, methods/forecasting-evidence-map |
| 247 | `raw/papers/system-dynamics-abm-semiconductor-supply-chain-bullwhip.md` | System Dynamics / Agent-Based 반도체 공급망 bullwhip 시뮬레이션 | paper | medium | concepts/demand-forecasting, methods/structural-demand-model, methods/forecasting-evidence-map |
| 248 | `raw/papers/transformer-probabilistic-demand-forecasting-online-learning-2024.md` | Transformer-based probabilistic demand forecasting with adaptive online learning (2024) | paper | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 249 | `raw/papers/variable-p-rolling-grey-taiwan-semiconductor-production-2005.md` | A variable P value rolling Grey forecasting model for Taiwan semiconductor industry production | paper | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, methods/structural-demand-model |
| 250 | `raw/papers/wsts-forecast-accuracy-track-record.md` | WSTS 예측 정확도·track record (Human vs Machines) | paper | high | concepts/demand-forecasting, methods/forecasting-evidence-map, comparisons/domain-comparison |
| 251 | `raw/reports/analyst-bank-memory-outlook-price-targets-2026.md` | 투자은행 메모리 전망·목표주가 (Goldman/MS/UBS/Susquehanna, 2026) | report | medium | markets/hbm, markets/dram, markets/nand |
| 252 | `raw/reports/capex-samsung-hbm-50pct-capacity-surge-2026.md` | Samsung Reportedly Plans 50% HBM Capacity Surge in 2026, Spotlight on HBM4 | report | medium | markets/dram, markets/hbm, simulators/hbm-demand |
| 253 | `raw/reports/china-cloud-custom-ai-chip-memory-demand-2026.md` | 중국 클라우드(Alibaba/ByteDance/Baidu) AI칩·메모리 수요 (2026) | report | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 254 | `raw/reports/china-critical-minerals-export-control-semiconductor-2026.md` | 중국 critical minerals(갈륨/게르마늄/안티몬) 수출통제 (2026) | report | medium | simulators/nand-ssd-demand, markets/dram, markets/nand |
| 255 | `raw/reports/china-cxmt-ymtc-capacity-export-controls-2026.md` | CXMT/YMTC capacity, DDR5/HBM3 진입, 수출통제 영향 (2026) | report | medium | concepts/supply-demand-gap, markets/dram, markets/hbm |
| 256 | `raw/reports/china-domestic-consumer-memory-demand-2026.md` | 중국 내수 소비자 메모리 수요 (스마트폰/PC, 2026) | report | medium | markets/pc-dram, simulators/pc-dram-demand, markets/smartphone-memory |
| 257 | `raw/reports/china-huawei-ascend-hbm-demand-2026.md` | Huawei Ascend HBM 수요·중국 HBM 자급 병목 (2026) | report | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 258 | `raw/reports/cxmt-2026-capacity-hbm3-bit-share.md` | CXMT Reportedly Plans to Dedicate 20% of Mass Production Capacity to HBM3 Line in 2026 | report | medium | concepts/supply-demand-gap, markets/dram, markets/hbm |
| 259 | `raw/reports/digitimes-taiwan-server-odm-memory-supply-2026.md` | DigiTimes — 대만 서버 ODM·메모리 수급 (2026, 1차 매체) | report | medium | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 260 | `raw/reports/equip-advantest-hbm-test-lead-times-2026.md` | Advantest ATE lead times remain tight as AI and memory markets expand | report | medium | markets/hbm, markets/dram, markets/pc-dram |
| 261 | `raw/reports/equip-applied-materials-q1-2026-dram-china.md` | Applied Materials (AMAT) Q1 2026 Earnings — Record DRAM Revenue, China Decline | report | high | markets/dram, markets/nand, simulators/nand-ssd-demand |
| 262 | `raw/reports/equip-asml-q1-2026-memory-euv-orders.md` | ASML Sees Memory Chip Orders Explode Past Logic for the First Time as DRAM Makers Scramble for EUV Slots | report | high | markets/hbm, markets/dram, markets/pc-dram |
| 263 | `raw/reports/equip-china-memory-equipment-localization-2026.md` | China's semiconductor equipment leaders push HBM autonomy as US tightens restrictions | report | medium | markets/dram, markets/hbm, concepts/supply-demand-gap |
| 264 | `raw/reports/equip-hybrid-bonding-besi-asmpt-hbm4-2026.md` | Hybrid Bonding & TCB for HBM4 — BESI Q1 2026 + ASMPT TCB Orders | report | high | markets/dram, markets/hbm, simulators/hbm-demand |
| 265 | `raw/reports/equip-kla-q3-2026-memory-advanced-packaging.md` | KLA Q3 FY2026 — Advanced Packaging Revenue to Double to $1B, Memory Mix | report | high | markets/hbm, markets/dram, concepts/supply-demand-gap |
| 266 | `raw/reports/equip-lam-research-wfe-140b-2026.md` | Lam Research Posts Third Straight Record Quarter as WFE Outlook Rises to $140B | report | high | markets/hbm, markets/nand, simulators/hbm-demand |
| 267 | `raw/reports/equip-semi-equipment-forecast-156b-2027.md` | Sales of chip production equipment to reach $156 billion by 2027 — China, Taiwan, and Korea lead intense demand | report | high | markets/hbm, markets/nand, simulators/hbm-demand |
| 268 | `raw/reports/equip-semi-world-fab-forecast-300mm-2026-2029.md` | SEMI Projects Double-Digit Growth in Global 300mm Fab Equipment Spending for 2026 and 2027 | report | high | markets/hbm, markets/nand, simulators/hbm-demand |
| 269 | `raw/reports/equip-teradyne-q1-2026-memory-test-hbm.md` | Teradyne (TER) Q1 2026 Earnings — Record Revenue, HBM/DRAM Memory Test Surge | report | high | markets/dram, markets/hbm, concepts/supply-demand-gap |
| 270 | `raw/reports/fab-samsung-pyeongtaek-p4-1c-dram-2026.md` | Samsung Reportedly Plans 200K 1c DRAM Wafers/Month by 2026, About One-Third of Its Total Output | report | medium | markets/dram, markets/hbm, simulators/hbm-demand |
| 271 | `raw/reports/fab-skhynix-micron-capacity-roadmap-2026-2031.md` | SK hynix M15X/Yongin & Micron Idaho/NY fab roadmap (2026-2031) | report | medium | markets/dram, markets/hbm, simulators/hbm-demand |
| 272 | `raw/reports/gartner-2026-memory-revenue-memflation-forecast.md` | Gartner 2026 — Semi Revenue >$1.3T, Memory ~3x to $633B, 'Memflation' | report | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 273 | `raw/reports/hbm-ai-memory-supercycle-2026-2027.md` | HBM-led AI Memory Supercycle 2026-2027 (multi-source) | report | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 274 | `raw/reports/hbm-customer-concentration-nvidia-dependency-2026.md` | HBM 고객 집중·NVIDIA 의존 리스크 (SK hynix, 2026) | report | medium | markets/hbm, simulators/hbm-demand, concepts/demand-forecasting |
| 275 | `raw/reports/hbm-take-or-pay-capacity-reservation-2026.md` | HBM take-or-pay / capacity 예약 계약 (2026) | report | medium | concepts/supply-demand-gap, markets/dram, markets/hbm |
| 276 | `raw/reports/korea-media-memory-supercycle-2026-outlook.md` | 국내 매체 메모리 슈퍼사이클 2026 전망 (디일렉/대신증권/SK뉴스룸/ZDNet) | report | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 277 | `raw/reports/korea-media-samsung-skhynix-2026-capex-hbm.md` | 삼성·SK 2026 capex·HBM 증설 (국내 매체) | report | medium | markets/dram, markets/hbm, simulators/hbm-demand |
| 278 | `raw/reports/korea-semiconductor-gdp-macro-impact-2026.md` | 한국 반도체 GDP·매크로 영향 (2026) | report | high | markets/hbm, markets/nand, simulators/hbm-demand |
| 279 | `raw/reports/macro-ai-capex-bubble-downside-risk-2026.md` | AI Capex Bubble Debate 2026 — Burry Puts, GPU Depreciation, Memory Downside | report | low | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 280 | `raw/reports/macro-ai-datacenter-debt-financing-spv-risk-2026.md` | AI 데이터센터 부채 금융·SPV 리스크 (2026) | report | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 281 | `raw/reports/macro-ai-roi-monetization-gap-demand-risk-2026.md` | AI ROI/수익화 갭 — 메모리 수요 지속성 리스크 (2026) | report | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 282 | `raw/reports/macro-cloud-spending-growth-2026.md` | Cloud Infrastructure Spending 2026 — Q1 $129B (+35%), Full Year >$500B | report | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 283 | `raw/reports/macro-consumer-pc-smartphone-demand-2026.md` | IDC — Smartphone -13.9% & PC -11.3% in 2026 as Memory Crisis Lifts ASPs | report | medium | concepts/supply-demand-gap, markets/pc-dram, markets/smartphone-memory |
| 284 | `raw/reports/macro-fed-rates-recession-risk-2026.md` | Fed 2026 — Funds Rate 3.5–3.75%, GDP ~2.3%, Recession Odds 20% | report | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 285 | `raw/reports/macro-gartner-ai-spending-2026-2_59trillion.md` | Gartner — Worldwide AI Spending $2.59T in 2026 (+47%); Enterprise Inflection Year | report | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 286 | `raw/reports/macro-gartner-it-spending-2026-6_31trillion.md` | Gartner — Worldwide IT Spending to Grow 13.5% in 2026, Totaling $6.31 Trillion | report | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 287 | `raw/reports/macro-gpu-depreciation-accounting-ai-demand-risk.md` | GPU 감가상각 논쟁 (Burry thesis) — AI 수요 지속성 리스크 | report | medium | markets/hbm, simulators/hbm-demand, concepts/demand-forecasting |
| 288 | `raw/reports/macro-hyperscaler-capex-2026-725billion.md` | Big Tech AI Capex to Hit $725 Billion in 2026, Up 77% YoY | report | medium | concepts/demand-forecasting, concepts/supply-demand-gap, methods/forecasting-evidence-map |
| 289 | `raw/reports/macro-jpy-fx-kioxia-2026.md` | USD/JPY 2026 — Yen Near 160 (Weakest Since 1990); Kioxia Export Tailwind | report | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, comparisons/domain-comparison |
| 290 | `raw/reports/macro-krw-usd-fx-2026-won-weakness.md` | USD/KRW 2026 — Won Crosses 1,500, Weakest Since 2009; Memory FX Tailwind | report | medium | concepts/demand-forecasting, methods/forecasting-evidence-map, concepts/memory-demand |
| 291 | `raw/reports/macro-sia-semiconductor-sales-gdp-2026.md` | SIA — Q1 2026 Chip Sales $298.5B (+25% QoQ), 2026 on Track for $1T+, Memory Leads | report | medium | concepts/supply-demand-gap, concepts/demand-forecasting, methods/forecasting-evidence-map |
| 292 | `raw/reports/macro-wsts-semiconductor-1_51trillion-2026.md` | WSTS — Global Semiconductor Market to $1.51T in 2026 (+90%), Memory +250% | report | medium | concepts/supply-demand-gap, concepts/demand-forecasting, markets/hbm |
| 293 | `raw/reports/material-abf-substrate-ajinomoto-shortage-2026.md` | Ajinomoto, Controlling 95% of ABF Film Market, Hikes Prices 30% as AI Chip Packaging Upgrades Spark Substrate Cost Surge | report | medium | markets/hbm, markets/dram, markets/pc-dram |
| 294 | `raw/reports/material-fab-water-ultrapure-recycling-constraint.md` | 메모리 fab 물(ultrapure water)·재활용 제약 | report | medium | markets/dram, markets/nand, simulators/nand-ssd-demand |
| 295 | `raw/reports/material-japan-materials-equipment-dominance.md` | 일본 반도체 소재·장비 지배력 (메모리 공급 게이트) | report | high | markets/dram, markets/hbm, markets/nand |
| 296 | `raw/reports/material-neon-rare-gas-ukraine-supply-risk.md` | Russia's Invasion of Ukraine Impacts Gas Markets Critical to Chip Production | report | medium | markets/dram, markets/hbm, markets/nand |
| 297 | `raw/reports/material-photoresist-japan-euv-monopoly-2025.md` | Japan Ramps Up Photoresist Investment for 2nm Chips — Tokyo Ohka Kogyo, JSR Lead the Charge | report | medium | markets/dram, markets/hbm, markets/nand |
| 298 | `raw/reports/material-silicon-wafer-market-share-capacity-2025.md` | Semiconductor Silicon Wafer Market Outlook 2025-2032 | report | low | markets/dram, markets/hbm, markets/nand |
| 299 | `raw/reports/material-silicon-wafer-shinetsu-sumco-duopoly-2026.md` | The Silicon Wafers That Two Companies Refuse to Make More Of | report | medium | markets/dram, markets/hbm, markets/nand |
| 300 | `raw/reports/material-specialty-gases-krypton-xenon-3dnand-etch.md` | The Critical Role of Noble Gases (Helium, Neon, Krypton, Xenon) in Semiconductor Manufacturing | report | low | markets/dram, markets/hbm, markets/nand |
| 301 | `raw/reports/memory-commodity-financialization-etf-futures.md` | 메모리의 상품화·금융화 (DRAM futures/ETF/hedging) | report | medium | simulators/nand-ssd-demand, concepts/supply-demand-gap, markets/dram |
| 302 | `raw/reports/memory-gross-margin-cost-structure-hbm-2026.md` | 메모리 원가구조·마진·HBM 가격 (2026) | report | medium | markets/hbm, markets/dram, markets/nand |
| 303 | `raw/reports/memory-inventory-leading-indicators-2026.md` | 메모리 인벤토리 수준·선행지표 (2026) | report | medium | simulators/nand-ssd-demand, markets/hbm, markets/dram |
| 304 | `raw/reports/memory-makers-capex-financing-debt-2026.md` | 메모리 3사 capex 자금조달·부채 (2026) | report | medium | markets/dram, markets/hbm, concepts/supply-demand-gap |
| 305 | `raw/reports/memory-makers-credit-rating-bonds-2026.md` | 메모리 3사 신용등급·채권 (2026) | report | medium | concepts/supply-demand-gap, concepts/demand-forecasting, methods/forecasting-evidence-map |
| 306 | `raw/reports/memory-price-trajectory-2027-peak-timing.md` | 메모리 가격 2027 궤적·피크 타이밍 (Counterpoint/TrendForce) | report | medium | simulators/nand-ssd-demand, markets/dram, markets/nand |
| 307 | `raw/reports/memory-supercycle-end-timing-2027-2029-scenarios.md` | 메모리 슈퍼사이클 종료 시점 시나리오 (2027-2029) | report | medium | simulators/nand-ssd-demand, markets/hbm, markets/dram |
| 308 | `raw/reports/micron-fq2-2026-earnings-dram-nand-hbm.md` | Micron FQ2 2026 — Record $23.68B Revenue (+194% YoY); DRAM +207%, NAND +169% | report | high | markets/hbm, markets/nand, simulators/hbm-demand |
| 309 | `raw/reports/military-aerospace-memory-demand-2026.md` | 군용/항공 메모리 수요 (rad-hard, 장수명, 2026) | report | medium | concepts/supply-demand-gap, markets/dram, markets/nand |
| 310 | `raw/reports/nand-dram-cycle-divergence-2026.md` | NAND vs DRAM 사이클 divergence (2026) | report | medium | simulators/nand-ssd-demand, markets/hbm, markets/nand |
| 311 | `raw/reports/omdia-2026-memory-crunch-forecast.md` | Omdia — 2026 Semi Forecast Raised to +62.7%; DRAM ~2x, NAND ~4x | report | medium | concepts/supply-demand-gap, markets/dram, markets/hbm |
| 312 | `raw/reports/pkg-amkor-ase-osat-advanced-packaging-hbm-2026.md` | OSAT(Amkor/ASE) 첨단 패키징·HBM 통합 (2026) | report | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 313 | `raw/reports/pkg-tsmc-cowos-capacity-130k-wpm-2026.md` | TSMC to Quadruple Advanced Packaging Capacity: Reaching 130,000 CoWoS Wafers Monthly by Late 2026 | report | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 314 | `raw/reports/pkg-tsmc-cowos-capacity-bottleneck-2026-2027.md` | TSMC CoWoS capacity·병목·NVIDIA 할당 (2026-2027) | report | medium | markets/dram, markets/hbm, simulators/hbm-demand |
| 315 | `raw/reports/pkg-tsmc-cowos-fully-booked-osat-cowop-2025.md` | TSMC's CoWoS-L/S Reportedly Fully Booked, OSAT Partners Step up with ASE's CoWoP in Focus | report | medium | markets/hbm, simulators/hbm-demand, concepts/supply-demand-gap |
| 316 | `raw/reports/region-china-domestic-memory-demand-localization.md` | China Domestic Memory Demand, Localization & AI Chip Push 2026 | report | medium | markets/hbm, markets/dram, markets/pc-dram |
| 317 | `raw/reports/region-china-smartphone-memflation-demand-2026.md` | China Smartphone Market Q1 2026 — Memflation Demand Impact, Mobile DRAM | report | medium | markets/smartphone-memory, simulators/smartphone-memory-demand, markets/nand |
| 318 | `raw/reports/region-dram-market-revenue-share-by-region-2026.md` | DRAM Market Revenue Share by Region 2026 (Asia-Pacific / North America) | report | low | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
| 319 | `raw/reports/region-europe-automotive-memory-demand-2026.md` | 유럽/차량용 메모리 수요 (2026, Infineon/NXP/ESMC) | report | medium | concepts/supply-demand-gap, markets/dram, markets/nand |
| 320 | `raw/reports/region-europe-chips-act-automotive-demand.md` | Europe — EU Chips Act 2.0, Automotive Demand, Infineon/STM 2026 | report | medium | concepts/supply-demand-gap, concepts/demand-forecasting, methods/forecasting-evidence-map |
| 321 | `raw/reports/region-india-datacenter-ai-demand-2026-2030.md` | 인도 데이터센터·AI 수요 (2026-2030) | report | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 322 | `raw/reports/region-india-sea-atmp-assembly-smartphone-demand.md` | India & Southeast Asia — ATMP/OSAT Assembly, Micron Sanand, Smartphone Memory Demand 2026 | report | medium | markets/smartphone-memory, simulators/smartphone-memory-demand, markets/dram |
| 323 | `raw/reports/region-japan-kioxia-rapidus-materials-policy.md` | Japan — Kioxia NAND, Rapidus, Equipment/Materials & Government Support 2026 | report | medium | markets/nand, simulators/nand-ssd-demand, concepts/supply-demand-gap |
| 324 | `raw/reports/region-korea-samsung-skhynix-production-hub-policy.md` | South Korea — Samsung/SK hynix Production Hub, Yongin Cluster & K-CHIPS 2026 | report | medium | markets/dram, markets/hbm, markets/nand |
| 325 | `raw/reports/region-sia-q1-2026-regional-sales-growth.md` | SIA Q1 2026 — Global Semiconductor Sales by Region (Americas/China/Asia Pacific/Europe/Japan) | report | medium | concepts/supply-demand-gap, concepts/demand-forecasting, methods/forecasting-evidence-map |
| 326 | `raw/reports/region-taiwan-packaging-nanya-winbond-server-hub.md` | Taiwan — TSMC Packaging, Nanya/Winbond DRAM, Server ODM Hub 2026 | report | medium | markets/hbm, simulators/hbm-demand, markets/dram |
| 327 | `raw/reports/region-us-chips-act-micron-fabs-ai-demand.md` | US CHIPS Act Memory Fabs — Micron New York & Idaho, AI Datacenter DRAM Demand | report | medium | markets/hbm, markets/dram, markets/pc-dram |
| 328 | `raw/reports/region-us-hyperscaler-concentration-memory-demand.md` | US Hyperscaler Concentration — 2026 Memory Demand (Amazon/Google/Meta/Microsoft) | report | medium | markets/dram, markets/hbm, concepts/supply-demand-gap |
| 329 | `raw/reports/region-us-micron-domestic-memory-strategy-2026.md` | Micron 미국 메모리 전략·국가안보 (2026) | report | high | markets/dram, concepts/supply-demand-gap, markets/pc-dram |
| 330 | `raw/reports/region-us-section232-semiconductor-tariffs-2026.md` | US Section 232 반도체 관세 (2026) — 메모리 영향 | report | medium | concepts/supply-demand-gap, markets/dram, markets/hbm |
| 331 | `raw/reports/region-wsts-2026-regional-billings-split.md` | WSTS Spring 2026 Forecast — Global Semiconductor Market Surges Beyond $1.5T | report | medium | markets/dram, markets/hbm, markets/nand |
| 332 | `raw/reports/roundhill-dram-memory-etf-investment-landscape.md` | Roundhill Memory ETF(DRAM)·메모리 투자 지형 (2026) | report | medium | simulators/nand-ssd-demand, markets/hbm, markets/dram |
| 333 | `raw/reports/samsung-foundry-hbm4-base-die-turnkey-2026.md` | Samsung 파운드리-HBM4 base die 융합·turnkey (2026) | report | medium | markets/dram, markets/hbm, simulators/hbm-demand |
| 334 | `raw/reports/sia-q1-2026-global-semiconductor-sales.md` | SIA — Q1 2026 Global Semi Sales $298.5B (+25% QoQ), March $99.5B Record | report | medium | markets/dram, markets/nand, simulators/nand-ssd-demand |
| 335 | `raw/reports/techinsights-memory-outlook-report-2026.md` | TechInsights — Memory Outlook Report 2026; AI Demand & Tight Supply Drive Resurgence | report | low | markets/hbm, markets/dram, markets/pc-dram |
| 336 | `raw/reports/trendforce-2q26-memory-contract-price-forecast.md` | TrendForce 2Q26 — DRAM Contract +58~63% QoQ, NAND +70~75% QoQ | report | medium | concepts/supply-demand-gap, markets/dram, markets/pc-dram |
| 337 | `raw/reports/trendforce-4q25-dram-revenue-supplier-ranking.md` | TrendForce — 4Q25 DRAM Revenue $53.58B (+29.4% QoQ); Samsung Regains No.1 (36%) | report | high | concepts/supply-demand-gap, markets/dram, markets/hbm |
| 338 | `raw/reports/trendforce-4q25-nand-revenue-supplier-ranking.md` | TrendForce — 4Q25 NAND Top-5 Revenue $21.17B (+23.8% QoQ); Enterprise SSD Driver | report | high | markets/nand, simulators/nand-ssd-demand, concepts/demand-forecasting |
| 339 | `raw/reports/trendforce-ddr5-profitability-surpass-hbm3e-2026.md` | TrendForce — DDR5 Profitability to Surpass HBM3e in 2026; 64GB RDIMM Leads | report | medium | markets/hbm, simulators/hbm-demand, markets/pc-dram |
| 340 | `raw/reports/trendforce-mobile-dram-lpddr5x-2026-smartphone.md` | TrendForce — Mobile DRAM/LPDDR5X 2026; Smartphone Output -2% YoY on Memflation | report | medium | concepts/supply-demand-gap, markets/smartphone-memory, simulators/smartphone-memory-demand |
| 341 | `raw/reports/trendforce-spot-price-may-2026-ddr5-ddr4.md` | DRAM spot price 추이 (2026-05, DDR5/DDR4) | report | medium | markets/dram, markets/pc-dram, simulators/pc-dram-demand |
| 342 | `raw/reports/ymtc-2026-nand-xtacking-layer-count-capacity.md` | YMTC quietly begins shipping 5th Gen 3D TLC NAND (294-layer, Xtacking 4.0) | report | medium | concepts/supply-demand-gap, markets/nand, simulators/nand-ssd-demand |
| 343 | `raw/reports/yole-2026-hbm-dram-memory-market.md` | Yole Group — Memory ~$190B (2025); HBM $35B→$60B (2026), $170B by 2031 | report | medium | markets/hbm, markets/pc-dram, simulators/hbm-demand |
| 344 | `raw/reports/yole-cxl-memory-market-2026-2028.md` | Yole — CXL Memory Market: >$15B by 2028 (DRAM >$12B), Server Attach ~30% | report | low | markets/dram, markets/pc-dram, concepts/supply-demand-gap |
