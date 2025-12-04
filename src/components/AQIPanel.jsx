import React from "react";

export default function AQIPanel({ aqi=72, pm25=38 }){
  const label = aqi <= 50 ? "Good" : aqi <=100 ? "Moderate" : "Unhealthy";
  return (
    <div>
      <h4 style={{marginTop:0}}>AQI Now
        <span className="aqi-pill" style={{marginLeft:8}}>{aqi} <small style={{marginLeft:6,fontWeight:600}}> {label}</small></span>
      </h4>
      <div style={{color:"var(--muted)"}}>PM2.5 <div style={{fontWeight:700,fontSize:18}}>{pm25} µg/m³</div></div>
      <div style={{marginTop:8,color: "var(--muted)"}}><strong>Dominant</strong> PM2.5</div>
      <div style={{marginTop:12,color: "var(--muted)"}}>Sensitive groups should reduce outdoor exertion</div>
    </div>
  );
}
