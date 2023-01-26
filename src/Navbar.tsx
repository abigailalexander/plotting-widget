import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/line">Line Plots</Link>
        </li>
        <li>
          <Link to="/timeseries">TimeSeries Plots</Link>
        </li>
        <li>
          <Link to="/scatter">Scatter Plots</Link>
        </li>
        <li>
          <Link to="/video">Video</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;