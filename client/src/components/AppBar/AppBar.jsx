import * as React from "react";
import MuiAppBar from "@material-ui/core/AppBar";

const AppBar = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAppBar elevation={0} position="fixed" {...props} />
);

export default AppBar;
