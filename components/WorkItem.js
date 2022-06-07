/* 
@컴포넌트 이름: 일감 매핑
@관련된 컴포넌트: WorkList
*/

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BLACK, RED } from "./Colors";

const WrapperItem = styled.View`
  flex-direction: row;
  padding: 16px;
  align-items: center;
`;

const TimerBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;
const TextBtn = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
`;

const ItemText = styled.Text`
  flex: 1;
  font-size: 16px;
`;

const RemovePlace = styled.View`
  width: 28px;
  height: 28px; /* background-color: chocolate; */
`;

const WorkItem = ({ id, text, done, onToggle, onRemove }) => {
  const navigation = useNavigation(); // Hook: Screen으로 사용되지 않는 컴포넌트에 navigation 객체 사용
  const remove = () => {
    Alert.alert(
      "삭제",
      "정말로 삭제하시겠어요?",
      [
        { text: "취소", onPress: () => {} },
        {
          text: "삭제",
          onPress: () => {
            onRemove(id);
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  return (
    <WrapperItem>
      <TimerBtn
        onPress={() => {
          done ? null : navigation.navigate("Cameras", { id: id });
        }}
      >
        <Ionicons
          name="videocam"
          size={28}
          color={BLACK}
          style={done ? { color: "#9e9e9e" } : null}
        />
      </TimerBtn>
      <TextBtn onPress={() => onToggle(id)}>
        <ItemText style={done ? styles.lineThrough : null}>{text}</ItemText>
        {done ? (
          <TouchableOpacity onPress={remove}>
            <Ionicons name="trash-bin" size={28} color={BLACK} />
          </TouchableOpacity>
        ) : (
          <RemovePlace />
        )}
      </TextBtn>
    </WrapperItem>
  );
};

const styles = StyleSheet.create({
  lineThrough: {
    color: "#9e9e9e",
    textDecorationLine: "line-through",
  },
});

export default WorkItem;
