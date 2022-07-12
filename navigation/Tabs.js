/* 
@컴포넌트 이름: 하단 탭 내비게이션
@관련된 컴포넌트: Roots, Analysis, Rank, Home, Profile, Setting
*/

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Stats from "../screens/Stats";
import Home from "../screens/Home";
import { BAR_ACTIVE, BG_COLOR, BAR_INACTIVE } from "../components/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Setting from "../screens/Setting";
import Mypage from "../screens/Mypage";
import Rank from "../screens/Rank";

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

const MainTitle = () => (
  <View style={{ marginLeft: 15 }}>
    <Text style={{ fontFamily: "BMHANNAPro", fontSize: 20 }}>홈</Text>
  </View>
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
        // headerStyle: {
        //   backgroundColor: BG_COLOR,
        // },
        headerTitleStyle: {
          fontFamily: "BMHANNAPro",
        },

        // tabBarStyle: {
        //   backgroundColor: BG_COLOR,
        // },
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
      {/* 통계 페이지 */}
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="bar-chart" color={color} size={size} />;
          },
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
    </Tab.Navigator>
  );
};

export default Tabs;
