// components/ProjectCard.jsx
import React from "react";
import { FaGooglePlay } from "react-icons/fa";
import "@/styles/ProjectCard.css";
import { useNavigate } from "react-router-dom";
export default function ProjectCard({
  project,
  expandedProject,
  setExpandedProject,
}) {
  const videoSrc = `${project.video_url}?autoplay=0&mute=1&enablejsapi=1&controls=0&modestbranding=1&showinfo=0`;
  const navigate = useNavigate();

  return (
    <div
      className="project-card"
      onClick={() => navigate(`/projects/${project.id}`)}
      onMouseOver={(e) => {
        const iframe = e.currentTarget.querySelector("iframe").contentWindow;
        iframe.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
        e.currentTarget.querySelector(".video-overlay").style.opacity = "0";
      }}
      onMouseOut={(e) => {
        const iframe = e.currentTarget.querySelector("iframe").contentWindow;
        iframe.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
        e.currentTarget.querySelector(".video-overlay").style.opacity = "1";
      }}
    >
      <div className="video-wrapper">
        <iframe
          width="100%"
          height="200"
          src={videoSrc}
          title={project.title}
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
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
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <button
        className="read-more-btn"
        onClick={() =>
          setExpandedProject(expandedProject === project.id ? null : project.id)
        }
      >
        {expandedProject === project.id ? "Read Less" : "Read More"}
      </button>
      {expandedProject === project.id && (
        <p className="long-description">{project.long_description}</p>
      )}

      <a
        href={project.download_link}
        target="_blank"
        rel="noopener noreferrer"
        className="download-btn"
      >
        <FaGooglePlay className="playstore-icon" />
        Download
      </a>
    </div>
  );
}