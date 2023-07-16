import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";

function BudgetBox(props) {
  const { time, data } = props;

  function sum1() {
    let sum = 0;
    data.forEach((element) => {
      if (element.type === "income") {
        sum += Number(element.count);
      }
    });

    return sum;
  }

  function sum2() {
    let sum = 0;
    data.forEach((element) => {
      if (element.type === "outcome") {
        sum += Number(element.count);
      }
    });

    return sum;
  }

  function returnValue() {
    return {
      labels: ["Incomes", "Outcomes"],
      datasets: [
        {
          label: "",
          data: [sum1(), sum2()],
          backgroundColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        },
      ],
    };
  }

  const [dataPie, setDataPie] = useState(returnValue());

  useEffect(() => {
    setDataPie(returnValue());
  }, [data]);

  function getBudget() {
    let value = 0;

    data.forEach((element) => {
      if (element.type === "income") {
        value += Number(element.count);
      } else if (element.type === "outcome") {
        value -= Number(element.count);
      }
    });

    return value;
  }

  return (
    <div className="budget-box">
      <h1>Your Budget</h1>
      <div className="date">{time}</div>
      <div className="myBudget">
        <span className="myBudgetPrice">{getBudget()}</span> kn
      </div>
      <div className="chart">
        <PieChart pieData={dataPie} />
      </div>
    </div>
  );
}

export default BudgetBox;
