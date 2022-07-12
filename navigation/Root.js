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
import SignUpScreen from "../screens/SignUpScreen";
import ChartDay from "../screens/ChartDay";
import ChartMonth from "../screens/ChartMonth";
import Profile from "../screens/Profile";

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
      {/* 회원가입 페이지 */}
      <Nav.Screen
        name="SignUp"
        component={SignUpScreen}
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
      {/* 차트 페이지 */}
      <Nav.Screen
        name="ChartDay"
        component={ChartDay}
        options={{
          title: "일별 차트",
          headerTitleStyle: { fontFamily: "BMHANNAPro" },
        }}
      />
      <Nav.Screen
        name="ChartMonth"
        component={ChartMonth}
        options={{
          title: "월별 차트",
          headerTitleStyle: { fontFamily: "BMHANNAPro" },
        }}
      />
      <Nav.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "내 정보 확인",
          headerTitleStyle: { fontFamily: "BMHANNAPro" },
        }}
      />
    </Nav.Navigator>
  );
};

export default Root;
