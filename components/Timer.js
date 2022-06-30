/*
  @컴포넌트 이름: 스탑워치
  @관련된 컴포넌트: CameraFocus
*/

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLUE } from "./Colors";

// 사용자 정의 hook
const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const [starting, setStarting] = useState(false);
  const intervalRef = useRef(null);

  //   console.log(intervalRef);

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
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const reset = useCallback(() => {
    setCount(0);
    stop();
  }, []);

  return { count, starting, start, stop, reset };
};

const SetTimer = ({ getTimer }) => {
  // 시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, starting, start, stop, reset } = useCounter(0, 1000);

  // 타이머 기능
  const timer = () => {
    console.log("자식 시간 측정: ", count);
    getTimer(count);
    const checkMinutes = Math.floor(count / 60);
    const hours = Math.floor(count / 3600);
    const minutes = checkMinutes % 60;
    const seconds = count % 60;
    setCurrentHours(hours);
    setCurrentMinutes(minutes);
    setCurrentSeconds(seconds);

    // console.log(checkMinutes);
  };

  useEffect(timer, [count]);

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
