import React from "react";
import { FlatList, Text, View } from "react-native";
import styled from "styled-components/native";

const ListWork = styled.FlatList`
  flex: 1;
`;

const WorkList = ({ works }) => {
  return (
    <ListWork
      data={works}
      renderItem={({ item }) => (
        <View>
          <Text>{item.text}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default WorkList;
