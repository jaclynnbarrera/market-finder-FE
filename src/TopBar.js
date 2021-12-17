import "../src/styling/TopBar.css";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function TopBar() {
  const handleSubmit = () => {
    console.log("submitted");
  };

  const handleChange = () => {
    console.log("changed");
  };
  return (
    <div className="topbar">
      <button className="button">Use Current Location</button>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="zip"
            type="text"
            onChance={handleChange}
            placeholder="Set Your Zip Code"
          />
        </form>
      </div>
      <div className="item">
        <LocationOnIcon />
        <p>New York, New York</p>
      </div>
      <div className="item">
        <WbSunnyIcon />
        <p>Temperature</p>
      </div>
      <div className="item">
        <AccessTimeIcon />
        <p>5:05PM</p>
      </div>
    </div>
  );
}

export default TopBar;
