import axios from "axios";

export const createHotel = async (token, data) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.post(`${process.env.REACT_APP_API}/createhotel`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const allHotels = async () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.get(`${process.env.REACT_APP_API}/allhotels`);

export const durationDays = (from, to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);

  const diff = Math.round(Math.abs(start - end / day));

  return diff;
};

export const hotelPostedBySeller = async (token) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.get(`${process.env.REACT_APP_API}/sellerhotel`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const DeleteHotel = async (token, hotelId) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.delete(`${process.env.REACT_APP_API}/delete-hotel/${hotelId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const getOneHotel = async (hotelId) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.get(`${process.env.REACT_APP_API}/getonehotel/${hotelId}`, {});

export const updateHotel = async (token, data, hotelId) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.put(`${process.env.REACT_APP_API}/update-hotel/${hotelId}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const hotelBookingByUser = async (token) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.get(`${process.env.REACT_APP_API}/users-booking`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const hotelAlreadyBooked = async (token, hotelId) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  axios.get(`${process.env.REACT_APP_API}/hotel-already-booked/${hotelId}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export const listingSearchHotelResults = async (query) => {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API}/hotel-search-list`,
      // eslint-disable-next-line comma-dangle
      query
    );
  } catch (error) {
    // console.log(error);
    return "Error Searching Hotel";
  }
};
