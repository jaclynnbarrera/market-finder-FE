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
        <p>{props.market.marketname}</p>
      </div>
    </div>
  );
}
