import React, { useState, useEffect } from "react";
import Geocode from "react-geocode";

function MapContainer() {
  const [markers, setMarkers] = useState([]);

  const pullData = (marketDetails, marketName) => {
    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_KEY);
    Geocode.fromAddress(marketDetails.Address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setMarkers((oldArray) => [
          ...oldArray,
          { lat: lat, lng: lng, details: marketDetails, name: marketName },
        ]);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div>
      {/* <Map markers={markers.length === markets.length ? markers : false} /> */}
    </div>
  );
}

export default MapContainer;
