import { useState } from "react";
import "./App.css";
import { SkierRow } from "./SkierRow";
import { Clock } from "./Clock";
import { Registration } from "./Registration";
import { CSV } from "./CSV";

const getState = () => {
  const stored = localStorage.getItem("ideal.ski");
  if (stored) {
    const parsed = JSON.parse(stored);
    if(parsed.length) return parsed;
  }
  return [
    {
      startNumber: 1,
      name: "Håkon Berg",
      start: null,
      lap: null,
      finish: null,
    },
  ];
};

const setState = (skiers) => {
  localStorage.setItem("ideal.ski", JSON.stringify(skiers));
};

function App() {
  const [skiers, setSkiers] = useState(getState());
  const [showRegistration, setShowRegistration] = useState(false);
  const [showCSV, setShowCSV] = useState(false);

  const updateSkierState = (newSkiers) => {
    newSkiers.forEach((skier) => {
      if (skier.finish) {
        skier.diff = diff(skier);
      }
    });
    setState(newSkiers);
    setSkiers(newSkiers);
  };

  const forward = (skier) => {
    const allSkiers = [...skiers];
    const index = allSkiers.findIndex(
      (s) => s.startNumber === skier.startNumber
    );
    if (index > -1) {
      if (!skier.start) {
        allSkiers[index].start = Date.now();
      } else if (!skier.lap) {
        allSkiers[index].lap = Date.now();
      } else if (!skier.finish) {
        allSkiers[index].finish = Date.now();
      }
      updateSkierState(allSkiers);
    }
  };

  const back = (skier) => {
    const allSkiers = [...skiers];
    const index = allSkiers.findIndex(
      (s) => s.startNumber === skier.startNumber
    );
    if (index > -1) {
      if (skier.finish) {
        allSkiers[index].finish = null;
      } else if (skier.lap) {
        allSkiers[index].lap = null;
      } else if (skier.start) {
        allSkiers[index].start = null;
      }
      updateSkierState(allSkiers);
    }
  };

  const removeRunner = (index) => {
    const allSkiers = [...skiers];
    allSkiers.splice(index, 1);
    updateSkierState(allSkiers);
  };

  const propCorrection = (index, prop, value) => {
    const allSkiers = [...skiers];
    allSkiers[index][prop] = value;
    updateSkierState(allSkiers);
  };

  const diff = (skier) =>
    Math.abs(
      Math.floor(skier.lap / 1000) -
        Math.floor(skier.start / 1000) -
        (Math.floor(skier.finish / 1000) - Math.floor(skier.lap / 1000))
    );

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ marginLeft: 10 }}>Skiers: {skiers.length}</span>
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              checked={showRegistration}
              onChange={(e) => setShowRegistration(e.target.checked)}
            />
            Registration
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="form-check-input"
              type="checkbox"
              checked={showCSV}
              onChange={(e) => setShowCSV(e.target.checked)}
            />
            Show CSV
          </label>
        </div>

        <Clock />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  const sorted = [...skiers].sort(
                    (a, b) => Number(a.startNumber) - Number(b.startNumber)
                  );
                  updateSkierState(sorted);
                }}
              >
                Start number
              </button>
            </th>
            <th>Name</th>
            <th>Start</th>
            <th>Lap</th>
            <th>Finish</th>
            <th style={{ textAlign: "right" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  const sorted = [...skiers].sort((a, b) => a.diff - b.diff);
                  let position = 1;
                  let currentDiff = sorted[0].diff;
                  sorted.forEach((skier, index) => {
                    if (skier.diff !== currentDiff) {
                      position = index + 1;
                      currentDiff = skier.diff;
                    }
                    skier.position = position;
                  });
                  updateSkierState(sorted);
                }}
              >
                Results
              </button>
            </th>
            <th style={{ textAlign: "right" }}>Diff</th>
            <th>State</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {skiers.map((skier, index) => (
            <SkierRow
              startNumber={skier.startNumber}
              name={skier.name}
              start={skier.start}
              lap={skier.lap}
              finish={skier.finish}
              diff={skier.diff}
              position={skier.position}
              key={skier.startNumber}
              propCorrection={(prop, value) => {
                propCorrection(index, prop, value);
              }}
              onChange={(goForward) =>
                goForward ? forward(skier) : back(skier)
              }
              removeRunner={() => removeRunner(index)}
            />
          ))}
        </tbody>
      </table>
      {showRegistration && (
        <Registration
          lastNumber={skiers[skiers.length - 1].startNumber}
          addSkier={(skier) => {
            const newSkiers = [...skiers, skier];
            updateSkierState(newSkiers);
          }}
        />
      )}
      {showCSV && <CSV skiers={skiers} />}
    </div>
  );
}

export default App;
