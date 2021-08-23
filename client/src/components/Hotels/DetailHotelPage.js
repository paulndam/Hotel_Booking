/* eslint-disable global-require */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Tooltip,
  CardMedia,
  Avatar,
  Typography,
  Grid,
  Divider,
  Paper,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import KingBedIcon from "@material-ui/icons/KingBed";
import TitleIcon from "@material-ui/icons/Title";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CachedIcon from "@material-ui/icons/Cached";
import StarsIcon from "@material-ui/icons/Stars";
import EventIcon from "@material-ui/icons/Event";
import { Header2, HeaderLinks, Footer, Button } from "../../allComponentsFiles";
import { getOneHotel, hotelAlreadyBooked } from "../Action/HotelAction";
import { getSessionId } from "../Action/Stripe";
import useStyles from "./DetailHotePageStyles";

const dashboardRoutes = [];

const DetailHotelPage = (props) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const classes = useStyles();
  // const classez = useStylez();

  const [hotel, setHotel] = useState({});
  const [isBooked, setIsBooked] = useState(false);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { iconColor, vertical, match, history, ...rest } = props;

  useEffect(() => {
    if (auth && auth.token) {
      hotelAlreadyBooked(auth.token, match.params.hotelId).then((res) => {
        if (res.data.success) {
          setIsBooked(true);
        }
      });
    }
  }, [auth, match.params.hotelId]);

  useEffect(() => {
    const isUser = Object.values(hotel).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [hotel]);

  const loadSellerHotel = async () => {
    const response = await getOneHotel(match.params.hotelId);
    setHotel({ ...hotel, ...response.data });
    setImage(`${process.env.REACT_APP_API}/hotel-image/${response.data._id}`);
  };

  const redirectUnAuthUser = async (e) => {
    e.preventDefault();
    if (!auth || !auth.user || !auth.token) {
      history.push("/log-in");
      return;
    }
    setLoading(true);
    if (!auth || !auth.user || !auth.token) {
      history.push("/log-in");
    }
    const response = await getSessionId(auth.token, match.params.hotelId);
    console.log("--- session ID Information ----", response.data.sessionId);

    const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);
    stripe
      .redirectToCheckout({
        sessionId: response.data.sessionId,
      })
      .then((res) =>
        console.log("---- Result After Stripe CheckOut ----", res)
      );
  };

  useEffect(() => {
    loadSellerHotel();
  }, []);

  return (
    <div>
      <Header2
        color="transparent"
        routes={dashboardRoutes}
        brand="N-Joy Hotel"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CardMedia
              className={classes.media}
              image={image}
              title={hotel.title}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={classes.root2}>
              <Avatar className={classes.purple}>
                {hotel.title?.charAt(0)}
              </Avatar>
              <Divider />
              <Typography variant="h6" gutterBottom>
                <TitleIcon />: {hotel.title}
              </Typography>
              <Divider />
              <Typography variant="subtitle1" gutterBottom>
                <KingBedIcon />:{" "}
                {`${hotel.bedRoom <= 1 ? "Bed Romm" : "Bed Rooms"} : ${
                  hotel.bedRoom
                }`}
              </Typography>
              <Divider />
              <Typography variant="subtitle2" gutterBottom>
                <LocationOnIcon />: {hotel.location}
              </Typography>
              <Divider />
              <Typography variant="subtitle2" gutterBottom>
                <EventAvailableIcon />: {hotel.duration}
              </Typography>
              <Divider />
              <Typography variant="subtitle2" gutterBottom>
                <AttachMoneyIcon />: {hotel.price}
              </Typography>
              <Divider />
              <Typography variant="subtitle2" gutterBottom>
                <AccountCircleIcon />: Posted By:{" "}
                {`${hotel.postedBy?.firstName} `} {""}{" "}
              </Typography>
              <Divider />

              <br />
              <Typography paragraph>
                {`${hotel.content?.substring(0, 500)}`}
              </Typography>
              <Typography paragraph>
                {`${hotel.content?.substring(500, 1500)}`}
              </Typography>
              <Typography variant="button" display="block" gutterBottom>
                <>
                  {auth && auth.user ? (
                    <Tooltip
                      id="instagram-tooltip"
                      title="Book hotel"
                      placement={window.innerWidth > 959 ? "top" : "left"}
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        color="primary"
                        disabled={loading || isBooked}
                        size="sm"
                        // href="/logIn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={redirectUnAuthUser}
                      >
                        <BookmarksIcon />{" "}
                        {loading
                          ? "Loading..."
                          : isBooked
                          ? "You Already Booked"
                          : "Book Hotel"}
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      id="instagram-tooltip"
                      title="Book hotel"
                      placement={window.innerWidth > 959 ? "top" : "left"}
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <Button
                        color="primary"
                        size="sm"
                        // href="/logIn"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={redirectUnAuthUser}
                      >
                        <BookmarksIcon /> Log-In To Book Hotel
                      </Button>
                    </Tooltip>
                  )}
                </>
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardMedia
              className={classes.media}
              image={require("../../assets/img/h43.jpeg").default}
              title=""
            />
          </Grid>

          <Grid item xs={12}>
            <div className={classes.typoHeader}>
              Why you should book with us
            </div>
          </Grid>

          <Grid item sm={3}>
            <Paper className={classes.paper} style={{ alignItems: "center" }}>
              <Avatar className={classes.green}>
                <RateReviewIcon />
              </Avatar>
              <Typography variant="subtitle2" gutterBottom>
                Best Price Guarantee
              </Typography>
              <Typography variant="body1" gutterBottom>
                If you find a better price, we will match it
              </Typography>
              <CardMedia
                className={classes.media}
                image={require("../../assets/img/h46.jpeg").default}
                title={hotel.title}
              />
            </Paper>
          </Grid>
          <Grid item sm={3}>
            <Paper className={classes.paper} style={{ alignItems: "center" }}>
              <Avatar className={classes.green}>
                <CachedIcon />
              </Avatar>
              <Typography variant="subtitle2" gutterBottom>
                7-day ‘change of mind’ refund
              </Typography>
              <Typography variant="body1" gutterBottom>
                Get a full refund on your booking(excludes flights)
              </Typography>
              <CardMedia
                className={classes.media}
                image={require("../../assets/img/h47.png").default}
                title={hotel.title}
              />
            </Paper>
          </Grid>

          <Grid item sm={3}>
            <Paper className={classes.paper} style={{ alignItems: "center" }}>
              <Avatar className={classes.green}>
                <StarsIcon />
              </Avatar>
              <Typography variant="subtitle2" gutterBottom>
                VIP Inclusions
              </Typography>
              <Typography variant="body1" gutterBottom>
                You get a lot more than just a bed in a room
              </Typography>
              <CardMedia
                className={classes.media}
                image={require("../../assets/img/h48.jpeg").default}
                title={hotel.title}
              />
            </Paper>
          </Grid>

          <Grid item sm={3}>
            <Paper className={classes.paper} style={{ alignItems: "center" }}>
              <Avatar className={classes.green}>
                <EventIcon />
              </Avatar>
              <Typography variant="subtitle2" gutterBottom>
                Buy now, choose dates later
              </Typography>
              <Typography variant="body1" gutterBottom>
                Lock in a deal today, choose dates when you are ready
              </Typography>
              <CardMedia
                className={classes.media}
                image={require("../../assets/img/h49.jpeg").default}
                title={hotel.title}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default DetailHotelPage;
