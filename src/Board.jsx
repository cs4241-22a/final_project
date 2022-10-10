import React, { useState } from 'react'
import { Stage, Layer, Rect, Image, Text, Ellipse } from 'react-konva'
import useImage from 'use-image'
import FenParser from '@chess-fu/fen-parser'
import { makeFen } from 'chessops/fen'
import { Navigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Chess } from 'chessops'


export async function playComputerMove(chess, engine, movetime) {
  const fen = makeFen(chess.toSetup())
  const move = await getBestMove(fen, engine, movetime)
  chess.play(move)
  return chess;
}

function getPosition(index, color) {
  return [index % 8, 7 - Math.floor(index / 8)]
}

function getSquareFromChessNotation(pos) {
  const row = pos.charCodeAt(0) - 97
  const col = parseInt(pos[1]) - 1
  return 8 * col + row
}


async function getBestMove(pos, engine, movetime) {
  const response = await fetch(
    'http://mc.craftsteamg.com:4000/bestmove?' +
    new URLSearchParams({
      position: pos,
      engine: engine,
      movetime: movetime,
    })
  )

  const json = await response.json()
  const comp = json.bestmove
  const move = {
    from: getSquareFromChessNotation(comp.substring(0, 2)),
    to: getSquareFromChessNotation(comp.substring(2, 4)),
  }
  if (comp.length === 5) {
    switch (comp[4]) {
      case 'q':
        move.promotion = 'queen'
        break
      case 'r':
        move.promotion = 'rook'
        break
      case 'n':
        move.promotion = 'knight'
        break
      case 'b':
        move.promotion = 'bishop'
        break
    }
  }
  return move
}



const size = 500


export default function Board(props) {
  const [dragging, setDragging] = useState(-1)
  const [blPawn] = useImage('./pieces/p.png')
  const [blRook] = useImage('./pieces/r.png')
  const [blBishop] = useImage('./pieces/b.png')
  const [blKnight] = useImage('./pieces/n.png')
  const [blQueen] = useImage('./pieces/q.png')
  const [blKing] = useImage('./pieces/k.png')

  const [wPawn] = useImage('./pieces/wp.png')
  const [wRook] = useImage('./pieces/wr.png')
  const [wBishop] = useImage('./pieces/wb.png')
  const [wKnight] = useImage('./pieces/wn.png')
  const [wQueen] = useImage('./pieces/wq.png')
  const [wKing] = useImage('./pieces/wk.png')


  function getHover() {
    if (!canMove() || dragging === -1) {
      return []
    } else {
      return [...props.game.dests(dragging)[Symbol.iterator]()]
    }
  }

  function getPieceImage(piece) {
    switch (piece) {
      case 'p':
        return blPawn
      case 'r':
        return blRook
      case 'b':
        return blBishop
      case 'n':
        return blKnight
      case 'q':
        return blQueen
      case 'k':
        return blKing
      case 'P':
        return wPawn
      case 'R':
        return wRook
      case 'B':
        return wBishop
      case 'N':
        return wKnight
      case 'Q':
        return wQueen
      case 'K':
        return wKing
      default:
        return null
    }
  }

  async function onMove() {
    await playComputerMove(props.game, "StockFish", 1000)
    props.flipTurn()
  }


  function generateChessBoard() {
    const squares = []
    for (let square = 0; square < 64; square++) {
      const [row, col] = getPosition(square, props.playAs)
      const color = (row + col) % 2 === 0 ? '#f0d9b5' : '#b58863'
      squares.push({
        id: `S(${square}})`,
        x: row * (size / 8),
        y: col * (size / 8),
        width: size / 8,
        height: size / 8,
        fill: color,
        square: square,
      })
    }
    return squares
  }

  function generatePieces(position) {
    const fen = new FenParser(position)
    const ranks = fen.ranks
    const pieces = []


    for (let square = 0; square < 64; square++) {
      const [row, col] = getPosition(square)
      const piece = ranks[col][row]


      let [fRow, fCol] = [row, col] 
      if (props.playAs === "black") {
        [fRow, fCol] = getPosition(63 - square)
      }

      if (piece === '-') {
        continue
      }

      pieces.push({
        id: `P(${square})`,
        x: fRow * (size / 8),
        y: fCol * (size / 8),
        width: size / 8,
        height: size / 8,
        image: getPieceImage(piece),
        square: square,
      })
    }

    return pieces
  }

  function log(from, to) {
    console.log(`Moved from Square ${from} to ${to}`)
  }

  function canMove() {
    if (props.game.turn !== props.playAs) {
      return false
    }

    return true
  }

  function endGame() {
    props.endGame()
  }

  const [squares, setSquares] = useState(generateChessBoard())

  return (
    props.gameRunning ?
      <div>
        <Button variant="danger" onClick={endGame}>Resign</Button>
        <Stage width={size} height={size}>
          <Layer>
            {squares.map((entry) => (
              <>
                <Rect
                  x={entry.x}
                  y={entry.y}
                  id={entry.id}
                  width={entry.width}
                  height={entry.height}
                  fill={entry.fill}
                  key={entry.id}
                ></Rect>
                <Text
                  key={`T${entry.square}`}
                  x={entry.x}
                  y={entry.y}
                  text={props.playAs === "white" ? entry.square : 63 - entry.square}
                ></Text>
              </>
            ))}
            {generatePieces(makeFen(props.game.toSetup())).map((piece) => (
              <Image
                x={piece.x}
                y={piece.y}
                width={piece.width}
                height={piece.height}
                image={piece.image}
                id={piece.id}
                key={piece.id}
                draggable={true}
                onDragStart={(e) => {
                  setDragging(piece.square)
                }}
                onDragEnd={(e) => {
                  setDragging(-1)
                  let cancelled = false

                  if (!canMove()) {
                    cancelled = true
                  }


                  let newX = Math.floor(
                    (e.target.attrs.x + size / 16) / (size / 8)
                  )
                  let newY =
                    7 - Math.floor((e.target.attrs.y + size / 16) / (size / 8))


                  if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
                    cancelled = true
                  }


                  let newSquare = 8 * newY + newX

                  if (props.playAs === "black") {
                    newSquare = 63 - newSquare
                  }


                  const move = {
                    from: piece.square,
                    to: newSquare,
                  }

                  if (props.game.board.get(piece.square).role === 'pawn') {
                    const [row, col] = getPosition(newSquare, props.playAs)
                    if (col === 0 || col === 7) {
                      move.promotion = 'queen'
                    }
                  }

                  const context = props.game.ctx()
                  const legal = props.game.isLegal(move, context)
                  if (!legal) {
                    cancelled = true
                  }

                  if (!cancelled) {
                    log(piece.square, newSquare)
                    e.target.x(newX * (size / 8))
                    e.target.y((7 - newY) * (size / 8))
                    props.game.play(move)
                    props.flipTurn()
                    piece.square = newSquare
                    onMove()
                  } else {
                    e.target.x(piece.x)
                    e.target.y(piece.y)
                  }
                }}
                scaleX={dragging === piece.square ? 1.2 : 1}
                scaleY={dragging === piece.square ? 1.2 : 1}
              />
            ))}
            {getHover().map((sq) => {
              const [row, col] = props.playAs === "white" ? getPosition(sq) : getPosition(63 - sq)
              const x = row * (size / 8) + size / 16
              const y = col * (size / 8) + size / 16
              return (
                <Ellipse
                  x={x}
                  y={y}
                  radiusX={size / 32}
                  radiusY={size / 32}
                  fill={'#78afe3'}
                  opacity={0.5}
                  key={`H${sq}`}
                ></Ellipse>
              )
            })}
          </Layer>
          {props.game.isEnd() ?
            <Layer opacity={.8} onClick={endGame}>
              <Rect x={size / 8} y={size / 8} width={(6 * size) / 8} height={(6 * size) / 8} fill={"white"} />
              <Text x={(size / 2) - (size / 8)} y={(size / 8) + (size / 16)} text={"THE GAME IS OVER"} fontSize={20} />
              <Text x={(size / 2) - (size / 8)} y={(size / 8) + (size / 8)} text={"CLICK TO RETURN TO HOME"} fontSize={20} />
            </Layer>
            : null}
        </Stage>
      </div> : <Navigate to="/" />
  )
}
