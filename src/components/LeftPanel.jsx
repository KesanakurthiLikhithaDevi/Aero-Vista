import React from "react";

export default function LeftPanel(){
  return (
    <>
      <div className="card location-card">
        <h3>Location</h3>
        <div style={{marginTop:12}}>Lat<br/><strong>28.7041</strong><br/>Lon<br/><strong>77.1025</strong></div>
      </div>

      <div className="card" style={{marginTop:20}}>
        <div className="controls">
          <div className="control-btn">Current</div>
          <div className="control-btn">Hourly</div>
          <div className="control-btn">Maps</div>
          <div className="control-btn">Monthly</div>
        </div>
      </div>
    </>
  );
}
