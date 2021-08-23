import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { GridContainer, GridItem, InfoArea } from "../../allComponentsFiles";
import styles from "../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";
import SearchHotels from "../Search/SearchHotels.js";

const useStyles = makeStyles(styles);

const HotelProductSection = () => {
  const classes = useStyles();
  const [hotels, setHotel] = useState([]);

  const allHotel = async () => {
    await axios.get(`${process.env.REACT_APP_API}/allhotels`).then((res) => {
      setHotel(res.data);
    });
  };

  useEffect(() => {
    allHotel();
  }, []);

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>{"Let's go on Vacation "} </h2>
          <h5 className={classes.description}>
            The Worlds best places awaits you. Handpicked and selected by vetted
            experts. Come and enjoy a one of a lifetime enjoyment.
          </h5>
        </GridItem>
        <SearchHotels />
      </GridContainer>
      <div>
        <GridContainer>
          {hotels.map((hotel, i) => (
            <GridItem xs={12} sm={12} md={4} key={i}>
              <InfoArea
                key={hotel.id}
                title="Verified Users"
                description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                icon="iconshere"
                iconColor="success"
                vertical
                hotel={hotel}
              />
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </div>
  );
};

export default HotelProductSection;
