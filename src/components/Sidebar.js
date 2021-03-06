import React from "react";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { sidebar, closeSidebar, loggedIn, logOut } = useGlobalContext();

  return (
    <nav className={sidebar ? "sidebar show-sidebar" : "sidebar"}>
      <FaTimes className="sidebar-times" onClick={closeSidebar} />
      <h1 className="sidebar-title">Tokunbo</h1>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLink to="/" onClick={closeSidebar}>
            Home
          </NavLink>
        </li>
        {loggedIn && (
          <li className="sidebar-list-item">
            <NavLink to="/profile" onClick={closeSidebar}>
              Profile
            </NavLink>
          </li>
        )}
        <li className="sidebar-list-item">
          <NavLink to="/products" onClick={closeSidebar}>
            Products
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/about" onClick={closeSidebar}>
            About
          </NavLink>
        </li>
        {!loggedIn && (
          <li className="sidebar-list-item">
            <NavLink to="/signup" onClick={closeSidebar}>
              Signup
            </NavLink>
          </li>
        )}
        {loggedIn ? (
          <li className="sidebar-list-item">
            <button onClick={logOut} className="btn btn-logout">
              LogOut
            </button>
          </li>
        ) : (
          <li className="sidebar-list-item">
            <NavLink to="/login" onClick={closeSidebar}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
