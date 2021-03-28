import { useRef, useEffect } from "react";

export const usePageUnload = (onUnload = () => {}) => {
  const cb = useRef(onUnload);

  // Set the current reference to whatever the onUnload function is
  // if the function changes
  useEffect(() => {
    cb.current = onUnload;
  }, [onUnload]);

  useEffect(() => {
    // "Curry" arguments into onUnload function for the event listener
    const onUnload = (...args) => {
      if (cb.current) cb.current(...args);
    };

    // Create the event listener
    window.addEventListener("beforeunload", onUnload);

    // useEffect runs returned functions as "cleanup" a-la componentWillUnmount
    // so, return the removeEventListener function
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);
};
