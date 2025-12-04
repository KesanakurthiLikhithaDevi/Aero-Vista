// src/components/HourlyChart.jsx
import React from "react";
import "./hourly-chart.css"; // we will include css in forecast.css as well

// simple mock hourly data (0-23). We'll show first 12 hours for UI.
const mock = [10, 20, 30, 42, 60, 55, 45, 38, 35, 28, 22, 18]; // example values

export default function HourlyChart({ hours = mock }) {
  // normalize to percentage for bar heights
  const max = Math.max(...hours, 1);

  return (
    <div className="hourly-chart">
      <div className="hc-header">
        <h4>Hourly Forecast (mock)</h4>
        <div className="hc-controls">
          <button aria-label="prev">◀</button>
          <button aria-label="next">▶</button>
        </div>
      </div>

      <div className="hc-bars">
        {hours.map((v, i) => {
          const h = Math.round((v / max) * 100);
          const label = `${i}:00`;
          return (
            <div key={i} className="hc-bar-item">
              <div className="hc-bar-wrap">
                <div className="hc-bar" style={{ height: `${h}%` }}>
                  <span className="hc-val">{v}</span>
                </div>
              </div>
              <div className="hc-label">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
