import axios from "axios";

export const registerUser = async (user) => {
  // eslint-disable-next-line no-unused-vars
  const userData = await axios.post(
    `${process.env.REACT_APP_API}/signUp`,
    // eslint-disable-next-line comma-dangle
    user
  );
};
