/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

// rest will give all the properties and the 3 dot will spread all the properties

const PrivateRoute = ({ children, ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth.user ? <Route {...rest} /> : <Redirect to="/log-in" />;
};

export default PrivateRoute;
