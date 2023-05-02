/**
 * @컴포넌트 : 하단 탭 내비게이션
 * @관련된 컴포넌트: Roots, Analysis, Rank, Home, Profile, Setting
 *
 * @FIXME:
 * 1. 지저분한 코드 정리
 * 2. 코드 재사용성 높이기
 */

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

import styled, { withTheme } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from "../screens/Home";
import Stats from "../screens/Stats";
import Setting from "../screens/Setting";
import Mypage from "../screens/Mypage";
import Rank from "../screens/Rank";

const Tab = createBottomTabNavigator();

const MainTitle = () => (
  <View style={{ marginLeft: 15 }}>
    <Text style={{ fontFamily: "BMHANNAPro", fontSize: 20 }}>홈</Text>
  </View>
);

// Bottom-Tab 내비게이션
const Tabs = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return (
    <Navigator initialRouteName="Home">
      {/* 통계 페이지 */}

      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="bar-chart" color={color} size={size} />;
          },
          unmountOnBlur: true,
          tabBarLabel: "통계",
          title: "통계",
        }}
      />

      {/* 랭킹 페이지 */}
      <Tab.Screen
        name="Rank"
        component={Rank}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="trophy" size={size} color={color} />;
          },
          unmountOnBlur: true,
          tabBarLabel: "랭킹",
          title: "랭킹",
        }}
      />

      {/* 메인 홈 페이지 */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <MainTitle />,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="ios-home" size={size} color={color} />;
          },
          tabBarLabel: "홈",
          title: `${month}월 ${day}일`,
          headerTitleAlign: "center",
        }}
      />

      {/* 내 정보 페이지 */}
      <Tab.Screen
        name="Mypage"
        component={Mypage}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person" size={size} color={color} />;
          },
          tabBarLabel: "정보",
          title: "내 정보",
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
          title: "설정",
        }}
      />
    </Navigator>
  );
};

const Navigator = withTheme(
  styled(Tab.Navigator).attrs((props) => ({
    screenOptions: {
      headerShadowVisible: true,
      headerTitleStyle: {
        fontFamily: "BMHANNAPro",
      },
      tabBarLabelStyle: {
        marginTop: -5,
        marginBottom: 3,
        fontSize: 10,
        fontWeight: "600",
        letterSpacing: 1,
      },
      tabBarActiveTintColor: props.theme.BAR_ACTIVE,
      tabBarInactiveTintColor: props.theme.BAR_INACTIVE,
    },
  }))``
);

export default Tabs;
