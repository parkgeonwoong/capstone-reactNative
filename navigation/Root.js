import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import Tabs from "./Tabs";
import { Image, TouchableOpacity } from "react-native";

const Nav = createNativeStackNavigator();

const LogoTitle = () => (
  <TouchableOpacity>
    <Image
      style={{ width: 75, height: 50 }}
      source={require("../assets/logo2.png")}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const Root = () => (
  <Nav.Navigator>
    <Nav.Screen
      name="SignIn"
      component={SignInScreen}
      options={{ headerShown: false }}
    />
    <Nav.Screen
      name="Tabs"
      component={Tabs}
      options={{
        headerBackVisible: false,
        // headerTitle: () => <LogoTitle />,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#f8f9fa",
        },
        headerTitleAlign: "center",
        headerLeft: () => <LogoTitle />,
      }}
    />
  </Nav.Navigator>
);

export default Root;
