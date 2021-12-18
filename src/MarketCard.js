import "../src/styling/MarketCard.css";
import React, { useState } from "react";
import MarketInfo from "./MarketInfo";

export default function MarketCard(props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  const handleClose = () => {
    setClicked(false);
  };

  return (
    <div className="marketcard" key={props.market.marketname}>
      <div className="marketcard-text">
        <h3>{props.market.marketname.slice(5)}</h3>
        <p>{props.market.marketname.slice(0, 4)} Miles Away</p>
      </div>
      <div className="marketcard-image">
        <img
          src={
            props.photo !== undefined
              ? props.photo.urls.regular
              : "https://source.unsplash.com/1600x900/?farmer,market"
          }
        />
      </div>

      {/* {clicked === true ? (
          <MarketInfo
            details={details}
            name={props.market.marketname}
            func={handleClose}
            open={clicked}
          />
        ) : null} */}
    </div>
  );
}
