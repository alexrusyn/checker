import React from "react";
import cn from "classnames";

import { useDrag } from "react-dnd";

import Checker from "../../domain/Checker";

import "./Checker.css";

interface CheckerComponentProps {
  checker: Checker;
  isActive: boolean;
  onDragStart: (figureId: string) => void;
  onDragEnd: () => void;
}

export const CheckerComponent: React.FC<CheckerComponentProps> = ({
  checker,
  isActive,
  onDragStart,
  onDragEnd,
}) => {
  const [, dragRef] = useDrag({
    type: "checker",
    canDrag: () => {
      onDragStart(checker.id);
      return true;
    },
    end: () => onDragEnd(),
  });

  return !checker.isRemoved ? (
    <div
      ref={dragRef}
      className={cn(
        "checker",
        `checker-${checker.color.toLowerCase()}`,
        isActive && `checker-active`
      )}
      style={{
        top: 64 * checker.coords.y,
        left: 64 * checker.coords.x,
      }}
    />
  ) : null;
};
