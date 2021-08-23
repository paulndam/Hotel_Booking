import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Link } from "@material-ui/core/Button";

const LogOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  // empty user info from redux state
  dispatch({
    type: "LOG_OUT",
    payload: null,
  });
  window.localStorage.removeItem("authUser");
  history.push("/logIn");

  return (
    <Link href="/logIn">
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        onClick={LogOut}
      >
        Log Out
      </Button>
    </Link>
  );
};

export default LogOut;
