import React, { useState, useEffect } from "react";
const uniqueKey = (pre) => {
  const _pre = pre || "";
  return _pre + "-" + Math.random().toString(36).substr(2, 16);
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
  let year = date.getFullYear() || "0000";
  let month = date.getMonth() + 1 || "00";
  let day = date.getDate() || "00";
  let hour = date.getHours() || "00";
  let min = date.getMinutes() || "00";
  let sec = date.getSeconds() || "00";
  return (
    "" + year + "/" + month + "/" + day + "-" + hour + ":" + min + ":" + sec
  );
}

function renderTimeCell(text, record, index) {
  return <span>{ISODateToString(text)}</span>;
  //return <span>{text}</span>;
}

function dateCompare(a, b) {
  let dateA = new Date(a);
  let dateB = new Date(b);
  return isFinite(dateA) && isFinite(dateB)
    ? (dateA > dateB) - (dateA < dateB)
    : NaN;
}

export { uniqueKey, useDebounce, ISODateToString, renderTimeCell, dateCompare };
