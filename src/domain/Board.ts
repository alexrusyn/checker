import MoveValidator from "./MoveValidator";
import Cell from "./Cell";
import Checker from "./Checker";
import Player, { PlayersObject, PlayerType } from "./Player";

import { Colors, Coords, Directions, GridId } from "./interfaces";

import { getIdFromCoords, getCoordFromId } from "../utils";

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
      [PlayerType.AI]: new Player(PlayerType.AI, Colors.WHITE),
      [PlayerType.HUMAN]: new Player(PlayerType.HUMAN, Colors.BLACK),
    };

    this.updateCells();
  }

  get checkers() {
    return this._checkers.filter(({ isRemoved }) => !isRemoved);
  }

  get cellMap() {
    return this.getCellMap();
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

  public moveAIChecker(activePlayer: PlayerType) {
    const player = this.players[activePlayer];

    const aiCheckers = this.checkers.filter(
      ({ color, isRemoved }) => !isRemoved && color === player.color
    );

    const [nextCheckerId, nextRandomCellId] =
      this.moveValidator.getPossibleRandomMove(this.cellMap, aiCheckers);
    const checker = this.getChecker(nextCheckerId);

    if (!checker) return;

    const cellIdOfJumped = this.moveValidator.getCellIdOfJumped(
      checker.cellId,
      nextRandomCellId
    );

    if (cellIdOfJumped !== null) {
      player.increaseScore();
      this.removeChecker(cellIdOfJumped);
    }

    checker.moveTo(getCoordFromId(nextRandomCellId));
  }

  private removeChecker(id: GridId) {
    const checker = this.getCheckerByCell(id);
    checker && checker.remove();
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
    const player = this.players[PlayerType.HUMAN];
    const checker = this.getChecker(checkerId);

    return activePlayer === PlayerType.HUMAN && player.color === checker.color;
  }

  public checkAvailableMove(selectedFigureId: string) {
    const checker = this.getChecker(selectedFigureId);

    const availableIds = this.moveValidator.checkAvailableMove(
      this.cellMap,
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
