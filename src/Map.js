import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MarketInfo from "./MarketInfo";

function Map(props) {
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  const [selected, setSelected] = useState(false);

  const onSelect = (market) => {
    console.log(market);

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
          zoom={props.clicked === false ? 4 : 11}
          center={props.location}
        >
          <Marker key={"location"} position={props.location} icon={houseIcon} />

          {/* {props.markets &&
            props.markets.map((m) => {
              <Marker key={m.id} position={m} onClick={() => onSelect(m)} />;
            })} */}

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
