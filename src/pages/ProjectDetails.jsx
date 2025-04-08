import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "@/styles/ProjectDetails.css";
import {
  FaItchIo,
  FaUsers,
  FaGithub,
  FaGooglePlay,
  FaChevronLeft,
  FaChevronRight,
  FaArrowLeft,
  FaPlay,
} from "react-icons/fa";
import { IoIosAppstore } from "react-icons/io";
import { GiMaze } from "react-icons/gi";
import {
  LuPalette,
  LuBookOpen,
  LuArmchair,
  LuZap,
  LuKeyboardMusic,
} from "react-icons/lu";
import { RiComputerLine, RiLayoutGridFill } from "react-icons/ri";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [project, setProject] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);

  const Iconmap = {
    Github: FaGithub,
    Itch: FaItchIo,
    GooglePlay: FaGooglePlay,
    AppStore: IoIosAppstore,
    Maze: GiMaze,
    Story: LuBookOpen,
    PowerUp: LuZap,
    Palette: LuPalette,
    Music: LuKeyboardMusic,
    Casual: LuArmchair,
    Multiplayer: FaUsers,
    Computer: RiComputerLine,
    Table: RiLayoutGridFill,
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProject = data.find((proj) => proj.id.toString() === id);
        setProject(foundProject);
      });

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [id]);

  const handleTouch = () => {
    if (isMobile && videoRef.current) {
      videoRef.current.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
      setShowOverlay(true);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
      setShowOverlay(false);
    }
  };

  if (!project) return <p>Loading...</p>;

  const screenshots = Object.values(project.screenshots);
  const totalSlides = screenshots.length;

  return (
    <>
      <div className="container" onTouchStart={handleTouch}>
        <div className="project-header max-width">
          <p className="logo-text">
            <span className="logo-container">
              <img className="logo" src={logo} alt="Logo" />
            </span>
            Maziminds
          </p>

          <button onClick={() => navigate(-1)} className="back-button">
            <span className="back-icon">
              <FaArrowLeft />
            </span>
            <p className="back-text">Back to Home</p>
          </button>
        </div>

        <div className="project-details-page max-width">
          {/* Video Container */}
          <div
            className="video-container"
            onMouseEnter={() => {
              if (!isMobile && videoRef.current) {
                videoRef.current.contentWindow.postMessage(
                  '{"event":"command","func":"playVideo","args":""}',
                  "*"
                );
              }
            }}
            onMouseLeave={() => {
              if (!isMobile && videoRef.current) {
                videoRef.current.contentWindow.postMessage(
                  '{"event":"command","func":"pauseVideo","args":""}',
                  "*"
                );
              }
            }}
          >
            <iframe
              ref={videoRef}
              id="project-video"
              width="100%"
              height="100%"
              src={`${project.video_url}?autoplay=&mute=1&controls=0&rel=0&showinfo=0&modestbranding=1&enablejsapi=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`${project.title} Video`}
              className="video-iframe"
            />

            {showOverlay && (
              <div className="hover-overlay">
                <img src={project.image_url} alt="Video Hover Image" />
                {isMobile && (
                  <button className="mobile-play-button" onClick={handlePlay}>
                    <FaPlay className="mobile-play-icon" />
                  </button>
                )}
              </div>
            )}

            <img
              src={project.icon_url}
              className="video-icon"
              alt="Project Icon"
            />
            <div className="video-links">
              {project.google_play_url && (
                <a
                  href={project.google_play_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Google Play"
                  className="special-icon-link"
                >
                  <FaGooglePlay className="special-icon" />
                </a>
              )}
              {project.app_store_url && (
                <a
                  href={project.app_store_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="App Store"
                  className="special-icon-link"
                >
                  <IoIosAppstore className="special-icon" />
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  className="special-icon-link"
                >
                  <FaGithub className="special-icon" />
                </a>
              )}
              {project.itchio_url && (
                <a
                  href={project.itchio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Itch.io"
                  className="special-icon-link"
                >
                  <FaItchIo className="special-icon" />
                </a>
              )}
            </div>
          </div>

          {/* Title and Description */}
          <div className="project-info">
            <h1 className="project-title">{project.title}</h1>
            <p className="project-description">{project.description}</p>
          </div>

          {/* About Section */}
          <div className="about-section">
            <h2 className="section-title">About {project.title}</h2>
            <p className="long-description">{project.long_description}</p>

            <h3 className="section-title my-[20px]">Key Features</h3>
            <div className="feature-cards">
              {Object.entries(project.features).map(([key, text], index) => {
                const iconKey = project.features_icon[key];
                const IconComponent = Iconmap[iconKey];

                return (
                  <div className="feature-card" key={index}>
                    {IconComponent && (
                      <IconComponent className="feature-icon" />
                    )}
                    <p className="feature-text">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slideshow Section */}
          <div className="slideshow-container">
            <h2 className="section-title">Screenshots</h2>

            <div className="slideshow">
              <button className="nav-button left" onClick={prevSlide}>
                <FaChevronLeft />
              </button>

              <img
                src={screenshots[currentSlide]}
                alt={`Screenshot ${currentSlide + 1}`}
                className="screenshot-image"
              />

              <button className="nav-button right" onClick={nextSlide}>
                <FaChevronRight />
              </button>
            </div>

            <div className="dots-container">
              {screenshots.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                ></span>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
