import React from "react";
import "../src/styling/PopUp.css";

export default function MarketInfo(props) {
  const onClose = () => {
    props.toggle();
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close-icon" onClick={onClose}>
          x
        </span>
        <h3>{props.market.marketname.slice(4)}</h3>
        <p>{props.market.Address}</p>
        <p>{props.market.Products}</p>
        <p>{props.market.Schedule}</p>
      </div>
    </div>
  );
}
