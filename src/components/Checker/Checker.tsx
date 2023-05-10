import React from "react";
import cn from "classnames";

import Checker from "../../domain/Checker";

import "./Checker.css";

interface CheckerComponentProps {
  checker: Checker;
  isActive: boolean;
  onSelect: (figureId: string) => void;
}

export const CheckerComponent: React.FC<CheckerComponentProps> = ({
  checker,
  isActive,
  onSelect,
}) => {
  return !checker.isRemoved ? (
    <div
      className={cn(
        "checker",
        `checker-${checker.color.toLowerCase()}`,
        isActive && `checker-active`
      )}
      onClick={() => onSelect(checker.id)}
      style={{
        top: 64 * checker.coords.y,
        left: 64 * checker.coords.x,
      }}
    />
  ) : null;
};
