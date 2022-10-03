import React, { useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";

const size = 500;

function getPieceImage(piece) {
  let url = "./pieces/";

  switch (piece) {
    case "r":
      url += "r";
      break;
    case "n":
      url += "n";
      break;
    case "b":
      url += "b";
      break;
    case "k":
      url += "k";
      break;
    case "q":
      url += "q";
      break;
    case "p":
      url += "p";
      break;
    case "R":
      url += "wr";
      break;
    case "N":
      url += "wn";
      break;
    case "B":
      url += "wb";
      break;
    case "K":
      url += "wk";
      break;
    case "Q":
      url += "wq";
      break;
    case "P":
      url += "wp";
      break;
  }
  url += ".png";
  console.log(url);
  return url;
}

export default function Board(props) {
  function generateChessBoard(sRow, sCol) {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        let color;
        if (sCol === col && sRow === row) {
          color = "blue";
        } else {
          color = (row + col) % 2 === 0 ? "brown" : "green";
        }
        squares.push({
          id: `S(${row},${col})`,
          x: row * (size / 8),
          y: col * (size / 8),
          width: size / 8,
          height: size / 8,
          fill: color,
          row: row,
          col: col,
        });
      }
    }
    return squares;
  }

  function generatePieces(position) {
    const pieces = [];
    const rows = position.split("/");
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = rows[row][col];
        if (piece.match("[1-9]") !== null) {
          col += piece;
        }
        const img = new window.Image(size / 8, size / 8);
        img.src = getPieceImage(piece);
        pieces.push({
          id: `P(${row},${col})`,
          x: row * (size / 8),
          y: col * (size / 8),
          width: size / 8,
          height: size / 8,
          image: getPieceImage(piece),
        });
      }
    }
    return pieces;
  }

  const [squares, setSquares] = useState(generateChessBoard(-1, -1));
  console.log(props);
  return (
    <Stage width={size} height={size}>
      <Layer>
        {squares.map((entry) => (
          <Rect
            x={entry.x}
            y={entry.y}
            id={entry.id}
            width={entry.width}
            height={entry.height}
            fill={entry.fill}
            onClick={() => {
              console.log(`Clicked: Row ${entry.row} Col ${entry.col}`);
              setSquares(generateChessBoard(entry.row, entry.col));
            }}
            key={entry.id}
          ></Rect>
        ))}
        {generatePieces(props.position).map((piece) => (
          <img
            x={piece.x}
            y={piece.y}
            width={piece.width}
            height={piece.height}
            src={piece.image}
            id={piece.id}
          />
        ))}
      </Layer>
    </Stage>
  );
}

/*
        {generatePieces(props.position).map((piece) => (
          <Image
            x={piece.x}
            y={piece.y}
            width={piece.width}
            height={piece.height}
            url={piece.url}
            id={piece.id}
          />
        ))}
*/
