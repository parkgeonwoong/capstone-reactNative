import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "1011144899300-lc4rpi1gc0gkpa6kq3b753nd66rmltj3.apps.googleusercontent.com",
  offlineAccess: true,
});

const SignInScreen = ({ navigation: { navigate } }) => {
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
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
        {/* <Text style={styles.text}>얼른 와</Text> */}
        <GoogleSigninButton
          onPress={signIn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
      </TouchableOpacity>
    </View>
  );
};

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
