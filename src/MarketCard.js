import "../src/styling/MarketCard.css";
import React, { useState, useEffect } from "react";
import MarketInfo from "./MarketInfo";

export default function MarketCard(props) {
  const [clicked, setClicked] = useState(false);

  const handleToggle = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    props.func(props.market);
  }, [props.market]);

  return (
    <div
      className="marketcard"
      key={props.market.marketname}
      onClick={handleToggle}
    >
      <div className="float-child">
        <h3>{props.market.marketname.slice(4)}</h3>
        <p>{props.market.marketname.slice(0, 4)} Miles Away</p>
        <p>
          See Market Info <i class="arrow right"></i>
        </p>
      </div>
      <div className="float-child">
        <img
          src={
            props.photo !== undefined
              ? props.photo.urls.regular
              : "https://source.unsplash.com/1600x900/?farmer,market"
          }
        />
      </div>
      {clicked ? <MarketInfo market={props.market} /> : null}
    </div>
  );
}
