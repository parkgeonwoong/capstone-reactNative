/* 
@컴포넌트 이름: 일감 매핑
@관련된 컴포넌트: WorkList
*/

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BLACK, RED } from "./Colors";

const WrapperItem = styled.View`
  flex-direction: row;
  padding: 16px;
  align-items: center;
`;

const TimerBtn = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  /* background-color: skyblue; */
`;

const ItemText = styled.Text`
  flex: 3;
  font-size: 16px;
  letter-spacing: 1px;
  font-family: "BMHANNAPro";
  padding-bottom: 10px;
`;
const TextBtn = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const WorkItem = ({ id, text, count, done, onToggle, onRemove }) => {
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
          done
            ? null
            : navigation.navigate("Cameras", { id: id, count: count });
        }}
        onLongPress={remove}
      >
        <Ionicons
          name="videocam"
          size={28}
          color={BLACK}
          style={[{ flex: 0.8 }, done ? { color: "#9e9e9e" } : null]}
        />
        <ItemText style={done ? styles.lineThrough : null}>{text}</ItemText>
        <TextBtn onPress={() => onToggle(id)}>
          {done ? (
            <Ionicons name="checkbox-outline" size={28} color={BLACK} />
          ) : (
            <Ionicons name="square-outline" size={28} color={BLACK} />
          )}
        </TextBtn>
      </TimerBtn>
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
