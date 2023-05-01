/**
 * @컴포넌트 : 모달창
 * @관련된 컴포넌트: Home, FloatingButton
 *
 * @FIXME:
 * 1. Context로 받아오기
 * 2. 스타일, 코드 리팩토링
 * 3. 모달창 닫기 주변 클릭시 없어질려면 어떻게 해야할까? → TouchableOpacity가 두번 감싸져야 한다.
 */

import React, { useContext, useState } from "react";
import { Keyboard, Modal } from "react-native";
import { LogContext } from "../contexts/LogContext";
import styled from "styled-components/native";

const UploadModal = ({ visible, onClose }) => {
  const [text, setText] = useState("");
  const { addWork } = useContext(LogContext);

  const onPress = () => {
    addWork(text);
    setText("");
    Keyboard.dismiss();
    onClose(!visible);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onClose(!visible)}
    >
      <Block onPress={() => onClose(!visible)}>
        <Box style={{ elevation: 2 }} onPress={() => {}}>
          <Title>카테고리</Title>
          <Input
            placeholder="제목을 입력하세요."
            value={text}
            onChangeText={setText}
            onSubmitEditing={() => onPress()}
            returnKeyType="done"
          />
        </Box>
      </Block>
    </Modal>
  );
};

const Block = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

const Box = styled.TouchableOpacity`
  width: 300px;
  background-color: white;
  border-radius: 10px;
`;

const Title = styled.Text`
  padding: 8px;
  font-size: 16px;
  font-family: "BMHANNAPro";
`;

const Input = styled.TextInput`
  padding: 8px;
`;

export default UploadModal;
