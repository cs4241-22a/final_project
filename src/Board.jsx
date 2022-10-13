import React, { useState, useRef, useLayoutEffect } from 'react'
import { Stage, Layer, Rect, Image, Text, Ellipse } from 'react-konva'
import useImage from 'use-image'
import FenParser from '@chess-fu/fen-parser'
import { makeFen } from 'chessops/fen'
import { makeSan } from 'chessops/san'
import { Navigate } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap'

export async function playComputerMove(chess, engine, movetime, level) {
  const fen = makeFen(chess.toSetup())
  const move = await getBestMove(fen, engine, movetime, level)
  const san = makeSan(chess, move)
  chess.play(move)
  return chess, san
}

function getPosition(index, color) {
  return [index % 8, 7 - Math.floor(index / 8)]
}

function getSquareFromChessNotation(pos) {
  const row = pos.charCodeAt(0) - 97
  const col = parseInt(pos[1]) - 1
  return 8 * col + row
}

async function getBestMove(pos, engine, movetime, level) {
  const response = await fetch(
    'http://176.31.253.185:4000/bestmove?' +
      new URLSearchParams({
        position: pos,
        engine: engine,
        movetime: movetime,
        level: level,
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

export default function Board(props) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth)
  }, [])

  const [dragging, setDragging] = useState(-1)
  const [blPawn, status1] = useImage('./pieces/p.png')
  const [blRook, status2] = useImage('./pieces/r.png')
  const [blBishop, status3] = useImage('./pieces/b.png')
  const [blKnight, status4] = useImage('./pieces/n.png')
  const [blQueen, status5] = useImage('./pieces/q.png')
  const [blKing, status6] = useImage('./pieces/k.png')

  const [wPawn, status7] = useImage('./pieces/wp.png')
  const [wRook, status8] = useImage('./pieces/wr.png')
  const [wBishop, status9] = useImage('./pieces/wb.png')
  const [wKnight, status10] = useImage('./pieces/wn.png')
  const [wQueen, status11] = useImage('./pieces/wq.png')
  const [wKing, status12] = useImage('./pieces/wk.png')
  const [winImg] = useImage('./pieces/WinImage.svg')
  const [loseImg] = useImage('./pieces/LoseImage.svg')
  const [drewImg] = useImage('./pieces/DrewImage.svg')
  function allLoaded() {
    const values = [
      status1,
      status2,
      status3,
      status4,
      status5,
      status6,
      status7,
      status8,
      status9,
      status10,
      status11,
      status12,
    ]
    if (values.includes('loading') || values.includes('failed')) {
      return false
    }
    return true
  }

  let size = width * 0.95
  const squares = generateChessBoard()

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

  async function onMove(playerMove) {
    if (props.game.isEnd()) {
      props.setGameOver(true)
      sendResult()
      return
    }
    const san = await playComputerMove(props.game, props.engine, 1000, props.level)
    props.setHistory([...props.history, playerMove, san])
    if (props.game.isEnd()) {
      props.setGameOver(true)
      sendResult()
      return
    }
    props.flipTurn()
  }

  function generateChessBoard() {
    const squares = []
    for (let square = 0; square < 64; square++) {
      const [row, col] = getPosition(square, props.playAs)
      const color = (row + col) % 2 === 0 ? '#cce8dB' : '#beb4d6'
      /* prev colors: #F0D9B5, #B58863 */
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
      if (props.playAs === 'black') {
        ;[fRow, fCol] = getPosition(63 - square)
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

  function handleResign() {
    props.setGameOver(true)
    sendResult()
    endGame()
  }

  function sendResult() {
    let result = 'draw'
    if (props.game.outcome === 'white' && props.playAs === 'white') {
      result = 'win'
    } else if (props.game.outcome === 'black' && props.playAs === 'black') {
      result = 'win'
    } else {
      result = 'loss'
    }

    fetch('http://176.31.253.185:4000/result', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        engine: props.engine,
        engineStrength: props.level,
        colorPlayed: props.playAs,
        game: '1. e4 e5',
        result: result,
      },
    })
    //.then((response) => response.json())
    //.then((json) => console.log(json))
  }

  function endGame() {
    props.endGame()
  }

  function getResultPicture() {
    if (props.game.outcome === undefined) {
      return drewImg
    }
    if (props.game.outcome === 'white' && props.playAs === 'white') {
      return winImg
    }
    if (props.game.outcome === 'black' && props.playAs === 'black') {
      return winImg
    }
    return loseImg
  }

  return (
    <Container id="board_container" ref={ref}>
      {props.gameRunning ? (
        allLoaded() ? (
          <>
            <Row>
              <Stage width={size} height={size}>
                <Layer>
                  {squares.map((entry) => (
                    <>
                      <Rect
                        x={entry.x}
                        y={entry.y}
                        id={entry.id}r
                        width={entry.width}
                        height={entry.height}
                        fill={entry.fill}
                        key={entry.id}
                      ></Rect>
                      <Text
                        key={`T${entry.square}`}
                        x={entry.x}
                        y={entry.y}
                        text={
                          props.playAs === 'white'
                            ? entry.square
                            : 63 - entry.square
                        }
                      ></Text>
                    </>
                  ))}
                  {generatePieces(makeFen(props.game.toSetup())).map(
                    (piece) => (
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
                            7 -
                            Math.floor(
                              (e.target.attrs.y + size / 16) / (size / 8)
                            )

                          if (newX < 0 || newX > 7 || newY < 0 || newY > 7) {
                            cancelled = true
                          }

                          let newSquare = 8 * newY + newX

                          if (props.playAs === 'black') {
                            newSquare = 63 - newSquare
                          }

                          const move = {
                            from: piece.square,
                            to: newSquare,
                          }

                          if (
                            props.game.board.get(piece.square).role === 'pawn'
                          ) {
                            const [row, col] = getPosition(
                              newSquare,
                              props.playAs
                            )
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
                            const san = makeSan(props.game, move)
                            props.setHistory([...props.history, san])
                            props.game.play(move)
                            props.flipTurn()
                            piece.square = newSquare
                            onMove(san)
                          } else {
                            e.target.x(piece.x)
                            e.target.y(piece.y)
                          }
                        }}
                        scaleX={dragging === piece.square ? 1.2 : 1}
                        scaleY={dragging === piece.square ? 1.2 : 1}
                      />
                    )
                  )}
                  {getHover().map((sq) => {
                    const [row, col] =
                      props.playAs === 'white'
                        ? getPosition(sq)
                        : getPosition(63 - sq)
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
                {props.gameOver ? (
                  <Layer onClick={endGame}>
                    <Rect opacity={0.6}
                      x={0}
                      y={0}
                      width={size}
                      height={size}
                      fill={'white'}
                    />
                    <Image
                      x={0}
                      y={0}
                      width={size}
                      height={size}
                      image={getResultPicture()}
                    />
                  </Layer>
                ) : null}
              </Stage>
            </Row>
            <Row style={{ padding: '20px' }}>
              <Col>
                <Button
                  variant="danger"
                  onClick={handleResign}
                  style={{ minWidth: '100%' }}
                >
                  resign
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  onClick={() => {}}
                  style={{ minWidth: '100%' }}
                >
                  undo last move
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <h1>loading game...</h1>
        )
      ) : (
        <Navigate to="/" />
      )}
    </Container>
  )
}
