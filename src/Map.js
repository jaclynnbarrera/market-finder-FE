import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Map() {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734,
  };

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
