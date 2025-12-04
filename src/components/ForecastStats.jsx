// src/components/ForecastStats.jsx
import React from "react";
import "./forecast-stats.css";

export default function ForecastStats({ label, value, small }) {
  return (
    <div className="fv-stat">
      <div className="fv-stat-label">{label}</div>
      <div className={`fv-stat-value ${small ? "small" : ""}`}>{value}</div>
    </div>
  );
}
