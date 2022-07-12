/*
  @컴포넌트 이름: 스탑워치
  @관련된 컴포넌트: CameraFocus
*/

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLUE } from "./Colors";
import LogContext from "../contexts/LogContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

let user = 0;

// 사용자 정의 hook
const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const [starting, setStarting] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    setStarting(true);
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);
  const stop = useCallback(() => {
    // console.log("a:", user);
    if (intervalRef.current === null) {
      return;
    }
    setStarting(false);

    fetch("http://192.168.0.17:5000/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Ready: 0,
        getuserNo: user,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log("STOP 시 응답값", JSON.stringify(data)));
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const reset = useCallback(() => {
    setCount(0);
    stop();
  }, []);

  return { count, starting, start, stop, reset };
};

const SetTimer = ({ getTimer, data, getReady }) => {
  // 시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, starting, start, stop, reset } = useCounter(data.count, 1000);
  const { works, setWorks } = useContext(LogContext);
  const [userNo, setUserNo] = useState("");

  // console.log(data.id);

  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      const userInfo = JSON.parse(value);
      // console.log(userInfo);
      setUserNo(userInfo.userno);
      user = userInfo.userno;
    });
  });

  // console.log("userNo", userNo);

  const timeSave = (id) => {
    const nextTime = works.map((work) =>
      work.id === id ? { ...work, count: count } : work
    );
    setWorks(nextTime);
  };

  // 타이머 기능
  const timer = () => {
    // console.log("자식 시간 측정: ", count);
    timeSave(data.id);
    data.count = count;
    console.log("시간:", count);
    getTimer(data.count);
    getReady(starting);
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setCurrentHours(hours);
    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);

    // console.log(checkMinutes);
  };

  useEffect(timer, [count, starting]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {currentHours < 10 ? `0${currentHours}` : currentHours} :{" "}
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} :{" "}
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </Text>
      <View style={styles.timerBox}>
        {starting == false ? (
          <TouchableOpacity onPress={start} style={styles.timerBtn}>
            <Text style={styles.timerBtnText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={stop} style={styles.timerBtn}>
            <Text style={styles.timerBtnText}>Stop</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={reset} style={styles.timerBtn}>
          <Text style={styles.timerBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "tomato",
  },
  timerText: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 5,
  },
  timerBox: {
    flexDirection: "row",
  },
  timerBtn: {
    alignItems: "center",
    backgroundColor: BLUE,
    padding: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  timerBtnText: {
    color: "white",
    fontSize: 13,
  },
});

export default SetTimer;
