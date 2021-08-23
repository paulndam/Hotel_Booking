/* eslint-disable global-require */
/* eslint-disable comma-dangle */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { getAccountStatus } from "../Action/Stripe";
import { updateUserInLocalStorage } from "../Action/authUser";
import {
  Header2,
  Footer,
  HeaderLinks,
  GridContainer,
  GridItem,
  Parallax,
} from "../../allComponentsFiles";

const dashboardRoutes = [];
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const StripeCallback = (props) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const classes = useStyles();
  const { ...rest } = props;

  const accountStatus = async () => {
    try {
      const response = await getAccountStatus(auth.token);
      updateUserInLocalStorage(response.data, () => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: response.data,
        });
        window.location.href = "/sellerAccount";
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth && auth.token) {
      accountStatus();
    }
  }, [auth, auth.token]);

  return (
    <div>
      <div className={classes.root}>
        <LinearProgress />
        <LinearProgress color="secondary" />
      </div>
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
      <Parallax filter image={require("../../assets/img/city-1.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}> </h1>
              {/* <h4></h4> */}

              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <Footer />
    </div>
  );
};

export default StripeCallback;
