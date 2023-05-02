/**
 * @컴포넌트 : 회원가입 페이지
 * @관련된컴포넌트 : Root, Tabs, SignInScreen
 *
 * @FIXME:
 * 1. 안쓰는 코드 제거 && 중첩된 코드 리팩토링
 * 2. fetch 가독성 높이기 (try catch)
 */

import React, { useRef, useState } from "react";
import { REGISTER_URL } from "../api/api";
import {
  BoxImage,
  BtnText,
  FormBox,
  FormButton,
  FormInput,
  FullScreen,
} from "../layout/Sign";

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
      const response = await fetch(`${REGISTER_URL}`, {
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
    <FullScreen>
      <BoxImage source={require("../assets/logo.png")} resizeMode="contain" />
      <FormBox>
        <FormInput
          onChangeText={(textId) => setId(textId)}
          placeholder="아이디"
          returnKeyType="next"
          onSubmitEditing={() => refName.current.focus()}
        />
        <FormInput
          onChangeText={(textName) => setName(textName)}
          placeholder="이름"
          returnKeyType="next"
          ref={refName}
          onSubmitEditing={() => refPass.current.focus()}
        />
        <FormInput
          onChangeText={(textPass) => setPass(textPass)}
          placeholder="비밀번호"
          returnKeyType="next"
          secureTextEntry
          ref={refPass}
        />

        <FormButton onPress={handleSubmitBtn}>
          <BtnText>회원가입</BtnText>
        </FormButton>
        <FormButton onPress={() => navigation.navigate("SignIn")}>
          <BtnText>로그인</BtnText>
        </FormButton>
      </FormBox>
    </FullScreen>
  );
};

export default SignUpScreen;
