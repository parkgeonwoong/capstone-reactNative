/* 
@컴포넌트 이름: 일별 차트 페이지
@관련된 컴포넌트: Stats
@구현: 파이 차트 
*/

import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { BLACK } from "../components/Colors";

const ChartDay = ({ route }) => {
  // console.log(route.params);
  // console.log(route.params.focustime + route.params.unfocustime);

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
    <View style={styles.fullScreen}>
      <View style={styles.chartBox}>
        <Text style={styles.text}>"하루 어땠나요?"</Text>
        <Text style={[styles.text, { fontSize: 20, color: BLACK }]}>
          {route.params.focusdate}
        </Text>
        <Text style={[styles.text, { fontSize: 20, color: BLACK }]}>
          {route.params.focustime + route.params.unfocustime}초 중..
        </Text>
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
          // center={[10, 50]}
          // absolute
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  chartBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    // backgroundColor: "tomato",
  },
  text: {
    fontSize: 25,
    fontFamily: "BMHANNAPro",
    letterSpacing: 1,
  },
});

export default ChartDay;
