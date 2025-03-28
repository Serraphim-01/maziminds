import React from "react";
import "../styles/NavBar.css";
import logo from "../assets/png/logo.png";

const NavBar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container navbar-container">
      <nav className="navbar max-width">
        <p className="logo-text">
          <span className="logo-container">
            <img className="logo" src={logo} alt="" />
          </span>
          Maziminds
        </p>
        <ul>
          <li>
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </a>
          </li>
          <li>
            <a href="#" onClick={() => scrollToSection("projects")}>
              Projects
            </a>
          </li>
          <li>
            <a href="#" onClick={() => scrollToSection("services")}>
              Services
            </a>
          </li>
          <li>
            <a href="#" onClick={() => scrollToSection("team")}>
              Team
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
