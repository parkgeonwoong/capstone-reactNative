/**
 * @컴포넌트 : 설정 페이지
 * @관련된컴포넌트 : Tabs
 */

import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Block, Btn, IconArrow, Title, Wrapper } from "../layout/Screen";

const Setting = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("id");
      navigation.navigate("SignIn", { loaded: false });
    } catch (err) {
      console.log(`${err} 로그아웃 AsyncStorage 실패`);
    }
  };

  const appVersion = () => {
    return alert("집중해줄래? 1.0 ver");
  };

  return (
    <Wrapper>
      <Block>
        <Btn onPress={appVersion}>
          <Title>🔸 App 정보</Title>
          <IconArrow />
        </Btn>
        <Btn onPress={handleLogout}>
          <Title>🔸 로그아웃</Title>
          <IconArrow />
        </Btn>
      </Block>
    </Wrapper>
  );
};

export default Setting;
