import "../src/styling/TopBar.css";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function TopBar(props) {
  const handleSubmit = () => {
    console.log("submitted");
  };

  const handleChange = () => {
    console.log("changed");
  };

  return (
    <div className="topbar">
      <button className="button" onClick={props.func}>
        <p>Use Current Location</p>
      </button>
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
        <LocationOnIcon style={{ fill: "#588157" }} />
        <p>
          {props.cityState.city}, {props.cityState.state}
        </p>
      </div>
      <div className="item">
        <WbSunnyIcon style={{ fill: "#588157" }} />
        <p>{props.temp} &#8457;</p>
      </div>
      <div className="item">
        <AccessTimeIcon style={{ fill: "#588157" }} />
        <p>5:05PM</p>
      </div>
    </div>
  );
}

export default TopBar;
