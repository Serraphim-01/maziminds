import "@/styles/HeroHeader.css";
import { useState, useEffect } from "react";
import heroVideo from "@/assets/videos/fast_foolish.mp4";

const HeroHeader = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "More Than Games, We Create Experiences.";

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let iterations = 0;
    const length = fullText.length;

    const startScramble = () => {
      const interval = setInterval(() => {
        setDisplayedText(() => {
          let updated = "";
          for (let i = 0; i < length; i++) {
            if (i < iterations) {
              updated += fullText[i];
            } else if (fullText[i] === " ") {
              updated += " ";
            } else {
              updated += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          return updated;
        });

        iterations++;
        if (iterations > length) clearInterval(interval);
      }, 50);
    };

    const delay = setTimeout(startScramble, 300); // 1 second delay
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setVideoLoaded(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <header className={`hero-header ${videoLoaded ? "loaded" : ""}`}>
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className={`hero-content ${videoLoaded ? "show" : "hide"}`}>
          <h1><span className="scramble-animated-text">{displayedText}</span></h1>
          <a
            href="#"
            onClick={() => scrollToSection("projects")}
            className="cta-button"
          >
            View Our Games
          </a>
        </div>
      </header>
    </div>
  );
};

export default HeroHeader;
