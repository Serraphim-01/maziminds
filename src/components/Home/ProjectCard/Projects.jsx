import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/Home/ProjectCard/ProjectCard";
import "@/styles/Projects.css";
import { FaArrowRight } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="container">
      <div className="projects-container max-width">
        <div className="centered-title">
          <h2 className="section-title">
            Featured Games
          </h2>
        </div>
        <div className="project-card-container grid-mode">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFeatured={true}
              expandedProject={expandedProject}
              setExpandedProject={setExpandedProject}
            />
          ))}
        </div>
        <div className="view-btn-container">
          {projects.length > 3 && (
            <button className="view-more-btn">
              View More
              <FaArrowRight className="view-more-icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
