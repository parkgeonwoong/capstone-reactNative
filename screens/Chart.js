import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const Chart = ({ route }) => {
  console.log(route.params);

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 0, // optional, defaults to 2dp, y좌표 소수점
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    // strokeWidth: 2, // optional, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false, // optional
  };

  const data = [
    {
      name: "Seoul",
      population: 215,
      color: "#3a86ff",
      legendFontColor: "white",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 280,
      color: "#ff006e",
      legendFontColor: "white",
      legendFontSize: 15,
    },
  ];

  const lineCharData = {
    labels: [
      "2022-07-08",
      "2022-07-08",
      "March",
      "April",
      "May",
      "June",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
    ],
    datasets: [
      {
        data: [1, 5, 12, 4, 20, 6, 1, 5, 12, 4, 100, 6],
      },
    ],
  };

  return (
    <View style={styles.fullScreen}>
      <View style={styles.chartBox}>
        <Text>Bezier Line Chart</Text>
        <ScrollView
          horizontal={true}
          contentOffset={{ x: 10000, y: 0 }} // 스크롤이 시작이 아닌 끝에서 시작 되어야 했습니다.
          showHorizontalScrollIndicator={false} // 스크롤 막대를 숨기려면
        >
          <LineChart
            data={lineCharData}
            width={
              (lineCharData.labels.length * Dimensions.get("window").width) / 3
            } // from react-native
            height={220}
            yAxisLabel="" // y좌표 접두어
            yAxisSuffix="%" // y좌표 접미어
            yAxisInterval={1} // optional, defaults to 1, 간격??
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp, y좌표 소수점
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
              // marginVertical: 8,
              borderRadius: 16,
              // paddingVertical: 10,
              // paddingHorizontal: 20,
              // backgroundColor: "tomato",
            }}
          />
        </ScrollView>
      </View>
      <View style={styles.chartBox}>
        <Text>Pie Chart</Text>
        <PieChart
          data={data}
          width={Dimensions.get("window").width - 15}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"#ffa726"}
          paddingLeft={"15"}
          style={{
            // backgroundColor: "white",
            marginVertical: 8,
            borderRadius: 16,
            // elevation: 1,
          }}
          // center={[10, 50]}
          // absolute
        />
      </View>
      <Text>차트 페이지</Text>
      <Text>차트 페이지</Text>
      <Text>차트 페이지</Text>
      <Text>차트 페이지</Text>
      <Text>차트 페이지</Text>
      <Text>{route.params.userno}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    // backgroundColor: "tomato",
  },
});

export default Chart;
