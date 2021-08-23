/* eslint-disable react/require-default-props */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/components/parallaxStyle.js";

const useStyles = makeStyles(styles);

const Parallax = (props) => {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }

  const [transform, setTransform] = useState(
    `translate3d(0,${windowScrollTop}px,0`
  );

  const resetTransform = () => {
    windowScrollTop = window.pageYOffset / 3;
    setTransform(`translate3d(0,${windowScrollTop}px,0)`);
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });

  const { filter, className, children, style, image, small, src } = props;
  const classes = useStyles();
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
    [classes.src]: src,
    [className]: className !== undefined,
  });

  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundImage: `url(${image})`,
        transform,
      }}
    >
      {children}
    </div>
  );
};

Parallax.propTypes = {
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
  src: PropTypes.string,
};

export default Parallax;
