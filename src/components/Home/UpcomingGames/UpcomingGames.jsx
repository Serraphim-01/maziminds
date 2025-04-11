import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/Home/ProjectCard/ProjectCard";
import "@/styles/Projects.css";

export default function UpcomingGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/data/upcoming.json")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching upcoming games:", error));
  }, []);

  const containerClass =
    games.length === 2
      ? "project-card-container flex-mode"
      : "project-card-container grid-mode";

  return (
    <div className="container">
      <section id="projects" className="projects-container centered max-width">
        <div className="centered-title">
          <h2 className="section-title">Upcoming Games</h2>
        </div>
        <div className={containerClass}>
          {games.map((game) => (
            <ProjectCard
              key={game.id}
              project={game}
              externalLink={game.itchio_url}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
