import { CellMap } from "./Cell";
import Checker from "./Checker";

import { Grid, GridId, Directions, Axis } from "./interfaces";

import { getConcatStrings, convertGridIdToGridIndexes } from "../utils";

class MoveValidator {
  public getCellIdOfJumped(prevCellId: GridId, nextCellId: GridId) {
    const prevIndexes = convertGridIdToGridIndexes(prevCellId);
    const nextIndexes = convertGridIdToGridIndexes(nextCellId);

    const x = ((nextIndexes[0] - prevIndexes[0]) / 2) as Axis;
    const y = ((nextIndexes[1] - prevIndexes[1]) / 2) as Axis;

    return this.getNextDiagonalIndex(prevCellId, x, y);
  }

  public checkAvailableMove(
    cellMap: CellMap,
    { cellId, direction, color }: Checker
  ) {
    const availableCellIds = this.getAvailableCells(cellId, direction);
    const availableToJump = this.getAvailableToJump(cellId, direction, cellMap);

    return availableCellIds.map((id, index) => {
      const currentColor = cellMap[id];
      if (currentColor === null) return id;
      return currentColor !== color ? availableToJump[index] : null;
    });
  }

  private getAvailableCells(
    currentCellId: GridId,
    direction: Directions,
    rawData: boolean = false
  ) {
    const x1 = this.getNextDiagonalIndex(currentCellId, -1, direction);
    const x2 = this.getNextDiagonalIndex(currentCellId, 1, direction);

    const result = [x1, x2];

    return rawData ? result : result.filter((cellId) => cellId);
  }

  private getNextDiagonalIndex(cellId: GridId, xAxis: Axis, yAxis: Axis) {
    const [letterIndex, columnIndex] = convertGridIdToGridIndexes(cellId);

    const letter = Grid[letterIndex + xAxis];
    const index = String(columnIndex + yAxis);

    return getConcatStrings(letter, index) as GridId;
  }

  private getAvailableToJump(
    cellId: GridId,
    direction: Directions,
    cellMap: CellMap
  ) {
    const availableCellIds = this.getAvailableCells(cellId, direction, true);

    const ids = availableCellIds
      .map((id, index) => {
        if (id === null) return id;
        return this.getAvailableCells(id, direction)[index];
      })
      .filter((id) => id);

    return ids.map((id) => (cellMap[id] === null ? id : null));
  }
}

export default MoveValidator;
