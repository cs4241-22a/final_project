import React, { useState } from 'react'

const size = 500.0

export default function GameViewer(props) {
  console.log(props.history)
  return <p>{props.history.join(' ')}</p>
}
