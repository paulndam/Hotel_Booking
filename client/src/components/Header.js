/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Toolbar, Button, Link, Typography } from "@material-ui/core";
import useStyles from "./HeaderStyle";

require("react-dom");
window.React2 = require("react");

const Header = () => {
  const history = useHistory();
  const classes = useStyles();

  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => ({ ...state }));

  const logOut = () => {
    dispatch({
      type: "LOG_OUT",
      payload: null,
    });
    window.localStorage.removeItem("authUser");
    history.push("/logIn");
  };
  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Link href="/">
          <Button size="small">Home </Button>
        </Link>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        />

        {authUser !== null ? (
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={logOut}
          >
            Log Out
          </Button>
        ) : (
          <>
            <Link href="/signUp">
              <Button variant="outlined" size="small" color="primary">
                Sign up
              </Button>
            </Link>
            <Link href="/logIn">
              <Button variant="outlined" size="small" color="secondary">
                Log in
              </Button>
            </Link>
          </>
        )}
      </Toolbar>
    </>
  );
};

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
export default Header;
