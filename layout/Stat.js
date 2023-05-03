/**
 * @desc : 통계 레이아웃
 */

import styled from "styled-components/native";

export const StatScreen = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.BG_COLOR};
`;

export const CalendarBox = styled.View`
  flex: 1.8;
`;

export const SelectBtn = styled.TouchableOpacity`
  flex: 1;
  background-color: white;
  margin: 10px;
  padding: 20px;
  border-radius: 15px;
  justify-content: center;
  align-items: flex-start;
`;

export const Box = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SelectItem = styled.View`
  flex: 1;
  margin-left: 15px;
  justify-content: center;
`;

export const ApiBox = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const TextTitle = styled.Text`
  font-size: 15px;
  padding: 3px;
  margin-right: 10px;
  font-family: "BMHANNAPro";
  opacity: 0.8;
`;

export const TextContext = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.RED};
  font-family: "BMHANNAPro";
`;

export const MonthBox = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const LeftMonth = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
`;

export const LeftText = styled.Text`
  font-size: 20px;
  font-family: "BMHANNAPro";
  color: #00bbf2;
  letter-spacing: 1px;
`;

export const RightMonth = styled.TouchableOpacity`
  flex: 4;
  margin-right: 10px;
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 15px;
  background-color: white;
`;

export const LeftWrapper = styled.View`
  flex: 1;
  margin-left: 15px;
  margin-bottom: 5px;
`;

export const IconView = styled.View``;
