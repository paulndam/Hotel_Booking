/* eslint-disable react/require-default-props */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "../../assets/jss/material-kit-react/components/cardFooterStyle.js";

const useStyles = makeStyles(styles);

const CardFooter = (props) => {
  const classes = useStyles();
  const { className, children, ...rest } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [className]: className !== undefined,
  });
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default CardFooter;
