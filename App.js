import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import { useAssets } from "expo-asset";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppLoading from "expo-app-loading";

import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { LogContextProvider } from "./contexts/LogContext";

export default function App() {
  const [assets] = useAssets([require("./assets/logo.png")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const [fontLoading, setFontLoading] = useState(false);

  // console.log(loaded);

  useEffect(() => {
    const getFonts = async () => {
      await Font.loadAsync({
        BMHANNAPro: require("./assets/fonts/BMHANNAPro.ttf"),
        BMHANNAAir: require("./assets/fonts/BMHANNAAir_ttf.ttf"),
      });
    };
    getFonts();
    setFontLoading(true);
  }, []);

  if (!assets || !loaded || !fontLoading) {
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
