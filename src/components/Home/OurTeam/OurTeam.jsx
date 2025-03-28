import React, { useState, useEffect } from "react";
import TeamMemberCard from "@/TeamMemberCard";
import "@/styles/OurTeam.css"; // Styling for the team section

export default function OurTeam() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch("/data/team_data.json")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((error) => console.error("Error fetching team data:", error));
  }, []);

  return (
    <div className="container">
    <section className="our-team-section max-width`">
      <div className="centered-title">
      <h2 id="team" className="section-title">Our Team</h2></div>
      <div className="team-container">
        {team.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
    </div>
  );
}