import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

const SignInScreen = ({ navigation: { navigate } }) => (
  <View style={styles.block}>
    <Image
      source={require("../assets/logo.png")}
      style={styles.image}
      resizeMode="contain"
    />
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigate("Tabs", { screen: "Home" })}
    >
      <Text style={styles.text}>Login</Text>
    </TouchableOpacity>
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
    width: 350,
    height: 350,
  },
  button: {
    height: 48,
    width: "60%",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    // backgroundColor: "#f8f9fa",
    backgroundColor: "white",
    elevation: 5,
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#495057",
    letterSpacing: 1,
  },
});

export default SignInScreen;
