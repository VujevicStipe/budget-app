import React from "react";

function DataBox(props) {
  const { type, description, count, date } = props.data;

  return (
    <div className={`data-box ${type}`}>
      <div className="left">
        <div className="data-date">{date}</div>
        <div className="data-description">{description}</div>
      </div>
      <div className="data-value-box">
        <span className="data-value">{count}</span> kn
      </div>
    </div>
  );
}

export default DataBox;
