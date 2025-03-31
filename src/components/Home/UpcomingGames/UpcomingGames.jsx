import React, { useState, useEffect } from "react";
import UpcomingGameCard from "@/components/Home/UpcomingGames/UpcomingGameCard";
import "@/styles/UpcomingGames.css";

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
      ? "upcoming-games-container flex-mode"
      : "upcoming-games-container grid-mode";

  return (
    <div className="container">
      <section className="upcoming-games-section max-width">
        <div className="centered-title">
          <h2 className="section-title">Upcoming Games</h2>
        </div>
        <div className={containerClass}>
          {games.map((game) => (
            <UpcomingGameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
}