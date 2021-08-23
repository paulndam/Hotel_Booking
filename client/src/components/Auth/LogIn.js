/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useDispatch } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./LogInStyles";
import catchErrors from "../../Utils/catchErrors";

function Alert(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        P-N
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const logInInitialUser = {
  email: "",
  password: "",
};

const LogIn = ({ history }) => {
  const classes = useStyles();
  const [user, setUser] = useState(logInInitialUser);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const logInUser = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const url = `${process.env.REACT_APP_API}/log-in`;
      const payload = { ...user };
      const { data } = await axios.post(url, payload);
      if (data) {
        // save user to local storage
        localStorage.setItem("auth", JSON.stringify(data));
        // save user info in redux
        dispatch({ type: "LOGGED_IN_USER", payload: data });

        history.push("/");
      }
    } catch (err) {
      catchErrors(err, setError);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {error ? (
            <>
              <div className={classes.snackBarRoot}>
                <Alert onClose={handleClose} severity="error">
                  {error}
                </Alert>
                <Snackbar
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                />
              </div>
            </>
          ) : null}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={logInUser}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              disabled={disabled}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {" Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LogIn;
