/**
 * @컴포넌트 : 일감 리스트
 * @관련된컴포넌트 : Home, WorkItem
 *
 * @FIXME:
 * 1. Context를 활용한 리팩토링
 *
 * ❓ 의구심?
 * - Context에서 데이터를 받아오면 되긴하는데, FlatList 경우 맵핑해야 하니까 props로 전달하는게 맞지 않나?
 * - 혹시 context에서 하는 방법이 있을까??
 */

import React, { useContext } from "react";
import styled from "styled-components/native";
import WorkItem from "./WorkItem";
import { LogContext } from "../contexts/LogContext";

const WorkList = ({ onToggle, onRemove }) => {
  const { works } = useContext(LogContext);

  return (
    <WorkFlatList
      data={works}
      renderItem={({ item }) => (
        <WorkItem
          id={item.id}
          text={item.text}
          count={item.count}
          done={item.done}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const WorkFlatList = styled.FlatList`
  flex: 1;
  width: 100%;
`;

export default WorkList;
