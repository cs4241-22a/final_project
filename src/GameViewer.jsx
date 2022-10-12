import React, { useState } from 'react'
import { Pgn } from 'chess-pgn'

export default function GameViewer(props) {
  let pgn = new Pgn()
  for (let move of props.history) {
    console.log(move)
    pgn = pgn.move(move)
  }
  return <p>{pgn.toString()}</p>
}
