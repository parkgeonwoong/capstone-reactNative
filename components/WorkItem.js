/* 
@컴포넌트 이름: 일감 매핑
@관련된 컴포넌트: WorkList
*/

import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const WrapperItem = styled.View`
  flex-direction: row;
  padding: 16px;
  align-items: center;
`;

const TimerBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

const ItemText = styled.Text`
  flex: 1;
  font-size: 16px;
`;

const WorkItem = ({ id, text, done }) => {
  const navigation = useNavigation(); // Hook: Screen으로 사용되지 않는 컴포넌트에 navigation 객체 사용
  return (
    <WrapperItem>
      <TimerBtn onPress={() => navigation.navigate("Cameras")}>
        <Ionicons name="videocam" size={24} color="black" />
      </TimerBtn>
      <ItemText>{text}</ItemText>
    </WrapperItem>
  );
};

export default WorkItem;
