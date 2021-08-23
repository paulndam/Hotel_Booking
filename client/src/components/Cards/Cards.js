/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import {
  GridContainer,
  BookingModal,
  GridItem,
} from "../../allComponentsFiles";
import styles from "../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import useStylez from "./CardsStyle";

const useStyles = makeStyles(styles);

const Cards = (props) => {
  const classes = useStyles();
  const classez = useStylez();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { hotel, session, orderedBy } = props;
  const history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.section}>
      <div>
        <GridContainer>
          <GridItem xs={10} sm={10} md={12}>
            <Card
              className={classez.root}
              style={{ backgroundColor: " #f5f5f5 " }}
            >
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
              {hotel.images && hotel.images.contentType ? (
                <CardMedia
                  className={classez.media}
                  image={`${process.env.REACT_APP_API}/hotel-image/${hotel._id}`}
                  title="Paella dish"
                  onClick={() => history.push(`/hotel-detail/${hotel._id}`)}
                />
              ) : (
                <CardMedia
                  // eslint-disable-next-line global-require
                  image={require("../../assets/img/h2.webp").default}
                  title="Paella dish"
                  onClick={() => history.push(`/hotel-detail/${hotel._id}`)}
                />
              )}
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {/* {`${hotel.content.slice("\n", [199])}...`} */}
                  {`${hotel.content.substring(0, 100)}...`}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <LocationOnIcon />
                {hotel.location}
                {""}
                <MonetizationOnIcon />
                {`${hotel.price} per night`}
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
                <div>
                  <BookingModal
                    session={session}
                    onClose={handleClose}
                    orderedBy={orderedBy}
                  />
                </div>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    {`${hotel.content.substring(0, 300)}...`}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default Cards;
