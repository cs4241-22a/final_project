import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const About = () => {
  return (
    <div className="mainDiv">
      <Container className="aboutContainer">
        <Row className="square border border-dark border-3" style={{maxWidth: "500px", margin: "0 auto"}}>
          <h1>about this project:</h1>
        </Row>
        <Row><br/></Row>
        <Row>
          <p>this project was created by Harrison Rubin, Zachary Sarrett, Henry Yoder, and Cooper Dean. <br/>
            it is meant to be a quick and easy way for users to play against various chess engines with selectable difficulty. <br/>
            the project was created as a final assignment for cs 4241 (webware).</p>
        </Row>
        <Row><br/></Row>
        <Row>
          <h2>how to use the website:</h2>
        </Row>
        <Row><br/></Row>
        <Row>
          <p>on the home page, start a new game by selecting which color you want to play as, which bot you want to play against, and the difficulty of the bot</p>
          <p>after playing a game, you can visit the game history page to review the game</p>
          <p>after you have played enough games, you can view the stats page to view your history of wins and losses against each bot, <br/>
             average difficulty for each bot, and the total number of games you've played</p>
        </Row>
      </Container>
    </div>
  )
}

export default About
