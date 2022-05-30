/* 
@컴포넌트 이름: 홈 페이지에서 일감 추가 버튼
@관련된 컴포넌트: Home, UploadModal
*/

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
`;

const Block = styled.View`
  z-index: 5;
  position: absolute;
  bottom: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  /* background-color: tomato; */
`;

const FloatingButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Block>
      <Wrapper onPress={() => setModalVisible(true)} style={styles.shadow}>
        <Ionicons name="add" size={24} color="white" />
      </Wrapper>
      <UploadModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 3,
  },
});

export default FloatingButton;
