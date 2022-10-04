import React, { useState } from "react";
import { Stage, Layer, Rect, Image, Text, Ellipse } from "react-konva";
import useImage from "use-image";
import FenParser from "@chess-fu/fen-parser";
import { makeFen } from "chessops/fen";

const size = 500.0;

export default function GameViewer(props) {
    console.log(props.history)
  return (
    <p>{props.history.join(' ')}</p>
  );
}
