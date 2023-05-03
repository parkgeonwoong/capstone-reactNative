/**
 * @desc : 차트 레이아웃
 */

import styled from "styled-components/native";

export const ChartScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const PieBox = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const ChartText = styled.Text`
  font-size: 25px;
  font-family: "BMHANNAPro";
  letter-spacing: 1px;
`;

export const ChartContext = styled(ChartText)`
  font-size: 20px;
  color: ${(props) => props.theme.BLACK};
`;

export const LineBox = styled.View`
  flex: 1;
  padding: 10px;
`;

export const LineTitle = styled.Text`
  flex: 0.8;
  justify-content: center;
  align-items: center;
`;

export const ScrollBox = styled.ScrollView`
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;
