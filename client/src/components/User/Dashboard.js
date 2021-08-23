/* eslint-disable comma-dangle */
/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core";
import Camera from "@material-ui/icons/Camera";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import {
  Header2,
  Footer,
  Button,
  GridContainer,
  GridItem,
  HeaderLinks,
  NavPills,
  Parallax,
  Cards,
} from "../../allComponentsFiles";
import profile from "../../assets/img/faces/christian.jpg";
import { hotelBookingByUser } from "../Action/HotelAction";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

const Dashboard = (props) => {
  const classes = useStyles();
  const { auth } = useSelector((state) => ({ ...state }));
  const [booking, setBooking] = useState([]);
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const loadBookedHotelByUser = async () => {
    const response = await hotelBookingByUser(auth.token);
    setBooking(response.data);
  };

  useEffect(() => {
    loadBookedHotelByUser();
  }, []);

  return (
    <div>
      <Header2
        color="transparent"
        brand="N-Joy Hotel"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax
        small
        filter
        image={require("../../assets/img/profile-bg.jpg").default}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>
                      {`${auth.user.firstName}  ${auth.user.lastName}`}
                    </h3>
                    <h6>{auth.user.role}</h6>
                    <Button justIcon link className={classes.margin5}>
                      <TwitterIcon />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <InstagramIcon />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <FacebookIcon />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Booked Hotels",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          {booking.map((b, i) => (
                            <GridItem xs={12} sm={10} md={6} key={i}>
                              <Cards
                                key={b._id}
                                hotel={b.hotel}
                                session={b.session}
                                orderedBy={b.orderedBy}
                              />
                            </GridItem>
                          ))}
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
