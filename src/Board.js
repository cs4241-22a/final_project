import Game from "chess-node";
import React from "react";
import Sketch from "react-p5";

export default function Board(props) {
  const size = 500;

  let blPawn, blBishop, blKnight, blQueen, blKing, blRook;
  let wPawn, wBishop, wKnight, wQueen, wKing, wRook;

  const setup = (p5, canvasParentRef) => {
    blPawn = p5.loadImage("./pieces/p.png");
    blBishop = p5.loadImage("./pieces/b.png");
    blKnight = p5.loadImage("./pieces/n.png");
    blQueen = p5.loadImage("./pieces/q.png");
    blKing = p5.loadImage("./pieces/k.png");
    blRook = p5.loadImage("./pieces/r.png");

    wPawn = p5.loadImage("./pieces/wp.png");
    wBishop = p5.loadImage("./pieces/wb.png");
    wKnight = p5.loadImage("./pieces/wn.png");
    wQueen = p5.loadImage("./pieces/wq.png");
    wKing = p5.loadImage("./pieces/wk.png");
    wRook = p5.loadImage("./pieces/wr.png");


    p5.createCanvas(size, size).parent(canvasParentRef);
    p5.background(0);
  };

  const fen = props.position.split(" ");
  const position = fen[0].split("/");

  const draw = (p5) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        var color =
          (row + col) % 2 == 0 ? p5.color(255, 169, 2) : p5.color(112, 79, 13);
        p5.fill(color);
        p5.rect(row * (size / 8), col * (size / 8), size / 8, size / 8);
      }
    }

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = position[row][col];
        if (piece.match("[1-9]")) {
          col += piece;
        } else {
          let img;
          switch (piece) {
            case "P":
              img = blPawn;
              break;
            case "B":
              img = blBishop;
              break;
            case "N":
              img = blKnight;
              break;
            case "Q":
              img = blQueen;
              break;
            case "K":
              img = blKing;
              break;
            case "R":
              img = blRook;
              break;
            case "p":
              img = wPawn;
              break;
            case "b":
              img = wBishop;
              break;
            case "n":
              img = wKnight;
              break;
            case "q":
              img = wQueen;
              break;
            case "k":
              img = wKing;
              break;
            case "r":
              img = wRook;
              break;
          }
          p5.image(img, col * (size / 8), row * (size / 8));
        }
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
}
