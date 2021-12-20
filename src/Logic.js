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

  const [cityState, setCityState] = useState({});

  const getCity = () => {
    const xhr = new XMLHttpRequest();
    const lat = currentLocation.lat;
    const lng = currentLocation.lng;

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

  const [temp, setTemp] = useState(40);
  const getTemp = () => {
    let temp = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.lng}&appid=ceb6657dfd5aab9f00e5b48bfde5c001&units=imperial`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setTemp(parseInt(data.main.temp));
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    return temp;
  };

  const [time, setTime] = useState();

  const getTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, "0");
    let strTime = hours + ":" + minutes + " " + ampm;
    setTime(strTime);
    return strTime;
  };

  setInterval(getTime, 1000);

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

  const [marketsDetails, setMarketsDetails] = useState([]);
  const getMarketDetails = () => {
    let results = [];
    markets.map((m) => {
      let details = fetch(
        `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${m.id}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          const deets = data.marketdetails;
          results.push({ ...m, deets });
        })
        .catch((err) => {
          console.log("Error:", err);
        });
      return details;
    });
    setMarketsDetails(results);
  };

  useEffect(() => {
    getMarkets();
    getCity();
    // getTemp(); too many calls to API, on time out :)
  }, [currentLocation]);

  useEffect(() => {
    getMarketDetails();
  }, [markets]);

  useEffect(() => {
    setInterval(getTime, 1000);
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
      <TopBar
        func={handleClick}
        cityState={cityState}
        temp={temp}
        time={time}
      />
      <Map location={currentLocation} clicked={buttonClicked} />
      <RightBar markets={markets} details={marketsDetails} />
    </div>
  );
}
