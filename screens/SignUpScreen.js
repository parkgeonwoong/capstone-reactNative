/* 
@컴포넌트 이름: 회원가입 페이지
@관련된 컴포넌트: Root, Tabs, SignInScreen
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

const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const refName = useRef();
  const refPass = useRef();

  const handleSubmitBtn = () => {
    if (!id) {
      alert("아이디를 입력하세요.");
      return;
    }
    if (!name) {
      alert("이름을 입력하세요.");
      return;
    }
    if (!pass) {
      alert("비밀번홀를 입력하세요.");
      return;
    }
  };

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
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
    letterSpacing: 1,
  },
});

export default SignUpScreen;
