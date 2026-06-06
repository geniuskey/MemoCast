---
title: Long-tail Domain Memory Demand
created: 2026-06-06
updated: 2026-06-06
type: concept
tags: [domain-demand, edge-ai, automotive, iot, demand-forecasting]
sources: [raw/articles/domain-arvr-xr-headset-memory-content.md, raw/articles/domain-automotive-l4-300gb-ram-micron.md, raw/articles/domain-autonomous-vehicle-data-generation-storage.md, raw/articles/domain-crypto-gpu-mining-legacy-gddr.md, raw/articles/domain-gaming-handheld-lpddr-content.md, raw/articles/domain-hpc-supercomputer-hbm-memory-capacity.md, raw/articles/domain-humanoid-robotics-memory-content.md, raw/articles/domain-industrial-automation-edge-ai-memory.md, raw/articles/domain-iot-smart-home-edge-ai-memory-2026.md, raw/articles/domain-medical-device-ai-imaging-memory.md, raw/articles/domain-networking-switch-hbm-broadcom-tomahawk.md, raw/articles/domain-networking-switch-router-ddr-memory-2026.md, raw/articles/domain-smart-glasses-ar-wearable-memory-2026.md, raw/articles/domain-sovereign-ai-national-datacenter-memory-2026.md, raw/articles/domain-space-aerospace-radhard-memory.md, raw/articles/domain-surveillance-cctv-nand-demand.md, raw/articles/domain-telecom-5g-6g-edge-memory-demand.md, raw/articles/edge-ai-iot-memory-demand-2026.md, raw/articles/gddr-gaming-console-memory-2026.md, raw/articles/micron-automotive-memory-per-vehicle.md, raw/articles/oem-automotive-memory-per-vehicle-bosch-continental-2025.md, raw/datasets/memory-demand-domain-taxonomy.md, raw/datasets/steam-pc-gaming-ram-share-2026.md, raw/papers/hbm-bit-cost-domain-specific-ecc-ai-inference-2025.md, raw/reports/military-aerospace-memory-demand-2026.md, raw/reports/region-europe-automotive-memory-demand-2026.md, raw/reports/region-europe-chips-act-automotive-demand.md]
confidence: medium
---

# Long-tail Domain Memory Demand

Long-tail application 자료는 smartphone/PC/server만으로 빠지는 수요를 보완한다. 아직 EB 산식으로 직접 승격하기보다 content-per-device anchor와 adoption scenario 후보로 유지한다.

## 이번 패스에서 읽은 source coverage

- Cluster raw files read: **27**
- Ledger: [[raw-integration-ledger]]
- Related: [[raw-source-map]], [[citation-matrix]], [[supply-demand-gap]], [[forecasting-evidence-map]]

## 핵심 해석

- Automotive, networking switch/router, robotics, XR, medical, surveillance, aerospace는 각각 unit 수요가 작아도 GB/device 또는 TB/device가 커질 수 있다.
- 이 domain들은 현 단계에서 total EB chart에 바로 더하기보다 scenario library와 content anchor로 보관한다.
- 특히 networking/HPC/automotive는 HBM 또는 high-capacity DRAM을 쓰는 비-AI-server bucket으로 별도 추적 가치가 있다.

## Source notes read in this pass

| Raw file | What it adds to the wiki model | Numeric anchors observed |
| --- | --- | --- |
| `raw/articles/domain-arvr-xr-headset-memory-content.md` | **Apple Vision Pro (M2, 2024)**: 16GB unified memory, R1 코프로세서(256GB/s 대역폭, 12ms photon-to-photon), 스토리지 256GB/512GB/1TB.; **Apple Vision Pro (M5, 2025-10)**: M5 3nm, 동일 **16GB RAM**, 스토리지 256GB/512GB/1TB, 120Hz, NPU AI 최대 50% 향상. | 16GB, 256GB, 512GB, 1T, 3nm |
| `raw/articles/domain-automotive-l4-300gb-ram-micron.md` | L4 자율주행 차량 1대당 **300GB 이상 RAM** 필요 전망 (CEO Sanjay Mehrotra).; 현재 일반 차량 RAM은 약 16GB 수준 → L4는 약 18배 이상 증가. | 300GB, 16GB, $23.86B, $8.03B, 200%, 2029년 |
| `raw/articles/domain-autonomous-vehicle-data-generation-storage.md` | 자율주행 테스트카 1대 **하루 11~152TB**(센서 시간당 1.4~19TB). 최신은 하루 수백 TB 추정.; Continental ADAS팀: 전세계 차량 수집 **150TB+** 이미지·센서 데이터 중앙 저장. | 152T, 19T, 150T |
| `raw/articles/domain-crypto-gpu-mining-legacy-gddr.md` | 2026년 마이닝 GPU 표준 메모리: **GDDR6 / GDDR6X**.; RTX 4090: **24GB GDDR6X** — 고급 해시레이트. | 2026년, 24GB, 8GB, 448 GB, 6GB |
| `raw/articles/domain-gaming-handheld-lpddr-content.md` | **ASUS ROG Ally**: LPDDR5-6400. **ROG Ally X**: 최대 **24GB LPDDR5X**.; **ASUS ROG Xbox Ally X**: **24GB LPDDR5X**. | 24GB, 32GB, 2024년, 50% |
| `raw/articles/domain-hpc-supercomputer-hbm-memory-capacity.md` | **El Capitan (LLNL, 2024-11 세계 1위)**: HBM3 총 **5.4 PB**. MI300A 가속기당 128GB HBM3.; **Frontier (ORNL)**: 총 메모리 9.2PB(절반 HBM/절반 DDR4) → HBM 약 **4.6 PB**. | 5.4 PB, 128GB, 9.2PB, 4.6 PB, 8.16 PB, 12.2PB |
| `raw/articles/domain-humanoid-robotics-memory-content.md` | **NVIDIA Jetson Thor (Blackwell, TSMC 4nm)**: Jetson Orin 대비 AI 컴퓨트 7.5배, CPU 3.1배, **메모리 2배**. 130W 전력 envelope. 2070 FP4 TFLOPS GPU.; **Tesla Optimus HW5급 보드**: CPU+GPU+NPU에 수백억 트랜지스터. HW5 칩 TSMC N3P/Samsung 2nm, 2026년 양산 전망. | 4nm, 128GB, 64GB, 2nm, 2026년, 2030년 |
| `raw/articles/domain-industrial-automation-edge-ai-memory.md` | **IoT MCU 시장 2030년 $7.32B, CAGR 6.3%** — 산업·엣지 AI 견인 (IoT Analytics).; 글로벌 로보틱스 시장 2024 $45B → 2030 $110.7B, 2.5배, CAGR 13.8% (ABI Research). | 2030년, $7.32B, 6.3%, $45B, $110.7B, 13.8% |
| `raw/articles/domain-iot-smart-home-edge-ai-memory-2026.md` | IoT 수요 안정적이나 폭발적 아님 — 엣지 OEM이 부품가 변동성에 신규 출시 지연.; DRAM fab이 HBM/고성능 server 우선 → 레거시 DRAM·entry NAND(노트북/SSD/IoT) output 감소(공급 제약). | - |
| `raw/articles/domain-medical-device-ai-imaging-memory.md` | 반도체 메모리 시장에서 **헬스케어 세그먼트 CAGR 약 14.96%** — 전 분야 중 최고 (Fortune Business Insights).; AI in diagnostics 시장 2026 $10.12B → 2034 $209.63B, CAGR 46.06%. | 14.96%, $10.12B, $209.63B, 46.06%, $1.36B, $19.78B |
| `raw/articles/domain-networking-switch-hbm-broadcom-tomahawk.md` | **Broadcom Tomahawk 6**: 단일 칩 **102.4 Tbps** 스위칭 — 업계 최초, 기존 최고 대비 2배.; **Tomahawk Ultra**: 랙당 Intel Gaudi 3 가속기 최대 64개 all-to-all 연결, 총 **HBM 대역폭 76.8 TB/s**; SUE 적용 시 XPU 간 <400ns 지연. | 102.4 T, 76.8 T, 51.2 T |
| `raw/articles/domain-networking-switch-router-ddr-memory-2026.md` | AI 데이터센터용 **400G/800G 스위치** 등장 → 전통 DRAM 한계, DDR5 모듈 업그레이드 필수.; **라우터 메모리 비용 ~7배 상승**(DRAM 급등 전이). | 171%, 70% |
| `raw/articles/domain-smart-glasses-ar-wearable-memory-2026.md` | **Ray-Ban Meta Display**: Qualcomm Snapdragon AR1 Gen1, **32GB 저장, 2GB RAM**. LLAMA 4 통합.; Gen2 $299, Display(EMG 손목밴드) $799. Gen3 2026(지연 시 2027), screenless, 배터리 6~8h. | 32GB, 2GB |
| `raw/articles/domain-sovereign-ai-national-datacenter-memory-2026.md` | **Stargate UAE(G42·Oracle·NVIDIA·Cisco·SoftBank)**: Abu Dhabi 1GW 클러스터, 1단계 200MW 2026 가동. OpenAI "for Countries" 1호.; **Saudi HUMAIN**: Riyadh Hexagon 480MW Tier IV. **2030년 1.9GW**, 이후 4년 내 6.6GW 확장 계획. | 1GW, 200MW, 480MW, 2030년, 1.9GW, 4년 |
| `raw/articles/domain-space-aerospace-radhard-memory.md` | 글로벌 **rad-hard 메모리 시장 2024년 $1.27B → 2033년 $2.68B, CAGR 8.5%** (Dataintelo).; rad-hard 전자부품 시장 2025년 약 $2.0B → 2032년 $3.5~3.8B, CAGR 6~8% (Electronicsmedia / MarketsandMarkets는 2030년 $2.30B 인용). | 2024년, $1.27B, 2033년, $2.68B, 8.5%, 2025년 |
| `raw/articles/domain-surveillance-cctv-nand-demand.md` | **AI in video surveillance 시장 2026년 $4.04B → 2032년 $10.88B, CAGR 17.9%**.; CCTV 카메라 시장 2025년 $13.2B → 2026년 $14.1B → 2036년 $28.3B, CAGR 7.2% (Fact.MR). | 2026년, $4.04B, 2032년, $10.88B, 17.9%, 2025년 |
| `raw/articles/domain-telecom-5g-6g-edge-memory-demand.md` | IT & Telecom 메모리 세그먼트 2034년까지 CAGR 약 **20.6%** 전망.; 5G 기지국 사이트에 DDR5 탑재 MEC 서버 확산 — Nokia, Ericsson, Huawei 모두 최신 엣지 컴퓨팅 플랫폼에 DDR5 적용. | 2034년, 20.6%, 60%, 12.8%, 2035년, 2030년 |
| `raw/articles/edge-ai-iot-memory-demand-2026.md` | 1Q26 표준 DRAM contract 가격 **+55~60% QoQ** 전망 (서버·HBM으로 capacity 재배분).; **LPDDR4X·LPDDR5X 공급 부족** 지속. Raspberry Pi가 LPDDR4 원가 급등 이유로 2025년 12월 가격 인상. | 60%, 2025년, 2026년, 150 GB, 20% |
| `raw/articles/gddr-gaming-console-memory-2026.md` | **PS5**: 공식 16GB GDDR6, 대역폭 448 GB/s.; **PS6 (루머)**: 30GB GDDR7, 대역폭 640 GB/s (PS5 대비 +42%). 메모리 가격 급등으로 출시 2028년 이후로 연기 가능성. | 16GB, 448 GB, 30GB, 640 GB, 42%, 2028년 |
| `raw/articles/micron-automotive-memory-per-vehicle.md` | 차량 1대당 평균 메모리(RAM+NAND):; 코드 복잡도: 고급차 현재 1억 라인 → 자율주행차 2.5~3억 라인 → 향후 10억 라인 전망. | 2022년, 90GB, 2026년, 278GB, 2T, 2030년 |
| `raw/articles/oem-automotive-memory-per-vehicle-bosch-continental-2025.md` | 차량당 메모리(2021 기준): DRAM 약 5.3GB + NAND 약 50GB; 하이브리드(HEV) 듀얼 파워트레인 관리: DRAM 4-6GB (Bosch/Continental 공급망) | 5.3GB, 50GB, 6GB, 4GB, 128GB, 31.74% |
| `raw/datasets/memory-demand-domain-taxonomy.md` | demand domain; domain group | - |
| `raw/datasets/steam-pc-gaming-ram-share-2026.md` | `period`, `ram_tier`(16gb/32gb), `share_pct`, `note`, `confidence`; 2026-03: 16GB 40.97%(32GB 첫 추월), **32GB -20.31% 붕괴**(36.62%). 2026-04: 16GB 40.86%, 32GB 37.55%. | 32GB, 16GB, 40.97% |
| `raw/papers/hbm-bit-cost-domain-specific-ecc-ai-inference-2025.md` | HBM은 on-chip ECC, TSV 적층, 낮은 수율로 인해 일반 DRAM 대비 bit당 원가가 매우 높음(통상 5~10배).; on-chip ECC를 제거하고 결함 처리를 메모리 컨트롤러로 위임하여 bit 원가를 낮추는 것이 목표. | 78%, 97% |
| `raw/reports/military-aerospace-memory-demand-2026.md` | 군용·항공 메모리·프로세서 시장: 2025 $7.13B → 2026 $7.97B(CAGR 11.8%). 전체 메모리·스토리지 솔루션 $18.2B(2026).; 방산 시스템 수명 20년+ → **부품 장기 가용성·레거시 호환** 필수. Infineon longevity 프로그램 최소 10년 지원. | $7.13B, $7.97B, 11.8%, $18.2B, 20년, 10년 |
| `raw/reports/region-europe-automotive-memory-demand-2026.md` | 2026 커넥티드카 평균 **278GB 메모리**(코드 최대 1억 줄).; 자동차 메모리 IC 수요 2031까지 **연 ~20%** 성장. | 278GB, 1억, 20%, 70%, $148.65B |
| `raw/reports/region-europe-chips-act-automotive-demand.md` | EU Chips Act 2.0 발표: ~2026년 6월 3일. 신규 투자 목표 €120B (2035년까지); WSTS Europe 빌링 2026: +58.4% ($54.7B → $86.6B) | 2026년, 120B, 2035년, 58.4%, $54.7B, $86.6B |

## Integration rule

이 페이지의 source note는 model input 후보이다. EB 산식이나 simulator preset으로 승격하려면 최소한 `unit/shipments`, `content per unit`, `mix/adoption`, `supply or realization constraint` 중 어느 축에 해당하는지 명시하고, 가능하면 2개 이상 raw cluster로 교차 확인한다.
