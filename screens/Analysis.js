import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BG_COLOR } from "../components/Colors";
import LogContext from "../contexts/LogContext";
import {
  Calendar,
  CalendarList,
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";
import { Card, Paragraph } from "react-native-paper";

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Analysis = () => {
  const { works } = useContext(LogContext);

  // 오늘 날짜
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  const [items, setItems] = useState({
    "2022-07-07": [{ name: "카테고리1", count: "총 시간" }],
    "2022-07-08": [
      { name: "카테고리1", count: 10 },
      { name: "카테고리2", count: 5 },
    ],
  });

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.selectBtn}>
        <View style={styles.selectItem}>
          <Text>{item.name}</Text>
          <Text>{item.count}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.calendar}>
        <Agenda items={items} renderItem={renderItem} selected={today} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  calendar: {
    flex: 1,
  },
  selectBtn: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  selectItem: {
    alignItems: "center",
    // backgroundColor: "tomato",
  },
});

export default Analysis;
