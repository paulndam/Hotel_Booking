/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import {
  Header2,
  Footer,
  HeaderLinks,
  GridContainer,
  GridItem,
  Parallax,
} from "../../allComponentsFiles";
import styles from "../../assets/jss/material-kit-react/views/landingPage.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const StripeCancel = (props) => {
  const classes = useStyles();
  const { ...rest } = props;
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
      <Parallax filter image={require("../../assets/img/h25.jpeg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}> </h1>

              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <h1>Payment Failed , Please Try Again</h1>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StripeCancel;
