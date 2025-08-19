import React, { useEffect, useRef, useState } from "react";
import "@/styles/ProjectCard.css";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

export default function ClientCard({ client, externalLink, isFeatured }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const navigate = useNavigate();

  const videoSrc = `${client.video_url}?autoplay=0&mute=1&enablejsapi=1&controls=0&modestbranding=1&showinfo=0`;

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (isTouch) setShowPlayButton(true);
  }, []);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (isPlaying) {
        postVideoCommand("pauseVideo");
        setIsPlaying(false);
        setShowOverlay(true);
        setShowPlayButton(true);
      }
    };

    if (isPlaying) {
      document.addEventListener("touchstart", handleUserInteraction, {
        passive: true,
      });
      document.addEventListener("scroll", handleUserInteraction, {
        passive: true,
      });
    }

    return () => {
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
    };
  }, [isPlaying]);

  const postVideoCommand = (command) => {
    if (!videoRef.current) return;
    videoRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: command, args: "" }),
      "*"
    );
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(true);
    setShowOverlay(false);
    setShowPlayButton(false);
    postVideoCommand("unMute");
    postVideoCommand("playVideo");
  };

  const handleCardClick = () => {
    if (externalLink) {
      window.open(externalLink, "_blank");
    } else {
      navigate(`/clients/${client.id}`);
    }
  };

  return (
    <div
      className="project-card"
      ref={containerRef}
      // onClick={handleCardClick}
      onMouseOver={(e) => {
        if (!isTouchDevice) {
          postVideoCommand("playVideo");
          setShowOverlay(false);
        }
      }}
      onMouseOut={(e) => {
        if (!isTouchDevice) {
          postVideoCommand("pauseVideo");
          setShowOverlay(true);
        }
      }}
    >
      <div className="video-wrapper">
        <iframe
          ref={videoRef}
          width="100%"
          height="200"
          src={videoSrc}
          title={client.title}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        {showOverlay && (
          <div className="video-overlay">
            <img
              src={client.image_url}
              alt={client.title}
              className="overlay-image"
            />
          </div>
        )}
        {showPlayButton && (
          <button className="mobile-play-button" onClick={handlePlay}>
            <FaPlay className="icon" />
          </button>
        )}
      </div>

      <h3 className="project-title">{client.title}</h3>

      <p className="simple-description">{client.long_description}</p>

      {/* {isFeatured && (
        <button 
        className="read-more-btn" onClick={handleCardClick}>
          Read More
        </button>
      )} */}
    </div>
  );
}
