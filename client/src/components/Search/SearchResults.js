/* eslint-disable comma-dangle */
/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import classNames from "classnames";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import SearchHotels from "./SearchHotels";
import {
  HeaderLinks,
  Header2,
  GridContainer,
  GridItem,
  Parallax,
  Button,
  Footer,
} from "../../allComponentsFiles";
import styles from "../../assets/jss/material-kit-react/views/landingPage.js";
import { listingSearchHotelResults } from "../Action/HotelAction";
import useStylez from "./searchResultsStyle";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const SearchResults = (props) => {
  const classes = useStyles();
  const classez = useStylez();
  const { ...rest } = props;
  const history = useHistory();

  const [hotel, setHotels] = useState([]);

  // as soon as components mounts get the search params from url and display the hotel per search reqst.

  useEffect(() => {
    const { location, bedRoom, duration } = queryString.parse(
      window.location.search
    );
    listingSearchHotelResults({ location, bedRoom, duration }).then((res) => {
      setHotels(res.data);
    });
  }, [window.location.search]);

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
      <Parallax
        filter
        image={require("../../assets/img/landing-bg3.jpeg").default}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Vacation Starts Here.</h1>

              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer justify="center">
              <SearchHotels />
              <GridItem xs={12} sm={12} md={8}>
                <h2 className={classes.title}>{"Let's go on Vacation "} </h2>
              </GridItem>
            </GridContainer>

            <GridContainer>
              {hotel.map((h) => (
                <GridItem xs={12} sm={12} md={4}>
                  <Card
                    className={classez.root}
                    key={h.id}
                    style={{ backgroundColor: " #f5f5f5 " }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={`${process.env.REACT_APP_API}/hotel-image/${h._id}`}
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {h.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {`${h.content.substring(0, 90)}...`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        color="success"
                        size="sm"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => history.push(`/hotel-detail/${h._id}`)}
                      >
                        <ThumbUpIcon />
                        Book
                      </Button>
                    </CardActions>
                  </Card>
                </GridItem>
              ))}
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
