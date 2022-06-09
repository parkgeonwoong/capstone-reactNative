import React from "react";
import { View, Text } from "react-native";
import LogContext from "../contexts/LogContext";

const Analysis = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Analysis</Text>
    <LogContext.Consumer>{(value) => <Text>{value}</Text>}</LogContext.Consumer>
    <View>
      <Box>{(value) => <Text>{value}</Text>}</Box>
    </View>
  </View>
);

const Box = ({ children }) => {
  return <View>{children("Hello World")}</View>;
};

export default Analysis;
