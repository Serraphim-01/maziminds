import React, { useEffect, useState } from "react";
import ClientCard from "./ClientCard";
import "@/styles/OurClients.css";
import { FaArrowRight } from "react-icons/fa";

export default function OurClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("/data/clients.json")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const featuredClients = clients.slice(0, 3);

  return (
    <div className="container">
      <div className="projects-container max-width">
        <div className="centered-title">
          <h2 className="section-title">
            Our Clients
          </h2>
        </div>
        <div className="project-card-container grid-mode">
          {featuredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              isFeatured={true}
            />
          ))}
        </div>
        <div className="view-btn-container">
          {clients.length > 3 && (
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
