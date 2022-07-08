/* 
@컴포넌트 이름: 분석 페이지
@관련된 컴포넌트: Tabs
@구현: 캘린더, 날짜별 로그, 차트
*/

import React, { useContext, useEffect, useState } from "react";
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
import { addDays, format } from "date-fns";

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split("T")[0];
// };

const Analysis = () => {
  const { works } = useContext(LogContext);

  // 오늘 날짜
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  // 각 날짜별 상태값
  const [items, setItems] = useState({
    "2022-07-07": [{ name: "카테고리1", count: "총 시간" }],
    "2022-07-08": [
      { name: "카테고리1", count: 10 },
      { name: "카테고리2", count: 5 },
    ],
  });

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();

      const mappedData = data.map((post, index) => {
        const dateFns = addDays(new Date(), index);

        return {
          ...post,
          // date: format(dateFns, "yyyy-MM-dd"),
          id: [{ date: format(dateFns, "yyyy-MM-dd") }],
        };
      });

      // const mappedData = data.map((post) => {
      //   return {
      //     ...post,
      //     date: today,
      //   };
      // });

      console.log(mappedData[0]);

      // setItems(data.slice(0,5))
    };
    getData();
  }, []);

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
    justifyContent: "flex-start",
    // backgroundColor: "tomato",
  },
});

export default Analysis;
