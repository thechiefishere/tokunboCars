import React from "react";
import { useGlobalContext } from "../context";
import { NavLink } from "react-router-dom";

const NavbarUser = () => {
  const { loggedIn, logOut } = useGlobalContext();

  return (
    <nav className="navbaruser">
      <ul className="navbaruser-list">
        {loggedIn ? (
          <li className="navbaruser-list-item">
            <button onClick={logOut} className="btn btn-logout">
              LogOut
            </button>
          </li>
        ) : (
          <li className="navbaruser-list-item">
            <NavLink className="navlink" to="/login">
              Login
            </NavLink>
          </li>
        )}
        {!loggedIn && (
          <li className="navbaruser-list-item">
            <NavLink className="navlink signup" to="/signup">
              Signup
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavbarUser;
