import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import "../../../styles/OurServices.css"; // Styling for the services section

export default function OurServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div className="container">
      <section className="our-services-section max-width">
        <div className="centered-title">
        <h2 id="services" className="section-title">
          Our Services
        </h2></div>
        <div className="services-container">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>
    </div>
  );
}
