import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BAR_COLOR } from "../components/Colors";

const Home = () => (
  <View style={styles.fullScreen}>
    <View style={styles.block}>
      <Text>Home</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BAR_COLOR,
  },
  block: {
    width: "90%",
    height: "90%",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 2,
  },
});

export default Home;
