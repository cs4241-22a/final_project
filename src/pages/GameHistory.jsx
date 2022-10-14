import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import GameReplay from '../components/GameReplay'
import GameViewer from '../GameViewer'
import { Pgn } from 'chess-pgn'

export default function GameHistory() {
  const [history, setHistory] = useState([])
  const [currentGame, setCurrentGame] = useState([])

  useEffect(() => {
    async function getHistory() {
      const response = await fetch('/userhistory', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      return json
    }

    getHistory().then((history) => {
      setHistory(history)
      if (history.length > 0) {
        setCurrentGame(history[0].game)
      }
    })
  }, [])

  function makePGN(moves) {
    let pgn = new Pgn()
    for (let move of moves) {
      pgn = pgn.move(move)
    }
    return pgn.toString()
  }

  return (
    <Container id="ghContainer" fluid="sm">
      <Row
        className="square border border-dark border-3"
        style={{ maxWidth: '500px', margin: '3vh auto' }}
      >
        <h1 className="text-center">game history</h1>
      </Row>
      <Row className="justify-content-md-center">
        <div className="ghData">
          <GameReplay currentGame={currentGame}></GameReplay>
          <GameViewer history={currentGame}></GameViewer>
        </div>
        <div className="ghData">
          <Table>
            <thead>
              <tr>
                <th>select</th>
                <th>engine</th>
                <th>strength</th>
                <th>color</th>
                <th>result</th>
                <th>PGN</th>
              </tr>
            </thead>
            <tbody>
              {history.map((game) => (
                <tr>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => setCurrentGame(game.game)}
                    >
                      X
                    </Button>
                  </td>
                  <td>{game.engine}</td>
                  <td>{game.engineStrength}</td>
                  <td>{game.colorPlayed}</td>
                  <td>{game.result}</td>
                  <td>{makePGN(game.game).substring(0, 50)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Row>
    </Container>
  )
}
