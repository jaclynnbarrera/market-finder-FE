import "../src/styling/MarketCard.css";
import React, { useState, useEffect } from "react";
import MarketInfo from "./MarketInfo";

export default function MarketCard(props) {
  // debugger;
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    //pop up
    setClicked(true);
  };

  const handleClose = () => {
    //close pop up
    setClicked(false);
  };

  useEffect(() => {
    console.log(props.market);
  }, [props.market]);

  return (
    <div className="marketcard" key={props.market.marketname}>
      <div className="float-child">
        <h3>{props.market.marketname.slice(4)}</h3>
        <p>{props.market.marketname.slice(0, 4)} Miles Away</p>
        <p
          onClick={() => {
            console.log(props.market);
          }}
        >
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
