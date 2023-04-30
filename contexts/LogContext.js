/**
 * @컴포넌트 : 내비게이션을 위한 전역 상태 관리
 * @관련된컴포넌트 : App
 *
 * @FIXME:
 * 1. Context 이해를 통한 리팩토링
 * 2. 값이 계속 Null로 들어가는 문제 해결
 *
 * 3. 생성, 삭제, 토글 기능이 Context에서 재사용하는 방법 고민 → 유지보수가 편리할 것 같음
 */

import React, { useEffect } from "react";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LogContext = createContext(null);

export const LogContextProvider = ({ children }) => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const rawWorks = await AsyncStorage.getItem("works");
        const savedWorks = JSON.parse(rawWorks) || []; // 이게 null로 반환이여서 []로 초기화
        setWorks(savedWorks);
      } catch (e) {
        console.log("저장된 작업 불러오기 실패");
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function save() {
      try {
        await AsyncStorage.setItem("works", JSON.stringify(works));
      } catch (e) {
        console.log("작업 저장 실패");
      }
    }
    save();
  }, [works]);

  // @TODO:
  const addWork = (text) => {
    const nextId =
      works.length > 0 ? Math.max(...works.map((work) => work.id)) + 1 : 1;
    const newWork = {
      id: nextId,
      text,
      done: false,
      count: 0,
    };
    setWorks((prevWorks) => [...prevWorks, newWork]);
  };

  const removeWork = (id) => {
    setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
  };

  const toggleWork = (id) => {
    setWorks((prevWorks) => {
      return prevWorks.map((work) =>
        work.id === id ? { ...work, done: !work.done } : work
      );
    });
  };

  return (
    <LogContext.Provider value={{ works, addWork, removeWork, toggleWork }}>
      {children}
    </LogContext.Provider>
  );
};
