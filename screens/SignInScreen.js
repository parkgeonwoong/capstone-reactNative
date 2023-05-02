/**
 * @컴포넌트 : 로그인 페이지
 * @관련된컴포넌트 : Root, Tabs,SignUpScreen
 *
 * @FIXME:
 * 1. 안쓰는 코드 제거 && 중첩된 코드 리팩토링
 * 2. fetch 가독성 높이기 (try catch)
 * 3. useEffect 코드 가독성 높이기
 * 4. styled-components로 리팩토링
 * 5. 로그인, 회원가입 렌더링 컴포넌트 중첩 → 재사용 필요성
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { Keyboard } from "react-native";

import { SIGNIN_URL } from "../api/api";
import {
  BoxImage,
  BtnText,
  FormBox,
  FormButton,
  FormInput,
  FullScreen,
} from "../layout/Sign";

const SignInScreen = ({ navigation: { navigate } }) => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const refPass = useRef();

  /**
   * @desc : 로그인 비동기 처리
   */
  const handleSubmitBtn = async () => {
    Keyboard.dismiss();
    navigate("Tabs", { screen: "Home" }); // 서버가 닫혀서 실험

    if (!id || !pass) {
      alert("아이디 또는 패스워드를 입력하세요.");
      return null;
    }

    try {
      const response = await fetch(`${SIGNIN_URL(id, pass)}`);
      if (response.status === 200) {
        const data = await response.json();
        AsyncStorage.setItem("id", JSON.stringify(data));
        navigate("Tabs", { screen: "Home" });
      } else {
        alert("없는 계정입니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 스토리지에 로그인정보 O → 자동 로그인
  useEffect(() => {
    const checkLogin = async () => {
      const value = await AsyncStorage.getItem("id");
      navigate(value ? "Tabs" : "SignIn", { screen: "Home" });
    };
    checkLogin();
  }, []);

  return (
    <FullScreen>
      <BoxImage source={require("../assets/logo.png")} resizeMode="contain" />
      <FormBox>
        <FormInput
          onChangeText={(textId) => setId(textId)}
          placeholder="아이디"
          onSubmitEditing={() => refPass.current.focus()}
        />
        <FormInput
          onChangeText={(textPass) => setPass(textPass)}
          placeholder="비밀번호"
          secureTextEntry
          ref={refPass}
        />

        <FormButton onPress={() => handleSubmitBtn()}>
          <BtnText>로그인</BtnText>
        </FormButton>
        <FormButton onPress={() => navigate("SignUp")}>
          <BtnText>회원가입</BtnText>
        </FormButton>
      </FormBox>
    </FullScreen>
  );
};

export default SignInScreen;
