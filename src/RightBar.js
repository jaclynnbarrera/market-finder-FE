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
        orientation: "landscape",
      })
      .then((result) => {
        setPhotos(result.response.results);
      });
  }, []);

  return (
    <div className="rightbar">
      <p># markets found</p>

      {props.markets.map((market, i) => (
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