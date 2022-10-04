import React, { useState } from "react";
import Board from "./Board";
import { parseFen } from "chessops/fen";
import { Chess } from "chessops/chess";
import {makeFen} from 'chessops/fen'


export default function App(props) {


  const [game, setGame] = useState(
    Chess.fromSetup(
      parseFen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1").unwrap()
    ).unwrap()
  );

  return (
    <Board
      game={game}
    />
  );

}


/*

*/