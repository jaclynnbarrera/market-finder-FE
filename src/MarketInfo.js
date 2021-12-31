import React from "react";
import "../src/styling/PopUp.css";

export default function MarketInfo(props) {
  const onClose = () => {
    props.toggle();
  };

  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={onClose}>
          x
        </span>
        <h3>{props.market.marketname.slice(4)}</h3>
        <p>Address: {props.market.Address}</p>
        <p>Products: {props.market.Products}</p>
        <p>Schedule: {props.market.Schedule.slice(0, -16)}</p>
      </div>
    </div>
  );
}
