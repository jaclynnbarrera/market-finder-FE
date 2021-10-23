import React from "react";
import Map from "./Map";
import Results from "./Results";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MapContainer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={8}>
          <Item>
            <Map />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Results />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MapContainer;
