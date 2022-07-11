/* 
@컴포넌트 이름: 월별 차트 페이지
@관련된 컴포넌트: Stats
@구현: 라인 차트 
*/

import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { BLACK, RED } from "../components/Colors";

const ChartMonth = ({ route }) => {
  // console.log(route.params);
  // console.log(route.params.con_per);
  // console.log(route.params.focusdate);
  const conData = route.params.con_per;

  const lineCharData = {
    labels: route.params.focusdate,
    datasets: [
      {
        data: route.params.con_per,
      },
    ],
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.chartBox}>
        <View style={styles.title}>
          <Text style={styles.text}>
            "{route.params.focusdate[0].substring(6, 7)}월 어땠나요?"
          </Text>
          <Text style={[styles.text, { fontSize: 20, color: BLACK }]}>
            이번달 가장 높은 집중도: {Math.max(...conData)}%
          </Text>
        </View>
        <View style={{ height: Dimensions.get("window").height / 2 }}>
          <ScrollView
            horizontal={true}
            contentOffset={{ x: 10000, y: 0 }} // 스크롤이 시작이 아닌 끝에서 시작 되어야 했습니다.
            showHorizontalScrollIndicator={false} // 스크롤 막대를 숨기려면
            contentContainer={styles.scrollBox}
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
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chartBox: {
    flex: 1,
    padding: 10,
    // backgroundColor: "tomato",
  },
  title: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "tomato",
  },
  text: {
    fontSize: 25,
    fontFamily: "BMHANNAPro",
    letterSpacing: 1,
  },
  scrollBox: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChartMonth;
