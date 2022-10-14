import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const About = () => {
  return (
    <div className="mainDiv">
      <Container className="aboutContainer">
        <Row className="square border border-dark border-3" style={{maxWidth: "500px", margin: "0 auto"}}>
          <h1>about:</h1>
        </Row>
        <Row><br/></Row>
        <Row>
          <p>WebChess was created by Cooper Dean, Harrison Rubin, Zachary Sarrett and Henry Yoder. <br/>
            WebChess is a quick and easy way for users to play against various chess engines with selectable difficulty. <br/>
            WebChess was created as a final assignment for CS4241 Webware.</p>
        </Row>
        <Row><br/></Row>
        <Row>
          <h2>How to use WebChess:</h2>
        </Row>
        <Row><br/></Row>
        <Row>
          <p>On the home page, start a new game by selecting which color you want to play as, which bot you want to play against, and the difficulty of the bot.</p>
          <p>After playing a game, you can visit the game history page to review the game. In the game history page, you can revisit the previous games you've played on WebChess</p>
          <p>After you have played enough games, you can view the stats page to view your history of wins and losses against each bot, <br/>
             average difficulty for each bot, and the total number of games you've played</p>
        </Row>
      </Container>
    </div>
  )
}

export default About
