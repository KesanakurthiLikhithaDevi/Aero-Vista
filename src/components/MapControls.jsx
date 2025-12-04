import React from "react";
import "./map-controls.css";

export default function MapControls({layers, setLayers, showMarker, setShowMarker}){
  return (
    <div className="map-controls card">
      <div className="mc-row">
        <label>Base map</label>
        <select value={layers.base} onChange={e=>setLayers({...layers, base: e.target.value})}>
          <option value="osm">OpenStreetMap</option>
          <option value="topo">Topographic</option>
          <option value="sat">Satellite</option>
        </select>
      </div>

      <div className="mc-row">
        <label>Heatmap (placeholder)</label>
        <button className={`mc-btn ${layers.heat?"on":""}`} onClick={()=>setLayers({...layers, heat:!layers.heat})}>
          {layers.heat ? "On" : "Off"}
        </button>
      </div>

      <div className="mc-row">
        <label>Show marker</label>
        <button className={`mc-btn ${showMarker ? "on" : ""}`} onClick={()=>setShowMarker(!showMarker)}>
          {showMarker ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
