/* 
@컴포넌트 이름: 내 정보 페이지
@관련된 컴포넌트: Tabs, Profile
@구현: 회원 정보 확인, 회원 정보 삭제
*/

import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BG_COLOR } from "../components/Colors";
import { Ionicons } from "@expo/vector-icons";

const Mypage = ({ navigation }) => {
  // const navigation = useNavigation();

  return (
    <View style={styles.fullScreen}>
      <View style={styles.block}>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => navigation.push("Profile")}
        >
          <Text style={styles.text}>🔸 내 정보 확인하기</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutBtn} onPress={null}>
          <Text style={styles.text}>🔸 탈퇴하기</Text>
          <Ionicons name="arrow-forward" size={24} color="black" />
        </TouchableOpacity>
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
    fontSize: 15,
    letterSpacing: 1,
    fontFamily: "BMHANNAPro",
    opacity: 0.8,
  },
});

export default Mypage;
