/* eslint-disable no-restricted-globals */
import React from "react";
import { Editable, types } from "./Editable";

const getState = (start, lap, finish) => {
  if (!start) return "NotStarted";
  if (!lap) return "Started";
  if (!finish) return "Lapped";
  return "Finished";
};

export const SkierRow = ({
  startNumber,
  name,
  start,
  lap,
  finish,
  position,
  diff,
  onChange,
  propCorrection,
  removeRunner
}) => {
  const state = getState(start, lap, finish);
  const style = {};
  if (state === "Finished") {
    style.backgroundColor = "#f3e5bf";
  }
  return (
    <tr style={style}>
      <td>
        <Editable
          type={types.text}
          value={startNumber}
          onChange={(newStartNumber) =>
            propCorrection("startNumber", newStartNumber)
          }
        />
      </td>
      <td>
        <Editable
          type={types.text}
          value={name}
          onChange={(newName) => propCorrection("name", newName)}
        />
      </td>
      <td>
        <Editable
          type={types.time}
          value={start}
          onChange={(newTime) => propCorrection("start", newTime)}
        />
      </td>
      <td>
        <Editable
          type={types.time}
          value={lap}
          onChange={(newTime) => propCorrection("lap", newTime)}
        />
      </td>
      <td>
        <Editable
          type={types.time}
          value={finish}
          onChange={(newTime) => propCorrection("finish", newTime)}
        />
      </td>
      <td style={{ textAlign: "right" }}>
        <span>{position}</span>
      </td>
      <td style={{ textAlign: "right" }}>
        <span>{diff}</span>
      </td>
      <td>
        <button type="button" className="btn back" href="#" onClick={() => onChange(false)}>
          Back
        </button>
        <button type="button" className={`btn ${state}`} href="#" onClick={() => onChange(true)}>
          {state}
        </button>
      </td>
      <td><a className="btn btn-danger" style={{alignSelf:"end"}} onClick={() => {
        confirm('Are your sure?') && removeRunner();
      }}>Delete</a></td>
    </tr>
  );
};
