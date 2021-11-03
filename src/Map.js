import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

function Map(props) {
  const [currentPosition, setCurrentPosition] = useState({});

  Geocode.setApiKey("AIzaSyCZQ8bYF7Oi_opyWlt6UuOVmPpMbzNMlas");

  // Geocode.fromAddress("Eiffel Tower").then(
  //   (response) => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     console.log(lat, lng);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );

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
    <div>
      <LoadScript googleMapsApiKey="AIzaSyBx3CmMKzArhN9tC7vKM2HPi1UcoXm0mjo">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={11}
          center={currentPosition}
        />
      </LoadScript>
    </div>
  );
}

export default Map;
