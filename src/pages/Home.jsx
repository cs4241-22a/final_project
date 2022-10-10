import Button from 'react-bootstrap/Button';
import React from 'react'
import { Navigate } from 'react-router-dom';

const Home = (props) => {
  return (
    props.gameRunning ? <Navigate to={"/play"} /> :
      <div>
        <h1>Home Page</h1>
        <p> Home Page</p>
        <Button variant="primary" onClick={() => props.begin("white")}>Play As White</Button>
        <Button variant="secondary" onClick={() => props.begin("black")} >Play As Black</Button>
      </div>
  )
}

export default Home
