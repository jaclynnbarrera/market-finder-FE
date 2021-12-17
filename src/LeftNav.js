import React from "react";
import MapIcon from '@mui/icons-material/Map';

function LeftNav() {
  return (
    <div className="leftnav">
      <h1 className="app-name">MARKET FINDER</h1>
      <div className="menu-item" >
      <MapIcon/>
      <p>Map</p>
      </div>

      <p>Favorites</p>
      <p>Account</p>
      <p>Logout</p>
    </div>
  );
}

export default LeftNav

