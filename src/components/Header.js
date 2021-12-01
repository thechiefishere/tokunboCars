import React from "react";
import { FaBars, FaCartPlus } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useGlobalContext } from "../context";

const Header = () => {
  const { sidebar, openSidebar } = useGlobalContext();

  return (
    <header className="header">
      <Sidebar />
      {!sidebar && <FaBars className="header-bars" onClick={openSidebar} />}
      <h1 className="header-title">Tokunbo</h1>
      <div className="header-cart">
        <FaCartPlus />
        {/* <p>val</p> */}
      </div>
    </header>
  );
};

export default Header;
