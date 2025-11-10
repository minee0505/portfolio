---
title: "Dialogym (다이얼로짐)"
description: "AI 기반 실시간 음성 대화 훈련 플랫폼"
date: "2025-10-03"
tags: ["Spring Boot", "React", "WebSocket", "GPT-4o Realtime API", "AWS", "Docker"]
thumbnail: "/images/dialogym-thumbnail.png"
github: "https://github.com/AI-d"
demo: "https://dialogym.shop"
featured: true
---

# Dialogym 프로젝트

## 프로젝트 개요
GPT-4o Realtime API를 활용하여 사용자가 AI와 실시간 음성 대화를 연습하고, 대화 스킬에 대한 피드백을 받을 수 있는 대화 훈련 플랫폼입니다. 면접, 상사 보고, 관계 대화 등 다양한 시나리오에서 예의, 명확성, 말하기 속도, 필러워드 사용 등을 분석하여 점수화된 피드백을 제공합니다.

## 주요 기능
- **실시간 음성 대화**: WebSocket 기반 실시간 AI 음성 대화
- **다양한 연습 시나리오**: 면접, 상사 보고, 관계 대화 등
- **AI 피드백 시스템**: 예의, 명확성, 말하기 속도, 필러워드 사용 분석
- **대화 기록 관리**: STT 변환 텍스트 데이터베이스 저장
- **사용자 인증**: JWT 기반 회원 관리 시스템

## 팀 역할
- **김경민**: Backend 개발, DevOps, Scrum Master
    - WebSocket 세션 관리 및 실시간 통신 구현
    - STT 데이터베이스 저장 로직 개발
    - AWS 인프라 구축 및 CI/CD 파이프라인 구성
    - Sprint 2, 4 Scrum Master
- **왕택준**: 인증 시스템 및 피드백 시스템 개발
- **진도희**: 실시간 AI 대화 및 WebRTC 통합

## 기술 스택

### Backend
- Java 17, Spring Boot 3.3.4
- Spring Security + JWT
- WebSocket (STOMP)
- MariaDB (AWS RDS)
- H2 (테스트 환경)

### Frontend
- React 18.3.1
- Vite
- Axios
- Zustand (상태 관리)
- React Router DOM
- Module SCSS

### Infrastructure & DevOps
- AWS (EC2, RDS, S3, CloudFront)
- Docker & Docker Compose
- Nginx (리버스 프록시)
- Let's Encrypt (SSL/TLS)
- GitHub Actions (CI/CD)
- Gabia (도메인 등록)

### AI & 실시간 통신
- GPT-4o Realtime API
- WebSocket
- STT (Speech-to-Text)

## 시스템 아키텍처
- **Frontend**: React SPA → CloudFront CDN → S3 정적 호스팅
- **Backend**: Spring Boot → Nginx 리버스 프록시 → Docker Container (EC2)
- **Database**: MariaDB (AWS RDS)
- **실시간 통신**: WebSocket (STOMP) + GPT-4o Realtime API

## 주요 트러블슈팅

### 1. 프론트엔드-백엔드 API 연결 문제
**문제 상황**: 프로덕션 환경에서 프론트엔드가 백엔드 API 호출 실패
- CORS 설정 불일치
- 환경 변수 미전달 (Vite 빌드 시)
- HTTPS/HTTP 혼용 문제

**해결 방법**:
- Spring Security CORS 설정 개선 및 허용 오리진 명시
- Vite 환경 변수를 `VITE_` 접두사로 통일하고 빌드 타임에 주입
- CloudFront + S3에서 HTTPS로 통일, API Gateway를 통한 프록시 패턴 적용

### 2. Docker 컨테이너 환경 변수 리로딩 문제
**문제 상황**: `.env` 파일 수정 후 Docker 컨테이너 재시작만으로는 환경 변수가 반영되지 않음

**해결 방법**:
- 환경 변수 변경 시 컨테이너 재생성 필요함을 확인
- `docker-compose down && docker-compose up -d` 로 컨테이너 완전 재생성
- 환경 변수 변경 시 자동화된 재배포 프로세스 구축

### 3. 프론트엔드 API 키 노출 문제
**문제 상황**: Vite 빌드 시 `VITE_` 접두사 환경 변수가 번들에 직접 포함되어 클라이언트에 노출

**해결 방법**:
- 민감한 API 키를 백엔드로 이전
- 프론트엔드는 백엔드 프록시를 통해 외부 API 호출
- 클라이언트에서는 공개 가능한 환경 변수만 사용 (예: API 엔드포인트 URL)

### 4. CI/CD 자동화 구축
**문제 상황**: 수동 배포 (WinSCP JAR 파일 전송) 방식의 비효율성

**해결 방법**:
- GitHub Actions를 활용한 자동 배포 파이프라인 구축
- **Frontend**: S3 업로드 + CloudFront 캐시 무효화 자동화
- **Backend**: Docker 이미지 빌드 → ECR/DockerHub 푸시 → EC2 자동 배포
- 배포 실패 시 롤백 전략 수립

### 5. HTTPS 및 도메인 설정
**문제 상황**: HTTP로만 서비스 제공, 보안 및 신뢰성 문제

**해결 방법**:
- Gabia에서 도메인(`dialogym.shop`) 등록
- Let's Encrypt를 통한 무료 SSL 인증서 발급
- Nginx에서 SSL/TLS 설정 및 HTTP → HTTPS 리다이렉트
- CloudFront에서 커스텀 도메인 + ACM 인증서 설정

### 6. WebSocket 세션 관리 최적화
**문제 상황**: 다수 사용자 동시 접속 시 세션 관리 복잡성

**해결 방법**:
- Single Responsibility Principle 적용한 세션 관리자 설계
- 세션 타임아웃 및 정리 로직 구현
- 메모리 효율을 위한 세션 풀링 전략 검토

## 프로젝트 관리
- **일정**: 백엔드 완료(10/22), 프론트엔드 완료(10/29), 최종 발표(11/3)
- **협업 도구**: Jira (백로그 관리), GitHub (버전 관리), Canva (프레젠테이션)
- **커밋 컨벤션**: `TRAIN-XXX: 커밋 메시지` 형식
- **Sprint 기반 개발**: 2주 단위 스프린트, 일일 스탠드업 미팅

## 배운 점
1. **풀스택 배포의 복잡성**: 프론트엔드와 백엔드의 환경 변수 관리, CORS 설정, HTTPS 통합 등 프로덕션 배포의 실전 경험
2. **보안 설계**: 클라이언트 사이드 API 키 노출 문제를 통해 보안 아키텍처의 중요성 학습
3. **인프라 자동화**: CI/CD 파이프라인 구축으로 배포 효율성 극대화
4. **실시간 통신**: WebSocket 기반 실시간 음성 처리의 복잡성과 성능 최적화 기법
5. **체계적 문제 해결**: 근본 원인 파악을 우선하는 디버깅 프로세스의 중요성
6. **팀 협업**: 명확한 역할 분담과 인터페이스 기반 개발로 병렬 작업 효율성 향상
7. **문서화의 가치**: 배포 가이드, 기술 명세서, 사용자 플로우 등 체계적 문서화가 유지보수와 인수인계에 필수적임을 경험

## 주요 성과
- GPT-4o Realtime API를 활용한 실시간 음성 대화 시스템 구현
- AWS 기반 확장 가능한 인프라 구축 (EC2, RDS, S3, CloudFront)
- CI/CD 자동화로 배포 시간 90% 단축
- HTTPS 적용 및 프로덕션 레벨 보안 구현
- 팀 협업을 통한 3주 내 MVP 완성 및 배포