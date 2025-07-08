# 🤖 AI 아바타 대화 시뮬레이터

AI 기반 아바타와 자연스러운 음성/텍스트 인터랙션을 구현한 대화형 시뮬레이터입니다.  
실시간 음성 합성(TTS), 감정 분석, 립싱크, 표정 연기까지 구현하였습니다.

## 🧩 프로젝트 구조
📁 ai-avatar-emotion-simulator
┣ 📁 frontend # React 기반 3D 아바타 인터페이스
┣ 📁 ai-emotion-api # FastAPI 기반 감정 분석 서버
┣ 📁 ai-avatar-backend # Spring Boot 기반 백엔드 API 서버
┗ 📄 README.md

## ⚙️ 사용 기술

| 분류 | 기술 |
|------|------|
| 프론트엔드 | React, Three.js, @pixiv/three-vrm |
| 백엔드 | Spring Boot (Java 17), MySQL, REST API |
| AI API | FastAPI (Python), Emotion Analysis, TTS (VITS) |
| 인프라 | Docker, Vite, GitHub |

## 🧠 주요 기능

- 🎙️ **실시간 음성 입력 → 텍스트 변환**
- 💬 **Groq 기반 AI 캐릭터 응답 (텍스트 & 음성)**
- 😊 **감정 분석 결과에 따른 아바타 표정 변화**
- 👄 **TTS 음성과 립싱크 동기화 (구현 중)**
- 🧑‍🎤 **VRM 아바타로 자연스러운 대화 연출**

## 🚀 실행 방법

### MySQL(Docker 사용)
docker start ai-emotion-db

### 백엔드(Spring Boot)
IntelliJ에서 `ai-avatar-backend` 프로젝트를 열기
`AiAvatarBackendApplication.java` 파일을 찾아 실행

### 감정 분석 API (FastAPI)
cd ai-emotion-api
uvicorn app.main:app --reload

### 프론트엔드 (React)
cd frontend
npm run dev -- --host http://localhost:5173/
