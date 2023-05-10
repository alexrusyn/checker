import React, { useState } from "react";
import { useDidUpdate } from "rooks";

import CellComponent from "./Cell";
import CheckerComponent from "./Checker";

import Board from "../domain/Board";

import { Coords, GridId } from "../domain/interfaces";
import { PlayerType } from "../domain/Player/Abstract";
import PlayerCard from "./PlayerCard/PlayerCard";

interface BoardProps {
  board: Board;
  updateBoard: () => void;
}

const BoardComponent: React.FC<BoardProps> = ({ board, updateBoard }) => {
  const [activePlayer, setActivePlayer] = useState<PlayerType>(
    PlayerType.HUMAN
  );

  const [selectedFigureId, setSelectedCheckerId] = useState<string | null>(
    null
  );
  const [availableIds, setAvailableIds] = useState<Array<GridId | null>>([]);

  const resetState = () => {
    setSelectedCheckerId(null);
    setAvailableIds([]);
  };

  const updateAvailableIds = () => {
    if (!selectedFigureId) return;

    const availableIds = board.checkAvailableMove(selectedFigureId);
    setAvailableIds(availableIds);
  };

  const onFigureMove = (coords: Coords, cellId: GridId) => {
    board.moveChecker(selectedFigureId, cellId, coords, activePlayer);

    updateBoard();
    updateAvailableIds();

    setActivePlayer((prev) =>
      prev === PlayerType.AI ? PlayerType.HUMAN : PlayerType.AI
    );

    resetState();
  };

  const onSelectFigure = (id: string) => {
    if (board.canPlayerSelectChecker(activePlayer, id))
      setSelectedCheckerId(id);
  };

  useDidUpdate(() => {
    updateAvailableIds();
  }, [selectedFigureId]);

  return (
    <>
      <aside className="aside">
        {Object.values(board.players).map((player) => (
          <PlayerCard player={player} isActive={player.type === activePlayer} />
        ))}
      </aside>
      <div className="board">
        {board.cells.map((cell) => (
          <CellComponent
            key={cell.id}
            cell={cell}
            onFigureMove={onFigureMove}
            isAvailable={availableIds.includes(cell.id)}
          />
        ))}
        {board.checkers.map((figure) => (
          <CheckerComponent
            key={figure.id}
            checker={figure}
            isActive={selectedFigureId === figure.id}
            onSelect={onSelectFigure}
          />
        ))}
      </div>
    </>
  );
};

export default BoardComponent;