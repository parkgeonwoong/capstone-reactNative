/* 
@컴포넌트 이름: 내 정보 확인
@관련된 컴포넌트: Mypage
@구현: 회원 정보 확인
*/

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BG_COLOR } from "../components/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [userNo, setUserNo] = useState("");
  const [userData, setUserData] = useState({});
  const [reg, setReg] = useState("");

  // AsyncStorage 가져오기
  const load = async () => {
    try {
      await AsyncStorage.getItem("id", (err, result) => {
        const userInfo = JSON.parse(result);
        console.log("userInfo:", userInfo.userno);
        setUserNo(userInfo.userno);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // api 가져오기
  const getData = async () => {
    try {
      const response = await fetch(`http://diligentp.com/get?userno=${userNo}`);
      const data = await response.json();
      setUserData(data);
      setReg(data.regidate.substring(0, 10));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    load();
    getData();
  }, [userNo]);

  return (
    <View style={styles.fullScreen}>
      <View style={styles.block}>
        <View style={styles.logoutBtn}>
          <Text style={[styles.text, { opacity: 0.5 }]}>🔸 아이디</Text>
          <Text style={styles.text}>{userData.userid}</Text>
        </View>
        <View style={styles.logoutBtn}>
          <Text style={[styles.text, { opacity: 0.5 }]}>🔸 이름</Text>
          <Text style={styles.text}>{userData.username}</Text>
        </View>
        <View style={styles.logoutBtn}>
          <Text style={[styles.text, { opacity: 0.5 }]}>🔸 생성 날짜</Text>
          <Text style={styles.text}>{reg}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  block: {
    flex: 1,
    marginTop: 10,
  },
  logoutBtn: {
    margin: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 0.5,
    borderRadius: 10,
  },
  text: {
    // paddingHorizontal: 20,
    paddingRight: 20,
    fontSize: 15,
    letterSpacing: 1,
    fontFamily: "BMHANNAPro",
    opacity: 0.8,
  },
});

export default Profile;
