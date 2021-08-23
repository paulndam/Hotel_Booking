const initialState = JSON.parse(window.localStorage.getItem("auth")) || {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload;
    case "SIGN_UP_USER":
      return { token: action.payload.token, user: action.payload.newUser }; // if you fixed backend, just return action.payload
    case "LOG_OUT":
      localStorage.removeItem("auth");

      return null;
    default:
      return state;
  }
};

export default authReducer;
