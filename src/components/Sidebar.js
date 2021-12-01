import React from "react";
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { sidebar, closeSidebar } = useGlobalContext();

  return (
    <nav className={sidebar ? "sidebar show-sidebar" : "sidebar"}>
      <FaTimes className="sidebar-times" onClick={closeSidebar} />
      <h1 className="sidebar-title">Tokunbo</h1>
      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="/">Home</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/product">Product</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/about">About</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/signup">Signup</a>
        </li>
        <li className="sidebar-list-item">
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
