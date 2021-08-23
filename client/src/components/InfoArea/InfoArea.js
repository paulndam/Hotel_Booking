/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  makeStyles,
  Tooltip,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import UpdateIcon from "@material-ui/icons/Update";
import styles from "../../assets/jss/material-kit-react/components/infoStyle.js";
import useStylez from "./infoStyle";
import { Button } from "../../allComponentsFiles";

const useStyles = makeStyles(styles);

const InfoArea = (props) => {
  const classes = useStyles();
  const classez = useStylez();
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    iconColor,
    vertical,
    hotel,
    handleDeleteHotel = (h) => h,
    handleEditHotel = (hotelId) => hotelId,
    hotelOwner = false,
  } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical,
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical,
  });

  return (
    <div className={classes.infoArea}>
      <div className={iconWrapper}>
        <props.icon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <Card className={classes.root} style={{ backgroundColor: " #f5f5f5 " }}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="recipe"
                className={classez.avatar}
                onClick={() => history.push(`/hotel-detail/${hotel._id}`)}
              >
                {hotel.title.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton
                aria-label="settings"
                onClick={() => history.push(`/hotel-detail/${hotel._id}`)}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={hotel.title}
            subheader={`
                      
             ${hotel.bedRoom <= 1 ? "Bed Romm" : "Bed Rooms"} : ${
              hotel.bedRoom
            } `}
          />
          <CardMedia
            className={classez.media}
            image={`${process.env.REACT_APP_API}/hotel-image/${hotel._id}`}
            title={hotel.title}
            onClick={() => history.push(`/hotel-detail/${hotel._id}`)}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${hotel.content.substring(0, 90)}...`}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <LocationOnIcon />
            {hotel.location}
            {""}
            <MonetizationOnIcon />
            {`${hotel.price}`}
            <IconButton
              className={clsx(classez.expand, {
                [classez.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <CardActions disableSpacing>
            {hotelOwner && (
              <>
                <Tooltip
                  id="instagram-tooltip"
                  title="Delete hotel"
                  placement={window.innerWidth > 959 ? "top" : "left"}
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button
                    color="danger"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDeleteHotel(hotel._id)}
                    style={{ marginRight: "auto" }}
                  >
                    <DeleteForeverIcon /> Remove Hotel
                  </Button>
                </Tooltip>

                <Tooltip
                  id="instagram-tooltip"
                  title="Update hotel"
                  placement={window.innerWidth > 959 ? "top" : "left"}
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button
                    color="primary"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleEditHotel(hotel._id)}
                  >
                    <UpdateIcon />
                    Update Hotel
                  </Button>
                </Tooltip>
              </>
            )}
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {`${hotel.content.substring(0, 299)}...`}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
};

export default InfoArea;
