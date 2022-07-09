import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { BG_COLOR } from "../components/Colors";
import { Ionicons } from "@expo/vector-icons";

const Setting = () => {
  const navigation = useNavigation();
  const Test = async () => {
    const loadAsy = await AsyncStorage.getItem("id");
    console.log("[Setting] 유저가 존재한다: ", loadAsy);
  };
  Test();

  const logout = async () => {
    await AsyncStorage.removeItem("id");
    console.log("로그아웃 됬음!!");
    navigation.navigate("SignIn", { loaded: false });
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.block}>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.text}>🔸 로그아웃</Text>
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
    // backgroundColor: "tomato",
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
    // fontWeight: "600",
    letterSpacing: 1,
    fontFamily: "BMHANNAPro",
    opacity: 0.8,
  },
});

export default Setting;
