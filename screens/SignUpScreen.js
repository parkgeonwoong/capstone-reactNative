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

  const inputRef = useRef();

  console.log("id 텍스트값: ", id);

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
          onSubmitEditing={() => {
            inputRef.current.focus();
          }}
        />
        <TextInput
          style={styles.formInput}
          onChangeText={null}
          placeholder="이름"
          ref={inputRef}
        />
        <TextInput
          style={styles.formInput}
          onChangeText={null}
          placeholder="비밀번호"
          secureTextEntry
          ref={inputRef}
        />

        <TouchableOpacity style={styles.button} onPress={null}>
          <Text style={styles.text}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={null}>
          <Text
            style={styles.text}
            onPress={() => navigation.navigate("SignIn")}
          >
            로그인
          </Text>
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
