import React from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import { BAR_COLOR } from "../components/Colors";
import Empty from "../components/Empty";
import FloatingButton from "../components/FloatingButton";

const FullScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BAR_COLOR};
`;

const Block = styled.View`
  width: 90%;
  height: 90%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: white;
  elevation: 2;
`;

const Home = () => {
  return (
    <FullScreen>
      <Block>
        <FloatingButton />
        <Empty />
        {/* <Text>Home</Text> */}
      </Block>
    </FullScreen>
  );
};

export default Home;
