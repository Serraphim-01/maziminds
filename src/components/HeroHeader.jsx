import "./../styles/HeroHeader.css";
import { useState, useEffect } from "react";
import headerBg from "../assets/png/header-bg.webp";
import tinyHeaderBg from "../assets/png/tiny_header-bg.webp";

const HeroHeader = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(tinyHeaderBg);

  useEffect(() => {
    const img = new Image();
    img.src = headerBg;
    img.onload = () => {
      setCurrentImage(headerBg);
      setImageLoaded(true);
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
    <header className={`hero-header ${imageLoaded ? "loaded" : ""}`} style={{ backgroundImage: `url(${currentImage})` }}>
    <div className={`hero-content ${imageLoaded ? "show" : "hide"}`}>
        <span>Welcome to</span>
        <h1>Maziminds</h1>
        <p>Creating immersive 3D experiences for players worldwide</p>
        <a href="#" onClick={() => scrollToSection("projects")} className="cta-button">View Our Projects</a>
      </div>
    </header>
    </div>
  );
};

export default HeroHeader;
