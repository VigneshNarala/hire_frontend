import React from "react";
import "../index.css";

const Card = ({ title, value, color }) => {
  return (
    <div className="card-glass">
      <h4 className="card-title">{title}</h4>
      <h2 className="card-value" style={{ color }}>
        {value}
      </h2>
    </div>
  );
};

export default Card;
