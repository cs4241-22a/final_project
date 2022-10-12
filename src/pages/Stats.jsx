import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
// import * as d3 from 'd3'
// import * as d3Collection from 'd3-collection'

ChartJS.register(ArcElement, Tooltip, Legend)

export const stockfish_data = {
  labels: ['Wins', 'Losses', 'Draws'],
  datasets: [
    {
      label: '# of Games',
      data: [200, 50, 25],
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
export const komodo_data = {
  labels: ['Wins', 'Losses', 'Draws'],
  datasets: [
    {
      label: '# of Games',
      data: [150, 105, 20],
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
const Stats = () => {
  return (
    <div className="mainDiv">
      <Container className="statsContainer" fluid="sm">
        <Row
          className="square border border-dark border-3"
          style={{ maxWidth: '500px', margin: '0 auto' }}
        >
          <h1 className="text-center">stats for "user"</h1>{' '}
          {/* pull username here */}
        </Row>
        <br />
        <Row>
          <h6># games played:</h6>{' '}
          {/* pull # games played for username from databas here */}
        </Row>
        <Row>
          <h6>favorite chess engine:</h6>{' '}
          {/* pull engine name with more plays here */}
        </Row>
        <Row className="justify-content-md-center">
          <div className="chartData">
            <h2>StockFish data</h2>
            <h4>avg difficulty:</h4> {/* pull avg difficulty here */}
            <Pie id="piechart_stockfish" data={stockfish_data} />
          </div>
          <div className="chartData">
            <h2>Komodo data</h2>
            <h4>avg difficulty:</h4> {/* pull avg difficulty here */}
            <Pie id="piechart_komodo" data={komodo_data} />
          </div>
        </Row>
      </Container>
    </div>
  )
}
export default Stats
