import { useEffect, useRef } from "react";

export const useInterval = (callback: ()=> void, Interval: number): void => {

  const callbackRef = useRef<() => void>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  },[callback])

  useEffect(() => {
    const tick = () => { callbackRef.current() } 
    const id = setInterval(tick, Interval);
    return () => {
      clearInterval(id);
    };
  }, []);
}