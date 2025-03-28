import React, { useState, useEffect } from "react";
import HeroHeader from "../components/HeroHeader";
import Mission from "../components/Mission";
import { Link } from "react-router-dom";
import "@/styles/Home.css";
import Projects from "../components/Home/ProjectCard/Projects";
import UpcomingGames from "../components/Home/UpcomingGames/UpcomingGames";
import OurServices from "../components/Home/OurServices/OurServices";  
import OurTeam from "../components/Home/OurTeam/OurTeam";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="home-container">
      <NavBar />
      <HeroHeader />
      <Mission />
      <UpcomingGames />
      <Projects />
      <OurServices />
      <OurTeam />
      <Footer />
    </div>
  );
}
