/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable global-require */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Badge, Card } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { makeStyles, Tooltip } from "@material-ui/core";
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SettingsInputAntennaIcon from "@material-ui/icons/SettingsInputAntenna";
import {
  createConnectAccount,
  getAccountBalance,
  currencyFormat,
  payOutSettings,
} from "../Action/Stripe";
import {
  Header2,
  Footer,
  Button,
  GridContainer,
  GridItem,
  HeaderLinks,
  NavPills,
  Parallax,
  InfoArea,
  LoadingSpinner,
} from "../../allComponentsFiles";
import profile from "../../assets/img/faces/christian.jpg";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import { hotelPostedBySeller, DeleteHotel } from "../Action/HotelAction";

const useStyles = makeStyles(styles);

const { Ribbon } = Badge;

const SellerAccount = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { auth } = useSelector((state) => ({ ...state }));
  const { ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [balance, setBalance] = useState(0);
  const [hotel, setHotel] = useState([]);

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const loadSellerHotels = async () => {
    setLoading(true);
    const response = await hotelPostedBySeller(auth.token);
    setLoading(false);
    setHotel(response.data);
  };

  useEffect(() => {
    loadSellerHotels();
  }, []);

  const addHotel = () => {
    history.push("/addhotel");
  };

  const redirect = () => {
    if (
      auth ||
      auth.user.role !== "seller" ||
      auth.user.role !== "admin" ||
      auth.user.role !== "root"
    ) {
      history.push("/notAuthorized");
    }
  };

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await createConnectAccount(auth.token);
      window.location.href = res.data;
    } catch (error) {
      toast.error("stripe connection failed,please try later");
      setLoading(false);
    }
  };
  useEffect(() => {
    const isUser = Object.values(auth).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [auth]);

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  const handlePayOutSetting = async () => {
    setLoading(true);
    try {
      const res = await payOutSettings(auth.token);
      window.location.href = res.data.url;
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("can't access settings for now please try again");
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm("Sure about deleting this Hotel ?? 🤔")) return;
    DeleteHotel(auth.token, hotelId).then((res) => {
      console.log(res);
      toast.success("Deleted Hotel Successful");
      loadSellerHotels();
    });
  };

  const handleEditHotel = async (hotelId) => {
    history.push(`/update-hotel/${hotelId}`);
  };

  const connected = () => (
    <>
      <div>
        <Header2
          color="transparent"
          brand="Seller Account"
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
          image={require("../../assets/img/landing-bg3.jpeg").default}
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
                      <h6>
                        {auth.user.role} Connected With Stripe Payment Services
                      </h6>

                      <Tooltip
                        id="instagram-tooltip"
                        title="add hotel"
                        placement={window.innerWidth > 959 ? "top" : "left"}
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button
                          color="success"
                          size="sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={addHotel}
                        >
                          <AddCircleIcon />
                          add hotel
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                <p>
                  An artist of considerable range, Chet Faker — the name taken
                  by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                  performs and records all of his own music, giving it a warm,
                  intimate feel with a solid groove structure.{" "}
                </p>
              </div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Posted Hotel",
                        tabIcon: Camera,
                        tabContent: (
                          <div className={classes.section}>
                            {loading ? (
                              <LoadingSpinner />
                            ) : (
                              <GridContainer justify="center">
                                {hotel.map((hotels, i) => (
                                  <GridItem xs={12} sm={10} md={6} key={i}>
                                    <InfoArea
                                      key={hotel.id}
                                      title="Verified Users"
                                      description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                                      icon="iconhere"
                                      iconColor="success"
                                      vertical
                                      hotel={hotels}
                                      hotelOwner
                                      handleDeleteHotel={handleDeleteHotel}
                                      handleEditHotel={handleEditHotel}
                                    />
                                  </GridItem>
                                ))}
                              </GridContainer>
                            )}
                          </div>
                        ),
                      },
                      {
                        tabButton: "Pending Balance",
                        tabIcon: Palette,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <Ribbon text="Avaliable Balance" color="#52c41a">
                                <Card className="bg-dark text-white pt-1">
                                  {balance &&
                                    balance.pending &&
                                    balance.pending.map((pendingBalance, i) => (
                                      <span key={i} className="lead">
                                        {currencyFormat(pendingBalance)}
                                      </span>
                                    ))}
                                </Card>
                              </Ribbon>
                            </GridItem>
                          </GridContainer>
                        ),
                      },
                      {
                        tabButton: "Settings",
                        tabIcon: Favorite,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <Ribbon text="PayOuts" color="#1890ff">
                                <Card
                                  className="mb-2 bg-warning text-dark pointer"
                                  onClick={handlePayOutSetting}
                                >
                                  <SettingOutlined className="h5 pt-2" />
                                </Card>
                              </Ribbon>
                            </GridItem>
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
    </>
  );

  const notConnected = () => (
    <>
      <div>
        <Header2
          color="transparent"
          brand="Seller Account"
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
          image={require("../../assets/img/landing-bg3.jpeg").default}
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
                      <h6>
                        {auth.user.role}: Not Connected With Stripe Payment
                        Services.Please Connect
                      </h6>
                      Connect
                      <br />
                      <Tooltip
                        id="instagram-tooltip"
                        title="add hotel"
                        placement={window.innerWidth > 959 ? "top" : "left"}
                        classes={{ tooltip: classes.tooltip }}
                      >
                        <Button
                          disabled={disabled || loading}
                          color="success"
                          size="sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={handleClick}
                        >
                          <SettingsInputAntennaIcon />
                          {loading ? "...⌛️" : "SetUp PayOut"}
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                <p>
                  Having a stripe account connected and set-up enables fast
                  payment processing, able to list hotels, villas, condos for
                  booking along with secure payments routes or gateways. With a
                  stripe account set up , you will have the ability to manage
                  your posted hotel billings and as well as payouts
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );

  return (
    <>
      <>
        {auth.user.role === "seller" &&
        auth.user.stripe_seller &&
        auth.user.stripe_seller.charges_enabled
          ? connected()
          : notConnected()}
      </>

      <>{auth.user.role !== "seller" && redirect()}</>
    </>
  );
};

export default SellerAccount;
