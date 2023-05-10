import { CheckerType } from "./Checker";
import { Coords, Colors, GridId } from "./interfaces";

import { getIdFromCoords } from "../utils";

class Cell {
  readonly id: GridId;
  readonly coords: Coords;
  readonly color: Colors;

  hasFigure: CheckerType;

  constructor(coords: Coords, color: Colors) {
    this.id = getIdFromCoords(coords);
    this.coords = coords;
    this.color = color;
    this.hasFigure = null;
  }

  public updateFigure(figureColor: CheckerType) {
    this.hasFigure = figureColor;
  }

  public getIsEmpty(): boolean {
    return this.hasFigure === null;
  }
}

export type CellMap = {
  [key: string]: string;
};

export default Cell;
