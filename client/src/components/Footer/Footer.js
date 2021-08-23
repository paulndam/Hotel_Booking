import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import styles from "../../assets/jss/material-kit-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

const Footer = (props) => {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left} />
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()}, made with{" "}
          <Favorite className={classes.icon} /> by{" "}
          <a
            href="https://www.linkedin.com/in/paul-ndam-a3a38114a/"
            className={aClasses}
            target="_blank"
            rel="noreferrer"
          >
            Paul ndam
          </a>{" "}
          for a better web.
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  // eslint-disable-next-line react/require-default-props
  whiteFont: PropTypes.bool,
};

export default Footer;
