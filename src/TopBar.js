import "../src/styling/TopBar.css";
import React from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";

function TopBar() {
  const handleSubmit = () => {
    console.log("submitted");
  };

  const handleChange = () => {
    console.log("changed");
  };
  return (
    <div className="topbar">
      <button className="button">
        <AddLocationIcon />
        Use Current Location
      </button>
      <form onSubmit={handleSubmit}>
        <input
          className="button"
          type="text"
          onChance={handleChange}
          placeholder="Set Your Zip Code"
        />
      </form>
    </div>
  );
}

export default TopBar;
