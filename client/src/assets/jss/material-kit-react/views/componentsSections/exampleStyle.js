import imagesStyle from "../../imagesStyles.js";
import { containerFluid } from "../../../material-kit-react.js";

const exampleStyle = {
  section: {
    padding: "70px 0",
  },
  container: {
    ...containerFluid,
    textAlign: "center !important",
  },
  ...imagesStyle,
  link: {
    textDecoration: "none",
  },
};

export default exampleStyle;
