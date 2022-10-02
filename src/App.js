import Game from 'chess-node'
import { EventEmitter } from "events";
import React from "react";
import { hot } from 'react-hot-loader/root';
import Board from "./Board";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.setState({
      position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    });
  }

  render() {
    
    return (
      <>
        <Board
          position={"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
        />
      </>
    );
  }
}

export default hot(App);
