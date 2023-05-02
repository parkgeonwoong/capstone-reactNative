/**
 * @컴포넌트 : 랭크 페이지
 * @관련된 컴포넌트 : Tabs
 *
 * @FIXME:
 * 1. 리팩토링 (useEffect, 스타일 컴포넌트)
 * 2. 중복되는 렌더링 최소화 (map)
 */

import React, { useEffect, useState } from "react";
import { RANK_URL } from "../api/api";
import { Block, Btn, Title, Wrapper } from "../layout/Screen";
import styled from "styled-components/native";

const Rank = () => {
  const [mappedName, setMappedName] = useState([]);
  const [mappedID, setMappedID] = useState([]);
  const [mappedTotal, setMappedTotal] = useState([]);

  const medal = ["🥇", "🥈", "🥉"];

  useEffect(() => {
    const rank = async () => {
      try {
        const response = await fetch(`${RANK_URL}`);
        const data = await response.json();
        const mappingName = data.map((item) => item.username);
        const mappingID = data.map((item) => item.userid);
        const mappingTotal = data.map((item) => item.focustime);

        setMappedName(mappingName);
        setMappedID(mappingID);
        setMappedTotal(mappingTotal);
      } catch (error) {
        console.log(error);
      }
    };
    rank();
  }, []);

  return (
    <Wrapper>
      <Block>
        {medal.map((item, index) => {
          return (
            <Btn key={index}>
              <Context>
                <RankTitle>{item}</RankTitle>
                <RankTitle>
                  {mappedName[index]} ({mappedID[index]})
                </RankTitle>
              </Context>
              <Context>
                <RankTitle>{mappedTotal[index]}</RankTitle>
              </Context>
            </Btn>
          );
        })}
      </Block>
    </Wrapper>
  );
};

const Context = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RankTitle = styled(Title)`
  font-size: 20px;
`;

export default Rank;
