import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Analysis from "../screens/Analysis";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Analysis" component={Analysis} />
      <Tab.Screen name="Rank" component={Analysis} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Analysis} />
      <Tab.Screen name="Setting" component={Analysis} />
    </Tab.Navigator>
  );
};

export default Tabs;
