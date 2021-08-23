import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Header2,
  Footer,
  HeaderLinks,
  Paginations,
  HotelProductSection,
  LoadingSpinner,
  GridContainer,
  GridItem,
  Button,
  Parallax,
} from "../../allComponentsFiles";
import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

const Home = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  const [hotel, setHotel] = useState([]);
  const [loading, setLoading] = useState(false);

  const allHotel = async () => {
    setLoading(true);
    const res = await axios.get(`${process.env.REACT_APP_API}/allhotels`);
    setLoading(false);
    setHotel(res.data);
  };

  useEffect(() => {
    allHotel();
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
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />

      <Parallax
        filter
        // eslint-disable-next-line global-require
        image={require("../../assets/img/landing-bg5.jpeg").default}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Vacation Starts Here.</h1>

              <br />
              <Button
                color="primary"
                size="lg"
                href="https://www.youtube.com/watch?v=tqcKE4_L-NE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className={classes.container}>
            {hotel.length > 0 ? (
              <>
                <Paginations
                  data={hotel}
                  RenderComponent={HotelProductSection}
                  title="Hotels"
                  pageLimit={4}
                  dataLimit={2}
                />
              </>
            ) : (
              <h1>No Hotels Available Yet</h1>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
