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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Calendar from "../components/Canlendar";
import { StatScreen } from "../layout/Stat";
import AverageStat from "../components/AverageStat";

const Stats = ({ navigation }) => {
  const date = new Date();
  const today = date.toISOString().split("T")[0];
  const [userNo, setUserNo] = useState("");

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

  return (
    <StatScreen>
      <Calendar userNo={userNo} today={today} navigation={navigation} />
      <AverageStat userNo={userNo} today={today} navigation={navigation} />
    </StatScreen>
  );
};

export default Stats;
