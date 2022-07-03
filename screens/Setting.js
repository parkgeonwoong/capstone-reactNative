import React from "react";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
  const navigation = useNavigation();
  const Test = async () => {
    const loadAsy = await AsyncStorage.getItem("id");
    console.log("[Setting.js] 유저가 존재한다: ", loadAsy);
  };
  Test();

  const logout = async () => {
    await AsyncStorage.removeItem("id");
    console.log("로그아웃 됬음!!");
    navigation.navigate("SignIn", { loaded: false });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>설정 페이지</Text>
      <Button title="로그아웃" onPress={logout} />
    </View>
  );
};

export default Setting;
