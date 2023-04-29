/**
 * @컴포넌트 : 일감 없는 경우 비어있는 페이지
 * @관련된컴포넌트 : Home
 */

import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Empty = () => {
  return (
    <Wrapper>
      <Ionicons name="create-outline" size={48} color="black" />
      <Description>Empty</Description>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Description = styled.Text`
  margin-top: 12px;
  font-size: 25px;
  color: ${(props) => props.theme.RED};
  font-family: "BMHANNAPro";
`;

export default Empty;
