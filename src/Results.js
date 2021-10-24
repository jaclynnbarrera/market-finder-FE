import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function Results() {
  const [marketResults, setMarketResults] = useState([]);

  useEffect(() => {
    getMarkets();
  });

  //USDA CALLS
  function getMarkets() {
    const coordinates = {
      lat: 40.8590831,
      lng: -73.8537585,
    };

    fetch(
      `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=${coordinates.lat}&lng=${coordinates.lng}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMarketResults(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return <div>Farmers Markets Near You</div>;
}

export default Results;
