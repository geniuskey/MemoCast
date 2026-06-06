---
title: AI Infrastructure Memory Demand
created: 2026-06-06
updated: 2026-06-06
type: concept
tags: [ai-infrastructure, hbm, gpu, power, demand-forecasting]
sources: [raw/articles/aisilicon-datacenter-buildout-gigawatts-2026-2028.md, raw/articles/aisilicon-largest-training-clusters-gpu-count-2026.md, raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md, raw/articles/aisilicon-onprem-edge-inference-memory-2026.md, raw/articles/aisilicon-tpu-ironwood-trainium3-hbm-specs-2026.md, raw/articles/channel-shi-datacenter-buyer-allocation-leadtimes-2026.md, raw/articles/domain-crypto-gpu-mining-legacy-gddr.md, raw/articles/domain-hpc-supercomputer-hbm-memory-capacity.md, raw/articles/domain-networking-switch-hbm-broadcom-tomahawk.md, raw/articles/domain-networking-switch-router-ddr-memory-2026.md, raw/articles/domain-sovereign-ai-national-datacenter-memory-2026.md, raw/articles/esg-memory-fab-energy-water-carbon-re100.md, raw/articles/gddr7-graphics-memory-demand-crowding-out-2026.md, raw/articles/history-dram-memory-cycles-2016-2026.md, raw/articles/history-memory-fab-disruptions-supply-shocks.md, raw/articles/korea-legacy-dram-ddr4-crowding-out-2026.md, raw/articles/model-agentic-ai-memory-demand-2026.md, raw/articles/model-ai-coding-enterprise-software-inference-demand-2026.md, raw/articles/model-ai-inference-memory-bound-token-economics.md, raw/articles/model-context-length-kv-cache-memory-demand.md, raw/articles/model-deepseek-v3-671b-moe-technical-report.md, raw/articles/model-epoch-ai-compute-growth-trends.md, raw/articles/model-generative-video-multimodal-memory-demand.md, raw/articles/model-introl-ai-memory-supercycle-hbm-2026.md, raw/articles/nvidia-gpu-hbm-capacity-roadmap-2026.md, raw/articles/oem-dell-hpe-ai-server-backlog-memory-bom-2026.md, raw/articles/oem-hyperscaler-custom-silicon-memory-buyers-2026.md, raw/articles/oem-memory-price-cloud-instance-passthrough-2026.md, raw/articles/oem-server-odm-gb200-nvl72-hbm-shipments-2025.md, raw/articles/power-ai-query-energy-inference-memory-2026.md, raw/articles/power-datacenter-vacancy-leasing-market-2026.md, raw/articles/power-deloitte-ai-datacenter-123gw-2035.md, raw/articles/power-gb200-nvl72-rack-120kw-liquid-cooling.md, raw/articles/power-goldman-datacenter-power-demand-165pct-2030.md, raw/articles/power-hbm3e-energy-per-bit-power-efficiency.md, raw/articles/power-hbm4-hbm5-per-stack-watts-roadmap.md, raw/articles/power-iea-datacenter-electricity-945twh-2030.md, raw/articles/power-liquid-cooling-adoption-hbm-thermal-limits.md, raw/articles/power-nuclear-smr-ppa-ai-datacenter-deals-2025.md, raw/articles/power-perf-per-watt-blackwell-vs-hopper.md, raw/articles/power-schmidt-congress-ai-power-29gw-2027.md, raw/articles/power-socamm-lpddr5x-low-power-ai-server-memory.md, raw/articles/power-us-grid-interconnection-queue-bottleneck.md, raw/articles/power-vs-memory-limited-datacenter-debate.md, raw/articles/server-ddr5-rdimm-channels-capacity-2026.md, raw/articles/storage-ai-training-data-synthetic-data-nand-demand.md, raw/articles/trendforce-ai-20pct-dram-wafer-2026.md, raw/articles/trendforce-ai-server-memory-contract-price-2q26.md, raw/articles/trendforce-ai-server-shipments-28pct-2026.md, raw/articles/trendforce-hbm-market-forecast-2026.md, raw/articles/trendforce-nearline-hdd-shortage-qlc-ssd-2026.md, raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md, raw/datasets/ai-server-shipments-forecast.md, raw/datasets/dram-nand-bit-growth-cagr-longrun.md, raw/datasets/dram-wafer-capacity-allocation-2026.md]
confidence: medium
---

# AI Infrastructure Memory Demand

AI infrastructure 자료는 HBM bit demand를 GPU 수량만으로 환산하면 안 된다는 점을 강화한다. GPU당 HBM 용량, custom accelerator HBM, rack 전력, 데이터센터 GW 착공률, hyperscaler capex가 모두 timing gate다.

## 이번 패스에서 읽은 source coverage

- Cluster raw files read: **185**
- Ledger: [[raw-integration-ledger]]
- Related: [[raw-source-map]], [[citation-matrix]], [[supply-demand-gap]], [[forecasting-evidence-map]]

## 핵심 해석

- **GPU count × HBM GB/GPU × realization rate**가 HBM 수요의 기본 구조다. xAI/Stargate 같은 대형 cluster 자료는 GPU count 상단을 제공하지만, 전력·cooling·CoWoS·HBM 공급이 realization rate를 제한한다.
- Custom accelerator(TPU/Trainium/Ascend)도 HBM을 쓰기 때문에 NVIDIA GPU만 보면 AI memory demand를 과소평가할 수 있다.
- On-prem/edge inference는 cloud training과 다른 수요층이다. 대용량 HBM/LPDDR 서버가 latency·data sovereignty·utilization 조건에서 독립 demand bucket을 만든다.

## 예측 변수화: AI infrastructure → HBM demand

AI infrastructure source를 HBM/DRAM 수요 모델에 넣을 때는 한 번에 `AI capex = HBM demand`로 환산하지 않고 아래 변수로 분리한다.

```text
Realized HBM demand EB
= Σ(accelerator units × HBM GB/accelerator × attach rate × realization factor) / 1e9

realization factor = min(power-ready factor, CoWoS/package factor, HBM supply factor, customer timing factor)
```

| Model variable | Raw anchor examples | Current anchor value | Confidence | Wiki/model use |
| --- | --- | ---: | --- | --- |
| Accelerator units | `raw/datasets/ai-server-shipments-forecast.md`, `raw/articles/trendforce-ai-server-shipments-28pct-2026.md` | 2023 AI server 1.2M, 2026 +28% YoY / ~17% server share | medium | simulator의 `acceleratorsThousand` 입력 후보. 서버 unit과 GPU unit은 다르므로 rack/GPU 변환 필요 |
| HBM GB per GPU — B200/GB200 | `raw/datasets/gpu-hbm-capacity.md`, `raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md`, `raw/articles/nvidia-gpu-hbm-capacity-roadmap-2026.md` | 192GB/GPU; GB200 NVL72 72 GPU ≈ 13.4TB HBM, ~120kW/rack | high | HBM simulator의 8 × 24GB stack preset |
| HBM GB per GPU — GB300/Rubin | `raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md`, `raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md` | 288GB/GPU; GB300 NVL72 ≈ 20.7TB HBM/rack | medium | HBM simulator의 8 × 36GB stack high-content preset |
| Custom accelerator HBM | `raw/articles/aisilicon-tpu-ironwood-trainium3-hbm-specs-2026.md`, `raw/articles/oem-hyperscaler-custom-silicon-memory-buyers-2026.md` | TPU Ironwood 192GB/chip; Trainium3 144GB-class anchor | medium | NVIDIA-only HBM 수요 과소평가 방지용 non-NVIDIA bucket |
| Cluster scale | `raw/articles/aisilicon-largest-training-clusters-gpu-count-2026.md`, `raw/articles/domain-sovereign-ai-national-datacenter-memory-2026.md` | xAI 555k GPU / 목표 1M GPU; Stargate 450k GPU; sovereign AI 200MW~1GW+ clusters | low/medium | top-down GPU unit sanity check; announced cluster는 power/package factor 적용 전 상단값 |
| Power readiness | `raw/articles/power-us-grid-interconnection-queue-bottleneck.md`, `raw/articles/power-deloitte-ai-datacenter-123gw-2035.md`, `raw/articles/power-gb200-nvl72-rack-120kw-liquid-cooling.md` | GB200 NVL72 ~120kW/rack; US DC power 75.8GW→108GW→134.4GW; AI DC 4GW→123GW by 2035 | medium | realization factor. GPU purchase order를 installed HBM demand로 전환할 때 discount |
| Packaging / CoWoS | `raw/reports/pkg-cowos-allocation-nvidia-amd-2026.md`, `raw/reports/equip-kla-q3-2026-memory-advanced-packaging.md`, `raw/reports/equip-advantest-hbm-test-lead-times-2026.md` | 2026 CoWoS wafer demand/allocation, advanced packaging/test surge | medium | HBM bit demand의 physical bottleneck; supply-demand gap page와 연결 |
| HBM growth context | `raw/datasets/hbm-bit-demand-growth-rate.md`, `raw/articles/trendforce-hbm-market-forecast-2026.md` | 2024 +200%, 2025 +130%, 2026 +70% YoY | medium | simulator output이 시장 성장률과 크게 어긋나는지 sanity check |

### 시나리오 sanity checks

| Scenario | Calculation | Result | Interpretation |
| --- | --- | ---: | --- |
| 1M B200/GB200-class GPUs | 1,000k × 95% × 192GB | 182.4PB / 0.1824EB | 192GB 세대의 unit-volume sensitivity |
| 1M GB300/Rubin-class GPUs | 1,000k × 95% × 288GB | 273.6PB / 0.2736EB | 288GB 세대로 content만 바뀌어도 +50% HBM demand |
| 1.7M high-content accelerators | 1,700k × 95% × 288GB | 465.1PB / 0.4651EB | 기존 TrendForce growth reference preset의 high-content 해석 |
| xAI 555k GPU cluster upper bound | 555k × 288GB | 159.8PB / 0.1598EB | 단일 초대형 cluster가 HBM demand에 미치는 order of magnitude |
| Stargate 450k GPU campus upper bound | 450k × 288GB | 129.6PB / 0.1296EB | announced GPU count는 realization factor 적용 전 상단값 |

## Source notes read in this pass

| Raw file | What it adds to the wiki model | Numeric anchors observed |
| --- | --- | --- |
| `raw/articles/aisilicon-datacenter-buildout-gigawatts-2026-2028.md` | 2026 US hyperscaler AI capex 합산 **~$700B**(MSFT/Alphabet/Amazon/Meta/Oracle). Amazon ~$200B, Google $175~185B.; Wall Street 컨센서스: 2028년 ~$930B, 2025-2030 누적 **$4.7T**. | $700B, $200B, 185B, 2028년, $930B, $4.7T |
| `raw/articles/aisilicon-largest-training-clusters-gpu-count-2026.md` | **xAI Colossus(Memphis)**: **555,000 GPU**, $18B, 세계 최대. 2026-01-17 Colossus 2 가동(첫 GW급 coherent 학습 클러스터). ~1GW → 2026-04 1.5GW → 총 2GW 계획. GB200/GB300 중심. 목표 **100만 GPU**.; **Microsoft/OpenAI Stargate Abilene**: 첫 **450,000 GPU** Blackwell 캠퍼스 2026 초 가동. | $18B, 1GW, 1.5GW, 2GW, 100만, 288GB |
| `raw/articles/aisilicon-nvidia-amd-hbm-capacity-roadmap-2026.md` | **B200**: 192GB HBM3e. **GB300 NVL72 (Blackwell Ultra)**: GPU당 288GB HBM3e (B200 192GB 대비 증가).; **2026 출하 mix**: Blackwell이 NVIDIA 하이엔드 GPU 출하의 **71%** 차지 전망. Rubin은 29%→22%로 하향(딜레이 리스크). GB200/B200은 기존 수주·가격민감 고객 수요로 2H26까지 지속. | 192GB, 288GB, 71%, 29%, 22% |
| `raw/articles/aisilicon-onprem-edge-inference-memory-2026.md` | 추론 전용 GPU 대용량 메모리화: Intel **Crescent Island 160GB**(Xe3P, air-cooled inference), AMD MI400 **432GB HBM4**, NVIDIA Rubin **288GB HBM4**(50 PFLOPS NVFP4).; on-prem 정당화: 활용률 80%+ 지속, 데이터주권, 멀티이어 계약. | 160GB, 432GB, 288GB, 80%, 14B, 7B |
| `raw/articles/aisilicon-tpu-ironwood-trainium3-hbm-specs-2026.md` | 칩당 **192GB HBM3e**, 대역폭 **7.4 TB/s**. dual-chiplet(각 chiplet 96GB, HBM3E 8 stack).; dense FP8 4.6 PFLOPS(B200 4.5 대비 소폭↑). **9,216칩 superpod = 직접접근 HBM 1.77 PB**. | 192GB, 7.4 T, 96GB, 1.77 PB, 144GB, 4.9 T |
| `raw/articles/channel-shi-datacenter-buyer-allocation-leadtimes-2026.md` | 대형 DRAM 주문 리드타임: 2025년 12월 **25주 → 45주+**, 2026년 초 일부 **40주 초과**.; 1H26 가격 상승: 1월 기준 대비 **30~60% 추가 상승** 예상. Q4 2025부터 하이퍼스케일러 비축으로 가격 급등. | 40주, 2025년, 25주, 45주, 2026년 |
| `raw/articles/domain-crypto-gpu-mining-legacy-gddr.md` | 2026년 마이닝 GPU 표준 메모리: **GDDR6 / GDDR6X**.; RTX 4090: **24GB GDDR6X** — 고급 해시레이트. | 2026년, 24GB, 8GB, 448 GB, 6GB |
| `raw/articles/domain-hpc-supercomputer-hbm-memory-capacity.md` | **El Capitan (LLNL, 2024-11 세계 1위)**: HBM3 총 **5.4 PB**. MI300A 가속기당 128GB HBM3.; **Frontier (ORNL)**: 총 메모리 9.2PB(절반 HBM/절반 DDR4) → HBM 약 **4.6 PB**. | 5.4 PB, 128GB, 9.2PB, 4.6 PB, 8.16 PB, 12.2PB |
| `raw/articles/domain-networking-switch-hbm-broadcom-tomahawk.md` | **Broadcom Tomahawk 6**: 단일 칩 **102.4 Tbps** 스위칭 — 업계 최초, 기존 최고 대비 2배.; **Tomahawk Ultra**: 랙당 Intel Gaudi 3 가속기 최대 64개 all-to-all 연결, 총 **HBM 대역폭 76.8 TB/s**; SUE 적용 시 XPU 간 <400ns 지연. | 102.4 T, 76.8 T, 51.2 T |
| `raw/articles/domain-networking-switch-router-ddr-memory-2026.md` | AI 데이터센터용 **400G/800G 스위치** 등장 → 전통 DRAM 한계, DDR5 모듈 업그레이드 필수.; **라우터 메모리 비용 ~7배 상승**(DRAM 급등 전이). | 171%, 70% |
| `raw/articles/domain-sovereign-ai-national-datacenter-memory-2026.md` | **Stargate UAE(G42·Oracle·NVIDIA·Cisco·SoftBank)**: Abu Dhabi 1GW 클러스터, 1단계 200MW 2026 가동. OpenAI "for Countries" 1호.; **Saudi HUMAIN**: Riyadh Hexagon 480MW Tier IV. **2030년 1.9GW**, 이후 4년 내 6.6GW 확장 계획. | 1GW, 200MW, 480MW, 2030년, 1.9GW, 4년 |
| `raw/articles/esg-memory-fab-energy-water-carbon-re100.md` | 5대 반도체사(Samsung·SK·TSMC·Intel·Micron) 연간 물 **5,000만㎥+**, 전력 **90억 kWh+** 소비.; 반도체 산업 연 CO2 배출 **1,500만 톤+**, 2030년까지 2배 전망. | 000만, 90억, 500만, 2030년, 2021년, 19.3 T |
| `raw/articles/gddr7-graphics-memory-demand-crowding-out-2026.md` | **16GB GDDR7 카드당 비용 2025 중반 $65~80 → 연말 $200+**. GDDR6도 2025 중후반 ~60% 상승.; NVIDIA·AMD 단계적 GPU 가격 인상(AMD 1월, NVIDIA 2월~). | 16GB, 60%, 40% |
| `raw/articles/history-dram-memory-cycles-2016-2026.md` | **2016-2018 supercycle**: 스마트폰 저장용량 증가 + 클라우드 초기 buildout + 제조사들이 3D NAND로 capacity 전환하며 conventional DRAM 공급 일시 제약. Micron 매출 2016 $12.4B → 2017 $20.3B (+64%). 2017·2018 사상 최대 매출.; **2019 crash**: 수요 정체 + bit growth 지속 + 재고 증가 → 공격적 ASP 하락. 대표적 다운사이클. | $12.4B, $20.3B, 64%, 2022년, 2023년, 1년 |
| `raw/articles/history-memory-fab-disruptions-supply-shocks.md` | **SK hynix 우시(Wuxi) 화재(2013)**: PC DRAM 장비 손상 + 정전·클린룸 오염 → 1주 만에 메모리 가격 27%+ 급등. Samsung·Micron 수혜.; **대만 지진(2024)**: Micron·Samsung·SK가 contract price 공시 중단, wafer fab 셧다운으로 추가 가격 인상 신호. | 1주, 27%, 4%, 3%, 90% |
| `raw/articles/korea-legacy-dram-ddr4-crowding-out-2026.md` | 2026-01 기준 글로벌 DDR4/DDR5 가격, 2025-09 이전 대비 **4배+ 급등**.; 단종 임박 **DDR3(L)·DDR2까지 수요·가격 상승**: DDR3(L) 8GB 1만원대(2024-25) → 1~2만원(2025말~2026초). 2026-04 DDR2-DDR3 +20~40%, DDR4 4GB +20%. | 8GB, 1만, 2만, 40%, 4GB, 20% |
| `raw/articles/model-agentic-ai-memory-demand-2026.md` | **메모리(compute 아님)가 지능형 시스템 scaling의 1차 병목**으로 이동.; reasoning 모델은 결과 전 토큰 대량 생성 → VRAM(긴 KV cache)·추론시간 증가. | 85K, 350만, 32K, 141GB |
| `raw/articles/model-ai-coding-enterprise-software-inference-demand-2026.md` | AI 코딩 시장 2026 **$12.8B → 2032 $30.1B**(CAGR 27%). 개발자 85% 사용(73% 정기).; OpenAI(2026-04-08): 주간 300만 활성, **토큰 사용 MoM +70%+**. | $12.8B, $30.1B, 27%, 85%, 73%, 300만 |
| `raw/articles/model-ai-inference-memory-bound-token-economics.md` | inference의 **decode 단계는 본질적으로 sequential**(autoregressive, 토큰 1개씩) → **memory-bandwidth bound**(compute bound 아님).; 2023→2025 HBM 비용 용량·대역폭 각 +35% 상승(같은 기간 DDR ~절반 하락). HBM3e 프리미엄 server DDR5 대비 4~5배 → 2026말 1~2배로 축소. | 35%, 55%, 130%, 70%, 5.3T, 192GB |
| `raw/articles/model-context-length-kv-cache-memory-demand.md` | **1M 토큰 컨텍스트** production-ready(2025-12). KV cache **약 15GB/user**(1M 토큰).; Llama 3.1-70B에서 **128K 컨텍스트 KV cache만 약 40GB HBM** → 단일 A100 용량 초과. | 15GB, 70B, 128K, 40GB, 16T, 1% |
| `raw/articles/model-deepseek-v3-671b-moe-technical-report.md` | 총 파라미터 671B, 토큰당 활성 파라미터 37B (Mixture-of-Experts); 각 MoE 레이어: 1 shared expert + 256 routed experts, expert 중간 hidden dim 2048 | 671B, 37B, 685GB, 14B |
| `raw/articles/model-epoch-ai-compute-growth-trends.md` | **frontier LLM 학습 compute: 2020년 이후 연 5배(doubling ~5.2개월)**.; 전체 notable AI 모델: 2010년 이후 연 **4.4배** 성장. | 2020년, 5.2개월, 2010년, 6.8개월, 7개월, 2026년 |
| `raw/articles/model-generative-video-multimodal-memory-demand.md` | 비디오 생성 compute 비용 **$0.50~2.00/generation**(텍스트·이미지 대비 orders of magnitude↑). 10초 Sora ~$1.30(GPU 40분/4-GPU 8~10분).; **요청당 수십 GB 메모리**, attention이 수천 프레임. 5초 720p에 **80,000+ 토큰**, attention이 추론시간 85%+. | 85%, 8x, 141GB, 2T, $200K |
| `raw/articles/model-introl-ai-memory-supercycle-hbm-2026.md` | GPU별 HBM 사양: H100 80GB / 3.35 TB/s (HBM3), H200 141GB / 4.8 TB/s (HBM3e), B200 (Blackwell) 192GB / 8.0 TB/s (HBM3e), R100 (Rubin) 288GB / 13-15 TB/s (HBM4), GB300 (Blackwell Ultra) 288GB (HBM3e), Rubin Ultra 512GB (HBM4); 메모리 룰: 16-bit 정밀도에서 1B 파라미터당 약 2GB GPU | 80GB, 3.35 T, 141GB, 4.8 T, 192GB, 8.0 T |
| `raw/articles/nvidia-gpu-hbm-capacity-roadmap-2026.md` | **B200 (Blackwell)**: 192GB HBM3E, 대역폭 8 TB/s. 스택 구성 8-Hi 기반.; **B300 / Blackwell Ultra**: 288GB HBM3E (12-Hi 스택), 대역폭 8 TB/s. B200 대비 GPU당 용량 +50% (192GB→288GB). | 192GB, 8 T, 288GB, 50% |
| `raw/articles/oem-dell-hpe-ai-server-backlog-memory-bom-2026.md` | Dell: FY26에 AI 최적화 서버 $25B+ 출하, FY27 진입 백로그 $43B(기록적), FY27 AI 서버 매출 전망 $60B로 상향; HPE: AI 시스템 백로그 $6.3B, AI 인프라 매출 YoY +52%; 분기 매출 $10.7B(+40%) | $25B, $43B, $60B, $6.3B, 52%, $10.7B |
| `raw/articles/oem-hyperscaler-custom-silicon-memory-buyers-2026.md` | 하이퍼스케일러 합산 capex 2026: 약 $660-690B, 이 중 약 75%가 AI 인프라; Google/Microsoft/Amazon/Meta 각사 AI capex: $60-80B 규모 | 690B, 75%, 80B, 9.6 T, 144GB, 216GB |
| `raw/articles/oem-memory-price-cloud-instance-passthrough-2026.md` | 메모리는 서버 BOM의 **30~40%**. 메모리 2~3배 시 서버 원가 상승 불가피.; 서버 가격 인상 2025-12~2026-01(Dell·Lenovo 확정). 클라우드는 조달-소매 가격 **3~6개월 lag**. | 40%, 6개월, 10%, 15%, 960GB |
| `raw/articles/oem-server-odm-gb200-nvl72-hbm-shipments-2025.md` | GB200 NVL72: 2025년 4월 단월 1,500 units 출하 (Q1 2025 전체 1,000 units 대비 급증); GB200 NVL72 랙 구성: 72 x Blackwell B200 GPU, 랙당 HBM3e 약 130TB pool | 2025년, 72 x, 130T, 80% |
| `raw/articles/power-ai-query-energy-inference-memory-2026.md` | 표준 ChatGPT 쿼리 **~0.34 Wh**(Altman), GPT-4o ~0.42 Wh(학술), 최신 중앙값 0.24~0.3 Wh(reasoning/멀티모달은 훨씬 높음).; AI compute의 **80~90%가 inference** → inference가 규모에서 지배적 에너지 소비. | 90%, 160% |
| `raw/articles/power-datacenter-vacancy-leasing-market-2026.md` | primary market 공실률 2025년 말 **1.4% 사상 최저**(북미 1.6%, 1년 전 2.8%). Northern Virginia colo 0.72%.; 건설 중 capacity의 **74~92% pre-leased/precommitted** → 2030년까지 저공실 지속 전망. | 2025년, 1.4%, 1.6%, 1년, 2.8%, 0.72% |
| `raw/articles/power-deloitte-ai-datacenter-123gw-2035.md` | AI 데이터센터 전력 수요: 2024년 4 GW → 2035년 123 GW (30배 이상 증가 전망).; 전체 데이터센터 전력 수요: 2024년 33 GW(AI 비중 12%) → 2035년 176 GW(AI 비중 70%). | 30x, 2025년, 2024년, 4 GW, 2035년, 123 GW |
| `raw/articles/power-gb200-nvl72-rack-120kw-liquid-cooling.md` | NVL72 랙: 36 GB200 노드 = 72 GPU + 36 Grace CPU, 랙당 ~120 kW.; GB200 Grace Blackwell Superchip 1개당 최대 ~1,200W 방열. | 120k, 36 GB, 120 k, 30%, 15 k |
| `raw/articles/power-goldman-datacenter-power-demand-165pct-2030.md` | 데이터센터 전력 수요 2023~2030 +165% 증가 전망.; 전력망(grid) 투자 약 $720 billion(2030년대까지) 필요. | 165%, 2030년, 11년 |
| `raw/articles/power-hbm3e-energy-per-bit-power-efficiency.md` | Micron HBM3E: 경쟁사 대비 전력 소비 ~30% 낮음 주장.; HBM3E 세대 전력 효율 직전 세대 대비 약 12% 개선. | 30%, 12%, 1.2 T |
| `raw/articles/power-hbm4-hbm5-per-stack-watts-roadmap.md` | HBM4: HBM3E 대비 bit당 전력 약 40% 감소, 열성능 약 4% 개선.; HBM4 인터페이스 폭 1024-bit → 2048-bit로 2배(전력 효율·열 대응 목적). | 40%, 4%, 4 T, 2026년 |
| `raw/articles/power-iea-datacenter-electricity-945twh-2030.md` | 글로벌 데이터센터 전력 소비: 2024년 약 415 TWh(전 세계 전력의 ~1.5%) → 2030년 약 945 TWh(2배 이상). 일본 전체 전력 소비 수준.; AI 최적화 데이터센터 전력 수요는 2030년까지 4배 이상 증가 전망. | 945 T, 2024년, 415 T, 1.5%, 2030년 |
| `raw/articles/power-liquid-cooling-adoption-hbm-thermal-limits.md` | 직접칩(direct-to-chip) 냉각이 칩 단에서 열부하의 70~80% 제거.; NVIDIA Blackwell Ultra: HBM3E 8스택 탑재, 최대 1,400W 방열, 약 49.1 W/cm² 열밀도. | 80%, 4.4 k, 5 k, 2036년, $17.8B, 120 k |
| `raw/articles/power-nuclear-smr-ppa-ai-datacenter-deals-2025.md` | Amazon/Google/Microsoft 합산 원자력 파트너십 $10B 이상 약정, 글로벌 ~22 GW 프로젝트 개발 중.; 집계: 13개 딜, 합산 9.7+ GW 약정. | $10B, 22 GW, 835 MW, 20년, $16B, 2028년 |
| `raw/articles/power-perf-per-watt-blackwell-vs-hopper.md` | Blackwell: MoE 모델 기준 MW당 처리량 Hopper 대비 ~10배.; Blackwell Ultra: Hopper 대비 MW당 성능 최대 ~50배, 토큰당 비용 ~35배 저감(SemiAnalysis). | - |
| `raw/articles/power-schmidt-congress-ai-power-29gw-2027.md` | 데이터센터 추가 전력 수요: 2027년까지 +29 GW, 2030년까지 추가 +67 GW.; 업계 전력 수요 비중 전망: 총 발전의 3% → 99% (극단적 상방 주장, 회의론 존재). | 29 GW, 67 GW, 2027년, 2030년 |
| `raw/articles/power-socamm-lpddr5x-low-power-ai-server-memory.md` | LPDDR5X SOCAMM 동작 전압 ~1.05V, DDR5 RDIMM 대비 전력 30~35% 절감.; 일부 자료: SOCAMM이 표준 DDR5 RDIMM 대비 전력 1/3 수준 소비. | 35%, 55%, 128GB, 2027년, 30% |
| `raw/articles/power-us-grid-interconnection-queue-bottleneck.md` | 미국 데이터센터 전력 수요(IT+냉각+조명 등): 2026년 75.8 GW → 2028년 108 GW → 2030년 134.4 GW.; 그리드 전력 수요 2025년 +22%, 2030년까지 거의 3배. | 2026년, 75.8 GW, 2028년, 108 GW, 2030년, 134.4 GW |
| `raw/articles/power-vs-memory-limited-datacenter-debate.md` | SemiAnalysis 추정: 메모리가 하이퍼스케일러 AI 지출의 ~30%(2026)로 상승, 2023~2024년 ~8% 대비.; SemiAnalysis 모델 base case에서 예측 구간 상당 부분 동안 메모리가 binding constraint. | 30%, 2024년, 8% |
| `raw/articles/server-ddr5-rdimm-channels-capacity-2026.md` | **AMD EPYC 9005 (Turin)**: socket당 **DDR5 12채널**, 최대 **6TB/socket**, 속도 6000~6400 MT/s.; **Intel Xeon 6th Gen (Granite Rapids)**: socket당 **12채널**, DDR5-6400 RDIMM, MR-DIMM은 DDR5-8800 지원. | 6T, 256GB, 64GB, 1.5T |
| `raw/articles/storage-ai-training-data-synthetic-data-nand-demand.md` | **Gartner: 2026년까지 기업 75%가 합성데이터 생성**(2023 <5%). 2026 AI 프로젝트 데이터의 75% 합성, 2030 합성>실데이터.; LLM 1회 학습 사이클이 **petabyte급 intermediate 데이터** 생성 → 고throughput 스토리지 필요. | 2026년, 75%, 5%, 10T, 80PB |
| `raw/articles/trendforce-ai-20pct-dram-wafer-2026.md` | 2026년 AI가 글로벌 DRAM 공급의 **약 20%(near 20%)**를 실질 소비.; 메모리 수요 분해 (총 약 3 EB): | 2026년, 20%, 750PB |
| `raw/articles/trendforce-ai-server-memory-contract-price-2q26.md` | 2Q26 contract 가격 전망 (QoQ):; 공급자들은 수익성이 높은 **server DRAM 우선 배분**, 주요 고객과 **장기계약(LTA)** 체결로 향후 capacity 확장 뒷받침. | 2026년, 63%, 75% |
| `raw/articles/trendforce-ai-server-shipments-28pct-2026.md` | 2026년 글로벌 AI 서버 출하 **+28% YoY 초과** (북미 CSP, sovereign cloud, 자체 ASIC, edge AI inference 견인).; 가속기 구성: | 28%, 2026년, 69.7%, 27.8%, 2023년 |
| `raw/articles/trendforce-hbm-market-forecast-2026.md` | HBM bit 수요 성장: **2025년 +130% YoY, 2026년 +70% YoY** (공급 타이트 지속).; 2026년 총 HBM 출하 **30 billion gigabits(30Gb 단위) 초과** 전망. | 2025년, 130%, 2026년, 70% |
| `raw/articles/trendforce-nearline-hdd-shortage-qlc-ssd-2026.md` | nearline HDD lead time이 수 주 → **52주 초과**로 급증.; 하이퍼스케일러가 backorder 회피 위해 **QLC NAND SSD로 전환** (warm/cold storage 대체). | 52주, 30%, 10%, 2026년 |
| `raw/datasets/ai-rack-gpu-hbm-coupling-parameters.md` | `system`(GB200/GB300/Rubin), `gpu_per_rack`, `hbm_per_gpu_gb`, `hbm_per_rack_tb`, `total_ram_per_rack_tb`, `power_kw`, `note`, `confidence`; GB200 NVL72: 72 GPU, ~13.4TB RAM, ~120kW. | 13.4T, 120k, 288GB, 8T, 20.7T |
| `raw/datasets/ai-server-shipments-forecast.md` | `year`, `ai_server_units_m`(백만 대), `yoy_pct`, `ai_share_of_servers_pct`(전체 서버 중 비중), `note`, `confidence`; 2023 1.2M(+38.4%), 전체 서버의 ~9%. | 38.4%, 9%, 12.1%, 24%, 28%, 17% |
| `raw/datasets/dram-nand-bit-growth-cagr-longrun.md` | `product`, `period`, `bit_growth_pct`, `type`(annual/cagr/cagr_revenue), `note`, `confidence`; **type 주의**: bit growth(물량) vs cagr_revenue($, ASP 포함)는 전혀 다른 지표. | 20%, 3%, 12%, 7.2%, 8.51% |
| `raw/datasets/dram-wafer-capacity-allocation-2026.md` | `segment`, `metric`(output_share/revenue_share/wafer_multiple 등), `value_pct`(% 또는 배수), `note`, `confidence`; HBM: output ~8%(bit 기준)이나 revenue >30%(2026). AI equivalent wafer 소비 ~20%. | 8%, 30%, 20%, 3x, 1GB, 4x |
| `raw/datasets/hbm-bit-demand-growth-rate.md` | `year`, `hbm_bit_demand_yoy_pct`(YoY bit 수요 증가율 %), `note`, `confidence`; 2024 ~+200%(폭발적), 2025 +130%, 2026 +70%로 둔화(TrendForce). 절대 bit는 계속 증가하나 증가율은 체감. | 200%, 130%, 70%, 20%, $4B, $130B |
| `raw/datasets/hbm-dram-capacity-wpm-2026.md` | `company`/`metric`, `value`, `unit`(wpm/pct), `period`, `note`, `confidence`; SK hynix M15X HBM 2H26 40k wpm→2027 80k(출처별 10k→55-60k). 총 DRAM wafer input 600k wpm(2H26). 용인 +360k(2030). | 40k, 80k, 10k, 60k, 600k, 360k |
| `raw/datasets/hbm-market-size.md` | year: 연도; metric: hbm_market_size | 10억, $2.3B, $5.6B, $3B, $9B |
| `raw/datasets/idc-global-datasphere-zettabytes.md` | `year`, `datasphere_zb`(연간 생성/캡처/복제/소비 데이터, ZB), `note`, `confidence`; 2018 33ZB → 2025 ~173.4ZB(≈175). 2026 230~240ZB. 2029 527.5ZB(2025의 ~3배). | 4년 |
| `raw/datasets/korea-semiconductor-exports-monthly.md` | `period`: 연/월(FY=연간); `semiconductor_exports_usd_b`: 반도체 수출액(십억 달러) | 79%, 2025년, $173.4B, 22.2%, $37.2B, 169.4% |
| `raw/datasets/memory-makers-2025-quarterly-timeseries.md` | `company`(sk_hynix/samsung_ds/samsung_corp/micron), `quarter`, `revenue`+`unit`, `operating_profit`+`unit`, `note`, `confidence`; **SK hynix 2025**: Q1 17.64조/OP 7.44조 → Q4 32.83조/OP 19.17조(margin 58%). FY 매출 97.15조/OP **47.21조**(기록, Samsung 추월). | 58%, $23.68B, $33.5B, 81%, $25B |
| `raw/datasets/memory-makers-quarterly-financials-cycle.md` | `company`: micron / sk_hynix / samsung; `period`: 회계연도/분기(Micron은 fiscal year) | $5.83B, $0.778B, 7.73조원, 23.47조원, 66.19조원, $46.06B |
| `raw/datasets/memory-market-revenue-split.md` | year: 연도; segment: DRAM / NAND / HBM | 10억, $90.7B, 75%, $136.5B, 51%, 2016년 |
| `raw/datasets/memory-market-tam-forecast-2025-2028.md` | `year`, `segment`(dram/nand/hbm/memory_total/datacenter_silicon_total); `revenue_usd_b`: 매출(십억 달러) | $551.6B, $842.7B, 53%, $165.7B, 73%, $404.3B |
| `raw/datasets/server-dram-content-per-box-growth.md` | `year`/`metric`, `value`, `unit`, `note`, `confidence`; 2024 서버 DRAM 콘텐츠/box **+17.3% YoY**(타 앱 추월, TrendForce). | 17.3%, 256GB, 512GB, 1T, 30%, 80% |
| `raw/earnings/hbm4-three-supplier-competition-samsung-comeback-2026.md` | **Samsung HBM4 2026-02 양산**(이전 세대 NVIDIA 인증 난항 후 복귀). 2026-06-05 3사 모두 Vera Rubin HBM4 인증.; 점유율: **SK hynix 60~70%, Samsung 25~30%, Micron 나머지**. SK가 qualification 선행 + Blackwell 주공급. | 70%, 30% |
| `raw/earnings/hyperscaler-capex-2026-guidance.md` | Big 4(Microsoft, Google/Alphabet, Amazon, Meta) 2026 합산 capex: 약 $725B, YoY +77% (2025 약 $410B); AI 인프라 비중: 약 75% (~$450B) | $725B, 77%, $410B, 75%, $450B, $190B |
| `raw/earnings/kioxia-fq4-2025-earnings.md` | FQ4'25 매출: ¥1,002.9B (≈$6.4B), QoQ +459.2%; FQ4'25 영업이익: ¥596.8B (≈$3.9B), QoQ +454%, 사상 최고 | 002.9B, $6.4B, 459.2%, 596.8B, $3.9B, 454% |
| `raw/earnings/kioxia-fy25-nand-outlook-ipo.md` | 2024년 도쿄증권거래소 IPO. 2025년 주가 **+540%**(AI 병목 반응, 일본 최고 성과 반도체주).; 2025 NAND 수요>공급, bit growth **mid-teens%**. 2026 **high-teens%**로 가속(공급제약 심화). | 2024년, 2025년, 540%, 20%, 2029년, 62% |
| `raw/earnings/micron-fq2-2026-earnings.md` | 총매출: $23.86B (≈$23.9B), YoY +196%, QoQ +75%; DRAM 매출: $18.8B (총매출의 79%), YoY +207% | $23.86B, $23.9B, 196%, 75%, $18.8B, 79% |
| `raw/earnings/nvidia-fq1-2027-datacenter.md` | 총매출: $81.6B, YoY +85% (컨센서스 $79.2B 상회); Data Center 매출: $75.2B, YoY +92%, QoQ +21% (컨센서스 $73.5B 상회) | $81.6B, 85%, $79.2B, $75.2B, 92%, 21% |
| `raw/earnings/nvidia-hbm4-supplier-qualification-vera-rubin-2026.md` | **2026-06-05 Jensen Huang: Samsung·SK hynix·Micron 3사 모두 HBM4 인증 통과**(Vera Rubin용).; **Vera Rubin**: GTC Taipei(2026-06-01) 발표 후 full production. Grace Blackwell 대비 agent throughput 10배. **2026 3Q 출하** 예정. | 70%, 30% |
| `raw/earnings/samsung-electronics-1q26-earnings.md` | 전사 영업이익: 57.23조원 (≈$38.4B), YoY +756% (사상 최고, 2025 연간 영업이익 초과); DS(반도체) 부문 매출: 81.7조원, YoY +225% | 57.23조원, $38.4B, 756%, 81.7조원, 225%, 53.7조원 |
| `raw/earnings/sandisk-fq3-2026-earnings.md` | 매출: $5.95B, QoQ +97%, YoY +251% (가이던스 상회); GAAP 순이익: $3,615M, 희석 EPS $23.03 (또 다른 보도 $23.41) | $5.95B, 97%, 251%, 78.4%, 55.7%, 27.3% |
| `raw/earnings/sandisk-wd-fy2026-nand-datacenter-results.md` | **FQ2'26**(1/2 종료): 매출 $3.03B(+31% QoQ), datacenter +64% QoQ.; **FQ3'26**(4/3 종료): 매출 **$5.95B(+97% QoQ)**, 순익 $3.615B. **Datacenter +233% QoQ**, YoY +645%(ASP/GB +186% × EB +160%). | $3.03B, 31%, 64%, $5.95B, 97%, $3.615B |
| `raw/earnings/sk-hynix-1q26-earnings.md` | 매출(Revenue): 52.5763조원 (분기 최초 50조원 돌파), QoQ +60%, YoY +198%; 영업이익(Operating profit): 37.6103조원 (≈$25.42B), QoQ +96%, YoY 5배+ | 52.5763조원, 50조원, 60%, 198%, 37.6103조원, $25.42B |
| `raw/earnings/sk-hynix-fy2025-record-results.md` | **FY2025 매출 97.15조원, 영업이익 47.21조원(기록), 순이익 42.95조원**.; 분기: Q1 17.64조(OP 7.44조) → Q2 22.23조(9.21조) → Q3 24.45조(11.38조) → Q4 32.83조(OP **19.17조**, margin 58%). | 97.15조원, 47.21조원, 42.95조원, 58%, 34%, 68% |
| `raw/earnings/trendforce-1q26-memory-pricing.md` | Samsung 메모리 ASP: 2025 연평균 대비 +146%; 모바일 메모리 조달원가 YoY +107%; SK hynix DRAM ASP: QoQ mid-60% 상승, DRAM bit 출하 QoQ 대체로 flat | 146%, 107%, 60%, 70%, 10%, 2.55조원 |
| `raw/lectures/conf-hotchips-2025-marvell-custom-hbm-cxl.md` | Hot Chips 2025 (2025-08-26)에서 Marvell이 custom SRAM, custom HBM, CXL+Arm compute 공개.; ML/AI가 단일 최대 트랙(2개 풀 세션) — 메모리 대역폭이 핵심 주제. | 2nm, 864 GB, 2 T |
| `raw/lectures/conf-imw-2025-memory-workshop.md` | 2025 IEEE IMW: California, 2025-05-18 ~ 05-21 개최.; 반도체 메모리 기술의 대표 국제 포럼 (HBM 포함, 초기 연구~양산 driver~emerging까지). | 10년 |

> 나머지 105개 cluster source는 [[raw-integration-ledger]]에서 파일 단위로 추적한다.

## Integration rule

이 페이지의 source note는 model input 후보이다. EB 산식이나 simulator preset으로 승격하려면 최소한 `unit/shipments`, `content per unit`, `mix/adoption`, `supply or realization constraint` 중 어느 축에 해당하는지 명시하고, 가능하면 2개 이상 raw cluster로 교차 확인한다.
