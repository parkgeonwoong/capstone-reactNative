import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { BLUE } from "./Colors";
import UploadModal from "./UploadModal";

const Wrapper = styled.TouchableOpacity`
  position: absolute;
  width: 36px;
  height: 36px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background-color: ${BLUE};
  elevation: 3;
`;

const Block = styled.View`
  z-index: 5;
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  /* background-color: tomato; */
`;

const FloatingButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Block>
      <Wrapper onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="white" />
      </Wrapper>
      <UploadModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Block>
  );
};

export default FloatingButton;
