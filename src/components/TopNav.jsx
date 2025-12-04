import React from "react";
import { Link } from "react-router-dom";

export default function TopNav(){
  return (
    <header className="topnav container">
      <div className="logo"><Link to="/">AeroVista</Link></div>
      <nav className="navlinks">
        <Link to="/">Home</Link>
        <Link to="/forecast">Launch Studio</Link>
      </nav>
    </header>
  );
}
