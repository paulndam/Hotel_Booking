/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { DatePicker, Select } from "antd";
import Script from "react-load-script";
import moment from "moment";
import { AppBar, Toolbar, InputAdornment } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import KingBedIcon from "@material-ui/icons/KingBed";
import DateRangeIcon from "@material-ui/icons/DateRange";
import SearchBar from "material-ui-search-bar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import useStyles from "./searchStyle";
import { Button } from "../../allComponentsFiles";

const { RangePicker } = DatePicker;
const { Option } = Select;

const SearchHotels = () => {
  const history = useHistory();
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [bedRoom, setBedRoom] = useState("");
  const classes = useStyles();

  const autoCompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    // getting city from address object.
    const addressObject = autoCompleteRef.current.getPlace();
    const address = addressObject.address_components;

    // checking if address is valid.
    if (address) {
      setLocation(address[0].long_name);
      setLocation(addressObject.formatted_address);
    }
  };

  const handleScript = () => {
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

  const handleClickSearch = () => {
    history.push(
      `/search-results?location=${location}&duration=${duration}&bedRoom=${bedRoom}`
    );
  };

  return (
    <div>
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8iTyWjA4ENd61UIQTnoHquLWo1JReu2w&libraries=places"
          onLoad={handleScript}
        />
      </div>
      <div className={classes.root}>
        <AppBar position="static" color="primary" className={classes.appBar}>
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <LocationOnIcon />
              </div>
              <SearchBar
                id="search"
                placeholder="search location"
                labeltext="Address..."
                name="location"
                value={location}
                hinttext="Search City"
                style={{
                  margin: "0 auto",
                  width: "auto",
                  height: "32px",
                  borderRadius: " none ",
                }}
                inputProps={{
                  type: "text",
                  endadornment: (
                    <InputAdornment position="end">
                      <LocationOnIcon className={classes.inputIconsColor} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Dates */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <DateRangeIcon />
              </div>
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  "This Month": [
                    moment().startOf("month"),
                    moment().endOf("month"),
                  ],
                }}
                onChange={(date, dateString) => setDuration(dateString)}
                disabledDate={(current) =>
                  current && current.valueOf() < moment().subtract(1, "days")
                }
                style={{ borderRadius: " none ", width: "auto" }}
              />
            </div>

            {/* Bed Room Search Location */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <KingBedIcon />
              </div>
              <Select
                style={{
                  width: "auto",
                  borderRadius: " 15px ",
                  backgroundColor: "red",
                }}
                onChange={(value) => setBedRoom(value)}
                // className="w-200 m-2"
                size="medium"
                placeholder="Beds"
              >
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>
                <Option key={5}>{5}</Option>
              </Select>
            </div>
            {/* Submit Button */}
            <Button
              color="success"
              size="sm"
              // href="/logIn"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClickSearch}
              style={{ marginLeft: "5px" }}
            >
              <ExitToAppIcon />
              Search
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default SearchHotels;
