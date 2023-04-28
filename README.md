# CapStone 프로젝트

### 작업 환경

|     name     |                       value                        |
| :----------: | :------------------------------------------------: |
|      OS      |                      Window11                      |
|   RunTime    |                 Node.js(v16.13.2)                  |
|    Build     |                   Android Studio                   |
|  AMD Device  |                   Pixel 2 API 32                   |
|     IDE      |                 Visual Studio Code                 |
|   PlatForm   | Create-React-Native-App (CRNA = Expo&React Native) |
|  FrameWork   |                    React Native                    |
|   Expo SDK   |                  45.0.0 → 46.0.0                   |
|    React     |                  17.0.2 → 18.0.0                   |
| React-Native |                  0.68.2 → 0.69.6                   |

<br>

### 사용법

```bash
npm install --force

// 1. Android
npm run start

// 2. expo
npx expo start

// 2.1 expo cli 설치되어 있지 않다면
(sudo) npm install --global expo-cli

// 2.2 Mac watchman 필수
brew install watchman

expo login

expo start
```

- `--force` 한 이유는 tensorflow 라이브러리 연계 에러로 인해 강제 설치
- expo 공식문서 https://docs.expo.dev/get-started/installation/

<br>

### Git Commit 메세지

| emoji | commit message |    when to use it    |
| :---: | :------------: | :------------------: |
|  ✨   |      Feat      |   새로운 기능 추가   |
|  🐛   |      Fix       | 버그 수정, 에러 수정 |
|  💄   |     Style      |   UI, 스타일 수정    |
|  📝   |      Docs      |      문서 수정       |
|  ♻️   |    Refactor    |    코드 리팩터링     |
|  ✅   |     Check      |  체크포인트, 테스트  |

<br>

### 산출물

- StoryBoard
- Information architecture

<br>

### 변동사항

|    Before    |        after        |
| :----------: | :-----------------: |
| Social Login | Login DB connection |

<br>

## 수정사항

[22. 11. 20]

1. 로그인 후 첫 카테고리 에러 수정

<br>

[ 23.04.28 ]

1. Expo-SDK 버전 업데이트 45 → 46 (Expo go 46버전부터 작동)

2. React, React-Native 버전 업데이트
   (npx react-native upgrade) or (npx expo install react-native@0.69.9)
   (https://stackoverflow.com/questions/72630357/how-to-upgrade-expo-sdk-to-specific-version)

3. 에러: watchman warning: Recrawled this watch
   (https://facebook.github.io/watchman/docs/troubleshooting.html#recrawl)

|     이름     |    변경 사항    |
| :----------: | :-------------: |
|   Expo SDK   | 45.0.0 → 46.0.0 |
|    React     | 17.0.2 → 18.0.0 |
| React-Native | 0.68.2 → 0.69.6 |

<br>
