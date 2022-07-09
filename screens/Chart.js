import React from "react";
import { Text, View } from "react-native";

const Chart = ({ route }) => {
  console.log(route.params);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>차트 페이지</Text>
      <Text>{route.params.id}</Text>
    </View>
  );
};

export default Chart;
