/**
 * @컴포넌트 : 홈 페이지에서 일감 추가 버튼
 * @관련된컴포넌트 : Home, UploadModal
 *
 * @FIXME:
 * 1. 버튼의 기능이니까 데이터를 받아오지 않게 수정
 * 2. 전반적인 리팩토링
 * 3. 모달창 닫기 수정할 필요 있음
 */

import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import UploadModal from "./UploadModal";

const FloatingButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Block>
      <Wrapper onPress={() => setModalVisible(true)} style={{ elevation: 3 }}>
        <Icons name="add" />
      </Wrapper>
      <UploadModal visible={modalVisible} onClose={setModalVisible} />
    </Block>
  );
};

const Block = styled.View`
  flex: 1;
  z-index: 5;
  position: absolute;
  bottom: 12px;
  right: 10px;
  width: 48px;
  height: 48px;
`;

const Wrapper = styled.TouchableOpacity`
  position: absolute;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: ${(props) => props.theme.RED};
`;

const Icons = styled(Ionicons)`
  color: white;
  font-size: 24px;
`;

export default FloatingButton;
