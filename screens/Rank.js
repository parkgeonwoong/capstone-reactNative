import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BG_COLOR } from "../components/Colors";

const Rank = () => {
  return (
    <View style={styles.fullScreen}>
      <View style={styles.block}>
        <View style={styles.logoutBtn}>
          <Text style={[styles.text]}>🔸 아이디</Text>
        </View>
        <View style={styles.logoutBtn}>
          <Text style={[styles.text]}>🔸 이름</Text>
        </View>
        <View style={styles.logoutBtn}>
          <Text style={[styles.text]}>🔸 생성 날짜</Text>
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

export default Rank;
