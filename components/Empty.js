import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Description = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #ff006e;
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
