import React, { useState, useEffect } from "react";
import "../src/styling/MarketCard.css";
import MarketInfo from "./MarketInfo";

function MarketCard(props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  const handleClose = () => {
    setClicked(false);
  };

  return (
    <div className="marketcard" key={props.market.marketname}>
      <p>{props.market.marketname}</p>
      <img
        src={
          props.photo !== undefined
            ? props.photo.urls.regular
            : "https://source.unsplash.com/1600x900/?farmer,market"
        }
      />

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

export default MarketCard;
