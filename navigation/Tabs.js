import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Analysis from "../screens/Analysis";
import Home from "../screens/Home";
import { BAR_ACTIVE, BAR_COLOR, BAR_INACTIVE } from "../components/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

const LogoTitle = () => (
  <TouchableOpacity>
    <Image
      style={{ width: 85, height: 50 }}
      source={require("../assets/logo2.png")}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: BAR_COLOR,
        },
        headerTitleAlign: "center",
        headerLeft: () => <LogoTitle />,
        tabBarStyle: {
          backgroundColor: BAR_COLOR,
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
      <Tab.Screen
        name="Analysis"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="bar-chart-outline" color={color} size={size} />
            );
          },
          tabBarLabel: "분석",
        }}
      />
      <Tab.Screen
        name="Rank"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="trophy-outline" size={size} color={color} />;
          },
          tabBarLabel: "랭킹",
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="ios-home-outline" size={size} color={color} />
            );
          },
          tabBarLabel: "홈",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
          tabBarLabel: "정보",
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons name="md-settings-outline" size={size} color={color} />
            );
          },
          tabBarLabel: "설정",
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
