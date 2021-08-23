// update user in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem("auth")) {
    let auth = JSON.parse(localStorage.getItem("auth"));
    auth = user;
    // console.log("--info from test --", auth.user);
    localStorage.setItem("auth", JSON.stringify(auth));
    next();
  }
};
