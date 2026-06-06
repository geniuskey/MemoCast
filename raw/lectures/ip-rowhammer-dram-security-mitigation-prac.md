---
source_url: https://www.tomshardware.com/tech-industry/cyber-security/modern-memory-is-still-vulnerable-to-rowhammer-vulnerabilities-phoenix-root-privilege-escalation-attack-proves-that-rowhammer-still-smashes-ddr5-security-to-bits
title: "Rowhammer DRAM 보안·PRAC 완화 (DDR5/LPDDR6)"
publisher: Tom's Hardware / TechPowerUp / ETH Zurich+Google / arXiv
published: 2026
ingested: 2026-06-06
type: lecture
tags: [dram, memory, capacity, demand-forecasting, bit-demand]
confidence: medium
---

# Rowhammer DRAM 보안·PRAC 완화 — extracted notes

> 보안 완화(refresh↑, PRAC)가 성능·capacity 오버헤드를 부과 → 미세화의 신뢰성/수요 비용.

## 핵심 사실/수치

- **Phoenix(CVE-2025-6202)**: ETH Zurich+Google, SK hynix DDR5(on-die ECC 포함)도 취약. **109초** 만에 root 권한 탈취.
- 완화: tREFI(refresh 주기) 3배(약 1.3μs)로 줄이면 공격 어려우나 **SPEC CPU2017 성능 -8.4%**.
- DDR5 **PRAC(per-row activation counting)** 도입, **LPDDR6는 PRAC 기본 통합**.
- IEEE S&P 2026에서 공개 예정.

## 메모리 수요 예측 관련성

- refresh rate 증가·PRAC 카운터는 메모리 대역폭/성능 오버헤드 → 동일 작업에 더 많은 메모리/대역폭 필요 가능.
- DRAM 미세화(1c/1d)가 Rowhammer 악화 → on-die ECC/PRAC 등 RAS 비트 오버헤드 증가(유효 수요 미세 상방).
- 보안 요구가 차세대 표준(LPDDR6 PRAC) 채택을 견인 → 세대전환 가속 요인.

## 관련 wiki

- [[dram]] · [[memory-demand]] · [[bit-demand]] · [[demand-forecasting]]

## 추가 출처

- TechPowerUp Phoenix/on-die ECC: https://www.techpowerup.com/341059/sk-hynix-ddr5-dimms-vulnerable-to-phoenix-rowhammer-attack-on-die-ecc-exposed-too
- Google Rowhammer 연구지원: https://blog.google/security/supporting-rowhammer-research-to/
- PVAC mitigation (arXiv): https://arxiv.org/abs/2604.20576
