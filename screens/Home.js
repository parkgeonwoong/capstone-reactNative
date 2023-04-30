/**
 * @컴포넌트 : 메인 페이지
 * @관련된컴포넌트 : Tabs, 다른 Navigation, FloatingButton
 *
 * @FIXME:
 * 1. 리팩토링 필요 (null처리 고치기, Context 받아온 데이터처리)
 * 2. 기능적인 부분 수정 필요 (새작업 기능)
 * 3. Home에서 하는 작업이 많고, Context에서 전역적으로 불러오니까 개선할 필요가 있음 → 유지보수 편리하게
 */

import React, { useContext } from "react";
import { LogContext } from "../contexts/LogContext";
import styled from "styled-components/native";
import Empty from "../components/Empty";
import FloatingButton from "../components/FloatingButton";
import WorkList from "../components/WorkList";

const Home = () => {
  const { works } = useContext(LogContext);

  return (
    <FullScreen>
      <Block>
        {works.length === 0 ? <Empty /> : <WorkList />}
        <FloatingButton />
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
