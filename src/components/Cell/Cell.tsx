import React from "react";
import cn from "classnames";

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
  return (
    <div style={{ position: "relative" }}>
      <span className="helper">{cell.id}</span>
      <button
        className={cn(
          "cell",
          `cell-${cell.color.toLowerCase()}`,
          isAvailable && "cell-available"
        )}
        onClick={() => onFigureMove(cell.coords, cell.id)}
        disabled={!isAvailable}
      />
    </div>
  );
};
