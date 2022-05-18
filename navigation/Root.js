import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import Tabs from "./Tabs";
import { BAR_COLOR } from "../components/Colors";

const Nav = createNativeStackNavigator();

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
        headerShown: false,
      }}
    />
  </Nav.Navigator>
);

export default Root;
