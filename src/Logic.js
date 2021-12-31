import React, { useState, useEffect } from "react";
import LeftNav from "./LeftNav";
import TopBar from "./TopBar";
import Map from "./Map";
import RightBar from "./RightBar";
import Geocode from "react-geocode";

export default function Logic() {
  const [currentLocation, setCurrentLocation] = useState(false);

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleZip = (input) => {
    setCurrentLocation({ zip: parseInt(input) });
  };

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
    setCurrentLocation({ coords: current });
    setButtonClicked(true);
  };

  const err = () => alert("Failed to get your location");

  const [cityState, setCityState] = useState({});

  const getCity = () => {
    if (currentLocation.coords) {
      const xhr = new XMLHttpRequest();
      const lat = currentLocation.coords.lat;
      const lng = currentLocation.coords.lng;

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
    }
    //coords or zip?
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

  const [markets, setMarketResults] = useState(false);

  const getMarkets = () => {
    if (currentLocation.coords) {
      let results = fetch(
        `https://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=${currentLocation.coords.lat}&lng=${currentLocation.coords.lng}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setMarketResults(data.results);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
      return results;
    } else if (currentLocation.zip) {
      debugger;
      let results = fetch(
        `https://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${currentLocation.zip}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setMarketResults(data.results);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
      return results;
    }
  };

  const [marketsDetails, setMarketsDetails] = useState([]);

  const getMarketDetails = () => {
    if (markets) {
      markets.map((m) => {
        let details = fetch(
          `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${m.id}`
        )
          .then((resp) => resp.json())
          .then((data) => {
            const completeMarket = { ...m, ...data.marketdetails };
            setMarketsDetails((oldArray) => [...oldArray, completeMarket]);
          })
          .catch((err) => {
            console.log("Error:", err);
          });
        return details;
      });
    }
  };

  const [markers, setMarkers] = useState([]);
  const getCoords = (m) => {
    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_KEY);
    Geocode.fromAddress(m.Address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const coords = {
          lat: lat,
          lng: lng,
        };
        setMarkers((oldArray) => [
          ...oldArray,
          {
            coords: coords,
            market: m,
          },
        ]);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    getMarkets();
    getCity();
    // getTemp(); dont want to hit limit :)
  }, [currentLocation]);

  useEffect(() => {
    getMarketDetails();
  }, [markets]);

  useEffect(() => {
    setInterval(getTime, 1000);
  });

  return (
    <div className="parent">
      <LeftNav />
      <TopBar
        coordsfunc={handleClick}
        zipfunc={handleZip}
        cityState={cityState}
        temp={temp}
        time={time}
      />
      <Map
        location={currentLocation.coords}
        clicked={buttonClicked}
        markers={markers}
      />
      <RightBar markets={marketsDetails} func={getCoords} />
    </div>
  );
}
