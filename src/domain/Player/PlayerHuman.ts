import { Colors } from "../interfaces";
import AbstractPlayer, { PlayerType } from "./Abstract";

class PlayerHuman extends AbstractPlayer {
  constructor() {
    super(PlayerType.HUMAN, Colors.BLACK);
  }
}

export default PlayerHuman;
