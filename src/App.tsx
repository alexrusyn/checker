import React, { useState } from "react";

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
      <BoardComponent board={board} updateBoard={updateBoard} />
    </div>
  );
};

export default App;
