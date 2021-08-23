import { makeStyles } from "@material-ui/core/styles";
import { deepPurple, green } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  root2: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  media: {
    height: 0,
    // paddingTop: "56.25%", // 16:9
    paddingTop: "40.25%",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
    display: "center",
  },
  typoHeader: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    textAlign: "center",
    fontSize: "20px",
  },
}));
