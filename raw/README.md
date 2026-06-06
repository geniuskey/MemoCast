# Raw Sources

원천 자료를 저장하는 immutable layer입니다. 이 폴더의 자료는 가능하면 수정하지 않고, wiki 문서에서 출처로 참조합니다.

## 하위 폴더

- `papers/`: 학술 논문, arXiv, working paper
- `articles/`: 블로그, 기사, 기술 글
- `reports/`: 산업 리포트, 시장 전망 자료
- `earnings/`: 실적 발표, 컨퍼런스콜, IR 자료
- `datasets/`: CSV/JSON 등 정량 데이터
- `lectures/`: 강의노트, 세미나 자료
- `assets/`: 이미지, 도표, PDF에서 추출한 그림

## 원칙

- raw 자료는 원본성을 유지합니다.
- 해석, 요약, 반론, 연결은 `wiki/`에 작성합니다.
- 가능한 경우 raw 파일 상단에 `source_url`, `ingested`, `sha256` frontmatter를 둡니다.
