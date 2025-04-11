import React, { useState } from "react";
import "@/styles/TeamMemberCard.css";
import { BsTwitterX } from "react-icons/bs";
import { LuGithub } from "react-icons/lu";
import { IoMailOutline } from "react-icons/io5";

const Iconsmap = {
  Github: LuGithub,
  X: BsTwitterX,
  Mail: IoMailOutline,
};

export default function TeamMemberCard({ member }) {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    if (window.innerWidth <= 1000) {
      setIsActive(!isActive);
    }
  };

  return (
    <div
      className={`team-member-card site-card ${isActive ? "active" : ""}`}
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
          {Object.keys(member.links).map((key, index) => {
            const iconName = Object.values(member.icons)[index]; 
            const IconComponent = Iconsmap[iconName]; 

            return (
              <a
                key={index}
                href={member.links[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="special-icon-link"
              >
                {IconComponent ? <IconComponent className="special-icon"/> : "🔗"}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
