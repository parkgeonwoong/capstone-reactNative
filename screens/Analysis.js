import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Analysis = () => {
  const { works } = useContext(LogContext);

  const [items, setItems] = useState({});

  const loadItems = (day) => {
    // const items = this.state.items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: "Item for " + strTime + " #" + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        }
      }

      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems({
        items: newItems,
      });
    }, 1000);
  };

  return (
    <View style={styles.fullScreen}>
      <View>
        <Text>Hook: {works[0].id}</Text>
      </View>
      <View style={styles.calendar}>
        <Agenda
          items={items}
          loadItemsForMonth={loadItems}
          selected={"2022-07-06"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: BG_COLOR,
  },
  calendar: {
    flex: 1,
  },
});

export default Analysis;
