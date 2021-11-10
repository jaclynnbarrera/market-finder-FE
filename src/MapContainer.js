import React, { useState, useEffect } from "react";
import Map from "./Map";
import MarketContainer from "./MarketContainer";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Geocode from "react-geocode";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MapContainer() {
  const [marketResults, setMarketResults] = useState([]);

  useEffect(() => {
    getMarkets();
  }, []);

  const [markers, setMarkers] = useState([]);

  const pullData = (marketDetails) => {
    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_KEY);
    Geocode.fromAddress(marketDetails.Address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setMarkers((oldArray) => [...oldArray, { lat: lat, lng: lng }]);
      },
      (error) => {
        console.error(error);
      }
    );
  };

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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={8}>
          <Item>
            <Map markers={markers} />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item style={{ maxHeight: "80vh", overflow: "auto" }}>
            <MarketContainer markets={marketResults} func={pullData} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MapContainer;
