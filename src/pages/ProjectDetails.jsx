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
  const [isMobile, setIsMobile] = useState(false);
  const [fade, setFade] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
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

  // Auto-slide logic
  useEffect(() => {
    if (!project || userInteracted) return;

    const totalSlides = Object.values(project.screenshots).length;

    // Auto-slide with fade transition
    const interval = setInterval(() => {
      setFade(true); // trigger fade-out

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setFade(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [project, currentSlide, userInteracted]);

  if (!project) return <p>Loading...</p>;

  const screenshots = Object.values(project.screenshots);
  const totalSlides = screenshots.length;

  const nextSlide = () => {
    setUserInteracted(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setUserInteracted(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      <div className="container">
        <div className="project-header max-width">
          <p className="logo-text">
            <span className="logo-container">
              <img className="logo" src={logo} alt="Logo" />
            </span>
            Maziminds
          </p>
        </div>

        <div className="project-details-page max-width">
          {/* Video Container */}
          <div className="video-container">
            <iframe
              ref={videoRef}
              id="project-video"
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${project.video_id}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&modestbranding=1&enablejsapi=1&loop=1&playlist=${project.video_id}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={`${project.title} Video`}
              className="video-iframe"
            />

            <button onClick={() => navigate(-1)} className="back-button">
              <span className="back-icon">
                <FaArrowLeft />
              </span>
              <p className="back-text">Back to Home</p>
            </button>

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

          {/* Title and Labels */}
          <div className="project-info">
            <h1 className="project-title">{project.title}</h1>

            {/* Display labels */}
            <div className="project-labels">
              {Object.values(project.label || {}).map((label, index) => (
                <span key={index} className="project-label">
                  {label}
                </span>
              ))}
            </div>
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
                className={`screenshot-image ${fade ? "fade-out" : ""}`}
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
                  onClick={() => {
                    setUserInteracted(true);
                    setCurrentSlide(index);
                  }}
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
