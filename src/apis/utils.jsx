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

//2020/02/01-12:44:01
function ISODateToString(text) {
  if (!text) return "";
  let date = new Date(text);
  let year = date.getFullYear() || "";
  let month = date.getMonth() || "";
  let day = date.getDay() || "";
  let hour = date.getHours() || "";
  let min = date.getMinutes() || "";
  let sec = date.getSeconds() || "";
  return (
    "" + year + "/" + month + "/" + day + "-" + hour + ":" + min + ":" + sec
  );
}

function renderTimeCell(text, record, index) {
  return <span>{ISODateToString(text)}</span>;
}

export { uniqueKey, useDebounce, ISODateToString, renderTimeCell };
