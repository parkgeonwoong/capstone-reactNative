/**
 * @컴포넌트 : 스탑워치
 * @관련된 컴포넌트: CameraFocus
 *
 * @FIXME:
 * 1. hook 분리
 * 2. 코드 정리
 * 3. 스타일 컴포넌트로 일관성
 */

import React, { useContext, useEffect, useState } from "react";
import LogContext from "../contexts/LogContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCounter } from "./hooks/counter";
import styled from "styled-components/native";

let user = 0;

const SetTimer = ({ getTimer, data, getReady }) => {
  const [currentHours, setCurrentHours] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const { count, starting, start, stop, reset } = useCounter(
    data.count,
    1000,
    user
  );
  const { works, setWorks } = useContext(LogContext);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await AsyncStorage.getItem("id");
        const userInfo = JSON.parse(result);
        user = userInfo.userno;
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  const timeSave = (id) => {
    const nextTime = works.map((work) =>
      work.id === id ? { ...work, count: count } : work
    );
    setWorks(nextTime);
  };

  // 타이머 기능
  useEffect(() => {
    const timer = () => {
      timeSave(data.id);
      const currentCount = count;
      data.count = currentCount;
      getTimer(data.count);
      getReady(starting);
      const checkMinutes = Math.floor(currentCount / 60);
      const hours = Math.floor(currentCount / 3600);
      const minutes = checkMinutes % 60;
      const seconds = currentCount % 60;
      setCurrentHours(hours);
      setCurrentMinutes(minutes);
      setCurrentSeconds(seconds);
    };
    timer();
  }, [count, starting]);

  return (
    <Container>
      <TimerText>
        {currentHours < 10 ? `0${currentHours}` : currentHours} :{" "}
        {currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes} :{" "}
        {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
      </TimerText>
      <TimerBox>
        {starting == false ? (
          <TimerBtn onPress={start}>
            <TimerBtnText>Start</TimerBtnText>
          </TimerBtn>
        ) : (
          <TimerBtn onPress={stop}>
            <TimerBtnText>Stop</TimerBtnText>
          </TimerBtn>
        )}

        <TimerBtn onPress={reset}>
          <TimerBtnText>Reset</TimerBtnText>
        </TimerBtn>
      </TimerBox>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TimerText = styled.Text`
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const TimerBox = styled.View`
  flex-direction: row;
`;

const TimerBtn = styled.TouchableOpacity`
  align-items: center;
  background-color: ${(props) => props.theme.BLUE};
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
`;

const TimerBtnText = styled.Text`
  color: white;
  font-size: 13px;
`;

export default SetTimer;
