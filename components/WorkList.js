/* 
@컴포넌트 이름: 일감 리스트
@관련된 컴포넌트: Home, WorkItem
*/

import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import WorkItem from "./WorkItem";

const ListWork = styled.FlatList`
  flex: 1;
  width: 100%;
`;

const WorkList = ({ works, onToggle, onRemove }) => {
  return (
    <FlatList
      style={styles.list}
      data={works}
      renderItem={({ item }) => (
        <WorkItem
          id={item.id}
          text={item.text}
          done={item.done}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
  },
});

export default WorkList;
