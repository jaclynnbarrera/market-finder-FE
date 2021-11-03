import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function MarketCard(props) {
  return (
    <div>
      {props.markets.map((market, i) => (
        <div className="market-card" key={market.marketname}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="100"
                image={props.photos[i].urls.small}
                alt="farmers market"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {market.marketname.slice(4)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {market.marketname.slice(0, 3)} Miles Away
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default MarketCard;
