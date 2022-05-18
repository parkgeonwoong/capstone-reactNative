import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const SignInScreen = () => (
  <View style={styles.block}>
    <Image
      source={require("../assets/logo.png")}
      style={styles.image}
      resizeMode="contain"
    />
    <Text>여기는 버튼 자리</Text>
  </View>
);

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default SignInScreen;
