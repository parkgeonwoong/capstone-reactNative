/* 
@컴포넌트 이름: 일감 없는 경우 비어있는 페이지
@관련된 컴포넌트: Home
*/

import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { PINK } from "./Colors";

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Description = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${PINK};
`;

const Empty = () => {
  return (
    <Wrapper>
      <Ionicons name="create-outline" size={48} color="black" />
      <Description>Create new Work.</Description>
    </Wrapper>
  );
};

export default Empty;
