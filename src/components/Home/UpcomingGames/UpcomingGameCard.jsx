import React from "react";
import { FaPlay } from "react-icons/fa";
import "@/assets/styles/UpcomingGameCard.css"; // Separate CSS for styling

export default function UpcomingGameCard({ game }) {
  return (
    <div className="upcoming-game-card">
      {/* Game Image */}
      <div className="game-image-container">
        <img src={game.image_url} alt={game.title} className="game-image" />
      </div>

      {/* Game Info */}
      <div className="game-content">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-description">{game.description}</p>
      </div>

      {/* Coming Soon Button */}
      <button className="coming-soon-btn">
        <FaPlay className="play-icon" /> Coming Soon
      </button>
    </div>
  );
}