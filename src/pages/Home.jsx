import React, { useEffect, useRef } from "react";
import HeroHeader from "../components/HeroHeader";
// import Mission from "../components/Mission";
import "@/styles/Home.css";
import Projects from "../components/Home/ProjectCard/Projects";
import UpcomingGames from "../components/Home/UpcomingGames/UpcomingGames";
import OurServices from "../components/Home/OurServices/OurServices";  
import OurTeam from "../components/Home/OurTeam/OurTeam";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="home-container">
      <NavBar />
      <div ref={(el) => (sectionsRef.current[0] = el)} className="section">
        <HeroHeader />
      </div>
      {/* <div ref={(el) => (sectionsRef.current[1] = el)} className="section">
        <Mission />
      </div> */}
      <div ref={(el) => (sectionsRef.current[2] = el)} className="section">
        <UpcomingGames />
      </div>
      <div ref={(el) => (sectionsRef.current[3] = el)} className="section">
        <Projects />
      </div>
      <div ref={(el) => (sectionsRef.current[4] = el)} className="section">
        <OurServices />
      </div>
      <div ref={(el) => (sectionsRef.current[5] = el)} className="section">
        <OurTeam />
      </div>
      <div ref={(el) => (sectionsRef.current[6] = el)} className="section">
        <Footer />
      </div>
    </div>
  );
}
