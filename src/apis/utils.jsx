import React, { useState, useEffect } from "react";
const uniqueKey = pre => {
  const _pre = pre || "";
  return (
    _pre +
    "-" +
    Math.random()
      .toString(36)
      .substr(2, 16)
  );
};

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

export { uniqueKey, useDebounce };
