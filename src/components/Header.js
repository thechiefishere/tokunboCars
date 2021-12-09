import React from "react";
import { FaBars, FaCartPlus } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import NavbarUser from "./NavbarUser";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const Header = () => {
  const { sidebar, openSidebar, cartItems, setShowOrderPage } =
    useGlobalContext();
  const handleCartClick = () => {
    setShowOrderPage(true);
  };

  return (
    <header className="header">
      <Sidebar />
      <Navbar />
      {!sidebar && <FaBars className="header-bars" onClick={openSidebar} />}
      <h1 className="header-title">
        <Link to="/">Tokunbo</Link>
      </h1>
      <NavbarUser />
      <div className="header-cart">
        <FaCartPlus onClick={handleCartClick} className="header-cart-logo" />
        <p className="header-cart-val">{cartItems.length}</p>
      </div>
    </header>
  );
};

export default Header;
