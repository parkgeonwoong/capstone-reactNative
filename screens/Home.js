/**
 * @컴포넌트 : 메인 페이지
 * @관련된컴포넌트 : Tabs, 다른 Navigation, FloatingButton
 *
 * @FIXME:
 * 1. 리팩토링 필요 (null처리 고치기, Context 받아온 데이터처리)
 * 2. 기능적인 부분 수정 필요 (새작업 기능)
 */

import React, { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import styled from "styled-components/native";
import Empty from "../components/Empty";
import FloatingButton from "../components/FloatingButton";
import WorkList from "../components/WorkList";

const Home = () => {
  const { works, setWorks } = useContext(LogContext);
  console.log(works);

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
      <Block>
        {works.length === 0 ? (
          <Empty />
        ) : (
          <WorkList works={works} onToggle={onToggle} onRemove={onRemove} />
        )}
        <FloatingButton onInsert={onInsert} />
      </Block>
    </FullScreen>
  );
};

const FullScreen = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.BG_COLOR};
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

export default Home;
