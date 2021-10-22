import React, { useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Map() {
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

  useEffect(() => {
    location();
  });

  function location() {
    //check if Geolocation API is supported
    !navigator.geolocation
      ? alert("Your browser doesn't support Geolocation")
      : alert("Getting your location!");
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyBx3CmMKzArhN9tC7vKM2HPi1UcoXm0mjo">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      />
    </LoadScript>
  );
}

export default Map;
