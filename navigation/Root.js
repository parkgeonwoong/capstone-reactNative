/* 
@컴포넌트 이름: 내비게이션 최상단
@관련된 컴포넌트: Tabs, SignInScreen
*/

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import Tabs from "./Tabs";

const Nav = createNativeStackNavigator();

const Root = () => (
  <Nav.Navigator>
    {/* 로그인 페이지 */}
    <Nav.Screen
      name="SignIn"
      component={SignInScreen}
      options={{ headerShown: false }}
    />
    {/* 메인 페이지 Tabs  */}
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
