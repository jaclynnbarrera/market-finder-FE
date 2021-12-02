import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MarketInfo from "./MarketInfo";

function Map(props) {
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

  const [selected, setSelected] = useState(false);

  const onSelect = (market) => {
    setSelected(market);
  };

  const handleClose = () => {
    setSelected(false);
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAPS_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={currentPosition}
        >
          {props.markers !== false
            ? props.markers.map((item, i) => {
                return (
                  <Marker
                    key={i}
                    position={item}
                    onClick={() => onSelect(item)}
                  />
                );
              })
            : null}

          {selected !== false ? (
            <MarketInfo
              details={selected.details}
              name={selected.name}
              func={handleClose}
              open={true}
            />
          ) : null}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
