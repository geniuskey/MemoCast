# Raw Source Index

메모리(DRAM/NAND/HBM) 수요 예측을 위한 원천 자료 인덱스. 전부 웹 검색으로 수집했고 각 파일 frontmatter에 `source_url`을 둔다. 수치는 wiki에서 교차검증 후 인용한다. (ingested: 2026-06-06)

**현황: 347개 원천 파일** — papers 35 · articles 94 · reports 88 · earnings 13 · datasets 25쌍(50) · lectures 67.

---

## papers/ — 학술/방법론 (27)

수요예측 방법론. 사이클(VECM/Markov/BMA/VAR+bootstrap), ML(LSTM·ARIMA-LSTM), diffusion(Bass/Norton-Bass), bullwhip(Lee 1997, 제어공학 2018), cost-per-bit·Moore's law(Flamm·Byrne), real options·stochastic capacity, DRAM 카르텔/학습곡선, human-vs-ML 예측 비교. 2차 추가: 가격탄력성·재고이론·AI compute scaling laws·기술대체 S-curve·oligopoly 게임이론·grey/Markov·HBM 패키징 공급망·HBM thermal/warpage/TSV yield(`hbm-thermal-`).

## articles/ — 수요 동인/시장 동향 (67)

- **AI 가속기/buildout** (`aisilicon-`, `nvidia-`, `trendforce-ai-`): GPU별 HBM, AI 서버 출하, 데이터센터 GW buildout
- **모델/소프트웨어 driver** (`model-`): DeepSeek MoE, 컨텍스트/KV cache, AI 메모리 슈퍼사이클, Epoch AI compute 성장 추세(상류 동인)
- **전력/냉각 제약** (`power-`, 13): GW 전망, 액침냉각, energy/bit, SOCAMM, 원전 PPA, perf/watt, power-vs-memory limited
- **디바이스 콘텐츠**: 스마트폰(`on-device-ai-`, `trendforce-smartphone-`), AI PC(`microsoft-`), 서버(`server-ddr5-`), 차량(`micron-automotive-`), 콘솔(`gddr-`), 엣지(`edge-ai-`), DDR4→5(`ddr4-ddr5-`)
- **OEM bottom-up** (`oem-`, 12): Apple/Samsung/중화권 스마트폰, Dell/HP/Lenovo PC, 서버 ODM, 모듈메이커, 자동차 Tier-1
- **niche 수요처** (`domain-`, 11): 휴머노이드, AR/VR, L4 자율주행, 5G/6G, 우주, CCTV, 네트워킹 HBM, 핸드헬드, 크립토, 산업, 의료
- **스토리지**(`storage-`, `trendforce-nearline-`), **아키텍처**(`cxl-`), **과거 사이클**(`history-`), **ESG**(`esg-`), **국내 매체**(`korea-legacy-`), **영향**(`idc-`)
- **유통/그레이마켓** (`channel-`, 6): 패닉바잉·리테일 DDR5 가격·할당/lead time·위조/리마킹·재고 보충 신호
- **산업 통합사** (`consol-`, 6): DRAM 가격담합, Qimonda/Elpida 파산, Intel NAND→SK(Solidigm), Toshiba→Kioxia, WD/SanDisk → 과점 형성
- **sovereign AI**(`domain-sovereign-ai-`), **제품/스펙 1차자료**: `micron-*`, `samsung-semiconductor-hbm`, `gsmarena-*`

## reports/ — 산업/시장 리포트 (57)

- **종합 전망**: TrendForce, Gartner, IDC, Omdia, WSTS, SIA, Yole, TechInsights, Counterpoint, 국내(`korea-media-`)
- **가격/수급**: `trendforce-2q26/ddr5/mobile/hbm-bit/qlc-`, `analyst-bank-`(IB 목표주가), `memory-inventory-`(선행지표)
- **점유율/실적**: `trendforce-4q25-dram/nand-`, `micron-fq2-`, `counterpoint-`
- **공급/Capacity**: `memory-makers-capex-`, `capex-samsung-`, `fab-samsung/skhynix-micron-`, `yole-cxl-`
- **첨단 패키징** (`pkg-`, 4): TSMC CoWoS capacity·병목·NVIDIA 할당(HBM 출하 게이팅)
- **중국/지정학** (`china-`, `cxmt-`, `ymtc-`): capacity, HBM3, 수출통제, Huawei Ascend HBM 수요/자급 병목(`china-huawei-ascend-`)
- **매크로** (`macro-`, 12): IT지출(Gartner $6.31T), AI지출($2.59T), 클라우드 capex, semi-vs-GDP 디커플링, FX(KRW/JPY), 금리/경기, AI capex 거품 리스크, 소비 수요
- **지역별** (`region-`, 12): US/China/Korea/Taiwan/Japan/Europe/India·SEA, WSTS·SIA 지역 billings
- **장비/WFE** (`equip-`, 10): SEMI WFE 전망, ASML/AMAT/Lam/KLA, 테스트(Advantest/Teradyne), hybrid bonding(BESI/ASMPT), 중국 장비 국산화 — 미래 bit supply 선행지표
- **소재 공급망** (`material-`, 6): 실리콘 wafer(신에쓰/SUMCO), photoresist, neon/특수가스, ABF 기판 — 공급 게이팅
- **상품화/금융화**(`memory-commodity-`): DRAM 선물/ETF/헤지

## earnings/ — 실적/IR (11)

메모리 3사(삼성·SK·Micron), NAND/대만/일본(Kioxia·Sandisk·Nanya·Winbond·Macronix, `kioxia-fy25-nand-outlook-ipo`), 수요측(NVIDIA·hyperscaler capex), 가격 교차정리(`trendforce-1q26-`).

## datasets/ — 정량 데이터 (CSV+md, 16쌍)

가격(`dram-price-history`, `nand-cost-per-bit-trend`), 매출/점유율(`dram-revenue-quarterly`, `nand-flash-revenue-share`, `memory-market-revenue-split`, `wsts-semiconductor-billings`), bit/capex(`bit-demand-supply-growth`, `memory-maker-capex`), HBM/AI(`hbm-market-size`, `gpu-hbm-capacity`, `hbm-bit-demand-growth-rate`, `ai-server-shipments-forecast`), 수요동인(`smartphone-shipments`, `pc-server-shipments`, `memory-content-per-device`), 사이클/시장(`dram-revenue-cycle-history`, `dram-nand-bit-demand-by-application`, `memory-makers-quarterly-financials-cycle`, `memory-market-tam-forecast-2025-2028`), 실시간 프록시(`korea-semiconductor-exports-monthly`).

## lectures/ — 개념/교육 (55)

- **디바이스 동작/표준**: `how-dram/nand/hbm-`, `jedec-ddr5/hbm4-`, `hbm-generations-`
- **차세대**: `emerging-`(HBM4/CXL/PIM/3D DRAM, **HBF 고대역폭 플래시**), `cxl-memory-pooling-`, `dram-scaling-4f2-`, UFS 5.0(`conf-jedec-ufs5-`)
- **컨퍼런스 로드맵** (`conf-`, 13): ISSCC 2026, Hot Chips, IEDM, VLSI, FMS, IMW, JEDEC(DDR6/LPDDR6/GDDR7/HBM4), 3사 HBM4/HBM4E 샘플
- **메모리 IP/컨트롤러** (`ip-`, 14): Rambus/Synopsys/Cadence PHY, HBM4 custom base die, CXL 컨트롤러, RCD/DB(MRDIMM), NAND 컨트롤러, on-die ECC
- **공정 전환** (`process-`, 11): DRAM 1a~1d 노드·EUV·6F2→4F2·3D DRAM, 3D NAND 300~1000층·wafer bonding, scaling wall(bit supply 가정)
- **경제/사이클/방법론**: `why-memory-is-cyclical-`, `semiconductor-learning-curve-`, `nand-cost-per-bit-`, `memory-pricing-`(contract/spot/LTA), `memory-demand-forecasting-methodology-`, `nomad-semi-`, `semianalysis-`(memory wall, HBM)

---

## 수집 메모

- 5개 웨이브(주제별 병렬 sub-agent) + 직접 보강(영문/국내/일본/대만 매체)으로 347개 원천 파일 확보.
- 세션 한도 도달 시 메인 세션에서 WebSearch+Write로 직접 진행(검증된 fallback). 에이전트는 한도 메시지 전 작업을 대부분 완료함.
- 다음 수집 후보(미확장): 일별/주별 spot price 시계열, 추가 학술 논문(전력-compute 결합 수요모델), 분기별 earnings 시계열 확장, 표준 세부(DDR6/HBM5 spec), 추가 국내/일본/대만 1차 매체, 메모리 재무모델(LTA prepayment 회계).
- 품질 주의: 일부 수치는 secondary aggregator 기반(`confidence: medium/low` 표기) → wiki 인용 전 1차 출처 교차검증 필요. billings는 소비지가 아닌 청구지 기준(region 파일 caveat 참조).
