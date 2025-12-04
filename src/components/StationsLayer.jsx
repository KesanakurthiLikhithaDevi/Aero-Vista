// src/components/StationsLayer.jsx
import React, { useEffect, useState } from "react";
import { Marker, Popup, Circle } from "react-leaflet";

/*
  StationsLayer
  props:
    center: { lat, lon }    // center to search around
    radius: number (meters) // search radius, default 20000 (20 km)
    onSelectStation(station) // callback when user clicks "Use as location"
*/
export default function StationsLayer({ center, radius = 20000, onSelectStation }) {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!center || !center.lat || !center.lon) return;
    let mounted = true;

    async function fetchStations() {
      setLoading(true);
      try {
        // OpenAQ v2: locations endpoint supports coordinates + radius (in meters)
        const url = `https://api.openaq.org/v2/locations?coordinates=${center.lat},${center.lon}&radius=${radius}&limit=50&order_by=distance&sort=asc`;
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("OpenAQ fetch failed");
        const json = await resp.json();

        const list = (json?.results || []).map(loc => {
          // convert returned coordinate object shape to a consistent one
          const coords = loc.coordinates || { latitude: loc.latitude, longitude: loc.longitude };
          return {
            id: loc.id,
            name: loc.name || loc.location || "Station",
            lat: coords.latitude,
            lon: coords.longitude,
            distance: loc.distance, // if provided by API ordering
            params: (loc.parameters || []).map(p => ({ param: p.parameter, lastValue: p.lastValue, unit: p.unit })),
            lastUpdated: loc.lastUpdated || loc.firstUpdated || null,
            source: loc.sourceName || loc.source || "OpenAQ"
          };
        });

        if (mounted) setStations(list.length ? list : MOCK_STATIONS(center));
      } catch (err) {
        console.warn("Stations fetch failed, using mock", err);
        if (mounted) setStations(MOCK_STATIONS(center));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchStations();
    return () => { mounted = false; };
  }, [center?.lat, center?.lon, radius]);

  function handleUseStation(s) {
    if (onSelectStation) onSelectStation({ lat: s.lat, lon: s.lon, name: s.name });
  }

  return (
    <>
      {/* center circle showing search radius */}
      {center && (
        <Circle
          center={[center.lat, center.lon]}
          radius={radius}
          pathOptions={{ color: "rgba(60,160,200,0.25)", fillColor: "rgba(60,160,200,0.05)" }}
        />
      )}

      {/* station markers */}
      {stations.map(s => (
        <Marker key={s.id || `${s.lat}-${s.lon}`} position={[s.lat, s.lon]}>
          <Popup minWidth={220}>
            <div style={{ fontWeight: 700 }}>{s.name}</div>
            <div style={{ fontSize: 13, color: "#9fb7c9", marginBottom: 6 }}>{s.source}</div>
            <div style={{ fontSize: 13 }}>
              {s.params && s.params.length ? (
                <div>
                  <div style={{ fontWeight: 600, marginBottom:6 }}>Recent / Params</div>
                  <ul style={{ paddingLeft: 16, margin: 0 }}>
                    {s.params.slice(0,6).map((p, i) => (
                      <li key={i} style={{ marginBottom: 4 }}>
                        <strong>{p.param}</strong>: {p.lastValue ?? "—"} {p.unit ?? ""}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : <div style={{ color:"#c6d7e6" }}>No parameters available</div>}
            </div>

            <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button className="btn ghost" onClick={() => window.open(`https://openaq.org/#/location/${s.id}`, "_blank")}>Open</button>
              <button className="btn primary" onClick={() => handleUseStation(s)}>Use as location</button>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* loading-ish notice */}
      {loading && null}
    </>
  );
}


/* Simple mock if OpenAQ fails or is blocked (small set near center) */
function MOCK_STATIONS(center) {
  const { lat, lon } = center || { lat: 28.7041, lon: 77.1025 };
  return [
    {
      id: "mock-1",
      name: "Mock Station A",
      lat: lat + 0.02,
      lon: lon - 0.01,
      params: [{ param: "pm25", lastValue: 35, unit: "µg/m³" }, { param: "no2", lastValue: 18, unit: "ppb" }],
      source: "Mock"
    },
    {
      id: "mock-2",
      name: "Mock Station B",
      lat: lat - 0.012,
      lon: lon + 0.018,
      params: [{ param: "pm10", lastValue: 42, unit: "µg/m³" }, { param: "o3", lastValue: 14, unit: "ppb" }],
      source: "Mock"
    },
    {
      id: "mock-3",
      name: "Mock Station C",
      lat: lat + 0.03,
      lon: lon + 0.02,
      params: [{ param: "no2", lastValue: 24, unit: "ppb" }],
      source: "Mock"
    }
  ];
}
