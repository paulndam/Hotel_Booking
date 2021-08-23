/* eslint-disable global-require */
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Header2,
  Footer,
  HeaderLinks,
  GridContainer,
  GridItem,
  Button,
  Parallax,
} from "../../allComponentsFiles";
import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

const NotAuthorized = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      {/* <Header /> */}
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

      <Parallax filter image={require("../../assets/img/401-6.jpeg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>401 Not Authorized </h1>
              <br />
              <Button
                color="primary"
                size="lg"
                href="https://www.youtube.com/watch?v=yC1ztmO0Wx4"
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

      <Footer />
    </div>
  );
};

export default NotAuthorized;
