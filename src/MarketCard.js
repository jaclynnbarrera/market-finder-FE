import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function MarketCard(props) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch(
      `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${props.market.id}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        setDetails(data.marketdetails);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      <div className="market-card" key={props.market.marketname}>
        <p>{details.Products}</p>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="100"
              image={props.photo.urls.regular}
              alt="farmers market"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.market.marketname.slice(4)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.market.marketname.slice(0, 3)} Miles Away
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default MarketCard;
