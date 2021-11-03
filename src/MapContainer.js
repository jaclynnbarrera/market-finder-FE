import React, { useState, useEffect } from "react";
import Map from "./Map";
import MarketContainer from "./MarketContainer";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MapContainer() {
  const [marketResults, setMarketResults] = useState([]);

  useEffect(() => {
    getMarkets();
  });

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
        // setMarketResults(data.results);
        getMarketDetails(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getMarketDetails(markets) {
    //iterate through each market
    //fetch details for the markets
    //add those details to market object with new address key
    const marketDetails = markets.map((market) => {
      fetch(
        `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${market.id}`
      )
        .then((r) => r.json())
        .then((data) => {
          market.info = data.marketdetails;
        });
      return market;
    });
    setMarketResults(marketDetails);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={8}>
          <Item>
            <Map markers={marketResults} />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item style={{ maxHeight: "80vh", overflow: "auto" }}>
            <MarketContainer markets={marketResults} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MapContainer;
