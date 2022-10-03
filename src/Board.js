import React, { useState } from "react";
import { Stage, Layer, Rect, Image } from "react-konva";
import useImage from "use-image";

const size = 500.0;

export default function Board(props) {
  const [blPawn] = useImage("./pieces/p.png");
  const [blRook] = useImage("./pieces/r.png");
  const [blBishop] = useImage("./pieces/b.png");
  const [blKnight] = useImage("./pieces/n.png");
  const [blQueen] = useImage("./pieces/q.png");
  const [blKing] = useImage("./pieces/k.png");

  const [wPawn] = useImage("./pieces/wp.png");
  const [wRook] = useImage("./pieces/wr.png");
  const [wBishop] = useImage("./pieces/wb.png");
  const [wKnight] = useImage("./pieces/wn.png");
  const [wQueen] = useImage("./pieces/wq.png");
  const [wKing] = useImage("./pieces/wk.png");

  function getPieceImage(piece) {
    switch (piece) {
      case "p":
        return blPawn;
      case "r":
        return blRook;
      case "b":
        return blBishop;
      case "n":
        return blKnight;
      case "q":
        return blQueen;
      case "k":
        return blKing;
      case "P":
        return wPawn;
      case "R":
        return wRook;
      case "B":
        return wBishop;
      case "N":
        return wKnight;
      case "Q":
        return wQueen;
      case "K":
        return wKing;
      default:
        return null;
    }
  }

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
          x: col * (size / 8),
          y: row * (size / 8),
          width: size / 8,
          height: size / 8,
          image: getPieceImage(piece),
          row: row,
          col: col,
        });
      }
    }
    return pieces;
  }

  function log(x1, y1, x2, y2) {
    console.log(`Moved from (${x1},${y1}) to (${x2},${y2}) `);
  }

  const [squares, setSquares] = useState(generateChessBoard(-1, -1));
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
          <Image
            x={piece.x}
            y={piece.y}
            width={piece.width}
            height={piece.height}
            image={piece.image}
            id={piece.id}
            draggable={true}
            onDragEnd={(e) => {
              console.log(e.target)
              const newX = Math.floor((e.target.attrs.x + (size / 16)) / (size / 8));
              const newY = Math.floor((e.target.attrs.y + (size / 16)) / (size / 8));


              log(piece.row, piece.col, newX, newY);


              e.target.x(newX * (size / 8));
              e.target.y(newY * (size / 8));

            }}
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
