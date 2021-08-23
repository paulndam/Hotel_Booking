import axios from "axios";

export const createConnectAccount = async (token) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // eslint-disable-next-line comma-dangle
    }
  );

// make request to backend .
// get connection status for stripe payout verification

export const getAccountStatus = async (token) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // eslint-disable-next-line comma-dangle
    }
  );

export const getAccountBalance = async (token) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.post(
    `${process.env.REACT_APP_API}/get-stripe-account-balance`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // eslint-disable-next-line comma-dangle
    }
  );

// currency formater.
export const currencyFormat = (data) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (data.amount / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });

export const payOutSettings = async (token) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // eslint-disable-next-line comma-dangle
    }
  );

export const getSessionId = async (token, hotelId) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.post(
    `${process.env.REACT_APP_API}/stripe-session`,
    { hotelId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // eslint-disable-next-line comma-dangle
    }
  );

export const stripeSuccessRequest = async (token, hotelId) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.post(
    `${process.env.REACT_APP_API}/stripe-success`,
    { hotelId },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      // eslint-disable-next-line comma-dangle
    }
  );
