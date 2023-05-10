import React from "react";
import cn from "classnames";

import { useDrop } from "react-dnd";

import Cell from "../../domain/Cell";
import { Coords, GridId } from "../../domain/interfaces";

import "./Cell.css";

interface CellComponentProps {
  cell: Cell;
  isAvailable: boolean;
  onFigureMove: (coords: Coords, cellId: GridId) => void;
}

export const CellComponent: React.FC<CellComponentProps> = ({
  cell,
  isAvailable,
  onFigureMove,
}) => {
  const [, dropRef] = useDrop({
    accept: "checker",
    drop: () => onFigureMove(cell.coords, cell.id),
    canDrop: () => isAvailable,
  });

  return (
    <div style={{ position: "relative" }} ref={dropRef}>
      <span className="helper">{cell.id}</span>
      <button
        className={cn(
          "cell",
          `cell-${cell.color.toLowerCase()}`,
          isAvailable && "cell-available"
        )}
        disabled={!isAvailable}
      />
    </div>
  );
};
