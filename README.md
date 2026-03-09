# K-Defense Global Expansion Strategy Platform

데이터 기반 분석을 통해 한국 방산 기업의 글로벌 진출 전략을 도출하는 프로젝트입니다.

## Project Overview

최근 글로벌 국방비 지출 증가와 국제 안보 환경 변화로 인해 방산 시장의 수요가 확대되고 있습니다.
본 프로젝트는 데이터를 수집/분석해 권역별 수요를 파악하고, 한국 방산 기업의 지역별 진출 전략을 제안합니다.

- 글로벌 방산 시장 데이터 수집
- 권역별 시장 세분화
- 방산 수요 분석
- 한국 방산 기업과 글로벌 시장 매칭
- 전략 도출 및 웹 기반 시각화

## Project Workflow

`DATA -> SELECTION -> ANALYSIS -> STRATEGY -> WEB`

### 1) Data
- DART API
- News API
- RSS
- 방산 전시회/시장 데이터

### 2) Selection
시장 그룹화

- Group 1: 기술 선진국
- Group 2: 신흥 방산 수요 시장
- Group 3: 신규 시장

### 3) Analysis
- 동유럽: K9 / K2
- 중동: Drone / Missile
- 남미: Jet / Aircraft

### 4) Strategy

| Region | Target Company |
| --- | --- |
| USA / UK / Germany | Hanwha Aerospace |
| Eastern Europe | Hyundai Rotem |
| Middle East | LIG Nex1 |
| South America | Korea Aerospace Industries |

### 5) Web
분석 결과를 웹 서비스로 제공

## Repository Structure

- `frontend`: React 기반 프론트엔드
- `backend`: Python 기반 백엔드 API/서비스
- `assets`: 시각화 결과 및 프로젝트 에셋
- `docs/reference`: 프로젝트 참고 문서

## Reference

- `docs/reference/k_방산 글로벌화 전략 (박사님과 싱싱미역줄기들).pdf`

## Target Companies

- Hanwha Aerospace
- Hyundai Rotem
- LIG Nex1
- Korea Aerospace Industries
- Hanwha Systems
- Poongsan

## Tech Stack

- Python
- Web Crawling
- DART API
- News API
- RSS
- Data Analysis
- Visualization
- React

## Team

ACON Project

- 김다은
- 김태훈
- 양예진
- 조성진
- 조현형
