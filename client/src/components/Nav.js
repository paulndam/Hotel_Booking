import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const Nav = () => {
  const { authUser } = useSelector((state) => ({ ...state }));

  return (
    <div className="nav bg-dark d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Home --- {JSON.stringify(authUser)}
      </Link>
      <Link className="nav-link" to="/logIn">
        Login
      </Link>
      <Link className="nav-link" to="/signUp">
        Sign-Up
      </Link>
    </div>
  );
};

export default Nav;
