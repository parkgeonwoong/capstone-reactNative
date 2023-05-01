/**
 * @컴포넌트 : 일감 매핑
 * @관련된컴포넌트 : WorkList
 *
 * @FIXME:
 * 1. 안쓰는 코드 제거 및 리팩토링 필요
 */

import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Alert } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

const WorkItem = ({ id, text, count, done, onToggle, onRemove }) => {
  const navigation = useNavigation();
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
      {/* 누르기 상호 작용을 감지 */}
      <PressItem
        onPress={() => {
          done
            ? null
            : navigation.navigate("Cameras", { id: id, count: count });
        }}
        onLongPress={remove}
      >
        {/* 비디오 */}
        <Icons
          name="videocam"
          style={[{ flex: 0.8 }, done ? { color: "#9e9e9e" } : null]}
        />

        {/* 타이틀 */}
        <ItemText style={done ? styles.lineThrough : null}>{text}</ItemText>

        {/* 체크박스 */}
        <TextBtn onPress={() => onToggle(id)}>
          {done ? (
            <Icons name="checkbox-outline" />
          ) : (
            <Icons name="square-outline" />
          )}
        </TextBtn>
      </PressItem>
    </WrapperItem>
  );
};

const styles = StyleSheet.create({
  lineThrough: {
    color: "#9e9e9e",
    textDecorationLine: "line-through",
  },
});

const WrapperItem = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 16px;
  align-items: center;
`;

const PressItem = styled.Pressable`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ItemText = styled.Text`
  flex: 3;
  font-size: 16px;
  letter-spacing: 1px;
  font-family: "BMHANNAPro";
  padding-bottom: 10px;
  margin-left: 10px;
`;

const TextBtn = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const Icons = styled(Ionicons)`
  flex: 1;
  text-align: center;
  font-size: 28px;
  color: ${(props) => props.theme.BLACK};
`;

export default WorkItem;
