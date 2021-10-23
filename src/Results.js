import React, { useState, useEffect } from "react";

function Results() {
  const [marketResults, setMarketResults] = useState([]);

  useEffect(() => {
    // getMarkets();
  });

  //   function getMarkets() {
  //     const coordinates = {
  //       lat: 40.8590831,
  //       lng: -73.8537585,
  //     };
  //     fetch(
  //       `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat="${coordinates.lat}&lng=${coordinates.lng}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setMarketResults(data));
  //   }

  return (
    <div>
      <h1>Results</h1>
    </div>
  );
}

export default Results;
