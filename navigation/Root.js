import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator>
    <Nav.Screen
      name="Sign"
      component={SignInScreen}
      options={{ headerShown: false }}
    />
  </Nav.Navigator>
);

export default Root;
