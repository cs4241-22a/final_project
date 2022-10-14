import React, { useState } from 'react'
import pgnParser from 'pgn-parser'
import { Pgn } from 'chess-pgn'
import { Button, Container, Row, Col } from 'react-bootstrap'

export default function GameReplay(props) {
  const [image, setImage] = useState(null)
  const [moveNumber, setMoveNumber] = useState(0)

  let moves = props.currentGame
  moves = moves.slice(0, moveNumber)

  let pgn = new Pgn()
  for (let move of moves) {
    pgn = pgn.move(move)
  }

  fetch(
    '/createImage?' +
      new URLSearchParams({
        pgn: pgn.toString(),
      })
  )
    .then((res) => res.json())
    .then((res) => setImage(res.image))

  return (
    <Container>
      <Row>
        {image !== null ? (
          <img src={`data:image/png;base64,${image}`} alt="" />
        ) : null}
      </Row>
      <Row className="justify-content-md-center" style={{ padding: '20px' }}>
        <Col>
          <Button
            variant="secondary"
            onClick={() => {
              if (moveNumber > 0) {
                setMoveNumber(moveNumber - 1)
              }
            }}
            style={{ minWidth: '100%' }}
          >
            previous
          </Button>
        </Col>
        <Col>
          <Button
            variant="secondary"
            onClick={() => {
              if (moveNumber < props.currentGame.length) {
                setMoveNumber(moveNumber + 1)
              }
            }}
            style={{ minWidth: '100%' }}
          >
            next
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
