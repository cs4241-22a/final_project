import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'

function map(input, low, high, newLow, newHigh) {
  return newLow + ((newHigh - newLow) / (high - low)) * (input - low)
}

const engines = [
  {
    name: 'StockFish',
    maxLevel: 10,
  },
  {
    name: 'Komodo',
    maxLevel: 25,
  },
]

const Home = (props) => {
  const engineOptions = []
  const [maxLevel, setMaxLevel] = useState(10)
  const options = []

  for (let i = 0; i < maxLevel; i++) {
    options.push(<option>{i + 1}</option>)
  }
  for (let engine of engines) {
    engineOptions.push(<option>{engine.name}</option>)
  }

  function handleEngineChange(event) {
    const engine = event.target.value
    const selectedEntry = engines.find((e) => e.name === engine)
    props.setEngine(selectedEntry.name)
    setMaxLevel(selectedEntry.maxLevel)
  }

  function handleLevelChange(event) {
    props.setLevel(event.target.value)
  }

  return props.gameRunning ? (
    <Navigate to={'/play'} />
  ) : (
    <div className="col-md-12 text-center">
      <h1>Home Page</h1>
      <p> Home Page</p>
      <Button variant="primary" onClick={() => props.begin('white')}>
        Play As White
      </Button>
      <Button variant="secondary" onClick={() => props.begin('black')}>
        Play As Black
      </Button>
      <Form.Select
        onChange={(event) => handleEngineChange(event)}
        placeholder="Select Chess Engine"
      >
        {engineOptions}
      </Form.Select>
      <Form.Select
        onChange={(event) => handleLevelChange(event)}
        placeholder="Select Difficulty"
      >
        {options}
      </Form.Select>
    </div>
  )
}

export default Home
