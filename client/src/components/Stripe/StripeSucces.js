/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import {
  Header2,
  Footer,
  HeaderLinks,
  GridContainer,
  Parallax,
  GridItem,
} from "../../allComponentsFiles";
import styles from "../../assets/jss/material-kit-react/views/landingPage.js";
import { stripeSuccessRequest } from "../Action/Stripe";

const dashboardRoutes = [];
const useStyles = makeStyles(styles);

const StripeSucces = (props) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const classes = useStyles();
  const { match, history, ...rest } = props;

  useEffect(() => {
    stripeSuccessRequest(auth.token, match.params.hotelId).then((res) => {
      if (res.data.success) {
        history.push("/account");
      } else {
        history.push("/stripe/cancel");
      }
    });
  }, [match.params.hotelId, auth.token, history]);
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
      <Parallax filter image={require("../../assets/img/h26.jpeg").default}>
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
          <h1>Payment Successful {match.params.hotelId} </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StripeSucces;
