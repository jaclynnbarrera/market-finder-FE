import React from "react";
import MapIcon from "@mui/icons-material/Map";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

function LeftNav() {
  return (
    <div className="leftnav">
      <h1 className="app-name">MARKET FINDER</h1>
      <div className="menu-item">
        <MapIcon />
        <p>Map</p>
      </div>

      <div className="menu-item">
        <FavoriteIcon />
        <p>Favorites</p>
      </div>

      <div className="menu-item">
        <ManageAccountsIcon />
        <p>Account</p>
      </div>

      <div className="menu-item">
        <LogoutIcon />
        <p>Logout</p>
      </div>
    </div>
  );
}

export default LeftNav;
