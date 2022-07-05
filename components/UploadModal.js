/* 
@컴포넌트 이름: 모달창
@관련된 컴포넌트: Home, FloatingButton
*/

import React, { useState } from "react";
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const UploadModal = ({ visible, onClose, onInsert }) => {
  const [text, setText] = useState("");

  const onPress = () => {
    onInsert(text);
    setText("");
    Keyboard.dismiss();
  };
  // console.log(text);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Text style={styles.title}>카테고리</Text>
          <TextInput
            placeholder="제목을 입력하세요."
            style={styles.input}
            value={text}
            onChangeText={setText}
            onSubmitEditing={onPress}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0,0,0,0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteBox: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    fontFamily: "BMHANNAPro",
  },

  input: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
});

export default UploadModal;
