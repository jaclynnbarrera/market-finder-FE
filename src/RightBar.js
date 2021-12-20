import "../src/styling/RightBar.css";
import React from "react";
import MarketCard from "./MarketCard";
import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";

export default function RightBar(props) {
  const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_KEY,
  });

  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    unsplash.search
      .getPhotos({
        query: "farmers markets",
        page: 1,
        perPage: 20,
        orientation: "portrait",
      })
      .then((result) => {
        setPhotos(result.response.results);
      });
  }, []);

  return (
    <div className="rightbar">
      <p className="marketfound">
        {props.markets.length} farmers markets found in your area
      </p>
      {props.details.map((market, i) => (
        <MarketCard
          market={market}
          key={i}
          func={props.func}
          photo={photos.length !== 0 ? photos[i] : undefined}
        />
      ))}
    </div>
  );
}
