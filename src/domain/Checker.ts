import Cell from "./Cell";
import { Coords, Directions, Colors, GridId } from "./interfaces";

import { getIdFromCoords } from "../utils";

class Checker {
  readonly id: string;
  readonly direction: Directions;
  readonly color: Colors;

  coords: Coords;
  cellId: GridId;

  isRemoved: boolean;

  constructor(coords: Coords, direction: Directions, color: Colors) {
    this.id = `checker-${coords.x}-${coords.y}`;
    this.coords = coords;
    this.direction = direction;
    this.color = color;
    this.cellId = getIdFromCoords(coords);
    this.isRemoved = false;
  }

  public canMoveToCell(cell: Cell): boolean {
    return cell.getIsEmpty();
  }

  public moveTo(coords: Coords) {
    this.coords = coords;
    this.cellId = getIdFromCoords(coords);
  }

  public remove() {
    this.isRemoved = true;
  }
}

export type CheckerType = Colors | null;

export default Checker;
