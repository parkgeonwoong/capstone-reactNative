/**
 * @컴포넌트 : 회원가입 페이지
 * @관련된컴포넌트 : Root, Tabs, SignInScreen
 *
 * @FIXME:
 * 1. 안쓰는 코드 제거 && 중첩된 코드 리팩토링
 *
 */

// import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { BLACK, RED } from "../components/Colors";
import { BASE_URL } from "../api/api";

const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const refName = useRef();
  const refPass = useRef();

  const handleSubmitBtn = async () => {
    if (!id || !name || !pass) {
      alert("아이디, 이름, 패스워드를 입력하세요.");
      return null;
    }

    /**
     * Body: x-www-form-urlencoded 형식
     * 백엔드 개발자가 정한 형식에 맞춰서 보내야 함
     */
    const dataToSend = {
      userid: id,
      username: name,
      userpass: pass,
    };
    let formBody = [];
    for (let key in dataToSend) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    try {
      const response = await fetch(`${BASE_URL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody,
      });
      const data = await response.json();

      if (response.status === 200) {
        alert("✨ 회원가입에 성공하였습니다.");
        navigation.replace("SignIn");
      } else alert("이미 존재하는 아이디입니다.");
    } catch (error) {
      console.log(error);
    }
  };

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
          returnKeyType="next"
          onSubmitEditing={() => {
            refName.current.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.formInput}
          onChangeText={(textName) => setName(textName)}
          placeholder="이름"
          returnKeyType="next"
          ref={refName}
          onSubmitEditing={() => {
            refPass.current.focus();
          }}
          blurOnSubmit={false}
        />
        <TextInput
          style={styles.formInput}
          onChangeText={(textPass) => setPass(textPass)}
          placeholder="비밀번호"
          returnKeyType="next"
          secureTextEntry
          ref={refPass}
          blurOnSubmit={false}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmitBtn}>
          <Text style={styles.text}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.text}>로그인</Text>
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
    fontSize: 18,
    color: "white",
    letterSpacing: 1,
    fontFamily: "BMHANNAPro",
  },
});

export default SignUpScreen;
