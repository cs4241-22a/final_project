import React, { useState } from "react";
import Board from "./Board";
import { parseFen } from "chessops/fen";
import { Chess } from "chessops/chess";
import { makeFen } from "chessops/fen";
import { makePgn } from "chessops/pgn";
import GameViewer from "./PGNViewer";
import { makeSan, makeSanAndPlay } from "chessops/san";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import GameHistory from "./pages/GameHistory";
import About from "./pages/About";
import Stats from "./pages/Stats";
import Container from 'react-bootstrap/Container';



async function getBestMove(pos, engine, movetime) {
  const response = await fetch(
    "http://mc.craftsteamg.com:4000/bestmove?" +
    new URLSearchParams({
      position: pos,
      engine: engine,
      movetime: movetime,
    })
  );
  const json = await response.json();
  return json.bestmove;
}

function getSquareFromChessNotation(pos) {
  const row = pos.charCodeAt(0) - 97;
  const col = parseInt(pos[1]) - 1;
  return 8 * col + row;
}

export default function App(props) {
  const [game, setGame] = useState(
    Chess.fromSetup(
      parseFen(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
      ).unwrap()
    ).unwrap()
  );

  const [turn, setTurn] = useState(game.turn);
  const [history, setHistory] = useState([]);

  async function onMove(san) {
    setTurn(game.turn);
    const fen = makeFen(game.toSetup());
    const move = await getBestMove(fen, "StockFish", 1000);
    const from = getSquareFromChessNotation(move.substring(0, 2));
    const to = getSquareFromChessNotation(move.substring(2));
    const compSan = makeSanAndPlay(game, { from: from, to: to });
    setHistory([...history, san, compSan])
    setTurn(game.turn);
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Container fluid>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/gamehistory" element={<GameHistory />} />
          </Routes>
        </Container>
      </BrowserRouter>

    </>
  );
}

/*
        <Board game={game} playAs={"white"} turn={turn} onMove={onMove} />
        <GameViewer history={history}></GameViewer>
*/