import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MarketInfo from "./MarketInfo";

function Map(props) {
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  const defaultCoords = { lat: 39.8097343, lng: -98.5556199 };

  const [selected, setSelected] = useState(false);

  const onSelect = (m) => {
    console.log("clicked market from map");
    console.log(m.market);
    // setSelected(market);
  };

  const handleClose = () => {
    // setSelected(false);
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
                onClick={() => onSelect(m)}
              />
            ))}

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
