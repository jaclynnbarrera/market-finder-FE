import React, { useState, useEffect } from "react";
import Market from "./Market";

function Results() {
  const [marketResults, setMarketResults] = useState([]);

  useEffect(() => {
    getMarkets();
  });

  //REPLACE WITH COORDINATES FROM GEOLOCATOR
  function getMarkets() {
    const coordinates = {
      lat: 40.8590831,
      lng: -73.8537585,
    };

    //USDA API
    fetch(
      `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=${coordinates.lat}&lng=${coordinates.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMarketResults(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Market markets={marketResults} />
    </div>
  );
}

export default Results;
