/* 
@컴포넌트 이름: 메인 페이지
@관련된 컴포넌트: Tabs, 다른 Navigation, FloatingButton
*/

import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import styled from "styled-components";
import { BG_COLOR } from "../components/Colors";
import Empty from "../components/Empty";
import FloatingButton from "../components/FloatingButton";
import WorkList from "../components/WorkList";
import LogContext from "../contexts/LogContext";

const FullScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${BG_COLOR};
`;

const Block = styled.View`
  width: 90%;
  height: 90%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: white;
`;

const Home = () => {
  // 전역 작업 상태 useContext
  const { works, setWorks } = useContext(LogContext);
  // 작업 상태
  // const [works, setWorks] = useState([
  //   { id: 1, text: "ReactNative Test", done: true },
  //   { id: 2, text: "ReactNative Test2", done: false },
  // ]);

  // 새 작업 등록
  const onInsert = (text) => {
    const nextId =
      works.length > 0 ? Math.max(...works.map((work) => work.id)) + 1 : 1;
    const work = {
      id: nextId,
      text,
      done: false,
      count: 0,
    };
    setWorks(works.concat(work));
  };

  // 작업 완료 토글
  const onToggle = (id) => {
    const nextWorks = works.map((work) =>
      work.id === id ? { ...work, done: !work.done } : work
    );
    setWorks(nextWorks);
  };

  // 작업 삭제
  const onRemove = (id) => {
    const nextWorks = works.filter((work) => work.id !== id);
    setWorks(nextWorks);
  };

  return (
    <FullScreen>
      <Block style={styles.shadow}>
        {works === null || works.length === 0 ? (
          <Empty />
        ) : (
          <WorkList works={works} onToggle={onToggle} onRemove={onRemove} />
        )}
        <FloatingButton onInsert={onInsert} />
      </Block>
    </FullScreen>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 0.5,
  },
});

export default Home;
