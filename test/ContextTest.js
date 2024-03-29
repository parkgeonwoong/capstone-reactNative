import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LogContext = createContext(null);

export const LogContextProvider = ({ children }) => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const rawWorks = await AsyncStorage.getItem("works");
        const savedWorks = JSON.parse(rawWorks) || [];
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
      return prevWorks.map((work) => {
        if (work.id === id) {
          return { ...work, done: !work.done };
        } else {
          return work;
        }
      });
    });
  };

  const updateWork = (id, text) => {
    setWorks((prevWorks) => {
      return prevWorks.map((work) => {
        if (work.id === id) {
          return { ...work, text };
        } else {
          return work;
        }
      });
    });
  };

  return (
    <LogContext.Provider
      value={{ works, addWork, removeWork, toggleWork, updateWork }}
    >
      {children}
    </LogContext.Provider>
  );
};
