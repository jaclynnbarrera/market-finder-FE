import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MarketInfo from "./MarketInfo";
import greenMarker from "../src/icons/darkgreen_MarkerM.png";

function Map(props) {
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  const defaultCoords = { lat: 39.8097343, lng: -98.5556199 };

  const [selected, setSelected] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState({});

  const onOpen = (m) => {
    setSelectedMarket(m.market);
    setSelected(true);
  };

  const onClose = () => {
    setSelected(false);
  };

  const houseIcon = "http://maps.google.com/mapfiles/kml/pal2/icon10.png";

  return (
    <div className="map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAPS_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={props.clicked === false ? 4 : 12}
          center={props.location ? props.location : defaultCoords}
        >
          <Marker key={"location"} position={props.location} icon={houseIcon} />

          {props.markers &&
            props.markers.map((m) => (
              <Marker
                key={m.id}
                position={m.coords}
                icon={greenMarker}
                onClick={() => onOpen(m)}
              />
            ))}

          {selected ? (
            <MarketInfo market={selectedMarket} toggle={onClose} />
          ) : null}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Map;
