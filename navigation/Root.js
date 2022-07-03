/* 
@컴포넌트 이름: 내비게이션 최상단
@관련된 컴포넌트: Tabs, SignInScreen
*/

import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import Tabs from "./Tabs";
import CameraFocus from "../screens/CameraFocus";
import WorkItem from "../components/WorkItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
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
      {/* 카메라 페이지 */}
      <Nav.Screen
        name="Cameras"
        component={CameraFocus}
        options={{ title: "" }}
      />
    </Nav.Navigator>
  );
};

export default Root;
