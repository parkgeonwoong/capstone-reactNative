# CapStone 프로젝트

### 작업 환경

|    name    |                       value                        |
| :--------: | :------------------------------------------------: |
|     OS     |                      Window11                      |
|  RunTime   |                 Node.js(v16.13.2)                  |
|   Build    |                   Android Studio                   |
| AMD Device |                   Pixel 2 API 32                   |
|    IDE     |                 Visual Studio Code                 |
|  PlatForm  | Create-React-Native-App (CRNA = Expo&React Native) |
| FrameWork  |                    React Native                    |
|  License   |                    MIT License                     |

<br>

### Usage

```bash
npm install --force

// 1. Android
npm run start

// 2. expo
expo start

// 2.1 expo cli 설치되어 있지 않다면
(sudo) expo install --global expo-cli

// 2.2 Mac watchman 필수
brew install watchman

expo login

expo start
```

- `--force` 한 이유는 tensorflow 라이브러리 연계 에러로 인해 강제 설치
- expo 공식문서 https://docs.expo.dev/get-started/installation/

<br>

### Git Commit message

| emoji | commit message |    when to use it    |
| :---: | :------------: | :------------------: |
|  ✨   |      Feat      |   새로운 기능 추가   |
|  🐛   |      Fix       | 버그 수정, 에러 수정 |
|  💄   |     Style      |   UI, 스타일 수정    |
|  📝   |      Docs      |      문서 수정       |
|  ♻️   |    Refactor    |    코드 리팩터링     |
|  ✅   |     Check      |  체크포인트, 테스트  |

<br>

### Deliverables

- StoryBoard
- Information architecture

<br>

### 변동 사항

|    Before    |        after        |
| :----------: | :-----------------: |
| Social Login | Login DB connection |
