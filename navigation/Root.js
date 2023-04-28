/**
 * @컴포넌트이름 : 내비게이션 최상단
 * @관련된컴포넌트 : Tabs, SignInScreen
 *
 * @FIXME:
 * 1. 안쓰는 코드 제거 && 중첩된 코드 리팩토링
 *
 * @NOTE:
 * Native Stack Navigator: 각각의 새 화면이 스택 위에 배치되는 화면 간에 앱이 전환하는 방법을 제공
 */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import Tabs from "./Tabs";
import CameraFocus from "../screens/CameraFocus";
import ChartDay from "../screens/ChartDay";
import ChartMonth from "../screens/ChartMonth";
import Profile from "../screens/Profile";

const Nav = createNativeStackNavigator();

const Root = () => {
  return (
    <Nav.Navigator
      screenOptions={{ headerTitleStyle: { fontFamily: "BMHANNAPro" } }}
    >
      {/* 로그인 */}
      <Nav.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      {/* 회원가입 */}
      <Nav.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      {/* 메인 Tabs  */}
      <Nav.Screen
        name="Tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      {/* 카메라 */}
      <Nav.Screen
        name="Cameras"
        component={CameraFocus}
        options={{ title: "" }}
      />
      {/* 차트 일별 */}
      <Nav.Screen
        name="ChartDay"
        component={ChartDay}
        options={{ title: "일별 차트" }}
      />
      {/* 차트 월별 */}
      <Nav.Screen
        name="ChartMonth"
        component={ChartMonth}
        options={{ title: "월별 차트" }}
      />
      {/* 프로필 */}
      <Nav.Screen
        name="Profile"
        component={Profile}
        options={{ title: "내 정보 확인" }}
      />
    </Nav.Navigator>
  );
};

export default Root;
