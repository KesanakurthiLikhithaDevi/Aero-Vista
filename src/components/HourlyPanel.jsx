import React from "react";

export default function HourlyPanel({ hourly = [] }){
  // only show first 8 as a simple view
  const show = hourly.slice(0,8);
  return (
    <div style={{marginTop:12}}>
      <div className="hourly-bars">
        {show.map(h => (
          <div key={h.hour} style={{textAlign:"center"}}>
            <div className="hourbar" style={{height: 40 + (h.no2/ (Math.max(...show.map(s=>s.no2)) || 1)) * 120}}>
            </div>
            <div className="hour-label">{String(h.hour).padStart(2,"0")}:00</div>
          </div>
        ))}
      </div>
    </div>
  );
}
