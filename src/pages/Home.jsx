import React from "react";
import "./home.css";

export default function Home() {
  return (
    <main className="hero">
      <section className="hero-premium">
        <div className="container hero-card premium">
          <div className="hero-left">
            <h1 className="hero-title">
              AeroVista — <span>Short-range Air Quality</span> Intelligence
            </h1>
            <p className="hero-lead">
              AeroVista merges satellite trace-gas retrievals with high-resolution meteorology and ML ensembles
              to produce hourly short-range forecasts. Inspect maps, AQI, and forecasts in the Launch Studio.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="/forecast">Open Forecast Studio</a>
              <a className="btn ghost" href="#features">Explore Features</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="glass-card large">
              <h4 style={{ margin: 0 }}>Live Satellite Feed</h4>
              <div className="mini">NO₂ · O₃ · HCHO</div>
            </div>
          </div>
        </div>
      </section>
      <section id="features" className="features-section">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">●</div>
              <h3>Satellite fusion</h3>
              <p>Tropospheric NO₂, HCHO, CO — fused with ML ensembles.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">●</div>
              <h3>Meteorology</h3>
              <p>High-resolution reanalysis & local weather integration.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">●</div>
              <h3>Modeling</h3>
              <p>Robust ML ensembles with uncertainty quantification.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
