import React from "react";
import AddLocationIcon from "@mui/icons-material/AddLocation";
// import SearchIcon from "@mui/icons-material/Search";

function LocationBar() {
  const handleClick = () => {
    console.log("location icon clicked!");
  };

  return (
    <div>
      <AddLocationIcon onClick={handleClick} /> Set Your Location
    </div>
  );
}

export default LocationBar;
