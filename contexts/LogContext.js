/* 
@컴포넌트 이름: 내비게이션을 위한 전역 상태 관리 
@관련된 컴포넌트: App
*/

import React from "react";
import { createContext, useState } from "react";

const LogContext = createContext();

export const LogContextProvider = ({ children }) => {
  //   const [text, setText] = useState("");
  const [works, setWorks] = useState([
    { id: 1, text: "ReactNative Test", count: 10, done: true },
    { id: 2, text: "ReactNative Test2", count: 200, done: false },
  ]);

  // console.log("🧩전역 works 상태: ", works);

  return (
    <LogContext.Provider value={{ works, setWorks }}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
