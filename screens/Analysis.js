import React, { useContext } from "react";
import { View, Text } from "react-native";
import LogContext from "../contexts/LogContext";

const Analysis = () => {
  const { works } = useContext(LogContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Analysis</Text>
      <Text>Hook: {works[0].id}</Text>
    </View>
  );
};

export default Analysis;
