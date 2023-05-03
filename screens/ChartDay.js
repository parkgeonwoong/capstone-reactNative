/**
 * @컴포넌트 : 일별 차트 페이지
 * @관련된컴포넌트 : Stats
 * @구현 : 파이 차트
 */

import React from "react";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { ChartContext, ChartScreen, ChartText, PieBox } from "../layout/Chart";

const ChartDay = ({ route }) => {
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  const data = [
    {
      name: "집중 시간",
      time: route.params.focustime,
      color: "#e63946",
      legendFontColor: "black",
      legendFontSize: 15,
    },
    {
      name: "집중 X 시간",
      time: route.params.unfocustime,
      color: "#a8dadc",
      legendFontColor: "black",
      legendFontSize: 15,
    },
  ];

  return (
    <ChartScreen style={{ marginBottom: "50" }}>
      <PieBox>
        <ChartText>"하루 어땠나요?"</ChartText>
        <ChartContext>{route.params.focusdate}</ChartContext>
        <ChartContext>
          {route.params.focustime + route.params.unfocustime}초 중..
        </ChartContext>
        <PieChart
          data={data}
          width={Dimensions.get("window").width - 15}
          height={250}
          chartConfig={chartConfig}
          accessor={"time"}
          backgroundColor={"#ffca3a"}
          paddingLeft={"15"}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </PieBox>
    </ChartScreen>
  );
};

export default ChartDay;
