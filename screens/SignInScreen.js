/* 
@컴포넌트 이름: 로그인 페이지
@관련된 컴포넌트: Root, Tabs
*/

import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { PINK } from "../components/Colors";

const SignInScreen = ({ navigation: { navigate } }) => {
  // 서버와 통신 상태 값
  const [data, useData] = useState({});

  // 통신 API
  const getApi = async () => {
    const response = await fetch("http://diligentp.com:8080/test");
    const json = await response.json();
    useData(json);
    console.log(json.name);
    console.log(typeof json);
    console.log(`data: ${JSON.stringify(json)}`);
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <View style={styles.block}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          data.name === "박건웅"
            ? navigate("Tabs", { screen: "Home" })
            : console.log("Error name");
        }}
      >
        <Text style={styles.text}>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  image: {
    width: 350,
    height: 350,
  },
  button: {
    height: 48,
    width: "60%",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: PINK,
    // backgroundColor: "white",
    elevation: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    // color: "#495057",
    color: "white",
    letterSpacing: 1,
  },
});

export default SignInScreen;
