import React, { useState } from "react";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import BoardComponent from "./components/Board";

import Board from "./domain/Board";

import "./App.css";

const App: React.FC = () => {
  const [board, setBoard] = useState(new Board());

  const updateBoard = () => {
    setBoard(board.update());
  };

  return (
    <div className="app">
      <DndProvider backend={HTML5Backend}>
        <BoardComponent board={board} updateBoard={updateBoard} />
      </DndProvider>
    </div>
  );
};

export default App;
