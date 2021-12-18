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
    getCity(current);
    setCurrentLocation(current);
    setButtonClicked(true);
  };

  const err = () => alert("Failed to get your location");

  const [cityState, setCityState] = useState({
    city: "Lebanon",
    state: "Kansas",
  });

  const getCity = (current) => {
    const xhr = new XMLHttpRequest();
    const lat = current.lat;
    const lng = current.lng;

    xhr.open(
      "GET",
      "https://us1.locationiq.com/v1/reverse.php?key=pk.05b5e7b1813b2629d04a1bb38e785688&lat=" +
        lat +
        "&lon=" +
        lng +
        "&format=json",
      true
    );

    const processRequest = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        const city = response.address.city;
        const state = response.address.state;
        const cityState = {
          city: city,
          state: state,
        };
        setCityState(cityState);
        return;
      }
    };
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
  };

  const [markets, setMarketResults] = useState([]);

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

  useEffect(() => {
    getMarkets();
  });

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
      <TopBar func={handleClick} cityState={cityState} />
      <Map location={currentLocation} clicked={buttonClicked} />
      <RightBar markets={markets} />
    </div>
  );
}
