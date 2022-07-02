/* 
@컴포넌트 이름: 로그인 페이지
@관련된 컴포넌트: Root, Tabs
*/

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import BackApi from "../components/BackApi";
import { PINK, RED } from "../components/Colors";

const SignInScreen = ({ navigation: { navigate } }) => {
  // 서버와 통신 상태 값
  const [data, useData] = useState("");
  const [form, setForm] = useState({
    id: "",
    pass: "",
  });
  const [loading, setLoading] = useState(false);

  // console.log(data);
  // console.log(data === null);
  // console.log(form);

  const createChangeTextHandle = (name) => (value) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = () => {
    Keyboard.dismiss();
    console.log("form: ", form);

    // useData("");
    useData(BackApi(`login?id=${form.id}&pass=${form.pass}`));

    console.log("data: ", data);
    // console.log(typeof form.id);

    // useEffect(() => {
    //   getApi();
    // }, []);

    // form.id !== data.userid && form.pass !== data.userpass

    if (form.id !== data.userid && form.pass !== data.userpass) {
      console.log("불일치");
      Alert.alert("불일치");
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  // // 통신 API
  // const getApi = async () => {
  //   // 디비 서버
  //   const response = await fetch(
  //     `http://diligentp.com/login?id=${form.id}&pass=${form.pass}`
  //   );
  //   // 딥러닝 서버
  //   // const response = await fetch("http://172.26.21.108:8000/test", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify({
  //   //     title: "Test",
  //   //     id: 1,
  //   //     body: "🤪Chae Jongwook is ugly!!",
  //   //   }),
  //   // });

  //   const json = await response.json();

  //   // console.log(json); // 딥러닝 json 확인

  //   // 디비 서버
  //   useData(json);

  //   console.log(`🌊백엔드 통신: ${JSON.stringify(json)}`);
  // };

  // useEffect(() => {
  //   getApi();
  // }, [form]);

  return (
    <View style={styles.block}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <TextInput
        value={form.id}
        onChangeText={createChangeTextHandle("id")}
        placeholder="아이디"
      />
      <TextInput
        value={form.password}
        onChangeText={createChangeTextHandle("pass")}
        placeholder="비밀번호"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // data.name === "박정현"
          //   ? navigate("Tabs", { screen: "Home" })
          //   : console.log("Error name");
          onSubmit(),
            loading === true ? navigate("Tabs", { screen: "Home" }) : null;
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
