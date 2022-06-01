/* 
@컴포넌트 이름: 메인 페이지
@관련된 컴포넌트: Tabs, 다른 Navigation, FloatingButton
*/

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import { BG_COLOR } from "../components/Colors";
import Empty from "../components/Empty";
import FloatingButton from "../components/FloatingButton";
import WorkList from "../components/WorkList";

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
  // 작업 상태
  const [works, setWorks] = useState([
    { id: 1, text: "ReactNative Test", done: true },
    { id: 2, text: "ReactNative Test2", done: false },
  ]);

  // 항목 등록
  const onInsert = (text) => {
    const nextId =
      works.length > 0 ? Math.max(...works.map((work) => work.id)) + 1 : 1;
    const work = {
      id: nextId,
      text,
      done: false,
    };
    setWorks(works.concat(work));
  };

  return (
    <FullScreen>
      <Block style={styles.shadow}>
        {works.length === 0 ? <Empty /> : <WorkList works={works} />}
        <FloatingButton onInsert={onInsert} />
      </Block>
    </FullScreen>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 2,
  },
});

export default Home;
