import iconarrow from "./assets/images/icon-arrow.svg";
import "./App.css";
import { useState } from "react";

const isValidDate = (day, month, year) => {
  const today = new Date();
  return (
    day > 0 &&
    day <= 31 &&
    month > 0 &&
    month <= 12 &&
    year >= 1970 &&
    year <= today.getFullYear()
  );
};

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const calculateDateDifference = (enteredDate, currentDate) => {
    const yearsDiff =
      currentDate.getFullYear() -
      enteredDate.getFullYear() -
      (currentDate.getMonth() < enteredDate.getMonth() ||
      (currentDate.getMonth() === enteredDate.getMonth() &&
        currentDate.getDate() < enteredDate.getDate())
        ? 1
        : 0);

    const monthsDiff =
      currentDate.getMonth() -
      enteredDate.getMonth() +
      (currentDate.getDate() < enteredDate.getDate() ? -1 : 0);

    const daysDiff =
      currentDate.getDate() - enteredDate.getDate() < 0
        ? 30 + currentDate.getDate() - enteredDate.getDate()
        : currentDate.getDate() - enteredDate.getDate();

    return { yearsDiff, monthsDiff, daysDiff };
  };
  const today = new Date();
  const currentDate = new Date(year, month - 1, day);

  const { yearsDiff, monthsDiff, daysDiff } = isValidDate(day, month, year)
    ? calculateDateDifference(currentDate, today)
    : { yearsDiff: 0, monthsDiff: 0, daysDiff: 0 };

  return (
    <div className="App">
      <div className="container">
        <div className="inp">
          <label>Day</label>
          <input
            type="number"
            placeholder="DD"
            min={1}
            max={31}
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            required
          />
          {!isValidDate(day, month, year) && <span>Invalid Day</span>}
        </div>
        <div className="inp">
          <label>Month</label>
          <input
            type="number"
            placeholder="MM"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            required
          />
          {!isValidDate(day, month, year) && <span>Invalid Month</span>}
        </div>
        <div className="inp">
          <label>Year</label>
          <input
            type="number"
            min={1970}
            max={today.getFullYear()}
            placeholder="YYYY"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />
          {!isValidDate(day, month, year) && <span>Invalid Year</span>}
        </div>
      </div>
      <div className="border"></div>
      <img src={iconarrow} className="arrow" alt="Icon Arrow" />
      <div className="text">
        <p>
          <span>
            {isValidDate(day, month, year)
              ? yearsDiff >= 0
                ? `${yearsDiff} `
                : ""
              : "-- "}
          </span>
          years
        </p>
        <p>
          <span>
            {isValidDate(day, month, year)
              ? monthsDiff > 0
                ? `${monthsDiff} `
                : monthsDiff === 0
                ? "0 "
                : `${12 + monthsDiff} `
              : "-- "}
          </span>
          months
        </p>
        <p>
          <span>
            {isValidDate(day, month, year)
              ? daysDiff > 0
                ? `${daysDiff} `
                : daysDiff === 0
                ? "0 "
                : `${30 + daysDiff} `
              : "--"}
          </span>
          days
        </p>
      </div>
    </div>
  );
}

export default App;
