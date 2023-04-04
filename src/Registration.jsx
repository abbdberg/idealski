import React, { useState } from "react";

export const Registration = ({ lastNumber, addSkier }) => {
  const [startNumber, setStartNumber] = useState(Number(lastNumber) + 1);
  const [name, setName] = useState("");
  return (
    <>
      <form
        style={{ marginBottom: 10 }}
        className="align-items-center"
        onSubmit={(e) => {
          e.preventDefault();
          addSkier({
            name,
            startNumber,
            start: null,
            lap: null,
            finish: null,
          });
          setStartNumber(Number(startNumber) + 1);
          setName("");
        }}
      >
        <div
          className="row g-3"
          style={{
            position: "fixed",
            top: 10,
            padding: 10,
            background: "#eee",
          }}
        >
          <div className="col">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Start number"
              aria-label="Start number"
              style={{ width: 70 }}
              value={startNumber}
              onChange={(e) => setStartNumber(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              style={{ width: 300 }}
              className="form-control form-control-sm"
              placeholder="Skier"
              aria-label="Skier"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 10,
          bottom: 0,
          width: 200,
          overflow: "auto",
        }}
      >
      </div>
    </>
  );
};
