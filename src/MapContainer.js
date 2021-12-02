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
  const [markets, setMarketResults] = useState([]);

  useEffect(() => {
    //this logic will use geolocator
    const coords = {
      lat: 40.8591003,
      lng: -73.8538145,
    };
    getMarkets(coords);
  }, []);

  const getMarkets = (coords) => {
    let results = fetch(
      `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/locSearch?lat=${coords.lat}&lng=${coords.lng}`
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

  const [markers, setMarkers] = useState([]);

  const pullData = (marketDetails, marketName) => {
    Geocode.setApiKey(process.env.REACT_APP_GEOCODE_KEY);
    Geocode.fromAddress(marketDetails.Address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setMarkers((oldArray) => [
          ...oldArray,
          { lat: lat, lng: lng, details: marketDetails, name: marketName },
        ]);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={8}>
          <Item>
            <Map
              markers={markers.length === markets.length ? markers : false}
            />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item style={{ maxHeight: "80vh", overflow: "auto" }}>
            {markets.length !== 0 ? (
              <MarketContainer markets={markets} func={pullData} />
            ) : null}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MapContainer;
