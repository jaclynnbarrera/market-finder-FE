import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MapIcon from "@mui/icons-material/Map";
import MapContainer from "./MapContainer";
import Favorites from "./Favorites";
import LocationBar from "./LocationBar";

const drawerWidth = 240;

export default function Main() {
  const [rendering, setRendering] = useState("Map");

  function handleClick(text) {
    setRendering(text);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <h1 className="app-name">Market Finder</h1>
        <Divider />
        <List>
          {["Map", "Favorites", "Account", "Logout"].map((text, index) => (
            <ListItem button key={text} onClick={() => handleClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <MapIcon /> : <FavoriteIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {/* <LocationBar /> */}
        {rendering === "Map" ? <MapContainer /> : <Favorites />}
      </Box>
    </Box>
  );
}
