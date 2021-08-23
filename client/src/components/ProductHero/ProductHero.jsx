import * as React from "react";
// import Button from "../Button/Button2";
import Typography from "@material-ui/core/Typography";
import ProductHeroLayout from "../../allComponentsFiles";

// eslint-disable-next-line operator-linebreak
const backgroundImage =
  "https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

const ProductHero = () => (
  <ProductHeroLayout
    sxBackground={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundColor: "#7fc7d9", // Average color of the background image.
      backgroundPosition: "center",
    }}
  >
    <img
      style={{ display: "none" }}
      src={backgroundImage}
      alt="increase priority"
    />
    <Typography color="inherit" align="center" variant="h2" marked="center">
      Make This Vacation The Best Ever
    </Typography>
    <Typography
      color="inherit"
      align="center"
      variant="h5"
      sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
    >
      Enjoy secret offers up to -70% off the best luxury hotels every Sunday.
    </Typography>
    <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
      Discover the experience
    </Typography>
  </ProductHeroLayout>
);

export default ProductHero;
