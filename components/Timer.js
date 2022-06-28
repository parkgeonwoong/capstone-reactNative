import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";

// 사용자 정의 hook
const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);

  //   console.log(intervalRef);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const reset = useCallback(() => {
    setCount(0);
    stop();
  }, []);

  return { count, start, stop, reset };
};

const SetTimer = () => {
  // 시, 분, 초를 state로 저장
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, start, stop, reset } = useCounter(0, 1000);

  // 타이머 기능
  const timer = () => {
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
    <View>
      <Text>
        {currentHours < 10 ? `0${currentHours}` : currentHours} :{" "}
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} :{" "}
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Button onPress={start} title="Start" />
        <Button onPress={stop} title="Stop" />
        <Button onPress={reset} title="Reset" />
      </View>
    </View>
  );
};

export default SetTimer;
