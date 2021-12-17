import React, { useState, useEffect } from "react";
import LeftNav from "./LeftNav";
import TopBar from "./TopBar";
import Map from "./Map";
import RightBar from "./RightBar";

export default function Location() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 39.8097343,
    lng: -98.5556199,
  });

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    !navigator.geolocation
      ? alert("Your browser doesn't support Geolocation")
      : navigator.geolocation.getCurrentPosition(success, err);
  };

  const success = (position) => {
    const current = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentLocation(current);
    setButtonClicked(true);
  };

  const err = () => alert("Failed to get your location");

  return (
    <div className="parent">
      <LeftNav />
      <TopBar func={handleClick} />
      <Map location={currentLocation} clicked={buttonClicked} />
      <RightBar />
    </div>
  );
}
