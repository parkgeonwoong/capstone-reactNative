/**
 * @desc : Stats의 캘린더 컴포넌트
 */

import { useState } from "react";
import { Agenda } from "react-native-calendars";
import { DAY_URL } from "../api/api";
import {
  CalendarBox,
  IconView,
  ApiBox,
  Box,
  SelectBtn,
  SelectItem,
  TextContext,
  TextTitle,
} from "../layout/Stat";
import { Ionicons } from "@expo/vector-icons";

const Calendar = ({ userNo, today, navigation }) => {
  const dummy = {
    "2023-05-03": [
      { con_per: 10, focustime: 20, unfocustime: 5, focusdate: "2023-05-03" },
    ],
  };

  const [items, setItems] = useState(dummy);

  // 특정 날짜만 가져오기
  const getTodayData = async (date) => {
    try {
      const response = await fetch(`${DAY_URL(userNo, date)})}`);
      const data = await response.json();
      setItems(data);
    } catch (err) {
      alert("데이터가 없습니다.");
    }
  };

  const handleDayPress = (day) => {
    getTodayData(day);
  };

  const AgendaItem = (item) => {
    return (
      <SelectBtn
        onPress={() =>
          navigation.push("ChartDay", {
            focusdate: item.focusdate,
            focustime: item.focustime,
            unfocustime: item.unfocustime,
          })
        }
      >
        <Box>
          <SelectItem>
            <ApiBox>
              <TextTitle>🔸집중도:</TextTitle>
              <TextContext>{item.con_per.toFixed(1)}%</TextContext>
            </ApiBox>
            <ApiBox>
              <TextTitle>🔸집중 시간:</TextTitle>
              <TextContext>{item.focustime}초</TextContext>
            </ApiBox>
            <ApiBox>
              <TextTitle>🔸집중 안한 시간:</TextTitle>
              <TextContext>{item.unfocustime}초</TextContext>
            </ApiBox>
          </SelectItem>
          <IconView>
            <Ionicons name="arrow-forward" size={24} color="black" />
          </IconView>
        </Box>
      </SelectBtn>
    );
  };

  return (
    <CalendarBox>
      <Agenda
        items={items}
        renderItem={AgendaItem}
        selected={today}
        onDayPress={(day) => handleDayPress(day.dateString)}
        minDate={"2022-03-01"}
        maxDate={"2023-08-01"}
        pastScrollRange={12}
        futureScrollRange={12}
      />
    </CalendarBox>
  );
};

export default Calendar;
