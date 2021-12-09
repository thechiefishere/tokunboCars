import React from "react";
import { useGlobalContext } from "../context";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { loggedIn } = useGlobalContext();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <NavLink className="navlink" to="/">
            Home
          </NavLink>
        </li>
        {loggedIn && (
          <li className="navbar-list-item">
            <NavLink className="navlink" to="/profile">
              Profile
            </NavLink>
          </li>
        )}
        <li className="navbar-list-item">
          <NavLink className="navlink" to="/products">
            Products
          </NavLink>
        </li>
        <li className="navbar-list-item">
          <NavLink className="navlink" to="/about">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
