import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler/build/OutsideClickHandler';
import { padZero } from "./padZero";

export const types = {
  text: 'text',
  time: 'time',
  number: 'number'
};

const parseTime = (time) => {
  if (!time) return "XX:XX:XX";
  var date = new Date(time);
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();

  return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
};

const parseValue = (value, type) => {
  if(type === types.time) return parseTime(value);
  return value;
}


export const Editable = ({type, value, onChange}) => {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(parseValue(value, type));
  return editing ? (
    <OutsideClickHandler onOutsideClick={() => setEditing(false)}>
      <input className="small"
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if(type === types.time){
            const [hours, minutes, seconds] = tempValue.split(':');
            const date = new Date();
            date.setHours(hours, minutes, seconds);
            onChange(date.valueOf());
          } else {
            onChange(tempValue);
          }
          setEditing(false);
        }
      }}
    ></input></OutsideClickHandler>
  ) : (
    <span onClick={() => {
      setTempValue(parseValue(value, type));
      setEditing(true);
    }}>{parseValue(value, type)}</span>
  );
}