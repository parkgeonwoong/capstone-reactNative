/**
 * @desc : Component for statistical average information
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
  const [mapData, setMapData] = useState({
    conper: [],
    focus: [],
    unfocus: [],
    focusdate: [],
  });

  // Fetch monthly data
  const getMonthData = async (date) => {
    try {
      const response = await fetch(`${MONTH_URL(userNo, date)}`);
      const data = await response.json();

      // Map API data
      const mappedData = {
        conper: data.map((item) => item.con_per),
        focus: data.map((item) => item.focustime),
        unfocus: data.map((item) => item.unfocustime),
        focusdate: data.map((item) => item.focusdate),
      };
      setMapData(mappedData);
    } catch (err) {
      console.error("Error fetching monthly data: ", err);
      // Handle error here (e.g., show warning message to user)
    }
  };

  // Fetch API data before rendering
  useEffect(() => {
    getMonthData(monthDate);
  }, [userNo]);

  // Calculate average of an array
  const average = (arr) =>
    (arr.reduce((p, c) => p + c, 0) / arr.length).toFixed(1);

  return (
    <MonthBox>
      <LeftMonth>
        <LeftText>{monthDate.substring(5, 7)}월</LeftText>
      </LeftMonth>
      <RightMonth
        onPress={() =>
          navigation.push("ChartMonth", {
            con_per: mapData.conper,
            focusdate: mapData.focusdate,
          })
        }
      >
        <Box>
          <LeftWrapper>
            <ApiBox>
              <TextTitle>🔸Average concentration:</TextTitle>
              <TextContext>
                {isNaN(average(mapData.conper))
                  ? 0
                  : Number(average(mapData.conper))}
                %
              </TextContext>
            </ApiBox>
            <ApiBox>
              <TextTitle>🔸Average focus time:</TextTitle>
              <TextContext>
                {isNaN(average(mapData.focus))
                  ? 0
                  : Number(average(mapData.focus))}
                초
              </TextContext>
            </ApiBox>
            <ApiBox>
              <TextTitle>🔸Average unfocused time:</TextTitle>
              <TextContext>
                {isNaN(average(mapData.unfocus))
                  ? 0
                  : Number(average(mapData.unfocus))}
                초
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
