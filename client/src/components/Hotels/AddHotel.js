/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
import React, { useState, useRef, useEffect } from "react";
import Script from "react-load-script";
import SearchBar from "material-ui-search-bar";
// import google from "google-maps";
import { makeStyles, InputAdornment } from "@material-ui/core/styles";
import moment from "moment";
// @material-ui/icons

import HotelIcon from "@material-ui/icons/Hotel";
import TocIcon from "@material-ui/icons/Toc";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import KingBedIcon from "@material-ui/icons/KingBed";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DateRangeIcon from "@material-ui/icons/DateRange";
import {
  Header2,
  HeaderLinks,
  Footer,
  GridContainer,
  GridItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CustomInput,
} from "../../allComponentsFiles";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import image from "../../assets/img/bg7.jpg";
import "react-datetime/css/react-datetime.css";

const useStyles = makeStyles(styles);

const initialNewHotel = {
  title: "",
  content: "",
  image: "",
  price: "",
  from: "",
  to: "",
  bedRoom: "",
  location: "",
  checkInAndCheckOut: "",
};

const AddHotel = (props) => {
  const [hotel, setHotel] = useState(initialNewHotel);
  const [query, setQuery] = useState("");
  const [disabled, setDisabled] = useState(true);
  const autoCompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    // getting city from address object.
    const addressObject = autoCompleteRef.current.getPlace();
    const address = addressObject.address_components;

    // checking if address is valid.
    if (address) {
      setHotel(address[0].long_name);
      setQuery(addressObject.formatted_address);
    }
  };

  const handleScript = () => {
    // declaring option for autocomplete.
    const options = {
      type: ["(cities)"],
    };

    // now initializing google auto complete.
    /* global google */
    autoCompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById("search"),
      options
    );

    // restricting set of fields.
    autoCompleteRef.current.setFields([
      "address_components",
      "formatted_address",
    ]);

    // firing event when a suggested name is declared.
    autoCompleteRef.current.addListener("place_changed", handlePlaceSelect);
  };

  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(() => {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const handleAddHotel = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setHotel({ ...hotel, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    const isUser = Object.values(hotel).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [hotel]);

  return (
    <div>
      <Header2
        absolute
        color="transparent"
        brand="N-Joy Hotel"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div>
          <Script
            url="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8iTyWjA4ENd61UIQTnoHquLWo1JReu2w&libraries=places"
            onLoad={handleScript}
          />
        </div>

        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form onSubmit={handleAddHotel} className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Add Hotel</h4>
                  </CardHeader>
                  <p className={classes.divider} />
                  <CardBody>
                    {/* Title */}
                    <CustomInput
                      labeltext="Hotel Name..."
                      name="title"
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endadornment: (
                          <InputAdornment position="end">
                            <HotelIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      value={hotel.title}
                      onChange={handleChange}
                    />
                    {/* content */}
                    <CustomInput
                      labeltext="Content..."
                      name="content"
                      id="content"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endadornment: (
                          <InputAdornment position="end">
                            <TocIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      value={hotel.content}
                      onChange={handleChange}
                    />

                    {/* price */}
                    <CustomInput
                      labeltext="Price..."
                      name="price"
                      id="price"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "number",
                        endadornment: (
                          <InputAdornment position="end">
                            <LocalOfferIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                      value={hotel.price}
                      onChange={handleChange}
                    />

                    {/* from */}
                    <CustomInput
                      labeltext="From..."
                      margin="normal"
                      name="from"
                      id="from"
                      disabled={(current) =>
                        current.valueOf() < moment().subtract(1, "days")
                      }
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "date",
                        endadornment: (
                          <InputAdornment position="end">
                            <DateRangeIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                      value={hotel.from}
                      onChange={(date, dateString) =>
                        setHotel({ ...hotel, from: dateString })
                      }
                    />

                    {/* to */}
                    <CustomInput
                      labeltext="To..."
                      name="to"
                      id="to"
                      disabled={(current) =>
                        current.valueOf() < moment().subtract(1, "days")
                      }
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "date",
                        endadornment: (
                          <InputAdornment position="end">
                            <DateRangeIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                      value={hotel.to}
                      onChange={(date, dateString) =>
                        setHotel({ ...hotel, to: dateString })
                      }
                    />

                    {/* bedRoom */}
                    <CustomInput
                      labeltext="Bed Room..."
                      name="bedRoom"
                      id="bedRoom"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "number",
                        endadornment: (
                          <InputAdornment position="end">
                            <KingBedIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      value={hotel.bedRoom}
                      onChange={handleChange}
                    />

                    <SearchBar
                      id="search"
                      placeholder="search location"
                      labeltext="Address..."
                      name="location"
                      value={query}
                      hinttext="Search City"
                      style={{
                        margin: "0 auto",
                        maxWidth: 800,
                      }}
                      inputProps={{
                        type: "text",
                        endadornment: (
                          <InputAdornment position="end">
                            <LocationOnIcon
                              className={classes.inputIconsColor}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button variant="contained" component="label">
                      add image
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        hidden
                      />
                    </Button>

                    <Button
                      simple
                      target="_blank"
                      rel="noopener noreferrer"
                      color="primary"
                      size="lg"
                    >
                      Add Hotel
                    </Button>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <img
                      src={preview}
                      alt="prveImage"
                      className="img img-fluid m-2"
                    />
                    {/* <pre>{JSON.stringify(hotel, null, 4)}</pre> */}
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

export default AddHotel;
