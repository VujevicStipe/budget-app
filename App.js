import React, { useState, useEffect } from "react";
import "./App.css";
import BudgetBox from "./components/BudgetBox";
import DataBox from "./components/DataBox";

function App() {
  const [dateTime, setDateTime] = useState(returnDataTime());
  const [inputValue, setInputValue] = useState(returnData());
  const [datas, setDatas] = useState([]);
  const api_url = "https://6418648575be53f451de4794.mockapi.io";

  function returnDataTime() {
    const date = new Date();

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  function returnData() {
    return {
      type: "",
      description: "",
      count: 0,
      date: returnDataTime(),
    };
  }

  function handleChange(e) {
    e.preventDefault();

    const { name, type, value, checked } = e.target;

    setInputValue((prev) => {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // setDatas((prev) => [...prev, inputValue]);

    const budget = JSON.stringify(inputValue);

    fetch(api_url + "/Budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: budget,
    })
      .then((response) => response.json())
      .then((data) => setDatas((prev) => [...prev, data]));

    setInputValue(returnData());
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(returnDataTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTime]);

  useEffect(() => {
    fetch(api_url + "/Budget")
      .then((response) => response.json())
      .then((data) => setDatas(data));
  }, []);

  return (
    <div className="budget-tracker-div">
      <BudgetBox time={dateTime} data={datas} />
      <div className="budget-track-box">
        <h1>Track Your Budget</h1>
        <form className="expenses" onSubmit={(e) => handleSubmit(e)}>
          <select
            className="type"
            name="type"
            value={inputValue.type}
            onChange={handleChange}
          >
            <option value="-">Select Type</option>
            <option value="income">Income</option>
            <option value="outcome">Outcome</option>
          </select>
          <h3>Tracking Expenses</h3>
          <input
            type="text"
            name="description"
            className="description"
            placeholder="Description"
            value={inputValue.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="count"
            className="value"
            placeholder="Value"
            value={inputValue.count}
            onChange={handleChange}
          />
          <button className="submit">Submit</button>
        </form>

        <div className="data">
          {datas.map((data, index) => {
            return <DataBox data={data} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
