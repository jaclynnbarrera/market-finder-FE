import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function MarketCard(props) {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    function getDetails() {
      fetch(
        `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${props.market.id}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setDetails(data.marketdetails);
          props.func(data.marketdetails);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getDetails();
  }, []);

  const handleClick = () => {
    console.log(details);
  };

  return (
    <div
      className="market-card"
      key={props.market.marketname}
      onClick={handleClick}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image={
              props.photo !== undefined
                ? props.photo.urls.regular
                : "https://source.unsplash.com/1600x900/?farmer,market"
            }
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
  );
}

export default MarketCard;
