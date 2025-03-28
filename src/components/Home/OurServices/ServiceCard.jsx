import React from "react";
import "@/styles/ServiceCard.css"; 

export default function ServiceCard({ service }) {
  return (
    <div className="service-card shadow-cyan p-20">
      <div className="service-icon-container radius-half border-cyan m-auto">
        <img src={service.service_icon} alt={service.service_name} className="service-icon" />
      </div>
      <h3 className="service-title t-18 t-color-cyan t-bold">{service.service_name}</h3>
      <div className="service-tools">
        {Object.keys(service.service_tools).map((key, index) => (
          <div key={index} className="service-tool radius-8 t-color-gray t-14">
            <img className="icon-24" src={service.service_tools_icons[`icon${index + 1}`]} alt={service.service_tools[key]} />
            <span>{service.service_tools[key]}</span>
          </div>
        ))}
      </div>
      <p className="service-description t-16">{service.service_description}</p>
    </div>
  );
}
