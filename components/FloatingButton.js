/* 
@컴포넌트 이름: 홈 페이지에서 일감 추가 버튼
@관련된 컴포넌트: Home, UploadModal
*/

import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { BLUE, RED } from "./Colors";
import UploadModal from "./UploadModal";
import { LogContext } from "../contexts/LogContext";

const Wrapper = styled.TouchableOpacity`
  position: absolute;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: ${RED};
`;

const Block = styled.View`
  flex: 1;
  z-index: 5;
  position: absolute;
  bottom: 12px;
  right: 10px;
  width: 48px;
  height: 48px;
  /* background-color: tomato; */
`;

const FloatingButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { addWork } = useContext(LogContext);

  return (
    <Block>
      <Wrapper onPress={() => setModalVisible(true)} style={styles.shadow}>
        <Ionicons name="add" size={24} color="white" />
      </Wrapper>
      <UploadModal
        visible={modalVisible}
        // onClose={() => setModalVisible((prev) => !prev)}
        onInsert={addWork}
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
