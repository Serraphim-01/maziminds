import "@/styles/HeroHeader.css";
import { useState, useEffect, useRef } from "react";
import heroVideo from "@/assets/videos/fast_foolish.mp4";

const HeroHeader = () => {
  const [showCyan, setShowCyan] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const whiteText = "More Than Games";
  const cyanText = "We Create Experiences.";

  // Show cyan text after 1s
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCyan(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Play video after 2s
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVideoLoaded(true);
      if (videoRef.current) {
        videoRef.current.play().catch((e) => {
          console.warn("Autoplay prevented:", e);
        });
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container">
      <header className={`hero-header ${videoLoaded ? "loaded" : ""}`}>
        <video
          ref={videoRef}
          className="hero-video"
          src={heroVideo}
          loop
          muted
          playsInline
        />
        <div className={`hero-content ${videoLoaded ? "show" : "hide"}`}>
          <h1>
            <span className="white-text">{whiteText}</span>{" "}
            <span
              className={`cyan-text ${
                showCyan ? "fade-in-visible" : "fade-in-hidden"
              }`}
            >
              {cyanText}
            </span>
          </h1>
        </div>
      </header>
    </div>
  );
};

export default HeroHeader;
