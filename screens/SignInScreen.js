/* 
@컴포넌트 이름: 로그인 페이지
@관련된 컴포넌트: Root, Tabs,SignUpScreen
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
import { BLACK, RED } from "../components/Colors";

const SignInScreen = ({ navigation: { navigate }, route }) => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");

  const refPass = useRef();

  const temp = route.params; // 로그아웃시 받아오는 변수

  // 로그인 버튼 기능
  const handleSubmitBtn = () => {
    Keyboard.dismiss();
    navigate("Tabs", { screen: "Home" });

    /* 수정중 1.09
    if (!id) {
      alert("아이디를 입력하세요.");
      return;
    }
    if (!pass) {
      alert("비밀번호를 입력하세요");
      return;
    }

    fetch(`http://diligentp.com/login?id=${id}&pass=${pass}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("없는 계정입니다.");
          return null;
        }
      })
      .then((data) => {
        console.log("data 값:", data);
        if (data === null) {
          return;
        } else {
          AsyncStorage.setItem("id", JSON.stringify(data));
          navigate("Tabs", { screen: "Home" });
        }
      })
      .catch((err) => {
        console.log(err);
      }); */
  };

  // 스토리지에 로그인 정보 있을 경우 -> 자동 로그인
  useEffect(() => {
    AsyncStorage.getItem("id").then((value) =>
      navigate(value === null ? "SignIn" : "Tabs", { screen: "Home" })
    );
  }, []);

  return (
    <View style={styles.fullScreen}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.boxImage}
        resizeMode="contain"
      />
      <View style={styles.boxForm}>
        <TextInput
          style={styles.formInput}
          onChangeText={(textId) => setId(textId)}
          placeholder="아이디"
          onSubmitEditing={() => {
            refPass.current.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.formInput}
          onChangeText={(textPass) => setPass(textPass)}
          placeholder="비밀번호"
          secureTextEntry
          ref={refPass}
          blurOnSubmit={false}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmitBtn();
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
  fullScreen: {
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
    elevation: 5,
  },
  text: {
    // fontWeight: "bold",
    fontSize: 18,
    color: "white",
    letterSpacing: 1,
    fontFamily: "BMHANNAPro",
  },
});

export default SignInScreen;
