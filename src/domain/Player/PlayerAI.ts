import { Colors } from "../interfaces";
import AbstractPlayer, { PlayerType } from "./Abstract";

class PlayerAI extends AbstractPlayer {
  constructor() {
    super(PlayerType.AI, Colors.WHITE);
  }
}

export default PlayerAI;
