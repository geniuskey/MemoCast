---
source_url: https://computeexpresslink.org/blog/explaining-cxl-memory-pooling-and-sharing-1049/
title: "CXL Memory Pooling & Sharing Explained"
publisher: CXL Consortium / Rambus / Synopsys
published: 2024
ingested: 2026-06-06
type: lecture
tags: [dram, memory, bit-demand, capacity, methodology]
confidence: medium
---

# CXL Memory Pooling Explained — extracted notes

> 학습/설명 자료 요약 노트. CXL 메모리 확장·풀링이 DRAM 수요에 주는 의미.

## 핵심 개념
- CXL(Compute Express Link) = 프로세서-디바이스 간 개방형 인터커넥트. PCIe 물리계층 위에서 coherency + memory semantics 제공, PCIe보다 낮은 latency.
- CXL.mem: 전통 메모리 컨트롤러/DRAM 인터페이스를 거치지 않고 여러 메모리 모듈을 서버에 연결, 공유 메모리 풀 접근.
- Memory expansion(Type-3 device): 서버 DRAM 용량/대역폭 확장.
- Memory pooling: CXL 2.0 switch로 한 host가 풀의 여러 device 접근. rack 단위 풀링, RDMA 대비 낮은 latency의 load-store 접근.
- Memory sharing: 프로세서 간 빈번한 data 공유에 적합(단순 프로그래밍 모델, 저latency).

## 주요 사실/수치
- latency는 remote socket memory access 수준 목표(neighboring CPU socket과 유사).
- CXL 2.0이 switching 지원으로 pooling 도입, 이후 버전에서 sharing/fabric 확장.
- in-memory database 등 대용량 메모리 수요 워크로드가 주 수혜.

## 메모리 수요 예측 관련성
- CXL은 stranded memory(미사용 DRAM) 활용도를 높여 효율 개선 → 일부는 DRAM 수요 절감 요인.
- 동시에 서버당 메모리 용량 확장(expansion)을 가능케 해 DRAM bit demand 상방 요인도 됨 → 순효과는 워크로드·채택률에 의존.
- AI/HPC 데이터센터 메모리 아키텍처 변화 변수로 장기 수요 모델에 반영 필요.

## 관련 wiki
- [[memory-demand]] · [[bit-demand]] · [[dram]] · [[nand]] · [[hbm]]

## 추가 출처
- https://www.rambus.com/blogs/compute-express-link/
- https://www.synopsys.com/blogs/chip-design/cxl-protocol-memory-pooling.html
- https://arxiv.org/pdf/2306.11227
