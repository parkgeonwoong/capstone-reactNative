/**
 * @desc : App 처음 시작 파일
 * Root.js로 이동
 *
 * @FIXME:
 * 23.04.28 리팩토링 시작 및 버그삭제
 * 0. Expo-SDK 버전 업데이트 45 → 46 (Expo go 46버전부터 작동)
 * 1. React, React-Native 버전 업데이트 (npx react-native upgrade) or (npx expo install react-native@0.69.9)
 *  (https://stackoverflow.com/questions/72630357/how-to-upgrade-expo-sdk-to-specific-version)
 * 2. 안쓰는 코드 제거 필요
 * 3. ThemeProvider로 리팩토링
 *
 * @NOTE:
 * 1. splashScreen을 App.js에서 띄울려고 했으나 실패 → expo 지원 app.json에서 가능하게 설정
 *
 * NavigationContainer: 앱 상태를 관리하고 최상위 내비게이터를 앱 환경에 연결하는 역할
 */

import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { LogContextProvider } from "./contexts/LogContext";
import Root from "./navigation/Root";

import { ThemeProvider } from "styled-components/native";
import { theme } from "./styles/theme";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // 폰트 로드
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          BMHANNAPro: require("./assets/fonts/BMHANNAPro.ttf"),
          BMHANNAAir: require("./assets/fonts/BMHANNAAir_ttf.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <LogContextProvider>
          <Root />
        </LogContextProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
