import "../src/styling/TopBar.css";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function TopBar(props) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    //parent function to handle zip api call
    //check for full 5 zip
    props.zipfunc(input);
  };

  const handleChange = (e) => {
    //check for only positive integers, no decimals or alphabet
    setInput(e.target.value);
  };

  return (
    <div className="topbar">
      <button className="button" onClick={props.coordsfunc}>
        <p>Use Current Location</p>
      </button>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="zip"
            type="text"
            onChange={handleChange.bind(this)}
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
        <p>{props.time}</p>
      </div>
    </div>
  );
}

export default TopBar;
