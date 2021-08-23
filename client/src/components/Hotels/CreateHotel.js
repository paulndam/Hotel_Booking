/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import Script from "react-load-script";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import InputAdornment from "@material-ui/core/InputAdornment";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { DatePicker, Select } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import {
  Header2,
  HeaderLinks,
  Footer,
  GridContainer,
  GridItem,
  Button,
  Card,
  CardHeader,
  CardFooter,
} from "../../allComponentsFiles";
import { createHotel } from "../Action/HotelAction";
import catchErrors from "../../Utils/catchErrors";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import image from "../../assets/img/bg7.jpg";

import "react-datetime/css/react-datetime.css";

const useStyles = makeStyles(styles);
const { Option } = Select;

const CreateHotel = (props) => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [valuez, setValues] = useState({
    title: "",
    content: "",
    images: "",
    price: "",
    bedRoom: "",
    duration: "",
  });
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const { title, content, images, price, bedRoom, duration } = valuez;

  const autoCompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const addressObject = autoCompleteRef.current.getPlace();
    const address = addressObject.address_components;

    if (address) {
      setValues(address[0].long_name);
      setLocation(addressObject.formatted_address);
    }
  };

  const handleScript = () => {
    const options = {
      type: ["(cities)"],
    };
    /* global google */
    autoCompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById("search"),
      options
    );

    autoCompleteRef.current.setFields([
      "address_components",
      "formatted_address",
    ]);
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

  const handleAddHotel = async (e) => {
    e.preventDefault();

    try {
      setError("");
      const data = new FormData();
      data.append("location", location);
      data.append("title", title);
      data.append("bedRoom", bedRoom);
      data.append("duration", duration);
      data.append("content", content);
      data.append("price", price);
      images && data.append("images", images);
      const response = await createHotel(auth.token, data);
      toast.success("Hotel Added");
      setTimeout(() => {
        window.location.assign("/");
      }, 1000);
    } catch (err) {
      toast.error(catchErrors(err, setError), {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...valuez, images: e.target.files[0] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLocation = (val) => {
    setLocation(val.location);
  };

  const { RangePicker } = DatePicker;

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
                <div className="row">
                  <div className="col-md-10 offset-sm-1 text-center ">
                    <form
                      className=" form-inline justify-content-center"
                      onSubmit={handleAddHotel}
                    >
                      <CardHeader
                        color="primary"
                        className={classes.cardHeader}
                      >
                        <h4>Add Hotel</h4>
                        {error}
                        <div className={classes.socialLine}>
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={(e) => e.preventDefault()}
                          />
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={(e) => e.preventDefault()}
                          />
                          <Button
                            justIcon
                            href="#pablo"
                            target="_blank"
                            color="transparent"
                            onClick={(e) => e.preventDefault()}
                          />
                        </div>
                      </CardHeader>
                      <div className="form-group mb-4">
                        <label className="form-label">Location </label>
                        <SearchBar
                          id="search"
                          placeholder="search location"
                          labeltext="Address..."
                          name="location"
                          value={location}
                          onChange={handleLocation}
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

                        <label className="form-label">Name </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          value={title}
                          aria-describedby="emailHelp"
                          onChange={handleChange}
                        />

                        <label className="form-label">Bed Room </label>
                        <Select
                          style={{ width: 120 }}
                          onChange={(value) =>
                            setValues({ ...valuez, bedRoom: value })
                          }
                          className="w-100 m-2  "
                          size="large"
                          placeholder="Beds"
                        >
                          <Option key={1}>{1}</Option>
                          <Option key={2}>{2}</Option>
                          <Option key={3}>{3}</Option>
                          <Option key={4}>{4}</Option>
                          <Option key={5}>{5}</Option>
                        </Select>

                        <label className="form-label">Duration </label>

                        <RangePicker
                          ranges={{
                            Today: [moment(), moment()],
                            "This Month": [
                              moment().startOf("month"),
                              moment().endOf("month"),
                            ],
                          }}
                          onChange={(date, dateString) =>
                            setValues({ ...valuez, duration: dateString })
                          }
                          disabledDate={(current) =>
                            current &&
                            current.valueOf() < moment().subtract(1, "days")
                          }
                        />

                        <label htmlFor="content" className="form-label">
                          Content
                        </label>
                        <textarea
                          className="form-control"
                          id="content"
                          name="content"
                          value={content}
                          rows="3"
                          onChange={handleChange}
                        />
                        <label className="form-label">Price </label>

                        <input
                          type="number"
                          name="price"
                          className="form-control"
                          value={price}
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="formFile"
                          className="btn btn-outline-info btn-block m-2 text-left "
                        >
                          Upload Image
                        </label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                          hidden
                          accept="image/*"
                          name="images"
                          onChange={handleImageChange}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
                <CardFooter className={classes.cardFooter}>
                  <img
                    src={preview}
                    alt="prveImage"
                    className="img img-fluid m-2"
                  />
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
};

export default CreateHotel;
