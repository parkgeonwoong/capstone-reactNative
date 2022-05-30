/* 
@컴포넌트 이름: 일감 매핑
@관련된 컴포넌트: WorkList
*/

import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const WrapperItem = styled.View`
  flex-direction: row;
  padding: 16px;
  align-items: center;
  background-color: tomato;
`;

const TimerBtn = styled.View`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border-width: 1px;
  margin-right: 16px;
`;

const ItemText = styled.Text`
  flex: 1;
  font-size: 16px;
`;

const WorkItem = ({ id, text, done }) => {
  return (
    <WrapperItem>
      <TimerBtn />
      <ItemText>{text}</ItemText>
    </WrapperItem>
  );
};

export default WorkItem;
