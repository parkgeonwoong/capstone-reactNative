/**
 * @컴포넌트 : 스탑워치
 * @관련된 컴포넌트: CameraFocus
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLUE } from "./Colors";
import LogContext from "../contexts/LogContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEEP_URL } from "../api/api";

let user = 0;

/**
 * @desc : 사용자정의 hook 스탑워치
 */
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
    if (intervalRef.current === null) {
      return;
    }
    setStarting(false);

    fetch(`${DEEP_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Ready: 0,
        getuserNo: user,
      }),
    }).then((response) => response.json());
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
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, starting, start, stop, reset } = useCounter(data.count, 1000);
  const { works, setWorks } = useContext(LogContext);
  const [userNo, setUserNo] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("id").then((value) => {
      const userInfo = JSON.parse(value);
      setUserNo(userInfo.userno);
      user = userInfo.userno;
    });
  });

  const timeSave = (id) => {
    const nextTime = works.map((work) =>
      work.id === id ? { ...work, count: count } : work
    );
    setWorks(nextTime);
  };

  // 타이머 기능
  const timer = () => {
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
