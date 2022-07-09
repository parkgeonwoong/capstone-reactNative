/* 
@컴포넌트 이름: 분석 페이지
@관련된 컴포넌트: Tabs
@구현: 캘린더, 날짜별 로그, 차트
*/

import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { Card, Paragraph } from "react-native-paper";
import { addDays, format } from "date-fns";
import { BG_COLOR, RED } from "../components/Colors";
import LogContext from "../contexts/LogContext";
import Empty from "../components/Empty";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const timeToString = (time) => {
//   const date = new Date(time);
//   return date.toISOString().split("T")[0];
// };

const Stats = ({ navigation }) => {
  const { works } = useContext(LogContext);
  const [userNo, setUserNo] = useState(0);

  // 오늘 날짜
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  // 각 날짜별 상태값
  const [items, setItems] = useState({});

  // Storage에서 유저 정보 가져오기
  useEffect(() => {
    const load = async () => {
      try {
        await AsyncStorage.getItem("id", (err, result) => {
          const userInfo = JSON.parse(result);
          // console.log(typeof userInfo.userno);
          setUserNo(userInfo.userno);
        });
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  // 오늘 날짜만 가져오기
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://diligentp.com/stats?userno=${userNo}&date=${today}`
        );
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [userNo]);

  // 클릭 시 API 가져오기
  const handleDayPress = (day) => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://diligentp.com/stats?userno=${userNo}&date=${day}`
        );
        const data = await response.json();
        // console.log("[Stats]🔸외부 API:", data);
        setItems(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  };

  // console.log("가져온 API 저장: ", items);
  // "2022-07-07": [{ name: "1", count: "총 시간" }],
  // "2022-07-08": [{ name: "2", count: 10 }],
  // "2022-07-07": { name: "카테고리1", count: "총 시간" },
  // console.log(items["2022-07-07"].count);

  // 직접 mapping 테스트
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch(
  //       "https://jsonplaceholder.typicode.com/posts"
  //     );
  //     const data = await response.json();

  //     const mappedData = data.map((post, index) => {
  //       const dateFns = addDays(new Date(), index);

  //       return {
  //         ...post,
  //         date: format(dateFns, "yyyy-MM-dd"),
  //         // id: [{ date: format(dateFns, "yyyy-MM-dd") }],
  //       };
  //     });

  //     const reduced = mappedData.reduce((acc, currentItem) => {
  //       const { date, ...restItem } = currentItem;

  //       acc[date] = [restItem];
  //       return acc;
  //     }, {});

  //     // console.log(mappedData[0]);
  //     // console.log(reduced);

  //     setItems(reduced);
  //   };
  //   getData();
  // }, []);

  // 로그 O 랜더링
  const renderItem = (item) => {
    // console.log("[Stats]🔸렌더링 item:", item);
    return (
      <TouchableOpacity
        style={styles.selectBtn}
        onPress={() => navigation.push("Chart", { userno: item.userno })}
      >
        <View style={styles.selectItem}>
          <View style={styles.apiBox}>
            <Text style={styles.textTitle}>🔸집중도:</Text>
            <Text style={styles.textContext}>{item.con_per}%</Text>
          </View>
          <View style={styles.apiBox}>
            <Text style={styles.textTitle}>🔸집중 시간:</Text>
            <Text style={styles.textContext}>{item.focustime}초</Text>
          </View>
          <View style={styles.apiBox}>
            <Text style={styles.textTitle}>🔸집중 안한 시간:</Text>
            <Text style={styles.textContext}>{item.unfocustime}초</Text>
          </View>
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
          onDayPress={(day) => {
            // console.log("DayPress:", day.dateString);
            handleDayPress(day.dateString);
          }}
          minDate={"2022-01-01"}
          maxDate={"2023-08-01"}
          pastScrollRange={12}
          futureScrollRange={12}
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
    margin: 10,
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  selectItem: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  apiBox: {
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 15,
    paddingVertical: 3,
    marginRight: 10,
    fontFamily: "BMHANNAPro",
    opacity: 0.8,
  },
  textContext: {
    fontSize: 15,
    color: RED,
    fontFamily: "BMHANNAPro",
  },
});

export default Stats;
