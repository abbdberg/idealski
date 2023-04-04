/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { padZero } from "./padZero";

export const Clock = () => {
  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const seconds = date.getSeconds();
      const minutes = date.getMinutes();
      const hours = date.getHours();
      setTime(`${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return <div>{time}</div>;
};
