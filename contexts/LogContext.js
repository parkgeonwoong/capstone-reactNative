/* 
@컴포넌트 이름: 내비게이션을 위한 전역 상태 관리 
@관련된 컴포넌트: App
*/

import React, { useEffect } from "react";
import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LogContext = createContext();

export const LogContextProvider = ({ children }) => {
  //   const [text, setText] = useState("");
  const [works, setWorks] = useState([]);

  // console.log(works);

  useEffect(() => {
    async function load() {
      try {
        const rawWorks = await AsyncStorage.getItem("works");
        const savedWorks = JSON.parse(rawWorks);
        console.log(savedWorks);
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

  return (
    <LogContext.Provider value={{ works, setWorks }}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
