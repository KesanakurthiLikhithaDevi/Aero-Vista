import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ForecastPage from "./pages/ForecastPage";
import "./index.css";

export default function App() {
  return (
    <div className="app-root">
      <nav className="topnav">
        <div className="logo"><Link to="/">AeroVista</Link></div>
        <div className="navlinks">
          <Link to="/">Home</Link>
          <Link to="/forecast">Launch Studio</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forecast" element={<ForecastPage />} />
      </Routes>
    </div>
  );
}
