import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BG_COLOR } from "../components/Colors";
import LogContext from "../contexts/LogContext";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const Analysis = () => {
  const { works } = useContext(LogContext);

  return (
    <View style={styles.fullScreen}>
      <View>
        <Text>Hook: {works[0].id}</Text>
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG_COLOR,
  },
});

export default Analysis;
