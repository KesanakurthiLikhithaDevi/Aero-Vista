// src/pages/ForecastPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import MapSelector from "../components/MapSelector";
import TimeSeriesChart from "../components/TimeSeriesChart";
import StationsLayer from "../components/StationsLayer";
import { downloadCSV, downloadJSON } from "../components/ExportHelpers";
import "../pages/forecast.css";

export default function ForecastPage() {
  const defaultCenter = [28.7041, 77.1025];
  const [center, setCenter] = useState(defaultCenter);
  const [latLon, setLatLon] = useState({ lat: defaultCenter[0], lon: defaultCenter[1] });

  const [no2Sat, setNo2Sat] = useState(9.3);
  const [o3Sat, setO3Sat] = useState(1.2);

  const [predicting, setPredicting] = useState(false);
  const [predictions, setPredictions] = useState(null);

  // stations UI state
  const [stationsRadius, setStationsRadius] = useState(20000); // meters
  const [stationsCount, setStationsCount] = useState(0);

  useEffect(()=> {}, []);

  function handleMapLocation(obj) {
    setLatLon({ lat: obj.lat, lon: obj.lon });
    setCenter([obj.lat, obj.lon]);
  }

  // optional small helper so child can tell us how many stations found (StationsLayer may optionally call this)
  function handleStationsCount(n) {
    setStationsCount(n ?? 0);
  }

  function mockPredict(no2_in, o3_in, lat, lon) {
    const labels = [];
    const no2 = [];
    const o3 = [];
    const lower = [];
    const upper = [];
    for (let h=0; h<24; h++) {
      labels.push(String(h).padStart(2,"0")+":00");
      const baseNo2 = no2_in + 0.3*h + Math.sin(h/3)*0.6 + ((lat-28.7)+(lon-77.1))*0.01;
      const baseO3 = o3_in + 0.08*h + Math.cos(h/5)*0.2;
      const noise = (Math.random()-0.5)*0.8;
      const valueNo2 = Math.max(0, +(baseNo2 + noise).toFixed(2));
      const valueO3 = Math.max(0, +(baseO3 + noise*0.5).toFixed(2));
      no2.push(valueNo2);
      o3.push(valueO3);
      const sigma = Math.max(0.5, valueNo2*0.08 + 0.3);
      lower.push(+(valueNo2 - sigma).toFixed(2));
      upper.push(+(valueNo2 + sigma).toFixed(2));
    }
    return { labels, no2, o3, lower, upper };
  }

  async function onPredict(e) {
    e && e.preventDefault();
    setPredicting(true);
    try {
      // simulate latency
      await new Promise(res => setTimeout(res, 600));
      const res = mockPredict(Number(no2Sat), Number(o3Sat), latLon.lat, latLon.lon);
      setPredictions(res);
    } catch (err) {
      console.error(err);
      alert("Prediction request failed (see console).");
    } finally {
      setPredicting(false);
    }
  }

  function onExportCSV() {
    if (!predictions) return alert("Run predict first.");
    const rows = predictions.labels.map((lab, i)=>({
      hour: lab,
      no2: predictions.no2[i],
      o3: predictions.o3[i],
      lower: predictions.lower[i],
      upper: predictions.upper[i]
    }));
    downloadCSV(rows, `aerovista_forecast_${Date.now()}.csv`);
  }
  function onExportJSON() {
    if (!predictions) return alert("Run predict first.");
    downloadJSON(predictions, `aerovista_forecast_${Date.now()}.json`);
  }

  // helper to programmatically move map from outside MapContainer
  function FlyToCenter({ position }) {
    const map = useMap();
    useEffect(() => {
      if (position && position.length === 2) {
        map.flyTo(position, Math.max(map.getZoom(), 11), { duration: 0.6 });
      }
    }, [position, map]);
    return null;
  }

  // station selected callback: set location & recenter
  function onSelectStation(st) {
    if (!st) return;
    handleMapLocation({ lat: st.lat, lon: st.lon });
    // we optionally can set center here (already done in handleMapLocation)
  }

  return (
    <div className="page-forecast container">
      <aside className="left-panel">
        <div className="location-card">
          <h3>Location</h3>
          <div>Lat<br/><strong>{latLon.lat.toFixed(4)}</strong></div>
          <div>Lon<br/><strong>{latLon.lon.toFixed(4)}</strong></div>
          <div style={{marginTop:8, fontSize:13, color:"#9fb7c9"}}>Nearby stations: <strong style={{color:"#fff"}}>{stationsCount}</strong></div>
        </div>

        <div className="selector-card">
          {["Current","Hourly","Maps","Monthly"].map(opt=>(
            <button key={opt} className={`option`}>{opt}</button>
          ))}
        </div>

        <div className="aqi-card aqi-panel">
          <div className="aqi-header">
            <h4>AQI Now</h4>
            <div className="aqi-value"><div className="aqi-num">48</div><div className="aqi-cat">Good</div></div>
          </div>
          <div className="aqi-details">
            <div className="aqi-row"><div className="label">PM2.5</div><div className="val">38 μg/m³</div></div>
            <div className="aqi-row"><div className="label">Dominant</div><div className="small">PM2.5</div></div>
          </div>
        </div>
      </aside>

      <section className="map-area">
        <div style={{display:"flex", gap:20, alignItems:"flex-start", marginBottom:16}}>
          <div style={{flex:1}}>
            <MapSelector lat={center[0]} lon={center[1]} onLocationChange={handleMapLocation} />
          </div>

          <div style={{width:320}}>
            <label>NO₂_satellite</label>
            <input className="input" value={no2Sat} onChange={(e)=>setNo2Sat(e.target.value)} />
            <label>O₃_satellite</label>
            <input className="input" value={o3Sat} onChange={(e)=>setO3Sat(e.target.value)} />

            <div style={{marginTop:10}}>
              <label style={{fontSize:13, color:"#9fb7c9"}}>Nearby radius: {(stationsRadius/1000).toFixed(0)} km</label>
              <input
                type="range"
                min={1}
                max={80}
                value={stationsRadius/1000}
                onChange={(e)=>setStationsRadius(Number(e.target.value)*1000)}
                style={{width:"100%"}}
              />
            </div>

            <div style={{display:"flex", gap:12, marginTop:12}}>
              <button className="btn primary" onClick={onPredict} disabled={predicting}>{predicting? "Predicting..." : "Predict"}</button>
              <button className="btn ghost" onClick={onExportCSV}>Export CSV</button>
              <button className="btn ghost" onClick={onExportJSON}>Export JSON</button>
            </div>
          </div>
        </div>

        <div className="map-card">
          <MapContainer center={center} zoom={11} style={{ height: "420px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={center} />
            {/* FlyTo ensures map recenters when `center` state changes */}
            <FlyToCenter position={center} />

            {/* Stations layer; it will draw markers + search circle.
                Pass center as object {lat, lon}, radius in meters,
                onSelectStation to allow using station as forecast location,
                and optional onStationsCount to receive number of stations found. */}
            <StationsLayer
              center={{ lat: latLon.lat, lon: latLon.lon }}
              radius={stationsRadius}
              onSelectStation={onSelectStation}
              onStationsCount={handleStationsCount} // optional; safe if ignored
            />
          </MapContainer>
        </div>

        <div className="forecast-panel">
          <h3>Hourly Forecast</h3>
          {predictions ? (
            <TimeSeriesChart
              labels={predictions.labels}
              series={[
                { name: "NO₂ (pred)", data: predictions.no2, color: "#2b9bff" },
                { name: "O₃ (pred)", data: predictions.o3, color: "#13e3b5" },
              ]}
              uncertainty={[predictions.lower, predictions.upper]}
            />
          ) : (
            <div className="notice">No predictions yet — click Predict to run model (mock frontend).</div>
          )}
        </div>

        <div className="bottom-cards">
          <div className="stat">TEMP<br/><strong>72°</strong></div>
          <div className="stat">WIND<br/><strong>8 mph</strong></div>
          <div className="stat">HUMIDITY<br/><strong>45%</strong></div>
          <div className="stat">PRECIP<br/><strong>0%</strong></div>
        </div>
      </section>
    </div>
  );
}
