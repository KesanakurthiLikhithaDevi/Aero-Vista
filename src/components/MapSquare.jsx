// src/components/MapSquare.jsx
import React from "react";

export default function MapSquare(){
  return (
    <div style={{
      width:"100%",
      height:"480px",
      background: "linear-gradient(180deg,#0b1b2b,#07111a)",
      borderRadius:12,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      color:"rgba(255,255,255,0.6)"
    }}>
      <div style={{textAlign:"center"}}>
        <div style={{fontWeight:700, fontSize:20}}>Map placeholder</div>
        <div style={{fontSize:14, opacity:0.7}}>Add Leaflet map here (MapSquare)</div>
      </div>
    </div>
  );
}
