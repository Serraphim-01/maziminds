import React, { useEffect, useRef, useState } from "react";
import "@/styles/ProjectCard.css";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";

export default function ProjectCard({ project }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const navigate = useNavigate();

  const videoSrc = `${project.video_url}?autoplay=0&mute=1&enablejsapi=1&controls=0&modestbranding=1&showinfo=0`;

  const getLabels = () => {
    const labels = project["label-icons"] || project.label || {};
    return Object.values(labels);
  };

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
      document.addEventListener("touchstart", handleUserInteraction, { passive: true });
      document.addEventListener("scroll", handleUserInteraction, { passive: true });
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

  return (
    <div
      className="project-card"
      ref={containerRef}
      onClick={() => navigate(`/projects/${project.id}`)}
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
          title={project.title}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        {showOverlay && (
          <div className="video-overlay">
            <img
              src={project.image_url}
              alt={project.title}
              className="overlay-image"
            />
            <div className="overlay-content">
              <img
                src={project.icon_url}
                alt="Project Icon"
                className="project-icon"
              />
            </div>
          </div>
        )}
        {showPlayButton && (
          <button className="mobile-play-button" onClick={handlePlay}>
            <FaPlay className="icon" />
          </button>
        )}
      </div>

      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>

      <div className="label-container">
        {getLabels().map((label, index) => (
          <span key={index} className="label-pill">
            {label}
          </span>
        ))}
      </div>

      <p className="simple-description">{project.simple_description}</p>
    </div>
  );
}
