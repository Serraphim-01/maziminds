import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import "@/styles/NavBar.css";
import logo from "../assets/png/logo.png";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const menuRef = useRef(null); // Reference for the menu

  // Detect Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close Menu When Clicking Outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Smooth Scroll
  const scrollToSection = (id, event) => {
    event.preventDefault();
    setActiveLink(id);
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`navbar-container ${scrolled ? "scrolled" : ""} ${
        menuOpen ? "menu-open" : ""
      }`}
    >
      <nav className="navbar max-width" ref={menuRef}>
        <p className="logo-text">
          <span className="logo-container">
            <img className="logo" src={logo} alt="Logo" />
          </span>
          Maziminds
        </p>

        {/* Menu Button with Smooth Transition */}
        <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`menu-icon ${menuOpen ? "open" : ""}`}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </span>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <a
              href="#"
              className={activeLink === "home" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink("home");
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className={activeLink === "projects" ? "active" : ""}
              onClick={(e) => scrollToSection("projects", e)}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={activeLink === "services" ? "active" : ""}
              onClick={(e) => scrollToSection("services", e)}
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#team"
              className={activeLink === "team" ? "active" : ""}
              onClick={(e) => scrollToSection("team", e)}
            >
              Team
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
