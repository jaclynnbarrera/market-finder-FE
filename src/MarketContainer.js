import MarketCard from "./MarketCard";
import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";

function MarketContainer(props) {
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
    <div>
      <h3>{props.markets && props.markets.length} Markets In Your Area</h3>

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

export default MarketContainer;
