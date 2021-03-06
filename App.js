import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { useAssets } from "expo-asset";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { LogContextProvider } from "./contexts/LogContext";

export default function App() {
  const [assets] = useAssets([require("./assets/logo.png")]);
  const [loaded] = Font.useFonts(Ionicons.font);

  // const [fontLoading, setFontLoading] = useState(false);
  // useEffect(() => {
  //   const getFonts = async () => {
  //     await Font.loadAsync({
  //       BMHANNAPro: require("./assets/fonts/BMHANNAPro.ttf"),
  //       BMHANNAAir: require("./assets/fonts/BMHANNAAir_ttf.ttf"),
  //     });
  //   };
  //   getFonts();
  //   setFontLoading(true);
  // }, []);

  // if (!assets || !loaded || !fontLoading) {
  //   return <AppLoading />;
  // }

  const [appIsReady, setAppIsReady] = useState(false);

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
        // Tell the application to render
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
      <LogContextProvider>
        <Root />
      </LogContextProvider>
    </NavigationContainer>
  );
}
