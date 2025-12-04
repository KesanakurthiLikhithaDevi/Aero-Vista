import React from "react";

export default function HeroPremium() {
  return (
    <section className="hero hero-premium">
      <div className="hero-card premium">
        <div className="hero-left">
          <h1 className="hero-title">
            AeroVista — <span>Air Quality</span> Forecast Intelligence
          </h1>

          <p className="hero-lead">
            Merge satellite trace-gas retrievals with high-resolution meteorology and ML ensembles to produce
            hourly short-range forecasts. Inspect maps, AQI, and forecasts in the Launch Studio.
          </p>

          <div className="hero-actions">
            <a className="btn primary pulse" href="/forecast">Open Forecast Studio</a>
            <a className="btn ghost" href="#features">Explore Features</a>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-value">72°</div>
              <div className="stat-label">TEMP</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">8 mph</div>
              <div className="stat-label">WIND</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">45%</div>
              <div className="stat-label">HUMIDITY</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">0%</div>
              <div className="stat-label">PRECIP</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="glass-card large">
            <h4 style={{margin:0}}>Live Satellite Feed</h4>
            <div className="mini">NO₂ · HCHO · CO</div>
          </div>
        </div>
      </div>
    </section>
  );
}
