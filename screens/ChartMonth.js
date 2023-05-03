/**
 * @컴포넌트 : 월별 차트 페이지
 * @관련된컴포넌트 : Stats
 * @구현 : 라인 차트
 */

import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  ChartContext,
  ChartScreen,
  ChartText,
  LineBox,
  LineTitle,
  ScrollBox,
} from "../layout/Chart";

const ChartMonth = ({ route }) => {
  const conData = route.params.con_per;

  const lineCharData = {
    labels: route.params.focusdate,
    datasets: [
      {
        data: route.params.con_per,
      },
    ],
  };

  if (route.params.focusdate.length == 0) {
    return (
      <ChartScreen>
        <ChartText>데이터가 없습니다.</ChartText>
      </ChartScreen>
    );
  }

  return (
    <ChartScreen>
      <LineBox>
        <LineTitle>
          <ChartText>
            "{route.params.focusdate[0].substring(6, 7)}월 어땠나요?"
          </ChartText>
          <ChartContext>
            이번달 가장 높은 집중도: {Math.max(...conData)}%
          </ChartContext>
        </LineTitle>
        <View style={{ height: Dimensions.get("window").height / 2 }}>
          <ScrollBox
            horizontal={true}
            contentOffset={{ x: 10000, y: 0 }} // 스크롤이 시작이 아닌 끝에서 시작 되어야 했습니다.
            showHorizontalScrollIndicator={false} // 스크롤 막대를 숨기려면
          >
            <LineChart
              data={lineCharData}
              width={
                (lineCharData.labels.length * Dimensions.get("window").width) /
                3
              } // from react-native
              height={Dimensions.get("window").height / 2}
              yAxisLabel="" // y좌표 접두어
              yAxisSuffix="%" // y좌표 접미어
              yAxisInterval={1} // optional, defaults to 1, 간격??
              fromZero={true}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1, // optional, defaults to 2dp, y좌표 소수점
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                borderRadius: 16,
              }}
            />
          </ScrollBox>
        </View>
      </LineBox>
    </ChartScreen>
  );
};

export default ChartMonth;
