import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
  FloatingLabel,
} from 'react-bootstrap'

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

  function handleEngineChange(engName) {
    const engine = engName
    const selectedEntry = engines.find((e) => e.name === engine)
    props.setEngine(selectedEntry.name)
    setMaxLevel(selectedEntry.maxLevel)
  }

  function handleLevelChange(event) {
    props.setLevel(event.target.value)
  }

  function handleColorChange(color) {
    props.setPlayAs(color)
  }


  return props.gameRunning ? (
    <Navigate to={'/play'} />
  ) : (
    <>
      <Container className="mainContainer" style={{maxWidth: "500px"}}>
        <Row className="square border border-dark border-3">
          <h1 className="text-center">start your game</h1>
        </Row>
        <Row><br/></Row>
        <Row>
          <h2 className="text-center">engine select:</h2>
        </Row>
        <Row className="justify-content-md-center" style={{ padding: '15px' }}>
          <ToggleButtonGroup type="radio" name="Select Engine" defaultValue={1}>
            <ToggleButton
              id="stockfish-eng"
              value={1}
              onClick={() => handleEngineChange('StockFish')}
              variant="outline-dark"
            >
              StockFish
            </ToggleButton>
            <ToggleButton
              id="komodo-eng"
              value={2}
              onClick={() => handleEngineChange('Komodo')}
              variant="outline-dark"
            >
              Komodo
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <Row className="justify-content-md-center" style={{ maxWidth: '150px', padding: '5px', margin:'0 auto' }}>
          <FloatingLabel
            label="difficulty:"
            controlId="difficulty_select"
            style={{ padding: '2px' }}
          >
            <Form.Select
              id="difficulty_select"
              aria-label="select difficulty"
              onChange={(event) => handleLevelChange(event)}
              placeholder="Select Difficulty"
            >
              {options}
            </Form.Select>
          </FloatingLabel>
        </Row>
        <Row className="justify-content-md-center" style={{ padding: '10px' }}>
          <h3 className="text-center">play as:</h3>
        </Row>
        <Row className="justify-content-md-center" style={{ padding: '10px' }}>
          <ToggleButtonGroup type="radio" name="Select Color" defaultValue={1}>
            <ToggleButton
              id="white-eng"
              value={1}
              onClick={() => handleColorChange('white')}
              variant="outline-light"
            >
              white
            </ToggleButton>
            <ToggleButton
              id="black-eng"
              value={2}
              onClick={() => handleColorChange('black')}
              variant="outline-dark"
            >
              black
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
        <Row><br/></Row>
        <Row className="justify-content-md-center" style={{ maxWidth: '250px', margin:'0 auto', padding: '10px' }}>
            <Button variant="dark" onClick={() => props.begin()}>
              begin game
            </Button>
        </Row>
      </Container>
    </>
  )
}
export default Home
