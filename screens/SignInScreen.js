/* 
@컴포넌트 이름: 로그인 페이지
@관련된 컴포넌트: Root, Tabs
*/

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
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
import { BLACK, PINK, RED } from "../components/Colors";

const SignInScreen = ({ navigation: { navigate }, route }) => {
  // 서버와 통신 상태 값
  const [data, setData] = useState("");
  const [form, setForm] = useState({
    id: "",
    pass: "",
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const temp = route.params; // 로그아웃시 받아오는 변수
  // console.log("temp: ", temp);

  const createChangeTextHandle = (name) => (value) => {
    setForm({ ...form, [name]: value });
  };

  console.log("✅loading: ", loading);

  // 로그인 버튼 기능
  const loginBtn = () => {
    Keyboard.dismiss();
    console.log("form: ", form);

    // setData(BackApi(`login?id=${form.id}&pass=${form.pass}`));

    console.log("data: ", data);
    console.log(typeof data);

    if (!loading) {
      Alert.alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  // 통신 API
  const getApi = async () => {
    try {
      // await AsyncStorage.removeItem("id");
      setLoading(temp.loaded);
      const response = await fetch(
        `http://diligentp.com/login?id=${form.id}&pass=${form.pass}`
      );
      const json = await response.json();
      await setData(json);
      console.log(
        `[SignInScreen]🔸백엔드에서 가져온 값: ${JSON.stringify(json)}`
      );
      console.log();

      await AsyncStorage.setItem("id", JSON.stringify(json));
      const loadAsy = await AsyncStorage.getItem("id");
      console.log("[SignInScreen]🔹유저 아이디 저장 값: ", loadAsy);

      if (loadAsy != null) {
        setLoading(true);
      }
    } catch (err) {
      console.log("값을 입력받는중... : ", err);
    }
  };

  useEffect(() => {
    getApi(),
      AsyncStorage.getItem("id").then((value) =>
        navigate(value === null ? "SignIn" : "Tabs", { screen: "Home" })
      );
  }, [form]);

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

  return (
    <View style={styles.block}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.boxImage}
        resizeMode="contain"
      />
      <View style={styles.boxForm}>
        <TextInput
          style={styles.formInput}
          value={form.id}
          onChangeText={createChangeTextHandle("id")}
          placeholder="아이디"
          onSubmitEditing={() => {
            inputRef.current.focus();
          }}
        />
        <TextInput
          style={styles.formInput}
          value={form.password}
          onChangeText={createChangeTextHandle("pass")}
          placeholder="비밀번호"
          secureTextEntry
          ref={inputRef}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            loginBtn();
            loading === true ? navigate("Tabs", { screen: "Home" }) : null;
          }}
        >
          <Text style={styles.text}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigate("SignUp");
          }}
        >
          <Text style={styles.text}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  boxImage: {
    flex: 1,
    width: 300,
    height: 300,
  },
  boxForm: {
    flex: 1.3,
    width: "100%",
    alignItems: "center",
    marginTop: 32,
    // backgroundColor: "tomato",
  },
  formInput: {
    width: "60%",
    borderColor: BLACK,
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 5,
    height: 48,
    marginBottom: 16,
  },
  button: {
    height: 48,
    width: "60%",
    marginTop: 8,
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
