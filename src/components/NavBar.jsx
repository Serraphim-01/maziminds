import React, { useState, useEffect } from "react";
import "@/styles/NavBar.css";
import logo from "../assets/png/logo.png";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id, event) => {
    event.preventDefault(); // Prevent default anchor behavior

    setActiveLink(id);
    setMenuOpen(false); // Close menu after clicking

    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`navbar-container ${scrolled ? "scrolled" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <nav className="navbar max-width">
        <p className="logo-text">
          <span className="logo-container">
            <img className="logo" src={logo} alt="Logo" />
          </span>
          Maziminds
        </p>

        {/* Menu Button for Mobile */}
        <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a href="#" 
               className={activeLink === "home" ? "active" : ""}
               onClick={(e) => { 
                 e.preventDefault(); 
                 setActiveLink("home"); 
                 setMenuOpen(false); 
                 window.scrollTo({ top: 0, behavior: "smooth" }); 
               }}>
              Home
            </a>
          </li>
          <li>
            <a href="#projects" 
               className={activeLink === "projects" ? "active" : ""}
               onClick={(e) => scrollToSection("projects", e)}>
              Projects
            </a>
          </li>
          <li>
            <a href="#services" 
               className={activeLink === "services" ? "active" : ""}
               onClick={(e) => scrollToSection("services", e)}>
              Services
            </a>
          </li>
          <li>
            <a href="#team" 
               className={activeLink === "team" ? "active" : ""}
               onClick={(e) => scrollToSection("team", e)}>
              Team
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
