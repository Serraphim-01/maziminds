import React, { useState } from "react";
import "@/styles/TeamMemberCard.css";

export default function TeamMemberCard({ member }) {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    if (window.innerWidth <= 1000) {
      setIsActive(!isActive);
    }
  };

  return (
    <div
      className={`team-member-card ${isActive ? "active" : ""}`}
      onClick={toggleActive}
    >
      {/* Image */}
      <img
        src={member.profile}
        alt={`${member.name}'s profile`}
        className="team-member-image"
      />

      {/* Cyan Indicator */}
      <div className="team-member-indicator"></div>

      {/* Overlay Text */}
      <div className="team-member-info">
        <h3 className="team-member-name">{member.name}</h3>
        <p className="team-member-role">{member.role}</p>
        <div className="team-member-links">
          {Object.keys(member.links).map((key, index) => (
            <a
              key={index}
              href={member.links[key]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={member.icons[`icon${index + 1}`]}
                alt="Social Icon"
                className="team-icon"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
