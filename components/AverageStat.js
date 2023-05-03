/**
 * @desc : 통계 평균 정보 컴포넌트
 */

import React, { useEffect, useState } from "react";
import {
  ApiBox,
  Box,
  IconView,
  LeftMonth,
  LeftText,
  LeftWrapper,
  MonthBox,
  RightMonth,
  TextContext,
  TextTitle,
} from "../layout/Stat";
import { Ionicons } from "@expo/vector-icons";
import { MONTH_URL } from "../api/api";

const AverageStat = ({ userNo, today, navigation }) => {
  const [monthDate, setMonthDate] = useState(today.substring(0, 7));

  const [mapConper, setMapConper] = useState([]);
  const [mapFocus, setMapFocus] = useState([]);
  const [mapUnFocus, setMapUnFocus] = useState([]);
  const [mapFocusdate, setMapFocusdate] = useState([]);

  // 월별 날짜 가져오기
  const getMonthData = async (date) => {
    try {
      const response = await fetch(`${MONTH_URL(userNo, date)}`);
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
    getMonthData(monthDate);
  }, [userNo]);

  const average = (arr) => {
    return (arr.reduce((p, c) => p + c, 0) / arr.length).toFixed(1);
  };

  return (
    <MonthBox>
      <LeftMonth>
        <LeftText>{monthDate.substring(5, 7)}월</LeftText>
      </LeftMonth>
      <RightMonth
        onPress={() =>
          navigation.push("ChartMonth", {
            con_per: mapConper,
            focusdate: mapFocusdate,
          })
        }
      >
        <Box>
          <LeftWrapper>
            <ApiBox>
              <TextTitle>🔸평균 집중도:</TextTitle>
              <TextContext>
                {isNaN(average(mapConper)) ? 0 : average(mapConper)}%
              </TextContext>
            </ApiBox>
            <ApiBox>
              <TextTitle>🔸평균 집중 시간:</TextTitle>
              <TextContext>
                {isNaN(average(mapFocus)) ? 0 : average(mapFocus)}초
              </TextContext>
            </ApiBox>
            <ApiBox>
              <TextTitle>🔸평균 집중 안한 시간:</TextTitle>
              <TextContext>
                {isNaN(average(mapUnFocus)) ? 0 : average(mapUnFocus)}초
              </TextContext>
            </ApiBox>
          </LeftWrapper>
          <IconView>
            <Ionicons name="arrow-forward" size={24} color="black" />
          </IconView>
        </Box>
      </RightMonth>
    </MonthBox>
  );
};

export default AverageStat;
