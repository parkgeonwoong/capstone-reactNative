/**
 * @desc : Timer 컴포넌트의 타이머 hook
 */

import { useCallback, useRef, useState } from "react";
import { DEEP_URL } from "../../api/api";

export const useCounter = (initialValue, ms, user) => {
  const [count, setCount] = useState(initialValue);
  const [starting, setStarting] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    setStarting(true);
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, ms);
  }, []);

  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    setStarting(false);

    fetch(`${DEEP_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Ready: 0,
        getuserNo: user,
      }),
    }).then((response) => response.json());
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    stop();
  }, []);

  return { count, starting, start, stop, reset };
};
