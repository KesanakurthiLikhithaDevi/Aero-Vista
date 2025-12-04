import React from "react";

export default function WeatherHero(){
  return (
    <div style={{minWidth:220, marginLeft:22}}>
      <div className="card" style={{padding:18}}>
        <div style={{fontSize:12, color:"var(--muted)"}}>Current weather</div>
        <div style={{fontSize:36, fontWeight:800, marginTop:8}}>23<span style={{fontSize:16}}>°C</span></div>
        <div style={{color:"var(--muted)", marginTop:8}}>Sunny</div>
      </div>
    </div>
  );
}
