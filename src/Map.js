import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Map() {
  const [currentPosition, setCurrentPosition] = useState({});

  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  useEffect(() => {
    !navigator.geolocation
      ? alert("Your browser doesn't support Geolocation")
      : navigator.geolocation.getCurrentPosition(success, err);
  });

  function success(position) {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  }

  function err() {
    alert("Failed to get your location");
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyBx3CmMKzArhN9tC7vKM2HPi1UcoXm0mjo">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={11}
        center={currentPosition}
      />
    </LoadScript>
  );
}

export default Map;