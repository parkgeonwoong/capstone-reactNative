/**
 * @컴포넌트 : 통계 페이지
 * @관련된컴포넌트 : Tabs, ChartDay, ChartMonth
 * @구현 : 캘린더, 일자별 로그, 월별 로그
 *
 * @FIXME:
 * 1. 안쓰는 코드 정리
 * 2. 리팩토링 필요
 * 3. 파일 분리 필요
 */

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { BG_COLOR, RED } from "../components/Colors";
import LogContext from "../contexts/LogContext";
import Empty from "../components/Empty";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { DAY_URL, MONTH_URL } from "../api/api";
import Calendar from "../components/Canlendar";

const Stats = ({ navigation }) => {
  // 오늘 날짜
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  const [userNo, setUserNo] = useState("");
  const [monthDate, setMonthDate] = useState(today.substring(0, 7));

  const [mapConper, setMapConper] = useState([]);
  const [mapFocus, setMapFocus] = useState([]);
  const [mapUnFocus, setMapUnFocus] = useState([]);
  const [mapFocusdate, setMapFocusdate] = useState([]);

  // Storage에서 유저 정보 가져오기
  useEffect(() => {
    const load = async () => {
      try {
        const result = await AsyncStorage.getItem("id");
        const userInfo = JSON.parse(result);
        setUserNo(userInfo.userno);
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  // 평균
  const average = (arr) => {
    return (arr.reduce((p, c) => p + c, 0) / arr.length).toFixed(1);
  };

  // 월별 날짜 가져오기
  const getMonthData = async (date) => {
    try {
      const response = await fetch(`${MONTH_URL(userNo, date)})}`);
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
      console.log("월별날짜", err);
    }
  };

  // 렌더링 전에 가져올 API
  useEffect(() => {
    setMonthDate(today.substring(0, 7));
    getMonthData(monthDate);
  }, [userNo]);

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
      <Calendar userNo={userNo} today={today} navigation={navigation} />

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
                <Text style={styles.textContext}>
                  {isNaN(average(mapConper)) ? 0 : average(mapConper)}%
                </Text>
              </View>
              <View style={styles.apiBox}>
                <Text style={styles.textTitle}>🔸평균 집중 시간:</Text>
                <Text style={styles.textContext}>
                  {isNaN(average(mapFocus)) ? 0 : average(mapFocus)}초
                </Text>
              </View>
              <View style={styles.apiBox}>
                <Text style={styles.textTitle}>🔸평균 집중 안한 시간:</Text>
                <Text style={styles.textContext}>
                  {isNaN(average(mapUnFocus)) ? 0 : average(mapUnFocus)}초
                </Text>
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
