import React, { useState, useEffect } from "react";
import LeftNav from "./LeftNav";
import TopBar from "./TopBar";
import Map from "./Map";
import RightBar from "./RightBar";

export default function Logic() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 39.8097343,
    lng: -98.5556199,
  });

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    !navigator.geolocation
      ? alert("Your browser doesn't support Geolocation")
      : navigator.geolocation.getCurrentPosition(success, err);
  };

  const success = (position) => {
    const current = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentLocation(current);
    setButtonClicked(true);
  };

  const err = () => alert("Failed to get your location");

  const [markets, setMarketResults] = useState([]);

  useEffect(() => {
    getMarkets();
  });

  const getMarkets = () => {
    let results = fetch(
      `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=${currentLocation.lat}&lng=${currentLocation.lng}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setMarketResults(data.results);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    return results;
  };

  // const getDetails = () => {
  //   fetch(
  //     `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${props.market.id}`
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setDetails(data.marketdetails);
  //       props.func(data.marketdetails, props.market.marketname);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const getMarketDetails = () => {
  //   fetch(
  //     `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${props.market.id}`
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       setDetails(data.marketdetails);
  //       props.func(data.marketdetails, props.market.marketname);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div className="parent">
      <LeftNav />
      <TopBar func={handleClick} />
      <Map location={currentLocation} clicked={buttonClicked} />
      <RightBar markets={markets} />
    </div>
  );
}
