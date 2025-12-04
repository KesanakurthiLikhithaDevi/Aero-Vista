import React from "react";

const features = [
  { title: "Satellite fusion", text: "Tropospheric NO₂, HCHO, CO — fused with ML ensembles." },
  { title: "Meteorology", text: "High-resolution reanalysis & local weather integration." },
  { title: "Modeling", text: "Robust ML ensembles with uncertainty quantification." },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="feature-grid">
      {features.map((f, i) => (
        <div key={i} className="feature-card">
          <div className="feature-icon">●</div>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </div>
      ))}
    </section>
  );
}
