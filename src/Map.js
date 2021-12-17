import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MarketInfo from "./MarketInfo";

function Map(props) {
  //props will be location
  const mapStyles = {
    height: "80vh",
    width: "100%",
  };

  const [selected, setSelected] = useState(false);

  const onSelect = (market) => {
    setSelected(market);
  };

  const handleClose = () => {
    setSelected(false);
  };

  return (
    <div className="map">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLEMAPS_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={props.clicked === false ? 4 : 11}
          center={props.location}
        >
          {/* {props.markers !== false
            ? props.markers.map((item, i) => {
                return (
                  <Marker
                    key={i}
                    position={item}
                    onClick={() => onSelect(item)}
                  />
                );
              })
            : null} */}

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
