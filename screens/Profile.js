/**
 * @컴포넌트 : 내 정보 확인
 * @관련된컴포넌트 : Mypage
 *
 * @FIXME:
 * 1. 로컬스토리지 호출하지말고 마이페이지에서 받아오는 방법으로 수정
 * 2. 안쓰는 코드 정리
 *
 * Route Params: https://reactnavigation.org/docs/params/
 */

import React, { useEffect, useState } from "react";
import { PROFILE_URL } from "../api/api";
import { Block, Btn, Title, Wrapper } from "../layout/Screen";

const Profile = ({ route }) => {
  const { userNo } = route.params;
  const [userData, setUserData] = useState({});
  const [reg, setReg] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${PROFILE_URL(userNo)}}`);
        const data = await response.json();
        setUserData(data);
        setReg(data.regidate.substring(0, 10));
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <Wrapper>
      <Block>
        <Btn>
          <Title style={{ opacity: 0.5 }}>🔸 아이디</Title>
          <Title>{userData.userid}</Title>
        </Btn>
        <Btn>
          <Title style={{ opacity: 0.5 }}>🔸 이름</Title>
          <Title>{userData.username}</Title>
        </Btn>
        <Btn>
          <Title style={{ opacity: 0.5 }}>🔸 생성 날짜</Title>
          <Title>{reg}</Title>
        </Btn>
      </Block>
    </Wrapper>
  );
};

export default Profile;
