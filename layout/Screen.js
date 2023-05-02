/**
 * @desc : 정보, 설정 등 공통적으로 사용되는 스타일컴포넌트
 */

import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.BG_COLOR};
`;

export const Block = styled.View`
  flex: 1;
  margin-top: 10px;
`;

export const Btn = styled.TouchableOpacity`
  margin: 10px;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`;

export const Title = styled.Text`
  font-size: 15px;
  letter-spacing: 1px;
  font-family: "BMHANNAPro";
  opacity: 0.8;
`;

export const IconArrow = styled(Ionicons).attrs({ name: "arrow-forward" })`
  font-size: 24px;
  color: ${(props) => props.theme.BLACK};
`;
