import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Container, Row, Col } from 'react-bootstrap'
import Cookies from 'js-cookie'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Stats() {
  const [stockfishStats, setStockfishStats] = useState([0, 0, 0])
  const [komodoStats, setKomodoStats] = useState([0, 0, 0])

  const [stats, setStats] = useState({
    gamesPlayed: 0,
    favoriteEngine: '',
    kDiff: 0,
    sDiff: 0,
  })

  useEffect(() => {
    async function getStats() {
      const response = await fetch('/userstats?', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()
      return json
    }

    getStats().then((stats) => {
      setStats({
        gamesPlayed: stats.gamesPlayed,
        favoriteEngine: stats.favoriteEngine,
        sDiff: stats.stockfish.averageDifficulty,
        kDiff: stats.komodo.averageDifficulty,
      })
      setStockfishStats(stats.stockfish.data)
      setKomodoStats(stats.komodo.data)
    })
  }, [])

  const sData = {
    labels: ['Wins', 'Losses', 'Draws'],
    datasets: [
      {
        data: stockfishStats,
        label: '# of Games',
        backgroundColor: [
          'rgba(167, 209, 141, 0.8)',
          'rgba(244, 128, 132, 0.8)',
          'rgba(138, 165, 231, 0.8)',
        ],
        borderColor: [
          'rgba(255, 255, 255, 0.4)',
          'rgba(255, 255, 255, 0.4)',
          'rgba(255, 255, 255, 0.4)',
        ],
        borderWidth: 2,
      },
    ],
  }
  const kData = {
    labels: ['Wins', 'Losses', 'Draws'],
    datasets: [
      {
        data: komodoStats,
        label: '# of Games',
        backgroundColor: [
          'rgba(167, 209, 141, 0.8)',
          'rgba(244, 128, 132, 0.8)',
          'rgba(138, 165, 231, 0.8)',
        ],
        borderColor: [
          'rgba(255, 255, 255, 0.4)',
          'rgba(255, 255, 255, 0.4)',
          'rgba(255, 255, 255, 0.4)',
        ],
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="mainDiv">
      <Container className="statsContainer" fluid="sm">
        <Row
          className="square border border-dark border-3"
          style={{ maxWidth: '500px', margin: '0 auto' }}
        >
          <h1 className="text-center">stats for {Cookies.get('username')}</h1>
        </Row>
        <br />
        <Row>
          <h6># games played: {stats.gamesPlayed}</h6>
        </Row>
        <Row>
          <h6>favorite chess engine: {stats.favoriteEngine}</h6>
        </Row>
        <Row className="justify-content-md-center">
          <div className="chartData">
            <h2>StockFish data</h2>
            <h4>avg difficulty: {stats.sDiff.toFixed(1)}</h4>
            <Pie id="piechart_stockfish" data={sData} />
          </div>
          <div className="chartData">
            <h2>Komodo data</h2>
            <h4>avg difficulty: {stats.kDiff.toFixed(1)}</h4>
            <Pie id="piechart_komodo" data={kData} />
          </div>
        </Row>
      </Container>
    </div>
  )
}
