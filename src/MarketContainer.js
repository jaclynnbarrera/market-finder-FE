import React, { useState, useEffect } from "react";
import MarketCard from "./MarketCard";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: "tYUP2yWTTGcJiNG3zBX7nkF7Iv2t-cmBbqUaqSMLI_g",
});

function MarketContainer() {
  const [marketResults, setMarketResults] = useState([]);
  const [data, setPhotosResp] = useState(null);

  useEffect(() => {
    getMarkets();
    getPhotos();
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

  //UNSPLASH API CALL
  function getPhotos() {
    api.search
      .getPhotos({
        query: "farmers market",
        orientation: "landscape",
        page: 1,
        perPage: 20,
      })
      .then((data) => {
        setPhotosResp(data.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }

  return (
    <div>
      <MarketCard markets={marketResults} photos={data} />
    </div>
  );
}

export default MarketContainer;
