import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// import MarketInfo from "./MarketInfo";
//new
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

//new
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
          props.func(data.marketdetails, props.market.marketname);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getDetails();
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("closeeeee");
    setOpen(false);
  };

  return (
    <div className="market-card" key={props.market.marketname}>
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

        <div onClick={handleOpen}>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </div>
      </Card>
    </div>
  );
}

export default MarketCard;
