import React from "react";
import { createContext, useState } from "react";

const LogContext = createContext();

export const LogContextProvider = ({ children }) => {
  //   const [text, setText] = useState("");
  const [works, setWorks] = useState([
    { id: 1, text: "ReactNative Test", done: true },
    { id: 2, text: "ReactNative Test2", done: false },
  ]);

  console.log("🧩전역 works 상태: ", works);

  return (
    <LogContext.Provider value={{ works, setWorks }}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
