/* eslint-disable no-nested-ternary */
import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import { Apps } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LaunchIcon from "@material-ui/icons/Launch";
import { Button, CustomDropdown } from "../../allComponentsFiles";
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));
  const classes = useStyles();
  const active = window.location.pathname;

  const logOut = () => {
    dispatch({
      type: "LOG_OUT",
      payload: null,
    });
    // cookie.remove("authUser");
    // cookie.remove("token");
    window.localStorage.removeItem("auth");
    // window.localStorage.removeItem("token");
    history.push("/log-in");
  };

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Actions"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Home
            </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Browse Hotels
            </Link>,
            <Link to="/contact-us" className={classes.dropdownLink}>
              Get In Touch
            </Link>,
            <Link to="/about-us" className={classes.dropdownLink}>
              About Us
            </Link>,
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
        <Link to="/" className={classes.navLink}>
          Home
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
        <Link to="/" className={classes.navLink}>
          Browse Hotels
        </Link>
      </ListItem>

      <>
        {auth?.user?.role === "user" ? (
          <>
            <ListItem className={classes.listItem}>
              <Link to="/account" className={classes.navLink}>
                Account
              </Link>
            </ListItem>
          </>
        ) : null || auth?.user?.role === "seller" ? (
          <>
            <ListItem className={classes.listItem}>
              <Link to="/sellerAccount" className={classes.navLink}>
                Seller Account
              </Link>
            </ListItem>
          </>
        ) : null}
      </>

      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href=""
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={`${classes.socialIcons} fab fa-twitter`} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href=""
            target="_blank"
            className={classes.navLink}
          >
            <i className={`${classes.socialIcons} fab fa-facebook`} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href=""
            target="_blank"
            className={classes.navLink}
          >
            <i className={`${classes.socialIcons} fab fa-instagram`} />
          </Button>
        </Tooltip>
      </ListItem>

      {auth.user && (
        <>
          <ListItem className={classes.listItem}>
            <Link to="/account" className={classes.navLink}>
              Hello 👋🏻 <br />
              {auth.user.firstName}
            </Link>
          </ListItem>

          <ListItem className={classes.listItem}>
            <Tooltip
              id="instagram-tooltip"
              title=""
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <Button
                color="danger"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
                onClick={logOut}
              >
                <ExitToAppIcon />
                log-Out
              </Button>
            </Tooltip>
          </ListItem>
        </>
      )}

      {!auth.user && (
        <>
          <ListItem className={classes.listItem}>
            <Tooltip
              id="instagram-tooltip"
              title=""
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <Link to="/log-in">
                <Button
                  color="success"
                  size="sm"
                  // href="/logIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LaunchIcon />
                  sign-in
                </Button>
              </Link>
            </Tooltip>
          </ListItem>

          <ListItem className={classes.listItem}>
            <Tooltip
              id="instagram-tooltip"
              title=""
              placement={window.innerWidth > 959 ? "top" : "left"}
              classes={{ tooltip: classes.tooltip }}
            >
              <Link to="/sign-up">
                <Button
                  color="primary"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LaunchIcon />
                  sign-Up
                </Button>
              </Link>
            </Tooltip>
          </ListItem>
        </>
      )}
    </List>
  );
}
