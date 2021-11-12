import React, { useState, useEffect } from "react";
import MarketCard from "./MarketCard";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_KEY,
});

function MarketContainer(props) {
  useEffect(() => {
    getPhotos();
  }, []);

  const [data, setPhotosResp] = useState(null);
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
      <h3>{props.markets && props.markets.length} Markets In Your Area</h3>
      {props.markets &&
        props.markets.map((market, i) => (
          <MarketCard
            market={market}
            // photo={data[i]}
            key={i}
            func={props.func}
          />
        ))}
    </div>
  );
}

export default MarketContainer;
