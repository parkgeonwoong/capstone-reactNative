/* 
@컴포넌트 이름: 회원가입 페이지
@관련된 컴포넌트: Root, Tabs, SignInScreen
*/

// import AsyncStorage from "@react-native-async-storage/async-storage";
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
      alert("비밀번호를 입력하세요.");
      return;
    }

    setLoading(true);

    // Body: x-www-form-urlencoded 형식
    var dataToSend = {
      userid: id,
      username: name,
      userpass: pass,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    // console.log("formbody:", formBody);

    fetch(`http://diligentp.com/reg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => {
        // console.log(JSON.stringify(response.status));
        return response.json();
      })
      .then((data) => {
        console.log("[SignUp]:", data);
        if (data.status === "success") {
          alert("✨ 회원가입에 성공하였습니다.");
          navigation.replace("SignIn");
        } else if (data.status === "duplicate") {
          alert("이미 존재하는 아이디입니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Body: JSON 형식
    // fetch(`http://diligentp.com/reg`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userid: id,
    //     username: name,
    //     userpass: pass,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => console.log("responseJson", responseJson))
    //   .catch((err) => console.log(err));
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
    // fontWeight: "bold",
    fontSize: 18,
    color: "white",
    letterSpacing: 1,
    fontFamily: "BMHANNAPro",
  },
});

export default SignUpScreen;
