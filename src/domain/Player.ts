import { Colors } from "./interfaces";

export enum PlayerType {
  HUMAN = "human",
  AI = "ai",
}

export type PlayersObject = { [key in PlayerType]: AbstractPlayer };

class AbstractPlayer {
  readonly type: PlayerType;
  readonly color: Colors;

  score: number;

  constructor(type: PlayerType, color: Colors) {
    this.type = type;
    this.color = color;
    this.score = 0;
  }

  increaseScore() {
    this.score++;
  }
}

export default AbstractPlayer;
