/* 
@컴포넌트 이름: 하단 탭 내비게이션
@관련된 컴포넌트: Roots, Analysis, Rank, Home, Profile, Setting
*/

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Analysis from "../screens/Analysis";
import Home from "../screens/Home";
import { BAR_ACTIVE, BG_COLOR, BAR_INACTIVE } from "../components/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, TouchableOpacity } from "react-native";
import Setting from "../screens/Setting";

const Tab = createBottomTabNavigator();

// 왼쪽 상단 로고
const LogoTitle = () => (
  <TouchableOpacity>
    <Image
      style={{ width: 85, height: 50 }}
      source={require("../assets/logo2.png")}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

// Bottom-Tab 내비게이션
const Tabs = () => {
  // 오늘의 날짜
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShadowVisible: true,
        headerStyle: {
          backgroundColor: BG_COLOR,
        },
        headerTitleAlign: "center",

        tabBarStyle: {
          backgroundColor: BG_COLOR,
        },
        tabBarLabelStyle: {
          marginTop: -5,
          marginBottom: 3,
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 1,
        },
        tabBarActiveTintColor: BAR_ACTIVE,
        tabBarInactiveTintColor: BAR_INACTIVE,
      }}
    >
      {/* 분석 페이지 */}
      <Tab.Screen
        name="Analysis"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="bar-chart" color={color} size={size} />;
          },
          tabBarLabel: "분석",
        }}
      />
      {/* 랭크 페이지 */}
      <Tab.Screen
        name="Rank"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="trophy" size={size} color={color} />;
          },
          tabBarLabel: "랭킹",
        }}
      />
      {/* 메인 홈 페이지 */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <LogoTitle />,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-home" size={size} color={color} />;
          },
          tabBarLabel: "홈",
          title: `${month}월 ${day}일`,
          headerTitleStyle: {
            fontWeight: "700",
          },
        }}
      />
      {/* 프로필 페이지 */}
      <Tab.Screen
        name="Profile"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person" size={size} color={color} />;
          },
          tabBarLabel: "정보",
        }}
      />
      {/* 설정 페이지 */}
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="md-settings" size={size} color={color} />;
          },
          tabBarLabel: "설정",
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
