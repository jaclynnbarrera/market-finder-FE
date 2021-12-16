import React, { useState, useEffect } from "react";
import Map from "./Map";
import MarketContainer from "./MarketContainer";
import Geocode from "react-geocode";


function MapContainer() {
  const [markets, setMarketResults] = useState([]);

  useEffect(() => {
    //this logic with button will use geolocator
    const coords = {
      lat: 40.9692361,
      lng: -73.8067627,
    };
    getMarkets(coords);
  }, []);

  const getMarkets = (coords) => {
    let results = fetch(
      `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=${coords.lat}&lng=${coords.lng}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setMarketResults(data.results);
      })
      .catch((err) => {
        console.log("Error:", err);
      });

    return results;
  };

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
    <Map markers={markers.length === markets.length ? markers : false}/>
    {/* {markets.length !== 0 ? (
      <MarketContainer markets={markets} func={pullData} />) : null}  */}
    </div>
  );
}

export default MapContainer;
