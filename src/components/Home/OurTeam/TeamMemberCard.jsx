import React from "react";
import "@/styles/TeamMemberCard.css"; // Import CSS file for styling

export default function TeamMemberCard({ member }) {
  return (
    <div className="team-member-card t-color-white shadow-black">
      {/* Image Section */}
      <img
        src={member.profile}
        alt={`${member.name}'s profile`}
        className="team-member-image"
      />

      {/* Text Info */}
      <div className="p-20">
      <h3 className="team-member-name t-bold t-24 radius-8">{member.name}</h3>
      <p className="team-member-role t-16">{member.role}</p>

      {/* Social Links */}
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
              className="team-icon icon-24 radius-half"
            />
          </a>
        ))}
      </div>
      </div>
    </div>
  );
}
