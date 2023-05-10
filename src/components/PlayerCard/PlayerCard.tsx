import React from "react";
import cn from "classnames";

import AbstractPlayer from "../../domain/Player/Abstract";

import "./PlayerCard.css";

interface PlayerCardProps {
  player: AbstractPlayer;
  isActive: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, isActive }) => {
  return (
    <div className="player-card">
      <span
        className={cn(
          "player-card-color",
          `player-card-${player.color.toLowerCase()}`,
          isActive && "player-card-active"
        )}
      />
      <div className="player-card-body">
        <h3 className="player-card-name">{player.type.toUpperCase()}</h3>
        <p className="player-card-score">
          Score: <b>{player.score}</b>
        </p>
      </div>
    </div>
  );
};

export default PlayerCard;
