/**
 * @컴포넌트 : 내 정보 페이지
 * @관련된 컴포넌트: Tabs, Profile
 * @구현: 회원 정보 확인, 회원 정보 삭제
 *
 * @FIXME:
 * 1. 안쓰는 코드 정리
 * 2. styled-components 적용하기
 */

import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DELETE_URL } from "../api/api";
import { Block, Btn, IconArrow, Title, Wrapper } from "../layout/Screen";

const Mypage = () => {
  const [userNo, setUserNo] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      try {
        const result = await AsyncStorage.getItem("id");
        const userInfo = JSON.parse(result);
        setUserNo(userInfo.userno);
      } catch (err) {
        console.log(`${err} 마이페이지 AsyncStorage 가져오기 실패`);
      }
    };
    load();
  }, []);

  const handleDeleteBtn = async () => {
    try {
      const response = await fetch(`${DELETE_URL(userNo)}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        alert("정상적으로 탈퇴했습니다.");
        AsyncStorage.multiRemove(["id", "works"]);
        navigation.replace("SignIn");
      } else {
        alert("데이터가 없습니다.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Block>
        <Btn onPress={() => navigation.push("Profile", { userNo: userNo })}>
          <Title>🔸 내 정보 확인하기</Title>
          <IconArrow />
        </Btn>
        <Btn onPress={handleDeleteBtn}>
          <Title>🔸 탈퇴하기</Title>
          <IconArrow />
        </Btn>
      </Block>
    </Wrapper>
  );
};

export default Mypage;
