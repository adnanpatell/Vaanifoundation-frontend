import { Link } from "react-router-dom";
import logo from "../logo/bharuch-health.png";
import React, { useState } from "react";
import Button from "@mui/material/Button";
// import "./CustomLayout.css";
const CustomLayout = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      
      <nav>
        <div className="navbar-container">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className={`nav-links ${isOpen ? "open" : ""}`}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <Link to="/user/login">
            <Button variant="contained" className="btnlogin">Login</Button>
          </Link>
        </div>
        <div
          className={`burger ${isOpen ? "open" : ""}`}
          onClick={toggleNavbar}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>
      <div>
        <main>{props.children}</main>
      </div>
    </>
  );
};
export default CustomLayout;
