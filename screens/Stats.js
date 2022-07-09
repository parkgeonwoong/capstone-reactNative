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
import Empty from "../components/Empty";

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split("T")[0];
// };

const Stats = () => {
  const { works } = useContext(LogContext);

  // 오늘 날짜
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  // 각 날짜별 상태값
  const [items, setItems] = useState({
    "2022-07-07": [{ name: "카테고리1", count: "총 시간" }],
    "2022-07-08": [{ name: "카테고리1", count: 10 }],
  });

  // "2022-07-07": { name: "카테고리1", count: "총 시간" },
  // console.log(items["2022-07-07"].count);

  useEffect(() => {
    // 직접 mapping 테스트
    const getData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();

      const mappedData = data.map((post, index) => {
        const dateFns = addDays(new Date(), index);

        return {
          ...post,
          date: format(dateFns, "yyyy-MM-dd"),
          // id: [{ date: format(dateFns, "yyyy-MM-dd") }],
        };
      });

      const reduced = mappedData.reduce((acc, currentItem) => {
        const { date, ...restItem } = currentItem;

        acc[date] = [restItem];
        return acc;
      }, {});

      // console.log(mappedData[0]);
      // console.log(reduced);

      // setItems(reduced);
    };
    getData();
  }, []);

  // 로그 O 랜더링
  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.selectBtn}>
        <View style={styles.selectItem}>
          <Text>총시간: {item.name}</Text>
          <Text>집중시간: {item.count}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  // 로그 X 랜더링
  const renderEmpty = () => {
    return (
      <View style={styles.fullScreen}>
        <Empty />
      </View>
    );
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.calendar}>
        <Agenda
          items={items}
          renderItem={renderItem}
          renderEmptyData={renderEmpty}
          selected={today}
        />
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
    flex: 1,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-start",
    // backgroundColor: "skyblue",
  },
  selectItem: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 15,
    // width: "100%",
    // flexDirection: "row",
    // alignItems: "center",
    // backgroundColor: "tomato",
  },
});

export default Stats;
