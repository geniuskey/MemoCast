---
source_url: https://www.digitimes.com/news/a20250714PD212/kioxia-ymtc-nand-cmos-wafer.html
title: "NAND Wafer Bonding — CBA / Xtacking vs CMOS-Under-Array (CuA)"
publisher: DIGITIMES / GOODRAM Industrial / The Memory Guy (compiled)
published: 2025-07-14
ingested: 2026-06-06
type: lecture
tags: [nand, memory, capacity, bit-demand, wafer]
confidence: medium
---

# NAND Wafer Bonding: CBA / Xtacking / CuA — extracted notes

> 학습/설명 자료 요약 노트. NAND에서 셀-CMOS 배치 방식이 die 효율과 cost에 미치는 영향.

## 핵심 개념
- 3 가지 peri 배치 패러다임:
  - CuA(CMOS-Under-Array) / CoP: 동일 wafer에 셀 array를 peri CMOS 위에 형성. cost 낮으나 셀 anneal 고열이 peri transistor 성능 열화.
  - CBA(CMOS directly Bonded to Array, Kioxia/WD) & Xtacking(YMTC): 셀 wafer와 CMOS wafer를 별도 제작 후 wafer-to-wafer bonding. peri 품질·IO 속도↑, 단 2-wafer 처리+bonding으로 cost↑.
  - SK Hynix 4D PUC(Peri-Under-Cell): peri를 셀 아래 배치(단일 wafer 계열).
- bonding 계열은 셀과 peri를 독립 최적화 → 셀 영역 면적 효율 극대화.

## 주요 사실/수치
- YMTC Xtacking: NAND array가 peri 위에 뒤집혀 접합. die size ~25% 축소 주장, 면적 효율 >90%(conventional 3D NAND <65% 대비).
- Kioxia/WD CBA = Xtacking과 동일 개념(셀·CMOS 별도 wafer 후 bonding). BiCS 8세대 218L, 후속 284L 계획.
- 2025: Kioxia·YMTC가 wafer-bonded NAND를 양산("volume production")에 선제 도입.
- Samsung은 V9(~280L급)에 hybrid bonding(COP) 적용 계획, 400L+에서 wafer bonding 본격화.

## 메모리 수요 예측 관련성 (bit supply 함의)
- bonding으로 die 면적 효율↑ = 동일 wafer에서 bit↑ → supply 레버이자 cost-per-bit 방어책.
- 그러나 2-wafer + bonding 공정 추가 = wafer당 cost·공정 시간↑ → cost-per-bit 하락 속도 둔화 요인.
- 400L+ 시대엔 bonding이 사실상 필수 → 장비(bonding aligner) capex·throughput이 공급 ramp 제약.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]]

## 추가 출처
- https://goodram-industrial.com/en/news/scaling-up-3d-nand-flash-architecture/
- https://thememoryguy.com/did-samsung-just-endorse-ymtcs-xtacking/
- https://www.eetimes.com/high-density-3d-flash-memory-using-high-precision-wafer-bonding-brings-new-value-to-storage/
