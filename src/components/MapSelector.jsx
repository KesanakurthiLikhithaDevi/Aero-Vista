// src/components/MapSelector.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

export default function MapSelector({ lat, lon, onLocationChange }) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [position, setPosition] = useState([lat, lon]);

  // When map is clicked
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onLocationChange({ lat, lon: lng });
      }
    });
    return position ? <Marker position={position} /> : null;
  }

  // Autocomplete (Nominatim)
  async function handleTypeahead(q) {
    setSearch(q);
    if (q.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&addressdetails=1&limit=5`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error("Autocomplete failed:", err);
    }
  }

  // When user selects a suggestion
  function chooseSuggestion(item) {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);

    setPosition([lat, lon]);
    onLocationChange({ lat, lon });

    setSuggestions([]); // hide dropdown
    setSearch(item.display_name); // show selected name
  }

  return (
    <div style={{ position: "relative" }}>
      <input
        placeholder="Search place (typeahead)…"
        className="input"
        value={search}
        onChange={(e) => handleTypeahead(e.target.value)}
      />

      {/* dropdown */}
      {suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "46px",
            left: 0,
            width: "100%",
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            zIndex: 2000
          }}
        >
          {suggestions.map((s) => (
            <div
              key={s.place_id}
              onClick={() => chooseSuggestion(s)}
              style={{
                padding: "10px",
                cursor: "pointer",
                color: "white",
                borderBottom: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              {s.display_name}
            </div>
          ))}
        </div>
      )}

      <MapContainer
        center={position}
        zoom={11}
        style={{ height: "360px", width: "100%", marginTop: "10px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
