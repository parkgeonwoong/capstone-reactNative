import React, { useContext } from "react";
import { View, Text } from "react-native";
import LogContext from "../contexts/LogContext";

const Analysis = () => {
  const { text } = useContext(LogContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Analysis</Text>
      <Text>Hook: {text}</Text>
    </View>
  );
};

export default Analysis;
