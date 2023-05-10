import MoveValidator from "./MoveValidator";
import Cell from "./Cell";
import Checker from "./Checker";
import { PlayersObject, PlayerType } from "./Player/Abstract";
import PlayerAI from "./Player/PlayerAI";
import PlayerHuman from "./Player/PlayerHuman";

import { Colors, Coords, Directions, GridId } from "./interfaces";

import { getIdFromCoords } from "../utils";

import {
  CELL_COUNT,
  CHECKER_COUNT,
  AVAILABLE_CHECKER_COORDS,
} from "../data/constants";

class Board {
  readonly moveValidator: MoveValidator;

  cells: Cell[];
  _checkers: Checker[];
  players: PlayersObject;

  constructor() {
    this.moveValidator = new MoveValidator();

    this.cells = this.initBoardCell();
    this._checkers = this.initBoardFigure();

    this.players = {
      [PlayerType.AI]: new PlayerAI(),
      [PlayerType.HUMAN]: new PlayerHuman(),
    };

    this.updateCells();
  }

  get checkers() {
    return this._checkers.filter(({ isRemoved }) => !isRemoved);
  }

  public getCell(cellId: string): Cell {
    return this.cells.find(({ id }) => cellId === id) as Cell;
  }

  public getChecker(checkerId: string): Checker {
    return this.checkers.find(({ id }) => id === checkerId) as Checker;
  }

  public getCheckerByCell(id: GridId): Checker {
    return this.checkers.find(({ cellId }) => id === cellId) as Checker;
  }

  public moveChecker(
    selectedCheckerId: string | null,
    cellId: GridId,
    coords: Coords,
    activePlayer: PlayerType
  ) {
    if (selectedCheckerId === null) return;

    const checker = this.getChecker(selectedCheckerId);
    const cellIdOfJumped = this.moveValidator.getCellIdOfJumped(
      checker.cellId,
      cellId
    );

    if (cellIdOfJumped !== null) {
      this.players[activePlayer].increaseScore();
      this.removeChecker(cellIdOfJumped);
    }

    checker.moveTo(coords);
  }

  private removeChecker(id: GridId) {
    const checker = this.getCheckerByCell(id);
    checker.remove();
  }

  public update(): Board {
    const clone = Object.setPrototypeOf(
      Object.assign({}, this),
      Board.prototype
    );

    clone.updateCells();

    return clone;
  }

  public canPlayerSelectChecker(activePlayer: PlayerType, checkerId: string) {
    const player = this.players[activePlayer];
    const checker = this.getChecker(checkerId);

    return player.color === checker.color;
  }

  public checkAvailableMove(selectedFigureId: string) {
    const checker = this.getChecker(selectedFigureId);
    const cellMap = this.getCellMap();

    const availableIds = this.moveValidator.checkAvailableMove(
      cellMap,
      checker
    );

    return availableIds;
  }

  private getCellMap() {
    return this.cells.reduce(
      (acc, cell) => ({ ...acc, [cell.id]: cell.hasFigure }),
      {}
    );
  }

  private updateCells() {
    this.cells.forEach((cell) => cell.updateFigure(null)); // clear

    this.checkers.forEach(({ coords, color }) => {
      const cell = this.getCell(getIdFromCoords(coords));
      cell?.updateFigure(color);
    });
  }

  private initBoardCell(): Cell[] {
    return new Array(CELL_COUNT * CELL_COUNT).fill(0).map((_, index) => {
      const x = index % CELL_COUNT;
      const y = Math.floor(index / CELL_COUNT);
      const color = (x + y) % 2 === 0 ? Colors.WHITE : Colors.BLACK;

      return new Cell({ x, y }, color);
    });
  }

  private initBoardFigure(): Checker[] {
    return new Array(CHECKER_COUNT).fill(0).map((_, index) => {
      const { x, y } = AVAILABLE_CHECKER_COORDS[index];
      const isFirstPart = index < CHECKER_COUNT / 2;

      return new Checker(
        { x, y },
        isFirstPart ? Directions.FORWARD : Directions.BACKWARD,
        isFirstPart ? Colors.WHITE : Colors.BLACK
      );
    });
  }
}

export default Board;