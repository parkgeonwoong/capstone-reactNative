/* 
@컴포넌트 이름: 통계 페이지
@관련된 컴포넌트: Tabs
@구현: 캘린더, 일자별 로그, 월별 로그, 차트
*/

import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";
import { BG_COLOR, RED } from "../components/Colors";
import LogContext from "../contexts/LogContext";
import Empty from "../components/Empty";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Stats = ({ navigation }) => {
  const [userNo, setUserNo] = useState("");
  const [monthDate, setMonthDate] = useState("");
  // 매핑한 상태값 저장
  const [mapConper, setMapConper] = useState([]);
  const [mapFocus, setMapFocus] = useState([]);
  const [mapUnFocus, setMapUnFocus] = useState([]);
  const [mapFocusdate, setMapFocusdate] = useState([]);

  // 오늘 날짜
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  // 월별 통계를 위한 문자열 자르기
  // setMonthDate(today.substring(0, 7));
  // console.log(monthDate);

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

  // 특정 날짜만 가져오기
  const getTodayData = async (date) => {
    try {
      const response = await fetch(
        `http://diligentp.com/stats/day?userno=${userNo}&date=${date}`
      );
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  // 평균
  const average = (arr) => {
    return (arr.reduce((p, c) => p + c, 0) / arr.length).toFixed(1);
  };

  // 월별 날짜 가져오기
  const getMonthData = async (date) => {
    try {
      const response = await fetch(
        `http://diligentp.com/stats/month?userno=${userNo}&date=${date}`
      );
      const data = await response.json();

      // api mapping
      const mappedConper = data.map((item) => item.con_per);
      const mappedFocus = data.map((item) => item.focustime);
      const mappedUnFocus = data.map((item) => item.unfocustime);
      const mappedFocusdate = data.map((item) => item.focusdate);
      setMapConper(mappedConper);
      setMapFocus(mappedFocus);
      setMapUnFocus(mappedUnFocus);
      setMapFocusdate(mappedFocusdate);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("매핑된 상태값: ", mapConper);
  // console.log(monthDate);

  // 렌더링 전에 가져올 API
  useEffect(() => {
    getTodayData(today);
    setMonthDate(today.substring(0, 7));
    getMonthData(monthDate);
  }, [userNo]);

  // 클릭 시 API 가져오기
  const handleDayPress = (day) => {
    const untilMonth = day.substring(0, 7);
    setMonthDate(untilMonth);
    getTodayData(day);
    getMonthData(untilMonth);
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
        onPress={() =>
          navigation.push("ChartDay", {
            focusdate: item.focusdate,
            focustime: item.focustime,
            unfocustime: item.unfocustime,
          })
        }
      >
        <View style={styles.box}>
          <View style={styles.selectItem}>
            <View style={styles.apiBox}>
              <Text style={styles.textTitle}>🔸집중도:</Text>
              <Text style={styles.textContext}>{item.con_per.toFixed(1)}%</Text>
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
          <View>
            <Ionicons name="arrow-forward" size={24} color="black" />
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
      <View style={styles.monthBox}>
        <View style={styles.leftMonth}>
          <Text style={styles.leftText}>{monthDate.substring(5, 7)}월</Text>
        </View>
        <TouchableOpacity
          style={styles.rightMonth}
          onPress={() =>
            navigation.push("ChartMonth", {
              con_per: mapConper,
              focusdate: mapFocusdate,
            })
          }
        >
          <View style={styles.box}>
            <View style={styles.leftWrapper}>
              <View style={styles.apiBox}>
                <Text style={styles.textTitle}>🔸평균 집중도:</Text>
                <Text style={styles.textContext}>{average(mapConper)}초</Text>
              </View>
              <View style={styles.apiBox}>
                <Text style={styles.textTitle}>🔸평균 집중 시간:</Text>
                <Text style={styles.textContext}>{average(mapFocus)}초</Text>
              </View>
              <View style={styles.apiBox}>
                <Text style={styles.textTitle}>🔸평균 집중 안한 시간:</Text>
                <Text style={styles.textContext}>{average(mapUnFocus)}초</Text>
              </View>
            </View>
            <View>
              <Ionicons name="arrow-forward" size={24} color="black" />
            </View>
          </View>
        </TouchableOpacity>
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
    flex: 1.8,
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
  box: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  monthBox: {
    flex: 1,
    flexDirection: "row",
  },
  leftMonth: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
  },
  leftText: {
    fontSize: 20,
    fontFamily: "BMHANNAPro",
    color: "#00BBF2",
    letterSpacing: 1,
  },
  rightMonth: {
    flex: 4,
    marginRight: 10,
    marginBottom: 40,
    padding: 20,
    borderRadius: 15,
    backgroundColor: "white",
  },
  leftWrapper: {
    flex: 1,
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default Stats;
