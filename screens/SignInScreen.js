/* 
@컴포넌트 이름: 로그인 페이지
@관련된 컴포넌트: Root, Tabs
*/

import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { PINK, RED } from "../components/Colors";

const SignInScreen = ({ navigation: { navigate } }) => {
  // 서버와 통신 상태 값
  const [data, useData] = useState({});

  // 통신 API
  const getApi = async () => {
    const response = await fetch("http://diligentp.com/test"); // 디비 서버
    // 딥러닝 서버
    // const response = await fetch("http://172.26.21.108:8000/test", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     title: "Test",
    //     id: 1,
    //     body: "🤪Chae Jongwook is ugly!!",
    //   }),
    // });

    const json = await response.json();

    // console.log(json); // 딥러닝 json 확인

    // 디비 서버
    useData(json);
    // console.log(json.name);
    // console.log(typeof json);
    console.log(`🌊백엔드 통신: ${JSON.stringify(json)}`);
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
          // data.name === "박정현"
          //   ? navigate("Tabs", { screen: "Home" })
          //   : console.log("Error name");
          navigate("Tabs", { screen: "Home" });
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
    backgroundColor: RED,
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
